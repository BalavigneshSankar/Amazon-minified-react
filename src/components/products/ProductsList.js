import Product from "./Product";
import { useContext } from "react";
import { ItemsContext } from "../../store/itemsContext";

const ProductsList = ({ categories, minMaxPrice, searchString }) => {
  const itemsCtx = useContext(ItemsContext);

  // Filter by category
  let filteredByCategory;
  if (categories.length === 0) {
    filteredByCategory = itemsCtx.items;
  } else {
    filteredByCategory = itemsCtx.items.filter((item) =>
      categories.includes(item.category)
    );
  }

  // Filter by price range
  let filteredByPriceRange;
  if (!minMaxPrice.isRangeSet) {
    filteredByPriceRange = filteredByCategory;
  } else {
    filteredByPriceRange = filteredByCategory.filter(
      (item) =>
        item.price >= minMaxPrice.minimumPrice &&
        item.price <= minMaxPrice.maximumPrice
    );
  }

  // Filter by item name
  let filteredBySearchString;
  if (!searchString) {
    filteredBySearchString = filteredByPriceRange;
  } else {
    // 'c am' => ['c', 'a', 'm']
    const searchStringAsArray = searchString
      .split("")
      .filter((character) => character !== " ");

    filteredBySearchString = filteredByPriceRange.filter((item) => {
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

  return (
    <div className="products-container">
      {filteredBySearchString.map((item) => (
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
