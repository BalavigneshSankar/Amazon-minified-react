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
      const res = await fetchItemsRequest("/products?skip=0&limit=24");
      const fetchedItems = res.data.products;
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

  const stockUpdateHandler = (id, quantity) => {
    setItems((prevState) => {
      let prdtItems = structuredClone(prevState);
      //  Find index of item, change available stock
      const index = prdtItems.findIndex((item) => item.id === id);
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
