import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        locality: "Default",
      },
    };

    // console.log("Child Constructor is called");
  }

  async componentDidMount() {
    // console.log("Child Component Did Mount");
    const userData = await fetch(" https://api.github.com/users/Shobhit2806");
    const userJson = await userData.json();
    console.log(userJson);
    this.setState({
      userInfo:userJson,
    });
  }

  // render method will returns a piece of jsx which will be rendered o UI
  render() {
    // console.log("Child  Render is called");
    const { name, location } = this.state.userInfo;
    // const { count, count2 } = this.state;
    return (
      <div className="user-card">
        {/* <h1>Count: {count}</h1> */}
        {/* <button
          onClick={() => {
            this.setState({count:this.state.count+1})

            // NEVER UPDATE STATE VARIABLE DIRECTLY. WHY?
            // this.state.count += 1;
          }}
        >
          Increase Count
        </button> */}
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;
