import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";


function AddRoutine(props) {

    console.log(props.loggedUserId)
  const [routines, setRoutines] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();

    const newRoutine = {
      routines: routines,
    };

    try {
      await service.patch(`/users/${props.loggedUserId}`, newRoutine);
      navigate("/routines");
    } catch (error) {
      console.log(error);
    //   navigate("/error");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleCreate}>Add Routine</Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddRoutine;
