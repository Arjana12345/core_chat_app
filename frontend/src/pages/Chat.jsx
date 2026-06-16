import { useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";

import { disconnectSocket } from "../services/socket";

// components and hooks
import Sidebar from "../components/Sidebar/Sidebar";
import useChatSocket from "../hooks/useChatSocket";
import useMessages from "../hooks/useMessages";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import useUsers from "../hooks/useUsers";
import useSendMessage from "../hooks/useSendMessage";

console.log("Chat Page Loaded");

function Chat() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // console.log("user =", user);
  const [selectedUser, setSelectedUser] = useState({});

  // new message display
  //  only text what login user typing
  const [newMessage, setNewMessage] = useState("");

  const chatRef = useRef(null);

  const { messages, setMessages, page, loadingOlder, loadOlderMessages } =
    useMessages({
      user,
      selectedUser,
      chatRef,
    });

  useChatSocket({
    user,
    setMessages,
    chatRef,
  });

  const { users, setUsers } = useUsers(user);

  const handleScroll = () => {
    if (loadingOlder) return;

    if (chatRef.current.scrollTop <= 50) {
      loadOlderMessages();
    }
  };

  const { handleSendMessage } = useSendMessage({
    user,
    selectedUser,
    setMessages,
    newMessage,
    setNewMessage,
    chatRef,
  });

  // logout
  const handleLogout = () => {
    disconnectSocket();

    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="h-screen flex">
      {/* SIDEBAR */}
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleLogout={handleLogout}
      />

      {/* CHAT WINDOW */}

      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        user={user}
        chatRef={chatRef}
        handleScroll={handleScroll}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
