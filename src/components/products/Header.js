import logo from "../../assets/amazon-logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../../store/cartContext";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const noOfCartItems = cartItems
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");
  };

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
      <div className="cart-logout-container">
        <div className="cart-icon-container">
          <Link to="/cart" className="link">
            <FiShoppingCart className="cart-icon" />
          </Link>
          <div className="cart-items-indicator">
            <p>{noOfCartItems}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-logout"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
