import { useState, useEffect } from "react";
import { getMessages } from "../features/chat/messageApi";
import { scrollToBottom } from "../utils/scroll";

const useMessages = ({ user, selectedUser, chatRef }) => {
  // message display
  // format, {sender_id,receiver_id,text}
  const [messages, setMessages] = useState([]);

  // pagination to fetch mesages
  const [page, setPage] = useState(1);

  const [loadingOlder, setLoadingOlder] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [lastId, setLastId] = useState(null);

  const fetchMessages = async (currentPage, lastId) => {
    try {
      const previousHeight = chatRef.current?.scrollHeight || 0;
      // console.log("lastId =", lastId);
      // message between login user and selected user
      const data = await getMessages(
        user.token,
        selectedUser.id,
        currentPage,
        lastId,
      );

      if (data.length) {
        const oldest = data[data.length - 1];

        setLastId(oldest.id);
      }
      const formattedMessages = [...data].reverse();
      // console.log(formattedMessages);

      if (currentPage === 1) {
        setMessages(formattedMessages);

        // set scrolling first time
        scrollToBottom(chatRef, "auto");
      } else {
        setMessages((prev) => [...formattedMessages, ...prev]);

        // set scrolling when paging changes user scrolling upside
        setTimeout(() => {
          const newHeight = chatRef.current?.scrollHeight || 0;

          chatRef.current.scrollTop = newHeight - previousHeight;
        }, 0);
      }

      if (data.length === 0) {
        return false;
      }

      if (data.length < 20) {
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error while fetching messages");
      console.log(error);
    }
  };

  const resetPagination = () => {
    setPage(1); // new user selected, so page must be 1
    setLastId(null);
    setHasMore(true);
  };

  // event trigger selected used updated
  //  fetch message calling
  useEffect(() => {
    if (!selectedUser.id) return;

    const loadMessages = async () => {
      resetPagination();

      await fetchMessages(1, null);
    };

    loadMessages();
  }, [selectedUser.id]);

  const loadOlderMessages = async () => {
    // console.log("loadOlderMessages called");
    if (loadingOlder || !hasMore) {
      return;
    }

    setLoadingOlder(true);

    const nextPage = page + 1;

    const result = await fetchMessages(nextPage, lastId);

    if (result === false) {
      // console.log("No more messages to load for this user");
      setHasMore(false);
    } else {
      console.log("more messages to load");
      setPage(nextPage);
    }

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
