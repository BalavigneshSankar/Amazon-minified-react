import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios/fetchItemsRequest";

export const ItemsContext = createContext({
  isLoading: true,
  items: [],
  stockUpdateHandler: () => {},
});

const ItemsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance("/api/v1/items");
      const fetchedItems = res.data.data.items;
      setItems(fetchedItems);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
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
        stockUpdateHandler,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
