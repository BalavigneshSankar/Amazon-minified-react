import { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartContext } from "../../store/cartContext";
import { IoAlertCircleOutline } from "react-icons/io5";

const CartItem = ({
  id,
  thumbnail,
  title,
  description,
  price,
  quantity,
  stock,
}) => {
  const { quantityUpdateHandler, itemDeleteHandler } = useContext(CartContext);
  const [error, setError] = useState(null);

  const quantityValidateHandler = (quantity) => {
    // If proposed quantity greater than stock
    if (quantity > stock) {
      setError(`Available stock: ${stock}`);
      return;
    }
    setError(null);
    quantityUpdateHandler(id, quantity);
  };

  // Price for selected no. of units
  const updatedPrice = price * quantity;

  return (
    <article className="cart-item">
      <div className="product-img-container">
        <img src={thumbnail} alt={title} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-description">{description}</div>
      </div>
      <div className="product-quantity-container">
        <button
          type="button"
          className="btn-decrement"
          disabled={quantity <= 1 ? true : false}
          onClick={() => quantityValidateHandler(quantity - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="input-quantity"
          value={quantity}
          min="1"
          max={stock}
          onChange={(e) => {
            const enteredQuantity = Number(e.target.value);
            quantityValidateHandler(enteredQuantity);
          }}
        />
        <button
          type="button"
          className="btn-increment"
          disabled={quantity >= stock ? true : false}
          onClick={() => quantityValidateHandler(quantity + 1)}
        >
          +
        </button>
        {error && (
          <p className="alert alert-danger">
            <IoAlertCircleOutline className="alert-icon" />
            <span>{error}</span>
          </p>
        )}
      </div>
      <div className="product-price-container">
        <p className="product-price">
          <span>$</span>
          {updatedPrice}
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => {
          itemDeleteHandler(id);
        }}
      >
        <RiDeleteBinLine className="delete-icon" />
      </button>
    </article>
  );
};

export default CartItem;
