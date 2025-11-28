# Hands-on Requirements Checklist

## Exercise 1: Setup & Initial Structure

-   [ ] Create new NestJS project `task-manager`
-   [ ] Start development server and verify
-   [ ] Modify `app.service.ts` to return "Welcome to Task Manager API"

## Exercise 2: Create Tasks Module

-   [ ] Generate `tasks` resource (REST API)
-   [ ] Define `Task` interface and `TaskStatus` enum
-   [ ] Create `CreateTaskDto`
-   [ ] Create `UpdateTaskDto`

## Exercise 3: Implement Tasks Service

-   [ ] Install `uuid` and `@types/uuid`
-   [ ] Implement `getAllTasks`
-   [ ] Implement `getTaskById`
-   [ ] Implement `createTask`
-   [ ] Implement `updateTask`
-   [ ] Implement `deleteTask`
-   [ ] Implement `getTasksByStatus`

## Exercise 4: Implement Tasks Controller

-   [ ] Implement `GET /tasks` (with status filter)
-   [ ] Implement `GET /tasks/:id`
-   [ ] Implement `POST /tasks`
-   [ ] Implement `PUT /tasks/:id`
-   [ ] Implement `DELETE /tasks/:id`

## Verification

-   [ ] Verify creation of a task
-   [ ] Verify retrieving all tasks
-   [ ] Verify retrieving a task by ID
-   [ ] Verify filtering tasks by status
-   [ ] Verify updating a task
-   [ ] Verify deleting a task

## Challenges (Optional)

-   [ ] Add Priority Field
-   [ ] Add Pagination
-   [ ] Add Search
-   [ ] Add Statistics
