import React from "react";
import ReactDOM from "react-dom/client";

// const heading = React.createElement(
//     "h1",
//     {id: "heading"},
//     "Namaste React"
// );

// jsx
const heading = <h1>Namaste React using jsx🚀🚀</h1>;

// React Element
const head =(
 <h1 className="head">Namaste React using jsx🚀🚀</h1>
);

const react_element = <span>React Element </span>

const TitleComponent = () =>{
    return <h1>Namaste React This is title component     In curly we write js {react_element} </h1>
}

// React Functional Component
// const headingComponent = () => <h1>Namaste React using React Functional Component</h1>;


const headingComponent = () =>{
    return <div>
        <h1>Namaste React using React Functional Component</h1>
        {600*10}
        <div><TitleComponent/></div>   
        {/* <TitleComponent></TitleComponent> */}
        {/* {TitleComponent()}   */}
        <h2>{react_element}Hey React</h2>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(heading);
root.render(headingComponent());
// root.render(<headingComponent />);