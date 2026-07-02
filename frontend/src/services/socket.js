import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  socket = io(import.meta.env.VITE_API_URL.replace("/api", ""), {
    auth: {
      token,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    console.log("Socket disconnected");
    socket.disconnect();
  }
};
