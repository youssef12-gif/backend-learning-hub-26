
# NestJS Session 1: Foundations
**Duration**: 3 hours  
**Format**: Theory (1 hour) + Hands-on (2 hours)

---

## 📚 Theory Phase (1 hour)

### Part 1: What is NestJS? (15 minutes)

#### Overview
- **NestJS** is a progressive Node.js framework for building efficient, scalable server-side applications
- Built with TypeScript (supports JavaScript)
- Inspired by Angular's architecture
- Uses Express under the hood (can be configured to use Fastify)

#### Why NestJS vs Plain Express?
| Express | NestJS |
|---------|--------|
| Minimal structure | Opinionated architecture |
| Manual organization | Built-in modularity |
| No built-in DI | Powerful Dependency Injection |
| Flexibility = complexity | Structured = maintainable |
| Good for small apps | Scales well for large teams |

#### Key Features
- **TypeScript First**: Full TypeScript support with decorators
- **Modular Architecture**: Organize code into cohesive modules
- **Dependency Injection**: Automatic management of dependencies
- **Decorator-Based**: Clean, readable syntax using decorators
- **Built-in Features**: Validation, authentication, ORM integration, testing

---

### Part 1.5: Express vs NestJS - CRUD API Comparison (20 minutes)

Let's compare building the same simple CRUD API in both frameworks:

#### Express.js Approach

**File Structure**:
```
src/
├── index.js
├── routes/
│   └── tasks.js
└── controllers/
    └── taskController.js
```

**Code Example** (`index.js`):
```javascript
const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

// Manual route registration
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Routes** (`routes/tasks.js`):
```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Manual route definitions
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
```

**Controller** (`controllers/taskController.js`):
```javascript
// In-memory storage
let tasks = [];

// Manual dependency management
const TaskService = require('../services/taskService');
const taskService = new TaskService(tasks); // Manual instantiation

exports.getAllTasks = (req, res) => {
  try {
    const tasks = taskService.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = (req, res) => {
  try {
    const task = taskService.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = (req, res) => {
  try {
    // Manual validation
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const task = taskService.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... more manual error handling for each endpoint
```

#### NestJS Approach

**File Structure**:
```
src/
├── main.ts
├── app.module.ts
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts
    ├── tasks.service.ts
    └── dto/
        └── create-task.dto.ts
```

**Main** (`main.ts`):
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Global validation
  await app.listen(3000);
}
bootstrap();
```

**Module** (`tasks.module.ts`):
```typescript
@Module({
  controllers: [TasksController],
  providers: [TasksService], // Automatic DI registration
})
export class TasksModule {}
```

**Controller** (`tasks.controller.ts`):
```typescript
@Controller('tasks')
export class TasksController {
  // Automatic dependency injection
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getById(id);
    // Automatic error handling via exception filters
  }

  @Post()
  @UsePipes(ValidationPipe) // Automatic validation
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // Clean, declarative routing with decorators
}
```

**DTO with Validation** (`dto/create-task.dto.ts`):
```typescript
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  // Validation is automatic - no manual checks needed!
}
```

**Service** (`tasks.service.ts`):
```typescript
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
      // Exception automatically converted to proper HTTP response
    }
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task = { id: uuid(), ...dto, createdAt: new Date() };
    this.tasks.push(task);
    return task;
  }
}
```

#### Key Differences Summary

| Aspect | Express | NestJS |
|--------|---------|--------|
| **Setup** | Manual configuration | Convention-based, auto-wired |
| **Routing** | Separate route files | Decorator-based in controllers |
| **Validation** | Manual if/else checks | Declarative with decorators |
| **Error Handling** | Try/catch everywhere | Exception filters (automatic) |
| **Dependency Management** | Manual instantiation | Automatic injection |
| **Type Safety** | Optional (with TS) | Built-in (TypeScript-first) |
| **Structure** | Your choice | Opinionated modules |
| **Testing** | Setup yourself | Built-in testing utilities |
| **Code Volume** | ~150 lines for basic CRUD | ~80 lines for basic CRUD |

#### When to Use What?

**Choose Express when**:
- Building a small microservice or simple API
- You need maximum flexibility
- Your team prefers minimal frameworks
- Quick prototypes or POCs

**Choose NestJS when**:
- Building enterprise applications
- Working with larger teams
- Need maintainability and scalability
- Want built-in testing, validation, and structure
- TypeScript is your primary language

---

### Part 2: Core Architecture Concepts (15 minutes)

#### The Building Blocks

**1. Modules** (`@Module()`)
- Organize application into cohesive blocks
- Each module encapsulates related features
- Root module (AppModule) ties everything together

```typescript
@Module({
  imports: [],      // Other modules
  controllers: [],  // HTTP request handlers
  providers: [],    // Services, repositories, etc.
  exports: []       // Make providers available to other modules
})
export class TasksModule {}
```

**2. Controllers** (`@Controller()`)
- Handle incoming HTTP requests
- Return responses to the client
- Route requests to appropriate handlers
- Use decorators: `@Get()`, `@Post()`, `@Put()`, `@Delete()`

```typescript
@Controller('tasks')
export class TasksController {
  @Get()
  findAll() {
    return 'Get all tasks';
  }
}
```

**3. Services/Providers** (`@Injectable()`)
- Contain business logic
- Can be injected into controllers or other services
- Single responsibility principle
- Reusable across the application

```typescript
@Injectable()
export class TasksService {
  private tasks = [];
  
  findAll() {
    return this.tasks;
  }
}
```

#### Request Flow
```
HTTP Request → Router → Controller → Service → Controller → HTTP Response
```

---

### Part 3: Dependency Injection (10 minutes)

#### What is Dependency Injection?
- Design pattern where objects receive their dependencies from external sources
- NestJS IoC (Inversion of Control) container manages dependencies automatically
- Benefits: testability, loose coupling, maintainability

#### How it Works in NestJS
```typescript
// Service is marked as injectable
@Injectable()
export class TasksService {
  getData() { return []; }
}

// Controller declares dependency in constructor
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // NestJS automatically provides TasksService instance
  
  @Get()
  getTasks() {
    return this.tasksService.getData();
  }
}

// Module registers the provider
@Module({
  controllers: [TasksController],
  providers: [TasksService], // NestJS knows how to create this
})
export class TasksModule {}
```

---

### Part 4: Project Structure & CLI (10 minutes)

#### Standard Project Structure
```
src/
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── main.ts                 # Entry point
└── tasks/                  # Feature module
    ├── tasks.module.ts
    ├── tasks.controller.ts
    ├── tasks.service.ts
    └── dto/
        └── create-task.dto.ts
```

#### NestJS CLI Commands
```bash
# Create new project
nest new project-name

# Generate resources
nest g module tasks          # Create module
nest g controller tasks      # Create controller
nest g service tasks         # Create service
nest g resource tasks        # Create complete CRUD resource

# Run application
npm run start:dev            # Development mode with watch
```

---

## 💻 Hands-on Phase (2 hours)

### Project: Task Manager API
Build a RESTful API for managing tasks (without database - in-memory storage)

---

### Exercise 1: Setup & Initial Structure (20 minutes)

#### Step 1: Create Project
```bash
# Install NestJS CLI globally
npm i -g @nestjs/cli

# Create new project
nest new task-manager
cd task-manager

# Install additional dependencies
npm install class-validator class-transformer
```

#### Step 2: Start Development Server
```bash
npm run start:dev
```
Visit: `http://localhost:3000`

#### Step 3: Explore Default Files
- Open `src/main.ts` - application entry point
- Open `src/app.module.ts` - root module
- Open `src/app.controller.ts` - root controller
- Open `src/app.service.ts` - root service

**Task**: Modify `app.service.ts` to return `"Welcome to Task Manager API"` and test at `http://localhost:3000`

---

### Exercise 2: Create Tasks Module (30 minutes)

#### Step 1: Generate Tasks Resource
```bash
# This creates module, controller, service, and DTO files
nest g resource tasks
# Choose: REST API
# Generate CRUD entry points? Yes
```

#### Step 2: Define Task Interface
Create `src/tasks/interfaces/task.interface.ts`:
```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
```

#### Step 3: Create DTOs
Create `src/tasks/dto/create-task.dto.ts`:
```typescript
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../interfaces/task.interface';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
```

Create `src/tasks/dto/update-task.dto.ts`:
```typescript
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../interfaces/task.interface';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
```

---

### Exercise 3: Implement Tasks Service (30 minutes)

Update `src/tasks/tasks.service.ts`:
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // TODO: Implement getAllTasks
  getAllTasks(): Task[] {
    // Return all tasks
  }

  // TODO: Implement getTaskById
  getTaskById(id: string): Task {
    // Find task by id
    // If not found, throw NotFoundException
  }

  // TODO: Implement createTask
  createTask(createTaskDto: CreateTaskDto): Task {
    // Create new task with:
    // - id: generated using uuid()
    // - title and description from DTO
    // - status: from DTO or default to PENDING
    // - createdAt: new Date()
    // Add to tasks array and return
  }

  // TODO: Implement updateTask
  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    // Find task by id
    // Update properties from DTO
    // Return updated task
  }

  // TODO: Implement deleteTask
  deleteTask(id: string): void {
    // Find task by id
    // Remove from array
    // If not found, throw NotFoundException
  }

  // TODO: Implement getTasksByStatus
  getTasksByStatus(status: TaskStatus): Task[] {
    // Filter tasks by status
  }
}
```

**Installation needed**:
```bash
npm install uuid
npm install -D @types/uuid
```

---

### Exercise 4: Implement Tasks Controller (30 minutes)

Update `src/tasks/tasks.controller.ts`:
```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './interfaces/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // TODO: GET /tasks - Get all tasks or filter by status
  @Get()
  getTasks(@Query('status') status?: TaskStatus) {
    // If status is provided, filter by status
    // Otherwise return all tasks
  }

  // TODO: GET /tasks/:id - Get task by ID
  @Get(':id')
  getTaskById(@Param('id') id: string) {
    // Return task by id
  }

  // TODO: POST /tasks - Create new task
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    // Create and return new task
  }

  // TODO: PUT /tasks/:id - Update task
  @Put(':id')
  @UsePipes(ValidationPipe)
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    // Update and return task
  }

  // TODO: DELETE /tasks/:id - Delete task
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    // Delete task
  }
}
```

---

### Exercise 5: Enable Validation (10 minutes)

Update `src/main.ts` to enable global validation:
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that don't have decorators
    forbidNonWhitelisted: true, // Throw error if extra properties
    transform: true, // Automatically transform payloads to DTO instances
  }));
  
  await app.listen(3000);
}
bootstrap();
```

---

## 🧪 Testing Your API (Remaining time)

### Using Thunder Client / Postman / cURL

#### 1. Create a Task
```http
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Learn NestJS",
  "description": "Complete Session 1 exercises",
  "status": "IN_PROGRESS"
}
```

#### 2. Get All Tasks
```http
GET http://localhost:3000/tasks
```

#### 3. Get Task by ID
```http
GET http://localhost:3000/tasks/{task-id}
```

#### 4. Filter by Status
```http
GET http://localhost:3000/tasks?status=IN_PROGRESS
```

#### 5. Update Task
```http
PUT http://localhost:3000/tasks/{task-id}
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

#### 6. Delete Task
```http
DELETE http://localhost:3000/tasks/{task-id}
```

#### 7. Test Validation (Should Fail)
```http
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "",
  "status": "INVALID_STATUS"
}
```

---

## 📝 Challenge Tasks (If Time Permits)

1. **Add Priority Field**
   - Add priority enum (LOW, MEDIUM, HIGH) to Task interface
   - Update DTOs to include priority
   - Add endpoint to filter by priority

2. **Add Pagination**
   - Modify `getAllTasks()` to accept page and limit parameters
   - Return paginated results

3. **Add Search**
   - Add search endpoint to find tasks by title/description
   - Implement case-insensitive search

4. **Add Statistics**
   - Create endpoint `GET /tasks/stats` that returns:
     - Total tasks
     - Tasks by status count
     - Completed vs incomplete ratio

---

## 🎯 Key Takeaways

By the end of this session, you should understand:
- ✅ NestJS architecture (Modules, Controllers, Services)
- ✅ Dependency Injection pattern
- ✅ Creating RESTful endpoints with decorators
- ✅ Request/Response handling
- ✅ DTOs and validation with class-validator
- ✅ Project structure and organization
- ✅ NestJS CLI usage

**Next Session Preview**: We'll add database integration with TypeORM, implement relationships between entities, and persist data to PostgreSQL/MySQL!

---

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS GitHub](https://github.com/nestjs/nest)
- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [Class Validator](https://github.com/typestack/class-validator)