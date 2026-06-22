import { getSocket } from "../services/socket";
import { useCallback } from "react";

const useSendMessage = ({
  user,
  selectedUser,
  setMessages,
  newMessage,
  setNewMessage,
  chatRef,
}) => {
  const handleSendMessage = useCallback(async () => {
    console.log("handleSendMessage called with newMessage:", newMessage);
    console.log();
    if (!newMessage.trim()) return;

    try {
      const message = {
        receiver_id: selectedUser.id,
        message: newMessage,
      };

      // send real-time message
      console.log("Sending message via socket:", message);
      const socket = getSocket();
      socket.emit("sendMessage", message);

      setNewMessage("");
    } catch (error) {
      console.log("Send message error", error);
    }
  }, [user, selectedUser, setMessages, newMessage, setNewMessage, chatRef]);

  return {
    handleSendMessage,
  };
};

export default useSendMessage;
