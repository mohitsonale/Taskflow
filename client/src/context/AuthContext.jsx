import { createContext, useState } from "react";
export const AuthContext = createContext();
import dotenv from "dotenv";
dotenv.config();
function AuthProvider({ children }) {

  // BACKEND URL

  const backendUrl = import.meta.env.VITE_BACKEND_URL 

  // TOKEN

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  // LOGIN

  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    setToken("");
  };

  const value = {
    backendUrl,
    token,
    setToken,
    login,
    logout,
  };

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;