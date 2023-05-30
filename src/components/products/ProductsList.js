import Product from "./Product";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../store/itemsContext";
import axiosInstance from "../../axios/fetchItemsRequest";

const ProductsList = ({ categories, minMaxPrice, searchString }) => {
  const itemsCtx = useContext(ItemsContext);
  const [filteredItems, setFilteredItems] = useState([]);

  const filterByCategoryAndPrice = async (
    categories,
    minMaxPrice,
    searchString
  ) => {
    try {
      // Filter by category
      if (categories.length === 0) {
        categories = ["all"];
      }
      // ['smartphones', 'laptops'] to "smartphones,laptops"
      let category = categories.join(",");

      // Filter by price range
      let minimumPrice, maximumPrice;
      if (!minMaxPrice.isRangeSet) {
        minimumPrice = null;
        maximumPrice = null;
      } else {
        // {minimumPrice: '100', maximumPrice: '1000', isRangeSet: true} to minimumPrice = 100 maximumPrice = 1000
        minimumPrice = minMaxPrice.minimumPrice;
        maximumPrice = minMaxPrice.maximumPrice;
      }

      const path = `/api/v1/items/filteredItems?category=${category}&price[gte]=${minimumPrice}&price[lte]=${maximumPrice}`;
      const res = await axiosInstance(path);
      const filteredByCategoryAndPrice = res.data.data.items;

      // Filter by item name
      let filteredBySearchString;
      if (!searchString) {
        filteredBySearchString = filteredByCategoryAndPrice;
      } else {
        // 'c am' => ['c', 'a', 'm']
        const searchStringAsArray = searchString
          .split("")
          .filter((character) => character !== " ");

        filteredBySearchString = filteredByCategoryAndPrice.filter((item) => {
          // 'MacBook Pro' => ['m', 'a', 'c', 'b', 'o', 'o', 'k', 'p', 'r', 'o']
          const itemTitleAsArray = item.title
            .toLowerCase()
            .split("")
            .filter((character) => character !== " ");

          return searchStringAsArray.every((character) =>
            itemTitleAsArray.includes(character)
          );
        });
      }

      setFilteredItems(filteredBySearchString);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterByCategoryAndPrice(categories, minMaxPrice, searchString);
  }, [categories, minMaxPrice, searchString]);

  return (
    <div className="products-container">
      {filteredItems.map((item) => (
        <Product
          key={item._id}
          {...item}
          onOrder={itemsCtx.stockUpdateHandler}
        />
      ))}
    </div>
  );
};

export default ProductsList;
