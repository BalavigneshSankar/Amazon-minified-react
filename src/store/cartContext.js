import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios/fetchItemsRequest";

export const CartContext = createContext({
  cartItems: [],
  cartItemsUpdateHandler: () => {},
  quantityUpdateHandler: () => {},
  itemDeleteHandler: () => {},
});

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance("/api/v1/cart");
      const fetchedCartItems = res.data.data.cartItems;
      setCartItems(fetchedCartItems);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const createCartItem = async (item) => {
    try {
      await axiosInstance.post("/api/v1/cart", item);
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateCartItem = async (item) => {
    try {
      await axiosInstance.put(`/api/v1/cart/${item._id}`, item);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteCartItem = async (_id) => {
    try {
      await axiosInstance.delete(`/api/v1/cart/${_id}`);
    } catch (err) {
      throw new Error(err);
    }
  };

  const cartItemsUpdateHandler = async (item) => {
    try {
      // Check if item already exist in cart items
      const cartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (cartItemIndex !== -1) {
        const updatedItem = { ...item };
        updatedItem.quantity =
          cartItems[cartItemIndex].quantity + item.quantity;
        await updateCartItem(updatedItem);
      } else {
        await createCartItem(item);
      }
      fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const quantityUpdateHandler = async (_id, newQuantity) => {
    try {
      // Find index of the particular item
      const cartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem._id === _id
      );

      // Update quantity of particular item
      const updatedItem = { ...cartItems[cartItemIndex] };
      updatedItem.quantity = newQuantity;
      await updateCartItem(updatedItem);
      fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const itemDeleteHandler = async (_id) => {
    try {
      await deleteCartItem(_id);
      fetchCartItems();
    } catch (err) {
      console.log(err);
    }
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
