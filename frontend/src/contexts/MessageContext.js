import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

// Custom hook to use the MessageContext
export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const messageColorCss = (() => {
    if (message?.type === "success") return "bg-green-500 text-white";
    if (message?.type === "error") return "bg-red-500 text-white";
    return "bg-gray-500 text-white";
  })();

  // Function to show a message
  const showMessage = (content, type = "info", duration = 5000) => {
    setMessage({ content, type });

    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
      {message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-4 text-lg rounded shadow-lg ${messageColorCss}`}
        >
          {message.content}
        </div>
      )}
    </MessageContext.Provider>
  );
};
