import API from "../../services/api";

export const getMessages = async (
  token,
  receiverId
) => {

  const response = await API.get(
    `/messages/${receiverId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
