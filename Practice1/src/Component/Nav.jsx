import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div className="container nav">
      <div className="logo">VIKAS</div>
      <div>
        <ul className="lists">
          <li className="list-items">Home</li>
          <li className="list-items">About</li>
          <li className="list-items">Contact Us</li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
