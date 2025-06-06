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
```
##🐍 Install Dependencies
```bash
npm install
```
⚙️ Setup Environment Variables
Create a .env file in the root directory with the following variables:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=books_db
JWT_SECRET=your_jwt_secret
PORT=3000

```

🛢️ Initialize Database
Create the MySQL database books_db (or your chosen name) manually or via a script.
Run migration or seed scripts if provided.

🚀 Run the Server
```bash
npm start
```
The API server will be running at:
```bash
http://localhost:3000
```
📄 API Endpoints
Authentication
POST /api/register – Register new user
POST /api/login – User login and receive JWT

Books
GET /api/books – List all books
GET /api/books/:id – Get book details
POST /api/books – Add a new book (auth required)
PUT /api/books/:id – Update a book (auth required)
DELETE /api/books/:id – Delete a book (auth required)

Reviews
GET /api/books/:id/reviews – Get reviews for a book
POST /api/books/:id/reviews – Add review to a book (auth required)
PUT /api/reviews/:reviewId – Update a review (auth required)
DELETE /api/reviews/:reviewId – Delete a review (auth required)

🔧 Testing
Use Postman or any API testing tool to interact with the endpoints.

##📁 Folder Structure
