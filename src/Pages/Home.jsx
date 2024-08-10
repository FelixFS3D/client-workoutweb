import React from "react";
import NavBar from "../Components/NavBar";
import myImage from "../images/main_byw.jpg";
import myImage2 from "../images/gym2-byw.jpg";

function Home() {
  return (
    <>
    <div className="main-background" style={{
    backgroundImage: `url(${myImage})`,
    }}
    >
      <NavBar />
      <h1>
        BUILD ROUTINES<span id="h1-white">AND STAY FIT</span>
      </h1>
      <button className="signup">Sign up</button>
      </div>
      <div className="opinions-container">
        <h3>LARGE COMMUNITY OF USERS</h3>
        <div id="op1">
          <img src="" alt="avatar1" />
          <p>
            "This app has completely transformed my workout routine! The
            personalized plans keep me motivated, and I've seen significant
            improvements in my fitness. Highly recommend it to anyone looking to
            stay on track with their exercise goals."
            <span>- Casper Berkley</span>
          </p>
        </div>
        <div id="op2">
          <img src="" alt="avatar2" />
          <p>
            "Using this web app has made it so much easier to stay consistent
            with my workouts. The variety of routines keeps things fresh, and
            the easy-to-follow instructions make it perfect for all fitness
            levels. It's a game-changer!"<span>- Olivia Wentworth</span>
          </p>
        </div>
        <div id="op3">
          <img src="" alt="avatar3" />
          <p>
            "I've tried several fitness apps, but this one stands out for its
            simplicity and effectiveness. The ability to track progress and
            adjust routines based on my goals has kept me engaged and committed.
            A must-try for fitness enthusiasts!
            <span>- Chidi Eze</span>
          </p>
        </div>
        <div id="op4">
          <img src="" alt="avatar4" />
          <p>
            "This app is like having a personal trainer in your pocket! The
            detailed exercise plans are tailored to my needs, and the progress
            tracking keeps me motivated. It's the best fitness tool I've used so
            far."
            <span>- Parker Willis</span>
          </p>
        </div>
      </div>

      <div className="our-workout-routines-container" style={{
    backgroundImage: `url(${myImage2})`,
    }}>
        <h1>
          OUR WORKOUT<span>ROUTINES</span>
        </h1>
        <button className="signup">Sign up</button>
        <h3>CREATE AN ACCOUNT</h3>
        <p>
          Join our app for personalized workout routines that match your goals.
          Track your progress easily and stay motivated with a supportive
          community. Sign up now to start your fitness journey!
        </p>
        <h3>CHOOSE YOUR OWN ROUTINES</h3>
        <p>
          Find a variety of daily workout routines tailored to different
          exercise types, levels, and styles. Whether you're into strength
          training, cardio, or flexibility, you'll find routines that match your
          fitness level and preferences.
        </p>
        <h3>STAY FIT & HEALTHY</h3>
        <p>
          Regular exercise boosts your energy, mood, and immune system. Staying
          fit helps prevent diseases, sharpens your mind, and enhances your
          quality of life.{" "}
        </p>
      </div>

      <div className="Signup-call">
        <h2>SIGN UP!</h2>
        <div id="yoga">
          <img src="" alt="" />
          <p>YOGA</p>
        </div>
        <div id="hiit">
          <img src="" alt="" />
          <p>HIIT</p>
        </div>
        <div id="strength">
          <img src="" alt="" />
          <p>STRENGTH</p>
        </div>
        <button className="signup">Sign up</button>
      </div>

      <div className="footer-site">
        <h5>FIND US</h5>
        <a href="">GitHub</a>
        <a href="">GitHub</a>
        <h5>FOLLOW US</h5>
        <a href="">Félix</a>
        <a href="">Iñigo</a>
        <h5>CAMPO VACÍO</h5>
        <a href="">AAAAAAAA</a>
        <a href="">AAAAAAAA</a>
      </div>
      </>
  );
}

export default Home;
