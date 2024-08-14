import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";
import EditModalAvatar from "../Components/EditModalAvatar";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

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
  const handleTraining = async () => {
    navigate("/user/training")
  }
  
  const handleDelete = async (event) => {
    event.preventDefault();
    const pullRoutine = {
    
      routineId, // está recibiendo routineId = {eachRoutine._id}
    };
    try {
      const response = await service.patch(`/users/routine-delete`);
      setUser(response.data)
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  }

  if (user === null) {
    return <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="success" />
  </Stack>;
  } else {
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
    return (
      <div>
        <NavBar user={user}/>
        <h1>User Area</h1>
        <EditModalAvatar getUserId={getUserId}/>
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
              <Button variant="outlined" onClick={handleTraining}>
                Let´s go!
              </Button>
              <Button variant="outlined" onClick={handleDelete}>
                Delete
              </Button>
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
