import { useState } from "react";
import logo from "./../assets/Amazon_logo.webp";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="main-container">
        <div className="title-container">
          <h2 className="title">Sign in</h2>
        </div>
        <div className="form-user-container">
          <form className="form-user">
            <div className="form-username-container">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" />
            </div>
            <div className="form-password-container">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" />
            </div>
            <button type="submit" className="btn-auth--primary">
              Continue
            </button>
            <div className="devider">
              <h5>New to Amazon?</h5>
            </div>
            <button type="submit" className="btn-auth--secondary">
              Create your Amazon account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
