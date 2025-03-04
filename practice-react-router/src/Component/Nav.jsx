import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <div className="logo">Logo</div>
      <div>
        <ul className="lists">
          <li className="list-items">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="list-items">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="list-items">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
