import React from "react";
import "./Nav.css";

function Hero(props) {
  return (
    <div className="img-cont">
      <img
        className="img"
        src={"https://images.pexels.com/photos/" + props.image}
        alt="image not loaded"
      />
      <h3 className="img-title">{props.title}</h3>
      <h4 className="img-title">{"Selling Price  " + props.price + " Rs"}</h4>
    </div>
  );
}

export default Hero;
