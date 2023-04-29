import Header from "../components/products/Header";
import ProductsList from "../components/products/ProductsList";
import Sidebar from "../components/products/Sidebar";
import { useState, useEffect } from "react";
import fetchItemsRequest from "../axios/fetchItemsRequest";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minMaxPrice, setMinMaxPrice] = useState({
    minimumPrice: null,
    maximumPrice: null,
    isRangeSet: false,
  });
  const [searchString, setSearchString] = useState("");

  const filterByCategoryHandler = (e) => {
    if (e.target.checked) {
      setCategories((categories) => [...categories, e.target.value]);
    } else {
      setCategories((categories) => {
        return categories.filter((category) => category !== e.target.value);
      });
    }
  };

  const filterByPriceHandler = (enteredMinPrice, enteredMaxPrice) => {
    setMinMaxPrice({
      minimumPrice: enteredMinPrice,
      maximumPrice: enteredMaxPrice,
      isRangeSet: true,
    });
  };

  const rangeResetHandler = () => {
    setMinMaxPrice({
      minimumPrice: null,
      maximumPrice: null,
      isRangeSet: false,
    });
  };

  const itemsSearchHandler = (enteredString) => {
    setSearchString(enteredString);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetchItemsRequest("/products?skip=0&limit=24");
      const fetchedItems = res.data.products;
      setItems(fetchedItems);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  let content = <div className="loading"></div>;

  if (!isLoading) {
    content = (
      <div className="main-container">
        <Sidebar
          items={items}
          onFilterByCategory={filterByCategoryHandler}
          onFilterByPrice={filterByPriceHandler}
          onRangeReset={rangeResetHandler}
        />
        <ProductsList
          items={items}
          categories={categories}
          minMaxPrice={minMaxPrice}
          searchString={searchString}
        />
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <div className="main-container">
          <Header onSearch={itemsSearchHandler} />
        </div>
      </header>
      <main>{content}</main>
    </>
  );
};

export default ProductsPage;
