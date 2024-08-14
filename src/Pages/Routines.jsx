import React, { useState, useEffect, useContext } from "react";
import NavBar from "../Components/NavBar";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import EditModalRoutine from "../Components/EditModalRoutine"
import AddRoutine from "../Components/AddRoutine"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../context/auth.context";

function Routines() {
  const { isLoggedIn , isAdmin } = useContext(AuthContext)
  const [routines, setRoutines] = useState([]);
  
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getRoutines();
  }, []);
  const getRoutines = async () => {
    try {
      const response = await service.get("/routines");
      console.log(response.data);
      setRoutines(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
        console.log(error);
      }
    }
    if (routines === null) {
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
      <h1>Routines</h1>
      <br />
      {routines.map((eachRoutine, index) => {
        console.log(eachRoutine);
        return (
          <div key={index} className="routines-container">
            <h4>Level: {eachRoutine.level}</h4>
            <h4>Series: {eachRoutine.series}</h4>
            <h4>Rest: {eachRoutine.rest}</h4>
            <h4>Workouts:</h4>
            {eachRoutine.workouts.map((eachWorkout, index) => {
              return(
                <li key={index}>{eachWorkout.workout} - {eachWorkout.reps} reps</li>
              )
            })}
            <br />
            {isAdmin && <EditModalRoutine eachRoutine={eachRoutine} getRoutines={getRoutines} />}
            <AddRoutine routineId = {eachRoutine._id}/>
          </div>
        );
      })}
    </div>
  );
}

export default Routines;
