## 🧠 **Virtual Assistant (Parth) – Backend**

### 📌 **Project Overview**

**Parth** is an intelligent virtual assistant built using the **MERN Stack**, designed to handle user chat commands, voice instructions, and personalized AI interactions.
This stage of the project focuses on **backend authentication APIs** — implementing secure signup, login, and logout functionality.

---

### ⚙️ **Tech Stack**

- **Node.js** – Backend runtime
- **Express.js** – Server framework
- **MongoDB** – Database for storing user data
- **JWT (JSON Web Tokens)** – Authentication and session management
- **bcrypt.js** – Password hashing

---

### 📁 **Project Structure**

```
Backend/
├── config/
│   ├── db.js             # MongoDB connection setup
│   └── token.js          # JWT token utilities
│
├── controllers/
│   └── auth.controller.js # Signup, login, logout controllers
│
├── middlewares/          # (for future use – auth, validation)
│
├── models/
│   └── user.model.js      # Mongoose user schema
│
├── routes/
│   └── auth.routes.js     # Authentication routes
│
├── index.js               # Entry point – server & route setup
│
├── .env                   # Environment variables
├── package.json
└── Readme.md
```

---


### 🧩 **How to Run Locally**

```bash
# 1️⃣ Clone this repository
git clone https://github.com/<your-username>/VirtualAssistant.git

# 2️⃣ Navigate to the backend folder
cd VirtualAssistant/Backend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Add your environment variables in .env file
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=5000

# 5️⃣ Start the development server
npm run dev

---

### 🔐 **Authentication API Endpoints**

| Method   | Endpoint           | Description          |
| -------- | ------------------ | -------------------- |
| **POST** | `/api/auth/signup` | Register a new user  |
| **POST** | `/api/auth/login`  | Log in existing user |
| **POST** | `/api/auth/logout` | Log out current user |

---

### ✅ **Current Progress**

- [x] Project structure setup
- [x] MongoDB connection established
- [x] User model created
- [x] Signup, login, and logout controllers implemented
- [x] Routes integrated in `index.js`
- [x] Basic debugging completed
