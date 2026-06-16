import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";

const useChatSocket = ({ user, setMessages, chatRef }) => {
  useEffect(() => {
    if (!user?.token) return;

    console.log("Running socket connection");

    const socket = connectSocket(user.token);

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("receiveMessage", (messageData) => {
      console.log("Received Message:", messageData);

      if (messageData.sender_id === user.id) {
        return;
      }

      setMessages((prev) => [...prev, messageData]);

      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    return () => {
      disconnectSocket();
    };
  }, [user, setMessages, chatRef]);
};

export default useChatSocket;
