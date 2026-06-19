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

├── config/
│ ├── db.js
│
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ └── messageController.js
│
├── services/
│ ├── authService.js
│ ├── userService.js
│ └── messageService.js
│
├── repositories/
│ ├── userRepository.js
│ └── messageRepository.js
│
├── models/
│ ├── userModel.js
│ └── messageModel.js
│
├── middleware/
│ ├── authMiddleware.js
| |── adminMiddleware.js
│ └── errorMiddleware.js
│
├── socket/
│ └── socket.js
│
├── utils/
│ ├── generateToken.js
│ ├── ApiError.js
│ └── asyncHandler.js
│
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── messageRoutes.js
│
└── server.js
├── .env
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

# Folder structure

src/
│
├── app/
│ └── store.js
│
├── features/
│ └── auth/
│ ├── authApi.js
│ └── authSlice.js
│
├── hooks/
│ ├── useChatSocket.js
│ ├── useMessages.js
│ ├── useUsers.js
│ └── useSendMessage.js
│
├── components/
│ ├── Sidebar/
│ │ └── Sidebar.jsx
│ │
│ ├── LogoutButton/
│ │ └── LogoutButton.jsx
│ │
│ └── ChatWindow/
│ ├── ChatWindow.jsx
│ ├── MessageList.jsx
│ ├── MessageBubble.jsx
│ └── MessageInput.jsx
│
├── utils/
│ └── scroll.js
│
└── pages/
| └── Chat.jsx
| └── Login.jsx
| └── Register.jsx
|
|└── Routes
| └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx

# New sturcture for application

# Setup

npm create vite@latest frontend
npm install
npm install react-router-dom @reduxjs/toolkit react-redux axios socket.io-client
npm install -D tailwindcss @tailwindcss/vite

# for notification

npm install react-toastify

# Run

both app frontend and backend
npm run dev
