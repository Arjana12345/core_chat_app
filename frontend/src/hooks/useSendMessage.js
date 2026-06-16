import { sendMessageApi } from "../features/chat/messageApi";
import { scrollToBottom } from "../utils/scroll";

const useSendMessage = ({
  user,
  selectedUser,
  setMessages,
  newMessage,
  setNewMessage,
  chatRef,
}) => {
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const data = await sendMessageApi(
        user.token,
        selectedUser.id,
        newMessage,
      );

      if (data.message_status === 201) {
        const message = {
          id: data.messageId,

          sender_id: user.id,

          receiver_id: selectedUser.id,

          message: newMessage,
        };

        setMessages((prev) => [...prev, message]);

        scrollToBottom(chatRef, "smooth");

        setNewMessage("");
      }
    } catch (error) {
      console.log("Send message error", error);
    }
  };

  return {
    handleSendMessage,
  };
};

export default useSendMessage;
