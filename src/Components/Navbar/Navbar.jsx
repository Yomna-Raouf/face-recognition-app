import React from "react";
import "./Navbar.css";

const Navbar = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav className="Navbar">
      <button
        onClick={() => onRouteChange("signIn")}
        className="Navbar__signout"
      >
        Sign out
      </button>
    </nav>
  ) : (
    <nav className="Navbar">
      <button
        onClick={() => onRouteChange("register")}
        className="Navbar__Register"
      >
        Register
      </button>
      <button
        onClick={() => onRouteChange("signIn")}
        className="Navbar__signout"
      >
        Sign in
      </button>
    </nav>
  );
};

export default Navbar;
