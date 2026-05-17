# core_chat_app
A web app for providing secure communication between patient and Dr

#Follow steps:

# Initialize
mkdir backend
npm init -y

# Main Dependencies
npm install express mysql2 dotenv cors bcryptjs jsonwebtoken socket.io

# Development dependencies 
npm install -D nodemon

# Update package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
},

# Create folder structure

core-chat-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── userController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── socket/
│   └── socket.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── server.js
└── package.json

# update .env
PORT=5000

DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=core_chat

JWT_SECRET=yoursecretkey

# DB connection




# Frontend
Process:
1. React Project Setup
2. Tailwind Setup
3. Redux Store
4. Authentication Pages
5. Protected Routes
6. Socket Connection
7. Chat Layout
8. Real-Time Messaging UI
9. Typing Indicator UI
10. Seen/Delivered UI

src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── auth/
│   ├── users/
│   └── chat/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Chat.jsx
│
├── components/
│   ├── Sidebar/
│   ├── ChatWindow/
│   ├── MessageBubble/
│   └── TypingIndicator/
│
├── services/
│   ├── api.js
│   └── socket.js
│
├── routes/
│   └── ProtectedRoute.jsx
│
└── utils/
│
├── App.jsx
└── main.jsx


Setup
========

npm create vite@latest frontend
npm install
npm install react-router-dom @reduxjs/toolkit react-redux axios socket.io-client
npm install -D tailwindcss @tailwindcss/vite


