# NestJS Technical Deep Dive

This document contains the technical implementation details and code examples for the NestJS theory session.

## 1. Express vs NestJS Implementation

### Express Approach (The "Messy" Way)

In Express, business logic, validation, and routing often get mixed together:

```javascript
// Everything mixed together!
router.get("/users/:id", async (req, res) => {
	// Authentication
	if (!req.headers.authorization)
		return res.status(401).json({ error: "Unauthorized" });

	// Database query
	const user = await db.query("SELECT * FROM users WHERE id = ?", [
		req.params.id,
	]);

	// Business logic
	if (!user) return res.status(404).json({ error: "Not found" });

	// Authorization
	if (req.user.id !== user.id)
		return res.status(403).json({ error: "Forbidden" });

	res.json(user);
});
```

### NestJS Approach (The "Clean" Way)

NestJS separates concerns using decorators and classes:

```typescript
// Clean, separated, testable
@Controller("users")
export class UserController {
	constructor(private userService: UserService) {}

	@Get(":id")
	@UseGuards(AuthGuard, OwnershipGuard)
	findOne(@Param("id") id: string) {
		return this.userService.findOne(id);
	}
}
```

## 2. TypeScript & Dependency Injection

### TypeScript-First

Catches errors before runtime:

```typescript
function getUser(id: number): User {
	return { id: "string" }; // ❌ Error at compile-time
}
```

### Dependency Injection

The framework manages dependencies for you:

```typescript
@Injectable()
export class UserService {
	constructor(private database: Database, private logger: Logger) {} // ← Automatically injected
}
```

## 3. Decorators Deep Dive

### Class Decorators

```typescript
@Injectable() // Can be injected
export class UserService {}

@Controller("users") // Handles /users routes
export class UserController {}

@Module({}) // Feature module
export class UserModule {}
```

### Method Decorators

```typescript
@Get()          // HTTP GET
@Post()         // HTTP POST
@Put(':id')     // HTTP PUT with parameter
@Delete(':id')  // HTTP DELETE
```

### Parameter Decorators

```typescript
@Get(':id')
findOne(
  @Param('id') id: string,              // Route parameter
  @Query('include') include: string,    // Query parameter
  @Body() dto: CreateUserDto,           // Request body
  @Headers('auth') auth: string         // Header
) {}
```

## 4. Separation of Concerns Implementation

### Controller (HTTP Layer)

Handles HTTP requests and responses ONLY.

```typescript
@Controller("users")
export class UserController {
	constructor(private userService: UserService) {}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userService.findOne(id); // ✅ Delegate to service
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto); // ✅ Delegate
	}
}
```

### Service (Business Logic Layer)

Implements business rules and logic.

```typescript
@Injectable()
export class UserService {
	constructor(
		private database: Database,
		private emailService: EmailService
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		// ✅ Business logic: Check if email exists
		const exists = await this.database.findByEmail(createUserDto.email);
		if (exists) throw new ConflictException("Email exists");

		// ✅ Business logic: Create user
		const user = await this.database.create(createUserDto);

		// ✅ Business logic: Send welcome email
		await this.emailService.sendWelcome(user.email);

		return user;
	}
}
```

## 5. Module Architecture

### Feature Module

```typescript
@Module({
	imports: [
		DatabaseModule, // Need database
		EmailModule, // Need email service
	],
	controllers: [
		UserController, // Handles /users routes
	],
	providers: [
		UserService, // Business logic
	],
	exports: [
		UserService, // Other modules can use it
	],
})
export class UserModule {}
```

### Root Module

```typescript
@Module({
	imports: [
		UserModule, // Feature modules
		ProductModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
```

### Shared Module Pattern

```typescript
// DatabaseModule - shared by all
@Module({
	providers: [DatabaseService],
	exports: [DatabaseService], // ← Share with others
})
export class DatabaseModule {}

// UserModule - uses database
@Module({
	imports: [DatabaseModule], // ← Import shared module
	providers: [UserService], // ← Can now inject DatabaseService
})
export class UserModule {}
```

## 6. Middleware Implementation

### Functional Middleware

```typescript
export function logger(req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} ${req.url}`);
	next();
}
```

### Class-based Middleware

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private loggerService: LoggerService) {} // ← DI support

	use(req: Request, res: Response, next: NextFunction) {
		this.loggerService.log(`${req.method} ${req.url}`);
		next();
	}
}
```

### Applying Middleware

```typescript
configure(consumer: MiddlewareConsumer) {
  // Apply to all routes
  consumer.apply(LoggerMiddleware).forRoutes('*');

  // Apply to specific path
  consumer.apply(AuthMiddleware).forRoutes('admin');
}
```

## 7. Guards Implementation

### Basic Auth Guard

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		return request.headers.authorization !== undefined;
	}
}
```

### JWT Auth Guard

```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);

		if (!token) throw new UnauthorizedException("No token");

		try {
			const payload = this.jwtService.verify(token);
			request.user = payload; // Attach user to request
			return true;
		} catch {
			throw new UnauthorizedException("Invalid token");
		}
	}

	private extractToken(request: any): string | null {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : null;
	}
}
```

### Role-Based Guard

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<string[]>(
			"roles",
			context.getHandler()
		);
		if (!requiredRoles) return true;

		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.some((role) => user.roles?.includes(role));
	}
}
```

### Using Guards

```typescript
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
	@Get("users")
	@Roles("admin")
	getAllUsers() {}
}
```
