import { createContext, useState } from "react";
export const AuthContext = createContext();
function AuthProvider({ children }) {


  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };



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




