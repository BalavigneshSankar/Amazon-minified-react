import { useContext } from "react";
import { CartContext } from "../store/cartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

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
        <h2 className="title">Shopping Cart</h2>
        <Link to="/products">Products</Link>
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
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
