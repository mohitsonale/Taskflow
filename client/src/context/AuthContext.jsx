import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  // BACKEND URL

  const backendUrl = "http://localhost:5000";

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