import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service/service.config";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function AddRoutine(props) {

  const [errorMessage, setErrorMessage] = useState(null);
const navigate = useNavigate();

  const handleAddRoutine = async (event) => {
    event.preventDefault();

    const addRoutine = {
      routineId: props.routineId // está recibiendo routineId = {eachRoutine._id}
    };

    try {
      await service.patch(`/users/routine-add`, addRoutine);
      navigate("/routines");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <Button startIcon={<AddCircleOutlineOutlinedIcon />}variant="outlined" onClick={handleAddRoutine}>Add to user </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddRoutine;
