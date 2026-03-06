# NestJS File Upload — Session Tasks

---

## Task 1 — `PATCH /users`

Create an endpoint that allows the **logged-in user** to update their profile.

**Updatable fields:** `age`, `username`, `avatar`

**Requirements:**

- The user can update **all fields or any combination** of them in a single request
- **At least one field** must be provided — reject the request if nothing is sent
- helper function: `cloudinaryService.deleteImage`

---

## Task 2 — `POST /products`

Create a new resource called **products** and implement an endpoint to create a new product.

**Product attributes:** `name`, `admin_id`, `price`, `images`, `quantity`

**Requirements:**

- Only **admins** can access this endpoint
- `images` is an **array of images** — in the session we took how to upload one file per request, now figure out how to **upload multiple files** and implement it

> 💡 Good luck!
