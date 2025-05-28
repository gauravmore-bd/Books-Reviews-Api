# 📚 Book Review API

A RESTful API for managing books, user reviews, and user authentication. Built with Node.js, Express, MySQL, and JWT

---

## 🚀 Features

- User Registration & Login (JWT authentication)
- Add/View/Search Books with pagination & filters
- Submit/Update/Delete Reviews (1 review per user per book)
- Get Book Details with Average Rating and Paginated Reviews
- Search Books by Title or Author (case-insensitive)

---

## 🛠️ Tech Stack

- Node.js with Express.js
- MySQL
- JWT for authentication
- dotenv for environment variables

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd book-review-api


Database setup 
CREATE DATABASE book_review;

USE book_review;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    genre VARCHAR(100)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    rating INT,
    comment TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_review (book_id, user_id)
);

📌 Design Decisions & Assumptions
Each user can review a book only once.
Passwords are securely hashed using bcrypt.
Users must be logged in via JWT to create/update/delete reviews.
Book data is manually entered, not pulled from external APIs.
Reviews include a rating (1–5) and a comment.

🗃️ Database Schema
users
Column	    Type	        Description
id	        INT     (PK)	Unique user ID
name	    VARCHAR(100)	User’s name
email	    VARCHAR(255)	Unique user email
password	VARCHAR(255)	Hashed password

books
Column	Type	        Description
id	    INT (PK)	    Book ID
title	VARCHAR(255)	Book title
author	VARCHAR(255)	Author’s name
genre	VARCHAR(100)	Genre of the book

reviews
Column	    Type	Description
id	        INT (PK)	Review ID
book_id	    INT (FK)	Book being reviewed
user_id	    INT (FK)	Reviewer (linked to users)
rating	    INT	Rating from 1 to 5
comment	    TEXT	Review comment

🔐 Authentication Endpoints
1.Register

POST /api/auth/register

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}

2.Login
POST /api/auth/login

{
  "email": "alice@example.com",
  "password": "password123"
}

3.Add a Book
POST /api/books

Authorization: Bearer <token>
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}

4.Get All Books
GET /api/books?page=1&limit=10

5.Search Books
GET /api/books/search?query=atomic

6.Get Book with Reviews
GET /api/books/:id

📝 Review Endpoints
7.Add a Review
POST /api/books/:id/reviews
Headers:
Authorization: Bearer <token>
Body:
{
  "rating": 5,
  "comment": "Amazing book!"
}

8.Update a Review

PUT /api/reviews/:id
Headers:
Authorization: Bearer <token>
Body:
{
  "rating": 4,
  "comment": "Still good after second read"
}
9.Delete a Review

DELETE /api/reviews/:id
Headers:
Authorization: Bearer <token>