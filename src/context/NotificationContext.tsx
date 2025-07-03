import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const API_URL = "/api";

  const fetchNotifications = async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setNotifications(data);
    }
  };

  const markAsRead = async (id: string) => {
    if (!token) return;
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};