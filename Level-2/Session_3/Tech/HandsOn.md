# Hands-On: Middleware, Guards, Interceptors & Pipes

## Prerequisites

-   [ ] Ensure your Task Manager API from Session 2 is ready and running
-   [ ] Verify NestJS CLI is installed (`nest --version`)

---

## Exercise 1: Logger Middleware

**Goal:** Log every request's method, URL, and execution time.

-   [ ] Generate the middleware using CLI:
    ```bash
    nest g middleware common/middleware/logging
    ```
-   [ ] In `logging.middleware.ts`, implement the `use` method:
    -   [ ] Log the request method and original URL
    -   [ ] Capture the start time (`Date.now()`)
    -   [ ] Listen to the response `finish` event
    -   [ ] On finish, calculate duration and log it
-   [ ] In `app.module.ts`, implement `NestModule` interface
-   [ ] Configure the middleware to apply to all routes (`forRoutes('*')`)

---

## Exercise 2: API Key Guard

**Goal:** Protect sensitive routes with a custom API Key header.

-   [ ] Generate the guard:
    ```bash
    nest g guard common/guards/api-key
    ```
-   [ ] In `api-key.guard.ts`, implement `canActivate`:
    -   [ ] Get the request object from `context.switchToHttp().getRequest()`
    -   [ ] Read the `x-api-key` header
    -   [ ] Return `true` if header equals "secret-123", otherwise `false`
-   [ ] In `tasks.controller.ts`:
    -   [ ] Apply `@UseGuards(ApiKeyGuard)` to `createTask` (`POST`)
    -   [ ] Apply `@UseGuards(ApiKeyGuard)` to `deleteTask` (`DELETE`)
-   [ ] Test using Postman/Thunder Client:
    -   [ ] Request without header -> Expect 403 Forbidden
    -   [ ] Request with header -> Expect 200/201

---

## Exercise 3: Response Transform Interceptor

**Goal:** Wrap all successful responses in a standard data structure.

-   [ ] Generate the interceptor:
    ```bash
    nest g interceptor common/interceptors/transform
    ```
-   [ ] In `transform.interceptor.ts`:
    -   [ ] Import `map` from `rxjs/operators`
    -   [ ] In `intercept`, use `.pipe(map(data => ...))`
    -   [ ] Return object structure: `{ statusCode, data, timestamp }`
-   [ ] In `main.ts`:
    -   [ ] Apply globally: `app.useGlobalInterceptors(new TransformInterceptor())`
-   [ ] Verify that `GET /tasks` returns the wrapped structure

---

## Exercise 4: Custom Parse UUID Pipe

**Goal:** Ensure IDs passed to endpoints are valid UUIDs.

-   [ ] Generate the pipe:
    ```bash
    nest g pipe common/pipes/parse-id
    ```
-   [ ] In `parse-id.pipe.ts`:
    -   [ ] Implement `transform(value: string, metadata: ArgumentMetadata)`
    -   [ ] Check if `value` is a valid UUID (use regex or `uuid` library)
    -   [ ] If invalid, throw `BadRequestException('Invalid UUID format')`
    -   [ ] If valid, return the value
-   [ ] In `tasks.controller.ts`:
    -   [ ] Apply pipe to `getTaskById(@Param('id', ParseIdPipe) id: string)`
    -   [ ] Apply pipe to `deleteTask`
-   [ ] Test with an invalid ID (e.g., "abc") -> Expect 400 Bad Request

---

## Exercise 5: Global Exception Filter

**Goal:** Standardize error responses across the application.

-   [ ] Generate the filter:
    ```bash
    nest g filter common/filters/http-exception
    ```
-   [ ] In `http-exception.filter.ts`:
    -   [ ] Decorate class with `@Catch(HttpException)`
    -   [ ] Implement `catch(exception: HttpException, host: ArgumentsHost)`
    -   [ ] Get `response` and `request` objects
    -   [ ] Extract status code from exception (`exception.getStatus()`)
    -   [ ] Send JSON response: `{ success: false, error: message, path: url, timestamp }`
-   [ ] In `main.ts`:
    -   [ ] Apply globally: `app.useGlobalFilters(new HttpExceptionFilter())`
-   [ ] Trigger a 404 or 400 error to verify the new JSON format

---

## Challenge (Optional)

-   [ ] **Timeout Interceptor**: Create an interceptor that throws a Request Timeout error if a request takes > 5 seconds.
-   [ ] **Role-Based Auth**: Extend the Guard to check for a specific role in the headers (e.g., `x-role: admin`).
