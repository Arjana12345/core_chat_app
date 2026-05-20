import API from "../../services/api";


export const getMessages = async (
  token,
  receiverId,
  page
) => {

  const response = await API.get(
    `/messages/${receiverId}?page=${page}&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const sendMessageApi = async (
  token,
  receiverId,
  message
) => {

  const response = await API.post(
    "/messages/send",
    {
      receiverId,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
