# 💬 Core Chat Application

A full-stack real-time chat application built with **React, Node.js, Express, MySQL, JWT Authentication, and Socket.IO**, deployed on **Microsoft Azure** with automated **GitHub Actions CI/CD**.

---

## 🚀 Live Demo

**Frontend**

https://thankful-forest-06d0be200.7.azurestaticapps.net

**Backend API**

https://core-chat-backend-gkh4cxb6c6btbagd.centralindia-01.azurewebsites.net

---

# ✨ Features

- User Registration & Login
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Real-time Messaging using Socket.IO
- Online User Tracking
- Private Chat Support
- Responsive UI with Tailwind CSS
- RESTful API Architecture
- Centralized Error Handling
- Production Deployment on Microsoft Azure

---

# 🛠️ Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- React Hot Toast
- Socket.IO Client

### Backend

- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcrypt
- MySQL2
- dotenv
- CORS

### Database

- Azure Database for MySQL Flexible Server

### Cloud & DevOps

- Azure App Service
- Azure Static Web Apps
- GitHub Actions
- GitHub

---

# 📁 Project Structure

core_chat_app

# Main Dependencies

npm install express mysql2 dotenv cors bcryptjs jsonwebtoken socket.io

# Development dependencies

npm install -D nodemon

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

core_chat_app/frontend
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
│ ├── ChatWindow/
│ | ├── ChatWindow.jsx
│ | ├── MessageList.jsx
│ | ├── MessageBubble.jsx
│ | └── MessageInput.jsx
│ |
├─ utils/
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

```

---

# ⚙️ Environment Variables

### Backend

```

PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
CLIENT_URL=

```

### Frontend

```

VITE_API_URL=

````

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone git@github.com:Arjana12345/core_chat_app.git
cd core_chat_app
````

## Backend

```bash
cd backend

npm install

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# ☁️ Azure Deployment

This application is deployed using:

- Azure Static Web Apps (Frontend)
- Azure App Service (Backend)
- Azure Database for MySQL Flexible Server
- GitHub Actions CI/CD

---

# 📌 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Users

```
GET /api/users
GET /api/users/:id
```

## Messages

```
GET /api/messages/:receiverId
POST /api/messages
```

## Screenshot

core_chat_app
|\_docs/
| | login.png
| |\*\*register.png
| |\_\_chat.png

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Environment Variables
- CORS Configuration
- Secure Azure Database Connection (SSL)

---

# 📈 Future Improvements

- Group Chats (with user accessibility, who can only monitor cahts, who can get involve in the chat)
- Message Read Receipts
- Typing Indicator
- Image & File Sharing
- User Profile Management
- Push Notifications
- Dark Mode
- Voice & Video Calling

---

# 👨‍💻 Author

**Arjana Patel**

Full Stack Developer

**Tech Stack:** PHP • Node.js • React • JavaScript • MySQL • Azure • Socket.IO
