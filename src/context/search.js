import { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [value, setValue] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ value, setValue }}>
      {children}
    </SearchContext.Provider>
  );
};

// export const useAuth = () => {
//   useContext(AuthContext);
// };
