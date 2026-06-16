import React from "react";

const LogoutButton = ({ handleLogout }) => {
  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
