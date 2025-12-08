## 📝 Practice Tasks

### Task 1: Basic Server

Build a server that:

- Responds "Hello World" at `/`
- Responds with current time at `/time`
- Returns 404 for other routes

---

### Task 2: Calculator API

Build an API with:

- `GET /add?a=5&b=3` → Returns sum
- `GET /subtract?a=10&b=4` → Returns difference
- `GET /multiply?a=6&b=7` → Returns product
- `GET /divide?a=20&b=4` → Returns quotient

---

### Task 3: User Management API

Build a complete CRUD API for users:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

Endpoints:

- `GET /users` - List all users
- `GET /users/:id` - Get single user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Include validation:

- Name: required, 2-50 characters
- Email: required, valid format
- Age: required, 13-120

---
