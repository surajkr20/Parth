
## 🧠 **Virtual Assistant (Parth)**

A **multi-user AI assistant platform** where anyone can **create and personalize their own virtual assistant** — complete with a custom name, avatar, and personality.

Each assistant can **understand voice and text commands**, chat naturally, and **automate daily tasks** using integrated AI tools.

Built with the **MERN Stack** and powered by **speech recognition** and **Gemini AI**, it blends **smart automation** with a personal touch — giving every user their own interactive digital companion.

---

### ⚙️ **Tech Stack**

**Frontend**

* React (Vite)
* React Router DOM
* Context API (Global Auth State)
* TailwindCSS
* Web Speech API *(Voice Recognition – ongoing)*
* Gemini API *(AI Response Integration – planned)*

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Token)
* bcrypt.js
* Multer (File Uploads)
* Cloudinary (Image Storage)

---

### 📁 **Project Structure**

#### 🖥️ **Frontend**

```
Frontend/
├── public/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx        # Global auth and user context
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Displays personalized assistant
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Customized.jsx         # Select image + set assistant name
│   │   └── AssistantName.jsx      # Handles assistant name creation
│   │
│   ├── components/
│   │   └── Card.jsx               # Reusable UI component
│   │
│   ├── App.jsx                    # App routes and protected routes
│   ├── main.jsx                   # Entry point
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
│   ├── cloudinary.js
│   ├── db.js
│   └── token.js
│
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js         # Handles profile updates (image + name)
│
├── middlewares/
│   ├── isAuth.js
│   └── multer.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
│
├── public/
├── index.js
└── .env
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

### 🚀 **How to Run Locally**

#### 1️⃣ Clone the Repository

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

#### 3️⃣ Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

### 🧩 **Current Features**

* User registration, login, and authentication (JWT-based)
* Personalized assistant creation (custom name + avatar)
* Profile updates with Cloudinary image storage
* Protected routes with Context API
* Logout and update profile options
* Basic responsive UI with TailwindCSS

---

### 🔮 **Upcoming Enhancements**

* Voice command and speech recognition integration
* Gemini API for intelligent AI conversations

