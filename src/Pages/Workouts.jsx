import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import EditModalWorkout from "../Components/EditModalWorkout";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

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
      console.log(response.data);
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // navigate("/error");
      }
    }
    if (workouts === null) {
      return <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>;
    } else {
    }
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
  };
  return (
    <div>
      <NavBar />
      <h1>WORKOUTS</h1>
      <br />
      {workouts.map((eachWorkout, index) => {
        console.log(eachWorkout);
        return (
          <div key={index}>
            <h4>Workout: {eachWorkout.workout}</h4>
            <h4>Muscle: </h4>
            {eachWorkout.muscle.map((eachMuscle, index) => {
              return <li key={index}>{eachMuscle}</li>;
            })}
            <h4>Reps: {eachWorkout.reps}</h4>
            <img
              src={eachWorkout.imgWork}
              alt="Workout image"
              style={{ height: 150 }}
            />
            <br />
            <EditModalWorkout
              eachWorkout={eachWorkout}
              getWorkouts={getWorkouts}
            />
          </div>
        );
      })}
    </div>
  );
}
export default Workouts;
