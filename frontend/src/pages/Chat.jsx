import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {logout,} from "../features/auth/authSlice";

function Chat() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Chat Page
      </h1>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-5 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Chat;