# 📚 Book Review Management System

A modern Full Stack **Book Review Management System** developed using **HTML, CSS, JavaScript, Python Flask, and MySQL**. 
The system allows users to browse books, read and write reviews, search books, filter by category, and provides an admin panel 
for managing books.

---

## 📖 Project Overview

This project was developed as a university Software Engineering project.

The application provides a simple and user-friendly platform where readers can:

- Browse books
- Search books
- Filter books by category
- View detailed book information
- Read reviews
- Submit new reviews
- Register and Login
- Manage books through an Admin Dashboard

---

# ✨ Features

### 👤 User Features

- User Registration
- User Login & Logout
- User Profile
- View All Books
- Search Books
- Filter Books by Category
- View Book Details
- Read Reviews
- Submit Reviews

### 👨‍💼 Admin Features

- Admin Login
- Add New Books
- Edit Existing Books
- Delete Books
- Manage Book Collection

---

# 🛠 Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Font Awesome
- Google Fonts

## Backend

- Python
- Flask
- Flask-CORS

## Database

- MySQL
- phpMyAdmin (XAMPP)

---

# 🏗 Project Architecture

```
Frontend (HTML, CSS, JS)
            │
            │ HTTP Fetch API
            ▼
Backend (Python Flask API)
            │
            │ SQL Queries
            ▼
MySQL Database
```

---

# 📂 Project Structure

```
Book-Review-System/
│
├── Backend-py/
│   ├── models/
│   │     └── database.py
│   │
│   ├── routes/
│   │     ├── auth.py
│   │     ├── books.py
│   │     ├── reviews.py
│   │     ├── users.py
│   │     └── admin.py
│   │
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── frontend/
│   ├── assets/
│   │     ├── css/
│   │     └── js/
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── books.html
│   ├── book-details.html
│   ├── profile.html
│   └── admin.html
│
├── book_review_db.sql
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/book-review-system.git
```

Move into the project directory:

```bash
cd book-review-system
```

---

## 2️⃣ Install Required Packages

```bash
pip install -r Backend-py/requirements.txt
```

---

## 3️⃣ Import Database

1. Open **XAMPP**
2. Start **Apache** and **MySQL**
3. Open **phpMyAdmin**
4. Create a database named:

```
book_review_db
```

5. Import:

```
book_review_db.sql
```

---

## 4️⃣ Configure Database

Open:

```
Backend-py/config.py
```

Update your database credentials:

```python
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "book_review_db"
```

---

## 5️⃣ Run Backend Server

```bash
cd Backend-py

python app.py
```

The Flask server will start at:

```
http://127.0.0.1:5000
```

---

## 6️⃣ Run Frontend

Open the **frontend** folder using **VS Code Live Server**

or simply open:

```
frontend/index.html
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /books | Get all books |
| GET | /book/<id> | Get single book |
| GET | /reviews/<book_id> | Get reviews for a book |
| POST | /reviews | Add a review |
| POST | /login | User login |
| POST | /register | User registration |
| POST | /admin/books | Add new book |
| PUT | /admin/books/<id> | Update book |
| DELETE | /admin/books/<id> | Delete book |

---

# 💾 Database

The project uses **MySQL** with the following main tables:

- users
- books
- reviews

Relationships:

- One User → Multiple Reviews
- One Book → Multiple Reviews


---

# 🚀 Future Improvements

- Password Encryption
- JWT Authentication
- Book Images Upload
- User Profile Editing
- Review Editing
- Pagination
- Responsive Mobile Optimization
- Dark Mode


---

# 📄 License

This project was developed for **educational purposes** as a university software engineering project.
