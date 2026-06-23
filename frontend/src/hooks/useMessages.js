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

  const fetchMessages = async (currentPage) => {
    try {
      const previousHeight = chatRef.current?.scrollHeight || 0;

      // message between login user and selected user
      const data = await getMessages(user.token, selectedUser.id, currentPage);

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
    if (loadingOlder || !hasMore) {
      return;
    }

    setLoadingOlder(true);

    const nextPage = page + 1;

    const result = await fetchMessages(nextPage);

    if (result === false) {
      setHasMore(false);
    } else {
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
