import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img className="logo" src={LOGO_URL} alt="" />
        </div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <Link to="/about">
              <li>About Us</li>
            </Link>
            <li>Contact Us</li>
            <li>Cart</li>
            <Link to="/grocery">
              <li>Grocery</li>
            </Link>

            <button
              onClick={() => {
                btnNameReact === "Login"
                  ? setBtnNameReact("Logout")
                  : setBtnNameReact("Login");
              }}
            >
              {btnNameReact}
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
