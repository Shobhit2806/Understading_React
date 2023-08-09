import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <>
      <div className="header flex justify-between bg-pink-100 shadow-lg">
        <div className="logo-container">
          <img className="w-24" src={LOGO_URL} alt="" />
        </div>
        <div className="nav-items flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">Home</li>
            <Link to="/about">
              <li className="px-4">About Us</li>
            </Link>
            <li className="px-4">Contact Us</li>
            <li className="px-4">Cart</li>
            <Link to="/grocery">
              <li className="px-4">Grocery</li>
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
