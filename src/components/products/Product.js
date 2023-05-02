import { useState, useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { CartContext } from "../../store/cartContext";
import { IoAlertCircleOutline } from "react-icons/io5";

const Product = ({
  id,
  thumbnail,
  title,
  rating,
  price,
  category,
  description,
  stock,
}) => {
  const cartCtx = useContext(CartContext);
  const [enteredQuantity, setEnteredQuantity] = useState(1);
  const [readMore, setReadMore] = useState(false);
  const [error, setError] = useState(null);

  const quantityValidateHandler = (quantity) => {
    // If proposed quantity greater than stock
    if (quantity > stock) {
      setError(`Available stock: ${stock}`);
      return;
    }

    // Find if item already added to cart, if so the quantity
    const cartQuantity = cartCtx.cartItems.find(
      (cartItem) => cartItem.id === id
    )?.quantity;

    // If item already added in cart
    if (cartQuantity) {
      if (quantity + cartQuantity > stock) {
        setError(`Available stock: ${stock}`);
      } else {
        setError(null);
        setEnteredQuantity(quantity);
      }
      // If item not yet added in cart
    } else {
      setError(null);
      setEnteredQuantity(quantity);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (enteredQuantity === 0) {
      setError("Enter a valid quantity");
      return;
    }
    cartCtx.cartItemsUpdateHandler({
      id,
      thumbnail,
      title,
      description,
      price,
      quantity: enteredQuantity,
      stock,
    });
  };

  // Rating fixed to 2 decimal places
  const ratingCorrected = rating.toFixed(1);

  let descriptionTrimmed;
  if (!readMore) {
    if (description.length > 50) {
      descriptionTrimmed = `${description.slice(0, 50)}...`;
    } else {
      descriptionTrimmed = description;
    }
  } else {
    descriptionTrimmed = description;
  }

  return (
    <article className="product-card">
      <div className="product-img-rating-container">
        <img src={thumbnail} alt={title} className="product-img" />
        <p className="product-rating">
          <AiFillStar className="rating-icon" />
          <span>{ratingCorrected}</span>
        </p>
      </div>
      <div className="product-info">
        <div className="product-title-price-container">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">
            <span>$</span>
            {price}
            <span>/unit</span>
          </p>
        </div>
        <div className="product-category-container">
          <p className="product-category">
            Category: <span>{category}</span>
          </p>
        </div>
        <p className="product-description">
          {descriptionTrimmed}
          {description.length > 50 && (
            <button
              type="button"
              className="btn-read-more"
              onClick={() => {
                setReadMore((readMore) => !readMore);
              }}
            >
              {readMore ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>
      <div className="product-cta">
        <form className="form-quantity" onSubmit={formSubmitHandler}>
          {error && (
            <p className="alert alert-danger">
              <IoAlertCircleOutline className="alert-icon" />
              <span>{error}</span>
            </p>
          )}
          <div className="quantity-control-container">
            <button
              type="button"
              className="btn-decrement"
              onClick={() => quantityValidateHandler(enteredQuantity - 1)}
              disabled={enteredQuantity <= 1 ? true : false}
            >
              -
            </button>
            <input
              type="number"
              className="input-quantity"
              value={enteredQuantity}
              onChange={(e) => {
                quantityValidateHandler(Number(e.target.value));
              }}
              min="1"
              max={stock}
            />
            <button
              type="button"
              className="btn-increment"
              onClick={() => quantityValidateHandler(enteredQuantity + 1)}
              disabled={enteredQuantity >= stock ? true : false}
            >
              +
            </button>
          </div>
          <button type="submit" className="btn">
            Add to cart
          </button>
        </form>
      </div>
    </article>
  );
};

export default Product;
