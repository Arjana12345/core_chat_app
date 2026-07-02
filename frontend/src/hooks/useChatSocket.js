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

    // handle message sent listener
    const handleMessageSent = (message) => {
      // console.log("Message Sent:", message);

      setMessages((prev) => [...prev, message]);

      scrollToBottom(chatRef, "smooth");
    };
    socket.on("messageSent", handleMessageSent);

    // Receive message listener
    const handleReceiveMessage = (messageData) => {
      // console.log("Received Message:", messageData);

      if (messageData.sender_id === user.id) {
        return;
      }

      setMessages((prev) => [...prev, messageData]);

      scrollToBottom(chatRef, "smooth");
    };
    // calling to receive message event
    socket.on("receiveMessage", handleReceiveMessage);

    // handle socket connection error
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);

      socket.off("messageSent", handleMessageSent);

      disconnectSocket();
    };
  }, [user, setMessages, chatRef]);
};

export default useChatSocket;
