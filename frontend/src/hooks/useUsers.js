import { useEffect, useState } from "react";
import { getUsers } from "../features/chat/chatApi";

const useUsers = (user) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

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
  }, [user]);

  return {
    users,
    setUsers,
  };
};

export default useUsers;
