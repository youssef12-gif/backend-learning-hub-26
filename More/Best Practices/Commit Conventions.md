# Commit Message Convention Guide

## Why Good Commit Messages Matter

Clear commit messages help your team understand:
- **What** changed in the codebase
- **Why** the change was necessary
- **How** it impacts the project

A well-written commit history is like a story of your project's evolution.

---

## Commit Message Structure

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: Category of change (required)
- **scope**: Area of codebase affected (optional)
- **subject**: Brief description, imperative mood, lowercase, no period, max 50 chars
- **body**: Detailed explanation of WHAT and WHY (optional)
- **footer**: Breaking changes, issue references (optional)

---

## Commit Types with Examples

### 1. `feat` - New Feature

**When to use**: Adding new functionality to the application

```
feat(auth): add two-factor authentication support

Implements 2FA using TOTP (Time-based One-Time Password).
Users can enable 2FA in their security settings and scan
a QR code with their authenticator app.

Closes #456
```

**Simple example**:
```
feat(dashboard): add export to CSV button
```

---

### 2. `fix` - Bug Fix

**When to use**: Fixing a bug or error in existing functionality

```
fix(cart): prevent duplicate items when clicking add rapidly

Fixed race condition where rapid clicks on "Add to Cart"
would create multiple entries of the same item. Now using
debouncing with 300ms delay to prevent duplicate requests.

Fixes #789
```

**Simple example**:
```
fix(login): validate email format before submission
```

---

### 3. `docs` - Documentation

**When to use**: Adding or updating documentation (README, comments, API docs)

```
docs(api): update authentication endpoint examples

Added examples for OAuth2 flow and updated deprecated
endpoint references. Included error response codes and
their meanings for better developer experience.
```

**Simple example**:
```
docs: add installation instructions to README
```

---

### 4. `style` - Code Style/Formatting

**When to use**: Changes that don't affect code behavior (whitespace, formatting, semicolons)

```
style(components): format code with prettier

Applied prettier formatting across all React components.
No functional changes, only code style improvements for
consistency across the codebase.
```

**Simple example**:
```
style: fix indentation in user service
```

---

### 5. `refactor` - Code Refactoring

**When to use**: Restructuring code without changing its external behavior

```
refactor(user-service): extract validation logic to separate module

Moved all user validation functions from user-service.js
to validators/user-validator.js. This improves code
organization and makes validators reusable across
different services.
```

**Simple example**:
```
refactor(auth): simplify password hashing logic
```

---

### 6. `perf` - Performance Improvement

**When to use**: Changes that improve performance

```
perf(search): implement debouncing for search input

Added 300ms debounce to search input field to reduce
unnecessary API calls. This reduces server load by ~70%
during typical user search behavior.
```

**Simple example**:
```
perf(images): lazy load product thumbnails
```

---

### 7. `test` - Adding or Updating Tests

**When to use**: Adding missing tests or correcting existing tests

```
test(checkout): add integration tests for payment flow

Added comprehensive tests covering successful payment,
declined card scenarios, and network timeout handling.
Test coverage for checkout module increased from 45% to 89%.
```

**Simple example**:
```
test(utils): add unit tests for date formatter
```

---

### 8. `build` - Build System Changes

**When to use**: Changes to build process, dependencies, or build tools

```
build: upgrade webpack to v5.75.0

Updated webpack and related loaders to latest versions.
Adjusted configuration for compatibility with webpack 5.
Build time reduced by approximately 25%.
```

**Simple example**:
```
build: add production environment variables
```

---

### 9. `chore` - Maintenance Tasks

**When to use**: Routine tasks, dependency updates, configuration changes

```
chore: update dependencies to latest stable versions

Updated all non-breaking dependencies. Notable updates:
- axios: 0.27.2 → 1.6.0
- lodash: 4.17.19 → 4.17.21
- moment: 2.29.1 → 2.29.4

No breaking changes expected.
```

**Simple example**:
```
chore: remove unused npm packages
```

---

### 10. `revert` - Reverting a Previous Commit

**When to use**: Undoing a previous commit

```
revert: feat(payment): add cryptocurrency payment option

This reverts commit 8f7d6e9a. The crypto payment gateway
integration is causing transaction failures in production.
Will re-implement after thorough testing in staging.

Refs #1024
```

**Simple example**:
```
revert: "fix(auth): update session timeout logic"
```

---

## Special Cases

### Breaking Changes

When your commit introduces breaking changes, add `BREAKING CHANGE:` in the footer:

```
feat(api): change user endpoint response structure

BREAKING CHANGE: The /api/users endpoint now returns
user data in a nested 'data' object instead of root level.
Clients will need to update their response parsing logic.

Before: { "id": 1, "name": "John" }
After: { "data": { "id": 1, "name": "John" } }
```

### Multiple Issues

```
fix(auth): resolve session persistence issues

Fixed multiple authentication-related bugs:
- Session expires prematurely on mobile devices
- Remember me checkbox not persisting preference
- Logout not clearing all session data

Fixes #234, #235, #236
```

---

## Quick Reference: Common Scenarios

| Scenario | Type | Example |
|----------|------|---------|
| Added a new page | `feat` | `feat(pages): add contact us page` |
| Fixed a typo | `fix` | `fix(homepage): correct spelling in hero section` |
| Updated README | `docs` | `docs: add contributing guidelines` |
| Removed unused code | `refactor` | `refactor: remove deprecated helper functions` |
| Optimized database query | `perf` | `perf(db): add index to user email column` |
| Updated npm package | `chore` | `chore(deps): update react to v18.2.0` |
| Added unit tests | `test` | `test(calculator): add tests for division by zero` |
| Fixed linting errors | `style` | `style: resolve eslint warnings` |

---

## Best Practices

### ✅ DO:
- Use imperative mood ("add feature" not "added feature")
- Keep subject line under 50 characters
- Capitalize the subject line
- Separate subject from body with blank line
- Use body to explain *what* and *why*, not *how*
- Reference issues and pull requests when relevant

### ❌ DON'T:
- Write vague messages like "fix stuff" or "update code"
- Use generic messages like "bug fix" without context
- Write essays in the subject line
- Include code changes in the message (Git tracks that)
- End subject line with a period

---

## Examples: Bad vs Good

### ❌ Bad
```
Update
```

### ✅ Good
```
fix(user-profile): prevent null reference error on avatar update
```

---

### ❌ Bad
```
Fixed the bug that was causing issues in production
```

### ✅ Good
```
fix(payment): handle timeout errors in stripe integration

Added proper error handling and user feedback when Stripe
API calls timeout. Users now see a clear error message instead
of a blank screen, and failed transactions are properly logged.

Fixes #892
```

---

### ❌ Bad
```
final final version lol
```

### ✅ Good
```
feat(v2.0): release major update with redesigned UI

Complete UI overhaul with improved accessibility and mobile
responsiveness. Includes new component library and updated
design system documentation.
```

---

## Tools to Help

- **Commitizen**: Interactive CLI tool for formatted commits


---

## Remember

A good commit message should answer these questions:
1. **What** did you change?
2. **Why** did you change it?
3. **What impact** does it have?

Your your teammates will thank you for such beautiful commits! 🎉