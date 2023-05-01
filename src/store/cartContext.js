import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartItemsUpdateHandler: () => {},
  quantityUpdateHandler: () => [],
});

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  // On initial load:
  // 1. 1st effect fn. executed => get cartItems from local storage, schedule cartItems updation
  // 2. 2nd effect fn. executed => set local storage cartItems as []
  // 3. cartItems state updated and cartContextProvider reloads
  // 4. 2nd effect fn. executed as cartItems changed => Set local storage cartItems to updated value
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemsUpdateHandler = (item) => {
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

  const itemDeleteHandler = (id) => {
    // Delete particular item
    setCartItems((cartItems) => {
      const updatedCartItems = structuredClone(cartItems);
      return updatedCartItems.filter((cartItem) => cartItem.id !== id);
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
