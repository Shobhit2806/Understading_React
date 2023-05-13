import React from "react";
import ReactDOM from "react-dom";

// JSX => Babel transpiles it to React.createElement => React Element is nothing but JS Object => HTMLElement(render)

const jsxHeading = <h1>Hello World From React Element</h1>;

// One Way
const HeadingComponent = () => {
  return (
    <>
      <h1>Hello World from React component</h1>
      {jsxHeading}
    </>
  );
};
// Another way, both are same thing both are valid functional components
const HeadingComponent2 = () => <h1>Hello World from component</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
