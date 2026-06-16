import React from "react";
import LogoutButton from "../LogoutButton/LogoutButton";

const Sidebar = ({ users, selectedUser, setSelectedUser, handleLogout }) => {
  return (
    <div className="w-80 border-r flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Chats</h2>

        <LogoutButton handleLogout={handleLogout} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((singleUser) => (
          <div
            key={singleUser.id}
            onClick={() =>
              setSelectedUser({ id: singleUser.id, name: singleUser.name })
            }
            className={
              selectedUser.id === singleUser.id
                ? "bg-gray-200 p-3 border rounded cursor-pointer hover:bg-gray-200 mb-2"
                : "p-3 border rounded cursor-pointer hover:bg-gray-200 mb-2"
            }
          >
            <h3 className="font-semibold">{singleUser.name}</h3>

            <p className="text-sm text-gray-500">{singleUser.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
