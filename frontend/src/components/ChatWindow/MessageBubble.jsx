import React from "react";

const MessageBubble = ({ msg, isSender }) => {
  return (
    <div
      key={msg.id}
      className={isSender ? "mb-3 flex justify-end" : "mb-3 flex justify-start"}
    >
      <div
        className={
          isSender
            ? "bg-black text-white px-4 py-2 rounded-lg"
            : "bg-white border px-4 py-2 rounded-lg"
        }
      >
        {msg.message}
      </div>
    </div>
  );
};

export default MessageBubble;
