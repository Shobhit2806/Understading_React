const parent = React.createElement(
  "div",
  { id: "parent",class:"parentClass" },
  React.createElement("div", {}, [
    React.createElement("h1", {}, "Hey I am nested h1 tag "),
    React.createElement("h1", {}, "Hey I am sibling inside parent container "),
  ])
); 

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello World from React"
);

// React.createElement returns JS object.
// Heading is an object consisting props.Check in console.

// See it will give obj in console not html element
console.log(heading);

const root = ReactDOM.createRoot(document.getElementById("root"));

// heading is just an object yet
// Render method is basically responsible for take this object and convert it into the heading tag and put it upon the DOM

// root.render(heading);
root.render(parent);
