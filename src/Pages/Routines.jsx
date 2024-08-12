import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import EditModalRoutine from "../Components/EditModalRoutine"
import AddRoutine from "../Components/AddRoutine"

function Routines() {
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
      <h1>Routines</h1>
      <br />
      {routines.map((eachRoutine, index) => {
        console.log(eachRoutine);
        return (
          <div key={index}>
            <h4>Level: {eachRoutine.level}</h4>
            <h4>Series: {eachRoutine.series}</h4>
            <h4>Rest: {eachRoutine.rest}</h4>
            <h4>Workouts:</h4>
            {eachRoutine.workouts.map((eachWorkout, index) => {
              return(
                <li>{eachWorkout.workout} - {eachWorkout.reps} reps</li>
              )
            })}
            <br />
            <EditModalRoutine eachRoutine={eachRoutine} getRoutines={getRoutines} />
            <AddRoutine />
          </div>
        );
      })}
    </div>
  );
}

export default Routines;
