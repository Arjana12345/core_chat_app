import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, user, chatRef, handleScroll }) => {
  return (
    <div
      ref={chatRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4"
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          msg={msg}
          isSender={msg.sender_id === user.id}
        />
      ))}
    </div>
  );
};

export default React.memo(MessageList);
