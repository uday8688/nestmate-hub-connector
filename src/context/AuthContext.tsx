import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("authToken");
    const email = localStorage.getItem("authEmail");
    const name = localStorage.getItem("authName") || undefined;
    if (stored && email) {
      setToken(stored);
      setUser({ email, name });
    }
  }, []);

  const API_URL = "/api";

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Invalid credentials");
    }
    const data = await res.json();
    setToken(data.token);
    setUser({ email: data.email, name: data.name });
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authEmail", data.email);
    if (data.name) localStorage.setItem("authName", data.name);
    navigate("/");
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Signup failed");
    }
    const data = await res.json();
    setToken(data.token);
    setUser({ email: data.email, name: data.name });
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authEmail", data.email);
    if (data.name) localStorage.setItem("authName", data.name);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authName");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
