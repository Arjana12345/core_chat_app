import { useEffect, useState,} from "react";

import { useDispatch, useSelector,} from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout,} from "../features/auth/authSlice";

import { connectSocket, disconnectSocket,} from "../services/socket";

import { getUsers } from "../features/chat/chatApi";

import { getMessages } from "../features/chat/messageApi";


function Chat() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

    useEffect(() => {

    if (user?.token) {

        // SOCKET CONNECTION
        const socket =
        connectSocket(user.token);

        socket.on("connect", () => {

        console.log(
            "Socket Connected:",
            socket.id
        );
        });

        // FETCH USERS
        const fetchUsers = async () => {

        try {

            const data =
            await getUsers(user.token);

            setUsers(data);

        } catch (error) {

            console.log(error);
        }
        };

        fetchUsers();
    }

    return () => {
        disconnectSocket();
    };

    }, [user]);


useEffect(() => {

  if (!selectedUser) return;

  const fetchMessages = async () => {

    try {

      const data =
        await getMessages(
          user.token,
          selectedUser.id
        );

      setMessages(data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchMessages();

}, [selectedUser]);


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

        {/* TEMP USER LIST */}

        <div
          onClick={() =>
            setSelectedUser({
              id: 2,
              name: "Demo User",
            })
          }
          className="p-3 border rounded cursor-pointer hover:bg-gray-100"
        >
          {/* Demo User */}
      
        {
            users.map((singleUser) => (

                <div
                key={singleUser.id}
                onClick={() =>
                    setSelectedUser(singleUser)
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

      </div>

      {/* CHAT WINDOW */}

      <div className="flex-1 flex flex-col">

        {/* HEADER */}

        <div className="border-b p-4 font-bold text-xl">

          {selectedUser
            ? selectedUser.name
            : "Select User"}

        </div>

        {/* MESSAGES */}
      
        {
        messages.map((msg) => (

            <div
            key={msg.id}
            className={
                msg.sender_id === user.user.id
                ? "mb-3 text-right"
                : "mb-3"
            }
            >

            <div
                className={
                msg.sender_id === user.user.id
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
            className="flex-1 border rounded p-3"
          />

          <button
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
