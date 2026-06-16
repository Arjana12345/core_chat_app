import { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";

import { connectSocket, disconnectSocket } from "../services/socket";

import { getUsers } from "../features/chat/chatApi";

import { getMessages, sendMessageApi } from "../features/chat/messageApi";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import MessageBubble from "../components/ChatWindow/MessageBubble";
import MessageInput from "../components/ChatWindow/MessageInput";

console.log("Chat Page Loaded");

function Chat() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // console.log("user =", user);
  const [selectedUser, setSelectedUser] = useState({});

  // sidebar users display
  const [users, setUsers] = useState([]);

  // message display
  // format, {sender_id,receiver_id,text}
  const [messages, setMessages] = useState([]);

  // new message display
  //  only text what login user typing
  const [newMessage, setNewMessage] = useState("");

  // pagination to fetch mesages
  const [page, setPage] = useState(1);

  // loader
  // const [loadingOlder] = useState(false);

  const chatRef = useRef(null);

  // socket connection
  useEffect(() => {
    console.log("Running socket useEffect");

    if (user?.token) {
      console.log("login user = ", user);
      console.log("Token = ", user.token);

      // SOCKET CONNECTION

      const socket = connectSocket(user.token);

      socket.on("connect", () => {
        console.log("Socket Connected:", socket.id);
      });

      // when login user received persistent message
      socket.on("receiveMessage", (messageData) => {
        console.log("Received Message:", JSON.stringify(messageData, null, 2));

        // checking if getting own message, then return
        if (messageData.sender_id === user.id) {
          return;
        }
        // else set message
        setMessages((prev) => [...prev, messageData]);

        // fix scrolling in chat window
        setTimeout(() => {
          chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      });

      // socker connection failed
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });

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

    return () => {
      disconnectSocket();
    };
  }, [user]);

  //  Fetch message - on event trigger
  // 1. when user selected from sidebar everytime

  const fetchMessages = async (currentPage) => {
    try {
      const previousHeight = chatRef.current?.scrollHeight || 0;

      // message between login user and selected user
      const data = await getMessages(user.token, selectedUser.id, currentPage);

      if (currentPage === 1) {
        setMessages(data);
        // set scrolling first time
        setTimeout(() => {
          chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "auto",
          });
        }, 100);
      } else {
        setMessages((prev) => [...data, ...prev]);

        // set scrolling when paging changes user scrolling upside
        setTimeout(() => {
          const newHeight = chatRef.current?.scrollHeight || 0;

          chatRef.current.scrollTop = newHeight - previousHeight;
        }, 0);
      }
    } catch (error) {
      console.log("Error while fetch messages");
      console.log(error);
    }
  };

  // event trigger selected used updated
  //  fetch message calling
  useEffect(() => {
    if (!selectedUser.id) return;

    const loadMessages = async () => {
      setPage(1); // new user selected, so page must be 1
      await fetchMessages(page);
    };

    loadMessages();
  }, [selectedUser.id]);

  // scrolling
  //  if scroll height increases then get old messages
  const handleScroll = () => {
    // if (loadingOlder) return;

    if (chatRef.current.scrollTop <= 50) {
      setPage((prev) => {
        const nextPage = prev + 1;

        fetchMessages(nextPage);

        return nextPage;
      });
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
