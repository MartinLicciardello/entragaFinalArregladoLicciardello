import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  function isInCart(id) {
    return cart.some((cart) => cart.id === id);
  }

  function clear() {
    setCart([]);
  }

  function addItem(item, quantity) {
    if (!isInCart(item.id)) {
      setCart([...cart, { ...item, quantity }]);
    }
  }

  function removeItem(id) {
    const newCart = cart.filter((cart) => cart.id !== id);
    setCart(newCart);
  }
  return (
    <CartContext.Provider
      value={{ cart, setCart, isInCart, clear, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
