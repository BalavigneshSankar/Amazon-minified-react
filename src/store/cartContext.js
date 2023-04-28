import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  updateCartHandler: () => {},
  quantityUpdateHandler: () => [],
});

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCartHandler = (item) => {
    // Check if item already in cart items
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (cartItemIndex !== -1) {
      setCartItems((cartItems) => {
        const updatedCartItems = structuredClone(cartItems);
        updatedCartItems[cartItemIndex].quantity += item.quantity;
        return updatedCartItems;
      });
    } else {
      setCartItems((prevCartItems) => {
        return [...prevCartItems, item];
      });
    }
  };

  const quantityUpdateHandler = (id, newQuantity) => {
    // Find index of the particular item
    const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);

    // Update quantity of particular item
    setCartItems((cartItems) => {
      const updatedCartItems = structuredClone(cartItems);
      updatedCartItems[cartItemIndex].quantity = newQuantity;
      return updatedCartItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartHandler,
        quantityUpdateHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
