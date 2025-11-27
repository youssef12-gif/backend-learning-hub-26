# Hands-on: Task Manager API

Follow these steps to build the Task Manager API. Check off each task as you complete it.

## Exercise 1: Setup & Initial Structure

-   [ ] **Step 1: Create Project**

    ```bash
    # Install NestJS CLI globally (if not already installed)
    npm i -g @nestjs/cli

    # Create new project
    nest new task-manager
    cd task-manager
    ```

-   [ ] **Step 2: Start Development Server**

    ```bash
    npm run start:dev
    ```

    -   Verify by visiting `http://localhost:3000`.

-   [ ] **Step 3: Explore Default Files**
    -   Open `src/main.ts` (entry point).
    -   Open `src/app.module.ts` (root module).
    -   Open `src/app.controller.ts` (root controller).
    -   Open `src/app.service.ts` (root service).
    -   **Task**: Modify `app.service.ts` to return `"Welcome to Task Manager API"` and test.

## Exercise 2: Create Tasks Module

-   [ ] **Step 1: Generate Tasks Resource**

    ```bash
    nest g resource tasks
    # Choose: REST API
    # Generate CRUD entry points? Yes
    ```

-   [ ] **Step 2: Define Task Interface**

    -   Create `src/tasks/interfaces/task.interface.ts`:

        ```typescript
        export interface Task {
        	id: string;
        	title: string;
        	description: string;
        	status: TaskStatus;
        	createdAt: Date;
        }

        export enum TaskStatus {
        	PENDING = "PENDING",
        	IN_PROGRESS = "IN_PROGRESS",
        	COMPLETED = "COMPLETED",
        }
        ```

-   [ ] **Step 3: Create DTOs**

    -   Create `src/tasks/dto/create-task.dto.ts`:

        ```typescript
        import { TaskStatus } from "../interfaces/task.interface";

        export class CreateTaskDto {
        	title: string;
        	description?: string;
        	status?: TaskStatus;
        }
        ```

    -   Create `src/tasks/dto/update-task.dto.ts`:

        ```typescript
        import { TaskStatus } from "../interfaces/task.interface";

        export class UpdateTaskDto {
        	title?: string;
        	description?: string;
        	status?: TaskStatus;
        }
        ```

## Exercise 3: Implement Tasks Service

-   [ ] **Update `src/tasks/tasks.service.ts`**

    -   Install uuid: `npm install uuid` and `npm install -D @types/uuid`
    -   Implement the service methods:

        ```typescript
        import { Injectable, NotFoundException } from "@nestjs/common";
        import { Task, TaskStatus } from "./interfaces/task.interface";
        import { CreateTaskDto } from "./dto/create-task.dto";
        import { UpdateTaskDto } from "./dto/update-task.dto";
        import { v4 as uuid } from "uuid";

        @Injectable()
        export class TasksService {
        	private tasks: Task[] = [];

        	getAllTasks(): Task[] {
        		return this.tasks;
        	}

        	getTaskById(id: string): Task {
        		const task = this.tasks.find((t) => t.id === id);
        		if (!task) {
        			throw new NotFoundException("Task not found");
        		}
        		return task;
        	}

        	createTask(createTaskDto: CreateTaskDto): Task {
        		const task: Task = {
        			id: uuid(),
        			title: createTaskDto.title,
        			description: createTaskDto.description,
        			status: createTaskDto.status || TaskStatus.PENDING,
        			createdAt: new Date(),
        		};
        		this.tasks.push(task);
        		return task;
        	}

        	updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
        		const task = this.getTaskById(id);
        		const { title, description, status } = updateTaskDto;

        		if (title) task.title = title;
        		if (description) task.description = description;
        		if (status) task.status = status;

        		return task;
        	}

        	deleteTask(id: string): void {
        		const found = this.getTaskById(id);
        		this.tasks = this.tasks.filter((task) => task.id !== found.id);
        	}

        	getTasksByStatus(status: TaskStatus): Task[] {
        		return this.tasks.filter((task) => task.status === status);
        	}
        }
        ```

## Exercise 4: Implement Tasks Controller

-   [ ] **Update `src/tasks/tasks.controller.ts`**

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
    } from "@nestjs/common";
    import { TasksService } from "./tasks.service";
    import { CreateTaskDto } from "./dto/create-task.dto";
    import { UpdateTaskDto } from "./dto/update-task.dto";
    import { TaskStatus } from "./interfaces/task.interface";

    @Controller("tasks")
    export class TasksController {
    	constructor(private tasksService: TasksService) {}

    	@Get()
    	getTasks(@Query("status") status?: TaskStatus) {
    		if (status) {
    			return this.tasksService.getTasksByStatus(status);
    		}
    		return this.tasksService.getAllTasks();
    	}

    	@Get(":id")
    	getTaskById(@Param("id") id: string) {
    		return this.tasksService.getTaskById(id);
    	}

    	@Post()
    	createTask(@Body() createTaskDto: CreateTaskDto) {
    		return this.tasksService.createTask(createTaskDto);
    	}

    	@Put(":id")
    	updateTask(
    		@Param("id") id: string,
    		@Body() updateTaskDto: UpdateTaskDto
    	) {
    		return this.tasksService.updateTask(id, updateTaskDto);
    	}

    	@Delete(":id")
    	deleteTask(@Param("id") id: string) {
    		return this.tasksService.deleteTask(id);
    	}
    }
    ```

## Verification: Test Your API

-   [ ] **Create a Task**

    -   POST `http://localhost:3000/tasks`
    -   Body: `{"title": "Learn NestJS", "description": "Complete Session 1", "status": "IN_PROGRESS"}`

-   [ ] **Get All Tasks**

    -   GET `http://localhost:3000/tasks`

-   [ ] **Get Task by ID**

    -   GET `http://localhost:3000/tasks/{id}`

-   [ ] **Filter by Status**

    -   GET `http://localhost:3000/tasks?status=IN_PROGRESS`

-   [ ] **Update Task**

    -   PUT `http://localhost:3000/tasks/{id}`
    -   Body: `{"status": "COMPLETED"}`

-   [ ] **Delete Task**
    -   DELETE `http://localhost:3000/tasks/{id}`

## Challenge Tasks

-   [ ] **Add Priority Field**: Add `priority` (LOW, MEDIUM, HIGH) to Task, DTOs, and filter.
-   [ ] **Add Pagination**: Add `page` and `limit` to `getAllTasks`.
-   [ ] **Add Search**: Add search by title/description.
-   [ ] **Add Statistics**: Add `GET /tasks/stats`.
