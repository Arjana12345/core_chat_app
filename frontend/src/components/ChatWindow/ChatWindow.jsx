import React from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatWindow = ({
  selectedUser,
  messages,
  user,

  chatRef,
  handleScroll,

  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* HEADER */}

      <div className="h-16 border-b flex items-center px-4">
        {selectedUser.name ? selectedUser.name : "Select User"}
      </div>

      {/* MESSAGES */}

      <MessageList
        messages={messages}
        user={user}
        chatRef={chatRef}
        handleScroll={handleScroll}
      />

      {/* INPUT */}

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
