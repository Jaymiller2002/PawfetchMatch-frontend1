import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Header.css";

function Header() {
  return (
    <div className="header-links">
      <Link to="/" className="header-link">
        <i className="fa-solid fa-paw"></i>
      </Link>
      <Link to="/" className="header-link">Home</Link>
      <Link to="/login" className="header-link">Login</Link>
      <Link to="/ListingPage" className="header-link">Make Listing</Link>
      <Link to="/Profile" className="header-link">Profile</Link>
      <LogoutButton />
    </div>
  );
}

export default Header;
