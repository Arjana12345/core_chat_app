import API from "../../services/api";

export const getUsers = async (token) => {

  const response = await API.get(
    "/users/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
