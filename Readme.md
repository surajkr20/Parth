
## 🧠 **Virtual Assistant (Parth)**

An AI-powered virtual assistant built using the **MERN Stack**, capable of handling **user authentication, protected routes, and personalized AI interactions**.

---

### ⚙️ **Tech Stack**

**Frontend**

* React (Vite)
* React Router DOM
* Context API (for global auth state)
* TailwindCSS

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Token)
* bcrypt.js
* Multer (file uploads)
* Cloudinary (image storage)

---

### 📁 **Project Structure**

#### 🖥️ **Frontend**

```
Frontend/
├── public/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state and user provider
│   │
│   ├── pages/                    # React page components
│   │   ├── Home.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   └── Customized.jsx
│   │
│   ├── App.jsx                   # App routes and protected routes
│   ├── main.jsx                  # Entry file
│   ├── index.css
│   └── ...
│
├── package.json
├── tailwind.config.js
└── vite.config.js
```

#### ⚙️ **Backend**

```
Backend/
├── config/
│   ├── cloudinary.js      # Cloudinary setup
│   ├── db.js              # MongoDB connection
│   └── token.js           # JWT utilities
│
├── controllers/
│   ├── auth.controller.js # Signup, login, logout
│   └── user.controller.js # Profile, user data handling
│
├── middlewares/
│   ├── isAuth.js          # JWT verification middleware
│   └── multer.js          # File upload handling
│
├── models/
│   └── user.model.js      # Mongoose schema
│
├── routes/
│   ├── auth.routes.js     # Auth-related routes
│   └── user.routes.js     # Protected user routes
│
├── public/                # Static files
├── index.js               # Server entry point
├── .env
└── package.json
```

---

### 🚀 **How to Run Locally**

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/VirtualAssistant.git
```

#### 2️⃣ Setup Backend

```bash
cd VirtualAssistant/Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
CLOUDINARY_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

#### 3️⃣ Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

### 🔐 **Authentication API Endpoints**

| Method | Endpoint           | Description               | Access  |
| ------ | ------------------ | ------------------------- | ------- |
| POST   | `/api/auth/signup` | Register a new user       | Public  |
| POST   | `/api/auth/login`  | Login user                | Public  |
| POST   | `/api/auth/logout` | Logout user               | Private |
| GET    | `/api/user/me`     | Get authenticated user    | Private |
| PUT    | `/api/user/update` | Update user details/image | Private |

---

### 🧩 **Frontend Protected Routes**

* Implemented using React Router DOM’s `<Navigate>` and `useContext` hooks.
* `AuthContext` stores:

  * `user`, `setUser`
  * `loading`, `error`
  * Functions like `login`, `logout`, and `fetchUser`.
* Unauthorized users are automatically redirected to **SignIn** page.

---

### 🛠️ **Middlewares**

| Middleware  | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| `isAuth.js` | Verifies JWT token before accessing protected routes |
| `multer.js` | Handles image upload for user profile                |
| `token.js`  | Generates and verifies JWT tokens                    |


