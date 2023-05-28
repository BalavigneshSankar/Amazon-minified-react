import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartItemsUpdateHandler: () => {},
  quantityUpdateHandler: () => {},
  itemDeleteHandler: () => {},
});

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const cartItemsUpdateHandler = (item) => {
    // Check if item already exist in cart items
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
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

  const quantityUpdateHandler = (_id, newQuantity) => {
    // Find index of the particular item
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === _id
    );

    // Update quantity of particular item
    setCartItems((cartItems) => {
      const updatedCartItems = structuredClone(cartItems);
      updatedCartItems[cartItemIndex].quantity = newQuantity;
      return updatedCartItems;
    });
  };

  const itemDeleteHandler = (_id) => {
    // Delete particular item
    setCartItems((cartItems) => {
      const updatedCartItems = structuredClone(cartItems);
      return updatedCartItems.filter((cartItem) => cartItem._id !== _id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsUpdateHandler,
        quantityUpdateHandler,
        itemDeleteHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
