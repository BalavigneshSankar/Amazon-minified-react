import logo from "../../assets/amazon-logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const Header = () => {
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
        />
      </form>
      <div className="cart-icon-container">
        <FiShoppingCart className="cart-icon" />
      </div>
    </>
  );
};

export default Header;
