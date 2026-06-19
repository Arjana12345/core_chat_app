import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";
import { scrollToBottom } from "../utils/scroll";

const useChatSocket = ({ user, setMessages, chatRef }) => {
  useEffect(() => {
    if (!user?.token) return;

    console.log("Running socket connection");

    const socket = connectSocket(user.token);

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    // Receive message listener
    const handleReceiveMessage = (messageData) => {
      console.log("Received Message:", messageData);

      if (messageData.sender_id === user.id) {
        return;
      }

      setMessages((prev) => [...prev, messageData]);

      scrollToBottom(chatRef, "smooth");
    };

    // calling to receive message event
    socket.on("receiveMessage", handleReceiveMessage);

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    return () => {
      console.log("Cleaning up socket connection");
      socket.off("receiveMessage", handleReceiveMessage);
      console.log("Socket listeners removed");
      disconnectSocket();
      console.log("Socket disconnected on cleanup");
    };
  }, [user, setMessages, chatRef]);
};

export default useChatSocket;
