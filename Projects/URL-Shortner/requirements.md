# URL Shortener Project requirements

## Overview

A simple URL shortening service built with NestJS that generates short codes for long URLs and redirects users to the original URLs.

---
## Expected time to finish is 2 weeks

---

## Core Features

### 1. URL Shortening

-   Accept a long URL from the user
-   Generate a unique short code (hash) for the URL **(hint: you can use MD5 hashing)**
-   Store the mapping between short code and original URL
-   Return the shortened URL to the user

### 2. URL Redirection

-   Accept requests with a short code
-   Look up the original URL from storage
-   Redirect the user to the original URL with a 301 or 302 HTTP status
-   Handle cases where the short code doesn't exist (404 error)

### 3. Data Storage

-   Store URL mappings in either:
    -   JSON file (simple file-based storage), or
    -   MongoDB (database storage)
-   Each record should contain:
    -   Short code (unique identifier)
    -   Original URL
    -   Time Created

## Technical Requirements

### Technology Stack

-   **Framework**: NestJS
-   **Storage**: JSON file OR MongoDB (choose one)
-   **Language**: TypeScript

### API Endpoints

-   `POST /shorten` - Create a shortened URL
    -   Request body: `{ "url": "https://example.com/long-url" }`
    -   Response: `{ "shortCode": "abc123", "shortUrl": "http://localhost:3000/abc123" }`
-   `GET /:shortCode` - Redirect to original URL
    -   Redirects to the original URL
    -   Returns 404 if short code not found

### Validation

-   Validate that the input URL is properly formatted
-   Ensure short codes are unique
-   Handle duplicate URLs (optional: return existing short code)