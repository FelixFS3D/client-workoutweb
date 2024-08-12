import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import EditModalWorkout from "../Components/EditModalWorkout";
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    getWorkouts();
  }, []);
  const getWorkouts = async () => {
    try {
      const response = await service.get("/workouts");
      console.log(response.data)
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // navigate("/error");
        console.log(error)
      }
    }
    if (workouts === null) {
      return <h3>...cargando data</h3>;
    } else {
    }
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
  };
  return (
    <div>
      <NavBar />
      {workouts.map((eachWorkout, index) => {
        console.log(eachWorkout);
        return (
          <div key={index}>
             <h4>Workout: {eachWorkout.workout}</h4>
             <h4>Muscle: {eachWorkout.muscle}</h4>
            <h4>Reps: {eachWorkout.reps}</h4>
           <img src={eachWorkout.imgWork} alt="Workout image" style={{height: 150 } }/>
           <br />
           <EditModalWorkout eachWorkout = {eachWorkout} getWorkouts={getWorkouts}/>
          </div>
        );
      })}
    </div>
  );
}
export default Workouts;