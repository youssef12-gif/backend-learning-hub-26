# Product API – Required Tasks

## You are required to implement the following endpoints .


## 1️⃣ Update Product  
### PUT `/products/:id`

### Description
Update an existing product by its ID.  
Only the provided fields in the request body should be updated.  
Other fields must remain unchanged.

### Requirements
- Read `id` from `req.params`
- Find the product by ID
- If product does not exist → return `404`
- Return the updated product

---

## 2️⃣ Filter Products by Minimum Price  
### GET `/products/filter/?minPrice=number`

### Description
Return all products that have a price **greater than or equal** to `minPrice`.

### Requirements
- Read `minPrice` from `req.query`
- If `minPrice` is missing → return `400`
- Filter products based on price
- Return the filtered list

---

## 3️⃣ Get Product Rate by Rater  
### GET `/products/rate/:id/?rater=name`

### Description
Get the rating value given by a specific rater for a product.

### Requirements
- Read product `id` from `req.params`
- Read `rater` name from `req.query`
- If product ID or rater is missing → return `400`
- If product does not exist → return `404`
- Return product ID, rater name, and rate value

---

## 4️⃣ Delete Product  
### DELETE `/products/:id`

### Description
Delete a product by its ID.

### Requirements
- Read `id` from `req.params`
- If product does not exist → return `404`
- Remove the product from the array
- Return success message after deletion

---


