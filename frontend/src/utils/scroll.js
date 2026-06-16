export const scrollToBottom = (chatRef, behaviour) => {
  setTimeout(() => {
    if (!chatRef.current) return;

    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: behaviour,
    });
  }, 100);
};
