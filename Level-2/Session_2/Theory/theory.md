# NestJS Framework - Theory Session

## 📋 Session Objectives

By the end of this session, you will:
1. Understand why NestJS was created and the problems it solves
2. Grasp the difference between Node.js, Express, and NestJS
3. Master decorators as a core concept
4. Understand Separation of Concerns (Controllers, Services, Modules)
5. Learn Middleware and Guards for request processing

---

## 🗂️ Table of Contents

1. [The Evolution & Why NestJS](#1-the-evolution--why-nestjs)
2. [Node.js vs Express vs NestJS](#2-nodejs-vs-express-vs-nestjs)
3. [NestJS Philosophy](#3-nestjs-philosophy)
4. [Understanding Decorators](#4-understanding-decorators)
5. [Separation of Concerns](#5-separation-of-concerns)
6. [Module System Architecture](#6-module-system-architecture)
7. [Middleware](#7-middleware)
8. [Guards](#8-guards)

---

## 1. The Evolution & Why NestJS

### The Node.js Framework Timeline

```
2010: Express.js  → Minimalist, unopinionated, flexible
2013: Koa.js      → Async/await focus
2011: Hapi.js     → Configuration-centric
2016: Fastify     → Performance-first
2017: NestJS      → Enterprise, opinionated, TypeScript-first
```

### Express Problems at Scale

**Express Quick Recap:**
```javascript
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json({ users: [] });
});
```

**Problems as Projects Grow:**
- ❌ No enforced structure → Code becomes messy
- ❌ No standard patterns → Every developer does it differently
- ❌ Manual dependency management → Hard to test
- ❌ Mixing concerns → Business logic in route handlers

**Typical Express Mess:**
```javascript
// Everything mixed together!
router.get('/users/:id', async (req, res) => {
  // Authentication
  if (!req.headers.authorization) return res.status(401).json({error: 'Unauthorized'});
  
  // Database query
  const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  
  // Business logic
  if (!user) return res.status(404).json({error: 'Not found'});
  
  // Authorization
  if (req.user.id !== user.id) return res.status(403).json({error: 'Forbidden'});
  
  res.json(user);
});
```

### Why NestJS Was Created

**Problems NestJS Solves:**

1. **Structure Chaos** → Enforced modular architecture
2. **Scalability Issues** → Built for large teams and projects
3. **Testing Overhead** → Built-in testing utilities
4. **Dependency Hell** → Automatic dependency injection
5. **Inconsistent Patterns** → Standardized approach

**The NestJS Solution:**
```typescript
// Clean, separated, testable
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get(':id')
  @UseGuards(AuthGuard, OwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
```

---

## 2. Node.js vs Express vs NestJS

### Understanding the Layers

```
┌─────────────────────────────────────────┐
│     Your NestJS Application Code        │
├─────────────────────────────────────────┤
│         NestJS Framework                │
├─────────────────────────────────────────┤
│    Express (or Fastify) Framework       │
├─────────────────────────────────────────┤
│         Node.js Runtime                 │
├─────────────────────────────────────────┤
│      V8 JavaScript Engine               │
└─────────────────────────────────────────┘
```

**Key Distinctions:**
- **Node.js** = Runtime environment (like Java JVM)
- **Express** = Minimalist web framework
- **NestJS** = Opinionated framework built on Express/Fastify

### Quick Comparison

| Aspect | Express | NestJS |
|--------|---------|---------|
| **Structure** | None | Enforced modules |
| **Dependencies** | Manual imports | Dependency Injection |
| **TypeScript** | Optional | First-class |
| **Testing** | Manual setup | Built-in |
| **Learning Curve** | Easy | Steeper |
| **Best For** | Small apps | Enterprise apps |

---

## 3. NestJS Philosophy

### Core Principles

#### 1. TypeScript-First
```typescript
// Catches errors before runtime
function getUser(id: number): User {
  return { id: 'string' }; // ❌ Error at compile-time
}
```

#### 2. Dependency Injection
```typescript
// Framework manages dependencies
@Injectable()
export class UserService {
  constructor(
    private database: Database,
    private logger: Logger
  ) {} // ← Automatically injected
}
```

#### 3. Modularity
```
src/
  users/          ← Feature module
    user.controller.ts
    user.service.ts
    user.module.ts
  products/       ← Feature module
    product.controller.ts
    product.service.ts
    product.module.ts
```

#### 4. Platform Agnostic
```typescript
// Use Express (default)
const app = await NestFactory.create(AppModule);

// Switch to Fastify (one line change)
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter()
);
```

### Architectural Inspirations

**Angular** → Module system, DI, decorators  
**Spring (Java)** → Enterprise patterns, annotations  
**ASP.NET Core** → Middleware pipeline, service registration

---

## 4. Understanding Decorators

### What Are Decorators?

**Definition:** Functions that attach metadata to classes, methods, or parameters.

**Syntax:** Use `@` symbol
```typescript
@Controller('users')
export class UserController {
  @Get(':id')
  findOne(@Param('id') id: string) {}
}
```

**Think of them as:** Labels or tags that give special meaning to code.

### Types of Decorators

#### 1. Class Decorators
```typescript
@Injectable()              // Can be injected
export class UserService {}

@Controller('users')       // Handles /users routes
export class UserController {}

@Module({})               // Feature module
export class UserModule {}
```

#### 2. Method Decorators
```typescript
@Get()          // HTTP GET
@Post()         // HTTP POST
@Put(':id')     // HTTP PUT with parameter
@Delete(':id')  // HTTP DELETE
```

#### 3. Parameter Decorators
```typescript
@Get(':id')
findOne(
  @Param('id') id: string,              // Route parameter
  @Query('include') include: string,    // Query parameter
  @Body() dto: CreateUserDto,           // Request body
  @Headers('auth') auth: string         // Header
) {}
```

### Why Decorators Matter

**Without Decorators (Express):**
```javascript
const router = express.Router();
router.get('/users/:id', userController.findOne);
module.exports = router;
```

**With Decorators (NestJS):**
```typescript
@Controller('users')
export class UserController {
  @Get(':id')
  findOne(@Param('id') id: string) {}
}
```

**Benefits:**
- Route definitions live with handlers
- Type-safe parameters
- Self-documenting
- Framework can analyze structure

---

## 5. Separation of Concerns

### The Three Layers

```
┌──────────────────────────────┐
│     Controllers              │  HTTP concerns only
├──────────────────────────────┤
│     Services/Providers       │  Business logic
├──────────────────────────────┤
│     Data Access              │  Database operations
└──────────────────────────────┘
```

### Controllers: HTTP Layer

**Responsibility:** Handle HTTP requests and responses ONLY

```typescript
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id); // ✅ Delegate to service
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // ✅ Delegate
  }
}
```

**Controllers Should:**
- ✅ Define routes
- ✅ Extract request data
- ✅ Call services
- ✅ Return responses

**Controllers Should NOT:**
- ❌ Contain business logic
- ❌ Make database queries
- ❌ Perform calculations

### Services: Business Logic Layer

**Responsibility:** Implement business rules and logic

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
    if (exists) throw new ConflictException('Email exists');
    
    // ✅ Business logic: Create user
    const user = await this.database.create(createUserDto);
    
    // ✅ Business logic: Send welcome email
    await this.emailService.sendWelcome(user.email);
    
    return user;
  }
}
```

**The @Injectable() Decorator:**
- Marks class as injectable
- Can have dependencies in constructor
- Framework manages lifecycle
- Easy to test with mocks

### Express vs NestJS Comparison

**Express (Mixed Concerns):**
```javascript
router.post('/users', async (req, res) => {
  // Everything in one place
  const exists = await db.findByEmail(req.body.email);
  if (exists) return res.status(409).json({error: 'Email exists'});
  
  const user = await db.create(req.body);
  await emailService.send(user.email);
  
  res.json(user);
});
```

**NestJS (Separated):**
```typescript
// Controller: HTTP only
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}

// Service: Business logic only
@Injectable()
export class UserService {
  async create(dto: CreateUserDto): Promise<User> {
    // All business logic here
  }
}
```

---

## 6. Module System Architecture

### What Are Modules?

**Definition:** Organize related components (controllers, services) into cohesive blocks.

**The @Module() Decorator:**
```typescript
@Module({
  imports: [],      // Other modules needed
  controllers: [],  // Route handlers
  providers: [],    // Services/injectables
  exports: []       // Share with other modules
})
export class UserModule {}
```

### Complete Module Example

```typescript
@Module({
  imports: [
    DatabaseModule,    // Need database
    EmailModule        // Need email service
  ],
  controllers: [
    UserController     // Handles /users routes
  ],
  providers: [
    UserService        // Business logic
  ],
  exports: [
    UserService        // Other modules can use it
  ]
})
export class UserModule {}
```

### Root Module (App Module)

```typescript
@Module({
  imports: [
    UserModule,      // Feature modules
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

// main.ts
const app = await NestFactory.create(AppModule); // ← Entry point
await app.listen(3000);
```

### Module Relationships

**Sharing Services Between Modules:**
```typescript
// DatabaseModule - shared by all
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService] // ← Share with others
})
export class DatabaseModule {}

// UserModule - uses database
@Module({
  imports: [DatabaseModule], // ← Import shared module
  providers: [UserService]   // ← Can now inject DatabaseService
})
export class UserModule {}
```

### Global Modules

```typescript
@Global() // ← Available everywhere
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}

// No need to import in other modules
@Module({
  providers: [UserService] // ← Can inject LoggerService
})
export class UserModule {}
```

### Circular Dependencies

**Problem:**
```typescript
// ❌ A imports B, B imports A
@Module({ imports: [BModule] })
export class AModule {}

@Module({ imports: [AModule] })
export class BModule {}
```

**Solution 1: Forward Reference**
```typescript
@Module({ imports: [forwardRef(() => BModule)] })
export class AModule {}
```

**Solution 2: Refactor (Better)**
```typescript
// Extract to shared module
@Module({ exports: [SharedService] })
export class SharedModule {}

@Module({ imports: [SharedModule] })
export class AModule {}

@Module({ imports: [SharedModule] })
export class BModule {}
```

---

## 7. Middleware

### What is Middleware?

**Definition:** Functions that execute **before** the route handler.

**Express Middleware Recap:**
```javascript
app.use((req, res, next) => {
  console.log('Request received');
  next(); // Pass to next
});
```

### Types in NestJS

#### 1. Functional Middleware
```typescript
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// Apply in module
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
```

#### 2. Class-based Middleware
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

### Middleware Scopes

```typescript
configure(consumer: MiddlewareConsumer) {
  // Apply to all routes
  consumer.apply(LoggerMiddleware).forRoutes('*');
  
  // Apply to specific path
  consumer.apply(AuthMiddleware).forRoutes('admin');
  
  // Apply to specific controller
  consumer.apply(AuthMiddleware).forRoutes(AdminController);
  
  // Exclude routes
  consumer
    .apply(AuthMiddleware)
    .exclude({ path: 'auth/login', method: RequestMethod.POST })
    .forRoutes('*');
}
```

### Execution Order

```
Request
  ↓
[Middleware 1]
  ↓
[Middleware 2]
  ↓
[Guards]
  ↓
[Interceptors (Before)]
  ↓
[Pipes]
  ↓
[Controller]
  ↓
[Interceptors (After)]
  ↓
Response
```

### Practical Examples

**Request Logger:**
```typescript
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    
    next();
  }
}
```

---

## 8. Guards

### What Are Guards?

**Definition:** Determine if a request should proceed based on conditions (auth, roles, etc.).

**Key Difference from Middleware:**
- Guards run **after** middleware
- Have access to **execution context** and **metadata**
- Specifically for **authorization** decisions

### Creating a Guard

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization !== undefined;
  }
}
```

**Return Values:**
- `true` → Allow request
- `false` → Deny (throws ForbiddenException)

### Applying Guards

```typescript
// Controller-level
@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {}

// Route-level
@Get()
@UseGuards(AuthGuard)
findAll() {}

// Global
app.useGlobalGuards(new AuthGuard());
```

### JWT Authentication Example

```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    if (!token) throw new UnauthorizedException('No token');
    
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Attach user to request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  private extractToken(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
```

### Role-Based Authorization

**Step 1: Create Roles Decorator**
```typescript
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

**Step 2: Create Roles Guard**
```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}
```

**Step 3: Use in Controller**
```typescript
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles('admin')
  getAllUsers() {}
  
  @Delete('users/:id')
  @Roles('admin', 'superadmin')
  deleteUser() {}
}
```

### Complete Auth Flow

```
Request
  ↓
Middleware (logging, parsing)
  ↓
JwtAuthGuard (verify token)
  ↓ (attach user to request)
RolesGuard (check user.roles)
  ↓ (if authorized)
Pipes (validate DTO)
  ↓
Controller Method
  ↓
Response
```

---

## 📊 Quick Reference

### When to Use What

| Use Case | Tool |
|----------|------|
| Logging requests | Middleware |
| Parsing body | Middleware |
| Authentication | Guard |
| Authorization (roles) | Guard |
| Validation | Pipe |
| Transform response | Interceptor |

### Express vs NestJS

| Express | NestJS |
|---------|---------|
| Unopinionated | Opinionated |
| Manual setup | Built-in DI |
| No structure | Modular |
| JavaScript | TypeScript-first |
| Small apps | Enterprise apps |

---

## 🎯 Key Takeaways

1. **NestJS** = Express + Structure + TypeScript + Enterprise Patterns
2. **Decorators** = Metadata for framework magic
3. **Controllers** = HTTP only, delegate to services
4. **Services** = Business logic, no HTTP knowledge
5. **Modules** = Organize features, manage dependencies
6. **Middleware** = Pre-process requests (logging, parsing)
7. **Guards** = Authorization decisions (auth, roles)

---

## 🚀 What's Next?

**Practical Implementation:**
- Setting up NestJS project
- Creating modules, controllers, services
- Implementing auth with guards
- Building complete features
- Testing strategies

**Remember:** NestJS is JavaScript with superpowers, not a new language. Your Node.js and Express knowledge still applies!

---

*Ready to build enterprise-grade applications? Let's start coding!* 🚀