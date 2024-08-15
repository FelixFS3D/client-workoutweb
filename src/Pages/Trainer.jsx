import React from "react";
import NavBar from "../Components/NavBar";
import CreateModalWorkout from "../Components/CreateModalWorkout";
import CreateModalRoutine from "../Components/CreateModalRoutine";
import myImage from "../images/main_byw.jpg";
function Trainer() {
  return (
  <div>
    <NavBar />
      <div className="trainer-background"
        style={{
          backgroundImage: `url(${myImage})`,
        }}
      >
       
      <div className="card-trainer-area">
      <br />
      <h1 >Trainer Area</h1>
      <h3><span id="green" >Create</span><span id="white">Workouts</span></h3>
      <br />
      <h4>To create a workout, you need to fill out the following fields:</h4>
       <br />
      
       <li>Workout: Choose the name of the exercise.</li>
      <li>
        Muscle: From the dropdown menu, select all the muscles that the exercise
        involves.
      </li>
      <li>Reps: Enter the number of repetitions for the exercise.</li>
      <li>URL Video: Select a URL of a video and paste it here.</li>
      <li>Image: Choose a file from your downloaded images.</li>
       
      
      <br />
      <p>Save the fields by clicking the "Save" button.</p>
      <br />
      <CreateModalWorkout />
     
      
      <br />
      
      <h3><span id="green" >Create</span><span id="white">Routines</span></h3>
      <br />
      <h4>
        To create a workout routine, you need to fill out the following fields:
      </h4>
      <br />
      <li>Level: Select the difficulty level of the routine.</li>
      <li>
      Series: Specify the number of series or sets in the routine.
      </li>
      <li>Rest: Indicate the rest period between series or exercises.</li>
      <li>Workouts: Add the individual workouts included in the routine.</li>
      <br />
      <p>Save the details by clicking the "Save" button.</p>
      <br />
      <CreateModalRoutine />
      <br />
      </div>
      </div>
      </div>
  );
}

export default Trainer;
