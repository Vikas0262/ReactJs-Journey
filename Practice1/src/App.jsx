import "./App.css";
import Nav from "./Component/Nav";
import Hero from "./Component/Hero";
import Footer from "./Component/Footer";

function App() {
  return (
    <>
      
      <Nav />
      <div className="hero-container">
        <Hero image="3973560/pexels-photo-3973560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="Elephent" price={5000}/>
        <Hero image="2649841/pexels-photo-2649841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="Tiger" price={10000}/>
        <Hero image="1916645/pexels-photo-1916645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" title="Zebra" price={15000}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
