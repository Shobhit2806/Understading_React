import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor is called");
  }
  componentDidMount() {
    console.log("Parent Did Mount is called");
  }

  render() {
    console.log("Parent Render is called");
    return (
      <div>
        <h1>About US</h1>
        <div>
          LoggedIN User:
          <UserContext.Consumer>
            {(data)=><h1 className="text-xl font-bold">{data.loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        {/* <User /> */}
        <UserClass name={"Shobhit from Class"} location={"Agra"} />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About US</h1>
//       {/* <User /> */}
//       <UserClass name={"Shobhit from Class"} location={"Agra"}/>
//     </div>
//   );
// };

export default About;
