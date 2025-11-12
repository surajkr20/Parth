
## 🧠 **Virtual Assistant (Parth)**

A **smart multi-user AI assistant platform** where anyone can **create, customize, and interact with their own virtual assistant** — complete with a **personal name, avatar, and voice**.

This platform brings together **speech recognition, real-time AI responses, and natural conversation** through Gemini AI. Each assistant can **listen, speak, and respond to user commands**, blending automation with personality.

Built using the **MERN Stack**, it demonstrates seamless integration between **frontend voice interactivity** and **backend AI orchestration**, wrapped in a clean and responsive UI.

---

### ⚙️ **Tech Stack**

**Frontend**

* React (Vite)
* React Router DOM
* Context API (Global Auth State)
* TailwindCSS
* Web Speech API *(Speech recognition + text-to-speech)*
* Gemini API *(AI responses and voice prompt processing)*

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT (Authentication)
* bcrypt.js (Password Hashing)
* Multer (File Upload)
* Cloudinary (Image Storage)

---

### 🏗️ **Architecture Overview**

**Frontend**

```
Frontend/
├── public/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx        # Global authentication and user state
│   ├── pages/
│   │   ├── Home.jsx               # Interactive assistant interface
│   │   ├── Customized.jsx         # Set assistant image and name
│   │   ├── AssistantName.jsx      # Handles assistant creation flow
│   │   ├── SignIn.jsx / SignUp.jsx
│   ├── components/
│   │   └── Card.jsx               # Reusable visual components
│   ├── App.jsx                    # Routing setup
│   ├── main.jsx                   # Entry point
│   └── index.css
└── vite.config.js
```

**Backend**

```
Backend/
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── token.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js         # Handles name/image updates & Gemini AI + voice command handling
├── middlewares/
│   ├── isAuth.js
│   └── multer.js
├── models/
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
└── index.js
```

---

### 🔐 **API Endpoints**

| Method | Endpoint             | Description                     | Access  |
| ------ | -------------------- | ------------------------------- | ------- |
| POST   | `/api/auth/signup`   | Register a new user             | Public  |
| POST   | `/api/auth/login`    | Login user                      | Public  |
| POST   | `/api/auth/logout`   | Logout user                     | Private |
| GET    | `/api/user/me`       | Get authenticated user info     | Private |
| PUT    | `/api/user/update`   | Update user name / avatar       | Private |
| POST   | `/api/assistant/ask` | Send voice or text to Gemini AI | Private |

---

### 🧩 **Key Features**

✅ **Voice Recognition & Speech Output** — Your assistant listens and speaks back naturally using the Web Speech API.
✅ **Gemini AI Integration** — Smart and contextual AI responses powered by Gemini.
✅ **Custom Assistant Profiles** — Each user can upload an avatar and set their own assistant name.
✅ **JWT Authentication** — Secure login and session handling.
✅ **Responsive UI** — Fully optimized layout for desktop and mobile.
✅ **Cloudinary Integration** — Fast and reliable image hosting for assistant avatars.

---

### 🚀 **How to Run Locally**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/<your-username>/VirtualAssistant.git
```

2️⃣ **Setup Backend**

```bash
cd VirtualAssistant/Backend
npm install
```

Create a `.env` file:

```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
CLOUDINARY_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
PORT=5000
```

Run:

```bash
npm run dev
```

3️⃣ **Setup Frontend**

```bash
cd ../Frontend
npm install
npm run dev
```

---

### 🌐 **Demo**

[Live Demo](https://parth-virtualassistant.onrender.com/signup)

Connect with me on
🔗 [LinkedIn](https://www.linkedin.com/in/suraj-kumar-5b48b9254/) | 🐦 [Twitter](https://x.com/Abhinav_Suraj02)

---

### 🧱 **Future Enhancements**

* AI memory for personalized conversations
* Integration with third-party APIs (calendar, mail, etc.)
* Multi-language voice interaction
* Cross-platform desktop/mobile deployment.
