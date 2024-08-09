import React from "react";
import NavBar from "../Components/NavBar";

function Home() {
  return (
    <div className="main-background">
      <NavBar />
      <h1>BUILD YOUR ROUTINES</h1>
      <h4>Get fit from anywhere</h4>
      <div className="opinions-container">
        <h3>OPINIONS</h3>
      </div>
      <div className="discover-container">
        <h3>SIGN UP"</h3>
        <h5>Discover daily routines that will improve your fitness</h5>
      </div>
    </div>
  );
}

export default Home;
