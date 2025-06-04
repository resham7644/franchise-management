import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Auto logout when JWT expires
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
        const exp = decoded.exp * 1000;
        const now = Date.now();
        const timeout = exp - now;

        if (timeout > 0) {
          const timer = setTimeout(() => {
            alert("Session expired. Logging out.");
            logout();
          }, timeout);

          return () => clearTimeout(timer);
        } else {
          logout(); // already expired
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout(); // logout if decoding fails
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
