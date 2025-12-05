# Welcome to task 3 in Level 2

## NestJS Request Lifecycle

## Before we start I would recommend you check the overview of session 3 and the documentation of NestJS for Request Lifecycle

## Overview

Extend your URL Shortener project by implementing the request lifecycle components covered in Session 3. This will add production-ready features like logging, security, validation, response formatting, and error handling.

---

## Exercise 1: Request Logger Middleware

### Goal

Track all incoming requests with detailed logging including method, URL, duration, and status code.

### Requirements

-   [ ] Generate middleware: `nest g middleware common/middleware/logger`
-   [ ] Log request details: method, URL, timestamp
-   [ ] Calculate and log request duration
-   [ ] Log response status code
-   [ ] Apply middleware globally in `AppModule`

### Expected Output

```
[2024-01-15 10:30:45] POST /shorten - Started
[2024-01-15 10:30:45] POST /shorten - Completed in 15ms - Status: 201
[2024-01-15 10:30:50] GET /abc123 - Started
[2024-01-15 10:30:50] GET /abc123 - Completed in 5ms - Status: 302
```

### Testing

-   Make any API request and verify logs appear in console
-   Check that duration is calculated correctly

---

## Exercise 2: Rate Limiting Middleware

### Goal

Prevent abuse by limiting the number of URL shortening requests from a single IP address.

### Requirements

-   [ ] Generate middleware: `nest g middleware common/middleware/rate-limit`
-   [ ] Track requests per IP address (use in-memory Map)
-   [ ] Limit: 10 requests per minute per IP
-   [ ] Return `429 Too Many Requests` if limit exceeded
-   [ ] Reset counter after 1 minute
-   [ ] Apply only to `POST /shorten` route

### Implementation Hints

```typescript
// Store: Map<IP, { count: number, resetTime: number }>
// Check if resetTime has passed, if yes, reset count
// Increment count, if greater than limit, error code 429
```

### Testing

-   Make 11 requests from same IP to `POST /shorten`
-   11th request should return 429
-   Wait 1 minute, verify counter resets

---

## Exercise 3: API Key Authentication Guard

### Goal

Protect the URL shortening endpoint with API key authentication.

### Requirements

-   [ ] Generate guard: `nest g guard common/guards/api-key`
-   [ ] Check for `X-API-Key` header
-   [ ] Validate against environment variable or config (e.g., `API_KEY=my-secret-key`)
-   [ ] Return `401 Unauthorized` if missing or invalid
-   [ ] Apply to `POST /shorten` endpoint only
-   [ ] Allow public access to `GET /:shortCode` (no guard)

### Environment Setup

```bash
# .env
API_KEY=my-secret-api-key-123
```

### Testing

-   Try `POST /shorten` without header → 401
-   Try `POST /shorten` with wrong key → 401
-   Try `POST /shorten` with correct key → 201
-   Verify `GET /:shortCode` works without key

---

## Exercise 4: Response Transform Interceptor

### Goal

Standardize all API responses to follow a consistent format.

### Requirements

-   [ ] Generate interceptor: `nest g interceptor common/interceptors/transform`
-   [ ] Wrap successful responses in standard format
-   [ ] Apply globally in `main.ts`

### Response Format

```typescript
{
  "success": true,
  "statusCode": 200,
  "timestamp": "2024-01-15T10:30:45.123Z",
  "path": "/shorten",
  "data": {
    // original response data
  }
}
```

### Testing

**Before:**

```json
{
	"shortCode": "abc123",
	"shortUrl": "http://localhost:3000/abc123"
}
```

**After:**

```json
{
	"success": true,
	"statusCode": 201,
	"timestamp": "2024-01-15T10:30:45.123Z",
	"path": "/shorten",
	"data": {
		"shortCode": "abc123",
		"shortUrl": "http://localhost:3000/abc123"
	}
}
```

---

## Exercise 5: URL Validation Pipe

### Goal

Create a custom pipe to validate URLs before processing.

### Requirements

-   [ ] Generate pipe: `nest g pipe common/pipes/url-validation`
-   [ ] Validate URL format using regex or `URL` constructor
-   [ ] Check that URL starts with `http://` or `https://`
-   [ ] Reject URLs longer than 500 characters
-   [ ] Throw `BadRequestException` with clear error message if invalid
-   [ ] Apply to `url` field in `POST /shorten`

### Validation Rules

```typescript
// Valid URLs
✓ https://example.com
✓ http://example.com/path?query=value
✓ https://subdomain.example.com

// Invalid URLs
✗ example.com (no protocol)
✗ ftp://example.com (wrong protocol)
✗ not-a-url
✗ (URLs > 500 characters)
```

### Testing

-   Send valid URLs → Success
-   Send invalid URLs → 400 with clear error
-   Send URL without protocol → 400 with message "URL must start with http:// or https://"

---

## Exercise 6: Short Code Format Pipe

### Goal

Validate and sanitize short codes in redirect requests.

### Requirements

-   [ ] Generate pipe: `nest g pipe common/pipes/short-code-validation`
-   [ ] Validate short code format (alphanumeric, 6-10 characters)
-   [ ] Convert to lowercase for case-insensitive lookup
-   [ ] Throw `BadRequestException` if format is invalid
-   [ ] Apply to `:shortCode` parameter in `GET /:shortCode`

### Validation Rules

```typescript
// Valid short codes
✓ abc123
✓ ABC123 (converted to abc123)
✓ xyz789

// Invalid short codes
✗ ab (too short)
✗ abc-123 (contains hyphen)
✗ abc@123 (contains special character)
✗ toolongshortcode (too long)
```

### Testing

-   Test with valid codes → Redirect works
-   Test with invalid codes → 400 before 404
-   Test with mixed case → Works (converted to lowercase)

---

## Exercise 7: Global Exception Filter

### Goal

Create a unified error response format for all exceptions.

### Requirements

-   [ ] Generate filter: `nest g filter common/filters/http-exception`
-   [ ] Catch all `HttpException` instances
-   [ ] Return standardized error response
-   [ ] Include error details, timestamp, and path
-   [ ] Apply globally in `main.ts`

### Error Response Format

```typescript
{
  "success": false,
  "statusCode": 404,
  "timestamp": "2024-01-15T10:30:45.123Z",
  "path": "/xyz999",
  "error": "Not Found",
  "message": "Short code not found"
}
```

### Testing

-   Trigger 404 (non-existent short code) → Formatted error
-   Trigger 400 (invalid URL) → Formatted error
-   Trigger 401 (missing API key) → Formatted error
-   Trigger 429 (rate limit) → Formatted error

---

## Bonus Challenge: Analytics Interceptor (Optional Challenge)

### Goal

Track URL usage statistics without modifying service logic.

### Requirements

-   [ ] Generate interceptor: `nest g interceptor common/interceptors/analytics`
-   [ ] Count successful redirects per short code
-   [ ] Track last accessed timestamp
-   [ ] Store analytics in-memory (Map or separate service)
-   [ ] Apply only to `GET /:shortCode` endpoint
-   [ ] Add `GET /analytics/:shortCode` endpoint to view stats

### Analytics Data Structure

```typescript
{
  "shortCode": "abc123",
  "clickCount": 42,
  "lastAccessed": "2024-01-15T10:30:45.123Z",
  "createdAt": "2024-01-10T08:20:00.000Z"
}
```

### Testing

-   Redirect to short URL multiple times
-   Check analytics endpoint shows correct count
-   Verify timestamp updates

---

## Integration Testing Checklist

Test the complete request lifecycle:

### Happy Path

-   [ ] Valid request → Logger logs → Rate limit passes → API key valid → URL validated → Response transformed → Success

### Error Paths

-   [ ] Invalid API key → Guard blocks → Exception filter formats error
-   [ ] Invalid URL → Pipe rejects → Exception filter formats error
-   [ ] Rate limit exceeded → Middleware blocks → Exception filter formats error
-   [ ] Short code not found → Service throws → Exception filter formats error

### Edge Cases

-   [ ] Verify all responses follow transformed format
-   [ ] Verify all errors follow exception filter format
-   [ ] Verify logs appear for all requests
-   [ ] Verify rate limit resets correctly

---

## Expected Project Structure After Completion

```
src/
├── common/
│   ├── middleware/
│   │   ├── logger.middleware.ts
│   │   └── rate-limit.middleware.ts
│   ├── guards/
│   │   └── api-key.guard.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts
│   │   └── analytics.interceptor.ts (Bonus Challenge)
│   ├── pipes/
│   │   ├── url-validation.pipe.ts
│   │   └── short-code-validation.pipe.ts
│   └── filters/
│       └── http-exception.filter.ts
├── url-shortener/
│   └── ...
├── app.module.ts
└── main.ts
```

---

## Extra Bonus Challenges

### 1. Custom Decorator for API Key

Create a custom decorator `@Public()` to bypass API key guard on specific routes.

### 2. Request Timeout Interceptor

Implement an interceptor that cancels requests taking longer than 5 seconds.

### 3. Caching Interceptor

Cache redirect lookups for frequently accessed short codes.

### 4. Advanced Rate Limiting

Implement sliding window rate limiting instead of fixed window.

### 5. Request ID Middleware

Add unique request ID to each request and include in logs and responses.

---

## Submission Checklist

-   [ ] All 7 main exercises completed
-   [ ] Code follows NestJS best practices
-   [ ] All endpoints tested manually with Postman/Thunder Client
-   [ ] Logs show request lifecycle clearly
-   [ ] Error responses are consistent and helpful
-   [ ] README updated with new features and testing instructions
-   [ ] (Bonus Challenge) Analytics interceptor implemented
-   [ ] (Extra Bonus Challenges) Extra bonus challenges attempted

---

## Key Takeaways

After completing this task, you should understand:

1. **Middleware** runs first and handles cross-cutting concerns (logging, rate limiting)
2. **Guards** control access based on authentication/authorization
3. **Pipes** validate and transform input data before reaching handlers
4. **Interceptors** transform responses and add behavior around handlers
5. **Exception Filters** provide consistent error handling across the application
6. How these components work together to create a robust, production-ready API

---

## Resources

-   [NestJS Request Lifecycle](https://docs.nestjs.com/faq/request-lifecycle)
-   [NestJS Middleware Documentation](https://docs.nestjs.com/middleware)
-   [NestJS Guards Documentation](https://docs.nestjs.com/guards)
-   [NestJS Interceptors Documentation](https://docs.nestjs.com/interceptors)
-   [NestJS Pipes Documentation](https://docs.nestjs.com/pipes)
-   [NestJS Exception Filters Documentation](https://docs.nestjs.com/exception-filters)

## Good luck! 🙃
