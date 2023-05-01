import { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartContext } from "../../store/cartContext";

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
          disabled={quantity === 1 ? true : false}
          onClick={() => {
            const newQuantity = quantity - 1;
            quantityUpdateHandler(id, newQuantity);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="input-quantity"
          value={quantity}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            quantityUpdateHandler(id, newQuantity);
          }}
        />
        <button
          type="button"
          className="btn-increment"
          disabled={quantity >= stock ? true : false}
          onClick={() => {
            const newQuantity = quantity + 1;
            quantityUpdateHandler(id, newQuantity);
          }}
        >
          +
        </button>
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
