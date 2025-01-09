import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

// Custom hook to use the MessageContext
export const useMessage = () => {
  return useContext(MessageContext);
};

// Provider to wrap your app and provide message state
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  // Function to show a message
  const showMessage = (content, type = "info", duration = 5000) => {
    setMessage({ content, type });

    // Clear the message after the duration
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
      {message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-4 text-lg rounded shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : message.type === "error"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {message.content}
        </div>
      )}
    </MessageContext.Provider>
  );
};
