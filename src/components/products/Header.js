import logo from "../../assets/amazon-logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../store/cartContext";

const Header = ({ onSearch }) => {
  const cartCtx = useContext(CartContext);

  const noOfCartItems = cartCtx.cartItems
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <form className="form-search">
        <label htmlFor="search" className="label-search">
          <BsSearch className="search-icon" />
        </label>
        <input
          type="search"
          id="search"
          className="input-search"
          placeholder="Search Amazon.in"
          onChange={(e) => {
            const enteredString = e.target.value.trim();
            onSearch(enteredString);
          }}
        />
      </form>
      <div className="cart-icon-container">
        <Link to="/cart" className="link">
          <FiShoppingCart className="cart-icon" />
        </Link>
        <div className="cart-items-indicator">
          <p>{noOfCartItems}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
