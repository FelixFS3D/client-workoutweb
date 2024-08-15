import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";
import EditModalAvatar from "../Components/EditModalAvatar";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import myImage from "../images/main_byw.jpg";
function User() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate("/routines");
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
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
    navigate("/user/training");
  };

  const handleDelete = async (routineId) => {
    try {
      const response = await service.patch(`/users/routine-delete`, {
        routineId,
      }); // viene del frontend
      getUserDetails();
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
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
    );
  } else {
    if (errorMessage) {
      return <h3>Error: {errorMessage}</h3>;
    }
    return (
      <div>
        <NavBar user={user} />
        <div
          className="user-background"
          style={{
            backgroundImage: `url(${myImage})`,
          }}
        >
          <div className="user-area">
            <div className="user-details">
              <h1>Welcome <span>{user.name}</span></h1>
              <Button variant="outlined" onClick={handleNavigate}>
            Add New Routines
          </Button>
              <h2>My Routines</h2>
            </div>
            <div className="all-my-routines-card">
              {user.routines.map((routine, index) => (
                <div key={index} className="user-routines-card">
                  <h3>{routine.name}</h3>
                  <h4>Level:</h4>
                  <h4>{routine.level}</h4> 
                  <h4>Series:</h4>
                  <h4> {routine.series} times</h4>
                  <h4>Rest time:</h4>
                  <h4>{routine.rest} secs/serie</h4>
                  <h4>Workouts:</h4>
                  <h4>{routine.workouts.workout}</h4>
                  {routine.workouts.map((eachWorkout, index) => {
                    return (
                      <li key={index}>
                        {eachWorkout.workout} - {eachWorkout.reps} reps
                      </li>
                    );
                  })}
                  <br />
                  <div className="button-user">
                    <Button
                      variant="outlined"
                      startIcon={<AlarmIcon />}
                      onClick={handleTraining}
                    >
                      Let´s go!
                    </Button>
                    <p></p>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(routine._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
