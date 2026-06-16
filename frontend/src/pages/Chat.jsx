import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";

import { disconnectSocket } from "../services/socket";

import { getUsers } from "../features/chat/chatApi";

import { sendMessageApi } from "../features/chat/messageApi";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import MessageBubble from "../components/ChatWindow/MessageBubble";
import MessageInput from "../components/ChatWindow/MessageInput";
import useChatSocket from "../hooks/useChatSocket";
import useMessages from "../hooks/useMessages";

console.log("Chat Page Loaded");

function Chat() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // console.log("user =", user);
  const [selectedUser, setSelectedUser] = useState({});

  // sidebar users display
  const [users, setUsers] = useState([]);

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

  // socket connection
  useEffect(() => {
    console.log("Running socket useEffect");

    if (user?.token) {
      console.log("login user = ", user);
      console.log("Token = ", user.token);

      // FETCH USERS for sidebar
      const fetchUsers = async () => {
        try {
          const data = await getUsers(user.token);

          console.log("all sidebar users =");
          console.log(data);

          setUsers(data);
        } catch (error) {
          console.log("Error to fetch sidebar users");
          console.log(error);
        }
      };

      fetchUsers();
    }
  }, [user]);

  const handleScroll = () => {
    if (loadingOlder) return;

    if (chatRef.current.scrollTop <= 50) {
      loadOlderMessages();
    }
  };

  // handle send message
  // when login user send message by input
  const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    if (!newMessage.trim()) return;

    try {
      console.log("sending message To: ", selectedUser.id);
      const data = await sendMessageApi(
        user.token, // sender
        selectedUser.id, // receiver
        newMessage, // text
      );

      console.log("sending message data = ", data);
      if (data.message_status == 201) {
        data.message = newMessage;
      } else {
        data.message = "";
      }
      data.sender_id = user.id;
      console.log(" updated data = ", data);

      setMessages((prev) => [
        ...prev,
        {
          id: data.messageId,
          sender_id: user.id,
          receiver_id: selectedUser.id,
          message: data.message,
        },
      ]);

      // scrolling
      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);

      setNewMessage("");
    } catch (error) {
      console.log("send message error");
      console.log(error);
    }
  };

  // event trigger by send button
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSendMessage();
    }
  };

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

      <div className="flex-1 flex flex-col h-screen">
        {/* HEADER */}

        <div className="h-16 border-b flex items-center px-4 bg-white shadow-sm font-semibold">
          {selectedUser.name || "Select User"}
        </div>

        {/* MESSAGES */}

        <div
          ref={chatRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 bg-gray-50"
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isSender={msg.sender_id === user.id}
            />
          ))}
        </div>

        {/* MESSAGE INPUT */}
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
