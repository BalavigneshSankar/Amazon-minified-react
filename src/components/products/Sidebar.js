import { useRef } from "react";

const Sidebar = ({
  items,
  onFilterByCategory,
  onFilterByPrice,
  onRangeReset,
}) => {
  const categoryArray = items.map((item) => item.category);
  const categoryUniqueArray = [...new Set(categoryArray)];

  const minimumPriceRef = useRef();
  const maximumPriceRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredMinPrice = minimumPriceRef.current.value.trim();
    const enteredMaxPrice = maximumPriceRef.current.value.trim();

    // case 1: Either of the fields empty
    if (enteredMinPrice === "" || enteredMaxPrice === "") {
      alert("Either fields can't be empty.");
      return;
    }

    // case 2: Minimum value less than 0
    if (+enteredMinPrice < 0 || +enteredMaxPrice < 0) {
      alert("Either values can't be less than 0.");
      return;
    }

    // case 3: Range is 0 or less than 0
    if (
      +enteredMaxPrice - +enteredMinPrice === 0 ||
      +enteredMaxPrice - +enteredMinPrice < 0
    ) {
      alert("Range should be greater than 0");
      return;
    }
    onFilterByPrice(enteredMinPrice, enteredMaxPrice);
  };

  const rangeResetHandler = () => {
    minimumPriceRef.current.value = "";
    maximumPriceRef.current.value = "";
    onRangeReset();
  };

  return (
    <>
      <div className="filters-container">
        <div className="category-filter-container">
          <ul className="category-list">
            <h3 className="title">Category</h3>
            {categoryUniqueArray.map((category) => (
              <li key={category} className="category-item">
                <input
                  type="checkbox"
                  id={category}
                  className="input-checkbox"
                  name="category"
                  value={category}
                  onChange={onFilterByCategory}
                />
                <label htmlFor={category} className="label-checkbox">
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="price-filter-container">
          <h3 className="title">Price Range</h3>
          <form className="form-price-limit" onSubmit={formSubmitHandler}>
            <input type="number" placeholder="min" ref={minimumPriceRef} />
            <span>-</span>
            <input type="number" placeholder="max" ref={maximumPriceRef} />
            <button type="submit" className="btn-range">
              Go
            </button>
          </form>
          <button
            type="button"
            className="btn-range-reset"
            onClick={rangeResetHandler}
          >
            Reset range
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
