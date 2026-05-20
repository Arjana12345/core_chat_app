import { useEffect, useState, useRef, } from "react";

import { useDispatch, useSelector,} from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout,} from "../features/auth/authSlice";

import { connectSocket, disconnectSocket,} from "../services/socket";

import { getUsers } from "../features/chat/chatApi";

import { getMessages, sendMessageApi,} from "../features/chat/messageApi";


function Chat() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  console.log("user =", user);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);

  const chatRef = useRef(null);

  // 
    useEffect(() => {
    console.log("Running socket useEffect");
    console.log(user); 
    console.log(user.token);
    if (user?.token) {

        // SOCKET CONNECTION
     
        const socket = connectSocket(user.token);

        socket.on("connect", () => {

          console.log("Socket Connected:", socket.id);
        });

        socket.on("receiveMessage", (messageData) => {
              console.log("Received Message:", messageData);

              setMessages((prev) => [
                ...prev,
                messageData,
              ]);
            }
          );
        
        socket.on("connect_error", (err) => {
          console.log(err.message);
        });
        // FETCH USERS
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

    //  Fetch message initially then by scrolling
     
      // OUTSIDE useEffect
      const fetchMessages = async ( currentPage = 1 ) => {

        try {

          const data = await getMessages(
                                      user.token,
                                      selectedUser,
                                      currentPage
                                    );

          setMessages((prev) => [
            ...data,
            ...prev,
          ]);

        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        if (selectedUser) {
          fetchMessages(1);
        }

      }, [selectedUser]);

     
     

      const handleScroll = () => {

        if (chatRef.current.scrollTop <= 10) {
          console.log("LOAD MORE");
          const nextPage = page + 1;

          setPage(nextPage);

          fetchMessages(nextPage);
        }
      };
    

    // handle send message
    const handleSendMessage = async () => {

      if (!newMessage.trim()) return;

      try {
        console.log("send message", selectedUser);
        const data = await sendMessageApi(
                                      user.token,
                                      selectedUser,
                                      newMessage
                                    );

        console.log("send message data = ", data);
        if(data.message_status == 201)
        {
            data.message = newMessage;
        }
        else 
        {
          data.message = "";
        }
        console.log(" updated data = ", data);
        setMessages((prev) => [
          ...prev,
          data,
        ]);

        setNewMessage("");

      } catch (error) {
        console.log("send message error");
        console.log(error);
      }
    };


    const handleLogout = () => {

      disconnectSocket();

      dispatch(logout());

      navigate("/login");
    };


  return (

    <div className="h-screen flex">

      {/* SIDEBAR */}

      <div className="w-[30%] border-r p-4">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Chats
          </h2>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* user list for sidebar */}
      
        {
            users.map((singleUser) => (

                <div
                key={singleUser.id}
                onClick={() =>
                    setSelectedUser(singleUser.id)
                }
                className="p-3 border rounded cursor-pointer hover:bg-gray-100 mb-2"
                >

                <h3 className="font-semibold">
                    {singleUser.name}
                </h3>

                <p className="text-sm text-gray-500">
                    {singleUser.email}
                </p>

                </div>
            ))
        }

        

      </div>

      {/* CHAT WINDOW */}

      <div className="flex-1 flex flex-col">

      
        {/* HEADER */}

        <div className="border-b p-4 font-bold text-xl">

          {selectedUser ? selectedUser.name: "Select User"}

        </div>

       

        {/* MESSAGES */}
        <div
          ref={chatRef}
          onScroll={handleScroll}
          className="h-[500px] overflow-y-auto p-4"
        ></div>
        
        {
        messages.map((msg) => (

            <div
            key={msg.id}
            className={
                msg.sender_id === user.id
                ? "mb-3 text-right"
                : "mb-3"
            }
            >

              <div
                  className={
                  msg.sender_id === user.id
                      ? "bg-black text-white inline-block px-4 py-2 rounded"
                      : "bg-gray-200 inline-block px-4 py-2 rounded"
                  }
              >
                {msg.message}

              </div>

            </div>
        ))
        }

        {/* MESSAGE INPUT */}

        <div className="border-t p-4 flex gap-3">
         
          <input
            type="text"
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) =>
              setNewMessage(e.target.value)
            }
            className="flex-1 border rounded p-3"
          />
         
          <button
            onClick={handleSendMessage}
            className="bg-black text-white px-5 rounded"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;
