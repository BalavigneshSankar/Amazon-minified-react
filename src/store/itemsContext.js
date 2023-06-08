import { createContext, useState, useCallback } from "react";
import axiosInstance from "../axios/axiosInstance";

export const ItemsContext = createContext({
  isLoading: true,
  items: [],
  error: null,
  fetchItems: () => {},
  stockUpdateHandler: () => {},
});

const ItemsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async (token) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get("/api/v1/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedItems = res.data.data.items;
      setItems(fetchedItems);
    } catch (err) {
      setError(err.response.data.message);
    }
    setIsLoading(false);
  }, []);

  const updateItem = async (_id, item) => {
    try {
      await axiosInstance.post(`/api/v1/items/${_id}`, item);
    } catch (err) {
      throw new Error(err);
    }
  };

  const stockUpdateHandler = async (_id, quantity) => {
    try {
      let prdtItems = structuredClone(items);
      //  Find index of item, change available stock
      const index = prdtItems.findIndex((item) => item._id === _id);
      const updatedItem = prdtItems[index];
      updatedItem.availableStock = updatedItem.availableStock - quantity;
      await updateItem(_id, updatedItem);
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        isLoading,
        items,
        error,
        fetchItems,
        stockUpdateHandler,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
