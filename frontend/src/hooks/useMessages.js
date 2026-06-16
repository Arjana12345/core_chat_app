import { useState, useEffect } from "react";
import { getMessages } from "../features/chat/messageApi";

const useMessages = ({ user, selectedUser, chatRef }) => {
  // message display
  // format, {sender_id,receiver_id,text}
  const [messages, setMessages] = useState([]);

  // pagination to fetch mesages
  const [page, setPage] = useState(1);

  const [loadingOlder, setLoadingOlder] = useState(false);

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
      await fetchMessages(1);
    };

    loadMessages();
  }, [selectedUser.id]);

  const loadOlderMessages = async () => {
    if (loadingOlder) return;

    setLoadingOlder(true);

    const nextPage = page + 1;

    await fetchMessages(nextPage);

    setPage((prev) => prev + 1);

    setLoadingOlder(false);
  };

  return {
    messages,
    setMessages,

    page,
    loadingOlder,

    loadOlderMessages,
  };
};

export default useMessages;
