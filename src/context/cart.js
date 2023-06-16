import { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    console.log(existingCartItem);
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// export const useAuth = () => {
//   useContext(AuthContext);
// };
