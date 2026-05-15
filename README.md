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


