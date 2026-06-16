import React from "react";

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleKeyDown,
  handleSendMessage,
}) => {
  return (
    <div className="h-20 border-t bg-white flex items-center gap-2 p-4">
      <input
        type="text"
        placeholder="Type message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border rounded p-3"
      />

      <button
        onClick={handleSendMessage}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
