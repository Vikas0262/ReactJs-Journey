// React.createElement(return Object) =>  HTML Browser Understand
// React.createElement() => Take three parameter 1st tag name 2nd id or class 3rd is child name

// const heading = React.createElement(
//     "h1",
//     { id: "heading", demo: "xyz" },
//     "Hello World from react, But this another file");
// console.log(heading);



// we make arry for makeing sibling 
const parent = React.createElement("div", { id: "parent" }, 
    React.createElement("div", { id: "child" }, 
        [React.createElement("h1",{},"Heading 1"),
            React.createElement("h2",{},"Heading 2"),
            React.createElement("h3",{},"Heading 3")
        ]
    ));


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
root.render(parent);