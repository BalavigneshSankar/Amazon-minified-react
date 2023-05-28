import { useContext } from "react";
import { CartContext } from "../store/cartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import { ItemsContext } from "../store/itemsContext";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const itemsCtx = useContext(ItemsContext);

  // Total number of units
  const totalUnits = cartItems
    .map((cartItem) => cartItem.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  // Total Amount = (Item1 price * Item1 quantity) + (Item2 price * Item2 quantity) + ...
  const totalAmount = cartItems
    .map((cartItem) => cartItem.price * cartItem.quantity)
    .reduce((total, amount) => total + amount, 0);

  return (
    <div className="cart">
      <div className="main-container">
        <div className="title-link-container">
          <h2 className="title">
            {cartItems.length > 0
              ? "Shopping Cart"
              : "Your Amazon Cart is empty."}
          </h2>
          <Link to="/products" className="link">
            &#8592; Go to Products Page
          </Link>
        </div>
        <div className="cart-items-container">
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              {...cartItem}
              stock={
                itemsCtx.items.find((item) => item._id === cartItem._id).stock
              }
            />
          ))}
        </div>
        <div className="total-price-container">
          <p className="total-price-title">{`Subtotal (${totalUnits} items):`}</p>
          <p className="total-price-value">
            <span>$</span>
            {totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
