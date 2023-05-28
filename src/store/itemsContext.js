import { createContext, useEffect, useState } from "react";
import fetchItemsRequest from "../axios/fetchItemsRequest";

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
      const res = await fetchItemsRequest("/api/v1/items");
      const fetchedItems = res.data.data.items;
      fetchedItems.forEach((item) => (item.availableStock = item.stock));
      setItems(fetchedItems);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const stockUpdateHandler = (_id, quantity) => {
    setItems((prevState) => {
      let prdtItems = structuredClone(prevState);
      //  Find index of item, change available stock
      const index = prdtItems.findIndex((item) => item._id === _id);
      const updatedItem = prdtItems[index];
      updatedItem.availableStock = updatedItem.availableStock - quantity;
      return prdtItems;
    });
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
