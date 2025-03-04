import Nav from "./Component/Nav";
// import Main from "./Component/Home";
import Contact from "./Component/Footer";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      {/* <Main /> */}
      <Outlet />
      <Contact />
    </>
  );
}

export default App;
