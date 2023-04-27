import Product from "./Product";

const ProductsList = ({ items, categories, minMaxPrice }) => {
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

  return (
    <div className="products-container">
      {filteredByPriceRange.map((item) => (
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductsList;
