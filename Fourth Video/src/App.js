import React from "react";
import ReactDOM from "react-dom/client";
import style from "../style.css";

const Header = () => {
  // let change = "login";
  return <div className="nav-container main-container">
    const [btnName, setBtnName] = useState("login")
    <div className="logo-container">
      <img className="logo" src="https://png.pngtree.com/template/20191024/ourmid/pngtree-food-delivery-logo-design-fast-delivery-service-sign-image_323015.jpg" />
    </div>
    <div className="nav-items">
      <ul className="nav-lists">
        <li className="list-items">Home</li>
        <li className="list-items">About</li>
        <li className="list-items">Contact</li>
        <li className="list-items">Cart</li>
      <button className="btn" onClick={()=> {setBtnName = "logout"}}
      >{btnName}</button>
      </ul>
    </div>
  </div>
}

// this props will be object
const RestroCard = (props) => {
  console.log(props);

  return (
    <div className="res-card">
      <img className="res-logo" src={props.img} alt="Image not load" />
      <h3>{props.title}</h3>
      <h4>{props.cusine}</h4>
      <h4>{props.price}</h4>
      <h4>{props.rating}</h4>
      <h4>{props.dTime}</h4>
    </div>
  );
}

// const ResObj = [
//   {
//     "card": {
//       title: "Meghna Foods",
//       desc: "Delicious Biryani",
//       price: 400,
//       time: "30min",
//       img: "url"
//     },
//     "card": {
//       title: "Meghna Foods",
//       desc: "Delicious Biryani",
//       price: 400,
//       time: "30min",
//       img: "url"
//     }
//   },

// ];

const Body = () => {
  return (
    <div className="body main-container">
      <div className="filter">
        <button className="filter-btn"
          onClick={() => {
            console.log("clicked");
          }}>Top rated restro</button>
      </div>
      <div className="res-container">
        <RestroCard img="https://www.licious.in/blog/wp-content/uploads/2023/01/Shutterstock_2047827035-1024x683.jpg" title="Meghna Foods" price={400} cusine="Famous Kolkata Biryani" dTime="30min" rating="4.5 star" />
        <RestroCard img="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=170667a&w=is&k=20&c=4lA5wHN1tOdZIJouP_Q9EYlc5F8KkkZ6XEK4TIDtt_A=" title="Pizza" price={300} cusine="Famous Kolkata pizza" dTime="20min" rating="5 star" />
        <RestroCard img="https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x375.jpg" title="Wada Pav" price={50} cusine="Famous Mumbai Wada Pav" dTime="20min" rating="5.5 star" />
        <RestroCard img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Wsd_V6enukgTGiZRbXhfeHJ_v21ywbMuCA&s" title="Samosa" price={40} cusine="Famous Allhabadiya Samosa" dTime="50min" rating="4.8 star" />
      </div>
    </div>
  );
}


const AppLayout = () => {
  return <div>
    <Header />
    <Body />
  </div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(AppLayout());


