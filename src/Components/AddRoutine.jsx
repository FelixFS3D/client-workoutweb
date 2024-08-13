import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";


function AddRoutine(props) {

  const [routines, setRoutines] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
const navigate = useNavigate();

  const handleAddRoutine = async (event) => {
    event.preventDefault();

    const addRoutine = {
      routines: routines._id,
    };

    try {
      await service.patch(`/users/routine`, addRoutine);
      setRoutines()
      navigate("/routines");
    } catch (error) {
      console.log(error);
    //   navigate("/error");
    }
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleAddRoutine}>Add Routine</Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddRoutine;
