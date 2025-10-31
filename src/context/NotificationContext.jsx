import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNotifications = () => setIsOpen(prev => !prev);

  return (
    <NotificationContext.Provider value={{ isOpen, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);