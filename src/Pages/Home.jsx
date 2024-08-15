import React from "react";
import NavBar from "../Components/NavBar";
import myImage from "../images/main_byw.jpg";
import myImage2 from "../images/gym2-byw.jpg";
import avatar1 from "../images/avatar1.webp";
import avatar2 from "../images/avatar2.webp";
import avatar3 from "../images/avatar3.jpg";
import avatar4 from "../images/avatar4.webp";
import image1 from "../images/women.jpeg"
import image2 from "../images/mancuernas.jpg"
import image3 from "../images/estiramiento.webp"
import footer from "../images/equipment.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleNavigate = async () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="main-background"
        style={{
          backgroundImage: `url(${myImage})`,
        }}
      >
        <NavBar />
        <h1>
          BUILD ROUTINES<span id="h1-white">AND STAY FIT</span>
        </h1>
        <button className="signup" onClick={handleNavigate}>Sign up</button>
      </div>
      <div className="opinions-container">
        <h3>LARGE COMMUNITY OF USERS</h3>
        <div id="op1">
          <img src={avatar1} alt="avatar1" id="avatar1" />
          <p>
            "This app has completely transformed my workout routine! The
            personalized plans keep me motivated, and I've seen significant
            improvements in my fitness. Highly recommend it to anyone looking to
            stay on track with their exercise goals."
            <br /><span>- <br />Casper Berkley</span>
          </p>
        </div>
        <div id="op2">
          <img src={avatar2} alt="avatar2" id="avatar2" />
          <p>
            "Using this web app has made it so much easier to stay consistent
            with my workouts. The variety of routines keeps things fresh, and
            the easy-to-follow instructions make it perfect for all fitness
            levels. It's a game-changer!"<br /><span>- <br />Olivia Wentworth</span>
          </p>
        </div>
        <div id="op3">
          <img src={avatar3} alt="avatar3" id="avatar3" />
          <p>
            "I've tried several fitness apps, but this one stands out for its
            simplicity and effectiveness. The ability to track progress and
            adjust routines based on my goals has kept me engaged and committed.
            A must-try for fitness enthusiasts!
            <br /><span>- <br />Chidi Eze</span>
          </p>
        </div>
        <div id="op4">
          <img src={avatar4} alt="avatar4" id="avatar4" />
          <p>
            "This app is like having a personal trainer in your pocket! The
            detailed exercise plans are tailored to my needs, and the progress
            tracking keeps me motivated. It's the best fitness tool I've used so
            far."
            <br /><span>- <br />Parker Willis</span>
          </p>
        </div>
      </div>
      <div className="our-workout-routines-container"
        style={{
          backgroundImage: `url(${myImage2})`,
        }}
      >
        <h1>
          OUR WORKOUT <span id="h1-white">ROUTINES</span>
        </h1>
        <button className="signup" onClick={handleNavigate}>Sign up</button>
        <div className="texts">
          <div className="text-block">
            <h3>CREATE AN ACCOUNT</h3>
            <p>
              Join our app for personalized workout routines that match your
              goals. Track your progress easily and stay motivated with a
              supportive community. Sign up now to start your fitness journey!
            </p>
          </div>
          <div className="text-block">
            <h3>CHOOSE YOUR OWN ROUTINES</h3>
            <p>
              Find a variety of daily workout routines tailored to different
              exercise types, levels, and styles. Whether you're into strength
              training, cardio, or flexibility, you'll find routines that match
              your fitness level and preferences.
            </p>
          </div>
          <div className="text-block">
            <h3>STAY FIT & HEALTHY</h3>
            <p>
              Regular exercise boosts your energy, mood, and immune system.
              Staying fit helps prevent diseases, sharpens your mind, and
              enhances your quality of life.
            </p>
          </div>
        </div>
      </div>
      <div className="signup-call">
        <h2>SIGN UP!</h2>
        <div id="container-sports-signup">
        <div id="yoga">
          <img src={image1} alt="yoga" />
          <p>YOGA</p>
        </div>
        <div id="hiit">
          <img src={image2} alt="hiit" />
          <p>HIIT</p>
        </div>
        <div id="strength">
          <img src={image3} alt="strength" />
          <p>STRENGTH</p>
        </div>
        </div>
        <button className="signup" onClick={handleNavigate}>Sign up</button>
      </div>
      <div className="footer-site" style={{
          backgroundImage: `url(${footer})`,
        }}>
          <div className="info-1">
        <h5>FÉLIX</h5>
        <a href="https://github.com/FelixFS3D">GitHub</a>
        <a href="https://www.linkedin.com/in/f%C3%A9lix-romero-gonz%C3%A1lez-731670319/">LinkedIn</a>
        <a href="felix.fs3d@gmail.com">felix.fs3d@gmail.com</a>
        </div>
        <div className="info-2">
        <h5>IÑIGO</h5>
        <a href="https://github.com/inigoestebangomez">GitHub</a>
        <a href="https://www.linkedin.com/in/inigo-esteban-gomez/">LinkedIn</a>
        <a href="iesteban7@hotmail.com">iesteban7@hotmail.com</a>
        </div>
      </div>
    </>
  );
}
export default Home;