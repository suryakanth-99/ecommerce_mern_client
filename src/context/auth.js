import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({ user: null, token: "" });

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
    //es-lint disable next-line
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//   useContext(AuthContext);
// };

// export { useAuth, AuthProvider };
