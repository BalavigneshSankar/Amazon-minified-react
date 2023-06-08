import logo from "../../assets/amazon-logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../../store/itemsContext";

const Error = () => {
  const itemsCtx = useContext(ItemsContext);

  return (
    <>
      <header className="header">
        <div className="main-container">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </div>
      </header>
      <main>
        <div className="main-container main-error-container">
          <p className="error">Error: {itemsCtx.error}!</p>
          <Link to="/auth" className="login-link">
            Got to Login
          </Link>
        </div>
      </main>
    </>
  );
};

export default Error;
