import Product from "./Product";

const ProductsList = ({ items, categories, minMaxPrice, searchString }) => {
  // Filter by category
  let filteredByCategory;
  if (categories.length === 0) {
    filteredByCategory = items;
  } else {
    filteredByCategory = items.filter((item) =>
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
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductsList;
