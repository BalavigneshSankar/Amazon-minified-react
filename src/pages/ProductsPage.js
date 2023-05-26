import Header from "../components/products/Header";
import ProductsList from "../components/products/ProductsList";
import Sidebar from "../components/products/Sidebar";
import { useState, useContext } from "react";
import { ItemsContext } from "../store/itemsContext";

const ProductsPage = () => {
  const itemsCtx = useContext(ItemsContext);
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

  let content = <div className="loading"></div>;

  if (!itemsCtx.isLoading) {
    content = (
      <div className="main-container">
        <Sidebar
          onFilterByCategory={filterByCategoryHandler}
          onFilterByPrice={filterByPriceHandler}
          onRangeReset={rangeResetHandler}
        />
        <ProductsList
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
