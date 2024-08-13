import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";

function User() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate("/routines");
  };
  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const response = await service.get("/users/own");
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (user === null) {
    return <h3>...cargando data</h3>;
  } else {
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
    return (
      <div>
        <NavBar />
        <h1>User Area</h1>
        <br />
        <h2>My Routines</h2>
        <div className="user-routines-container">
          {user.routines.map((routine, index) => (
            <div key={index}>
              <h3>Routine:</h3>
              <h4>Level: {routine.level}</h4>
              <h4>Series: {routine.series} times</h4>
              <h4>Rest time: {routine.rest} secs/serie</h4>
              <h4>Workouts: {routine.workouts.workout}</h4>
              {routine.workouts.map((eachWorkout, index) => {
                return(
                  <li key={index}>{eachWorkout.workout} - {eachWorkout.reps} reps</li>
                )
              })}
              <br />
            </div>
          ))}
        </div>
        <Button variant="outlined" onClick={handleNavigate}>
          Add New Routines
        </Button>
      </div>
    );
  }
}
export default User;
