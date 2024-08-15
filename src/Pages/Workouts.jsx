import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import EditModalWorkout from "../Components/EditModalWorkout";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import myImage from "../images/main_byw.jpg";

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
      return (
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="success" />
        </Stack>
      );
    } else {
    }
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
  };
  return (
    <div>
      <NavBar />
      <div
        className="workouts-background"
        style={{
          backgroundImage: `url(${myImage})`,
        }}
      >
        <div className="workouts-area">
          <div>
            <h1>Workouts</h1>
          </div>

          <br />
          <div className="all-workouts-card">
            {workouts.map((eachWorkout, index) => {
              console.log(eachWorkout);
              return (
                <div key={index} className="workouts-card">
                  <h3>{eachWorkout.workout}</h3>
                  <h4>Reps:</h4>
                  <p>{eachWorkout.reps}</p>
                  <h4>Muscles: </h4>
                  {eachWorkout.muscle.map((eachMuscle, index) => {
                    return <p key={index}>· {eachMuscle}</p>;
                  })}

                  <img
                    src={eachWorkout.imgWork}
                    alt="Workout image"
                    style={{ height: 150 }}
                  />
                  <br />
                  <div className="button-workout">
                    <EditModalWorkout
                      eachWorkout={eachWorkout}
                      getWorkouts={getWorkouts}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Workouts;
