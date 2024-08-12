import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import service from "../service/service.config";
import { useState } from "react";

function EditModalWorkout(props) {

  const [open, setOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [workout, setWorkout] = useState(props.eachWorkout.workout);
  const [muscle, setMuscle] = useState(props.eachWorkout.muscle);
  const [reps, setReps] = useState(props.eachWorkout.reps);
  const [videoDemo, setVideoDemo] = useState(props.eachWorkout.videoDemo);

  const params = useParams();

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditWorkout = async (event) => {
    event.preventDefault();
    const updateWorkout = {
      workout,
      muscle,
      reps,
      videoDemo,
    };
    try {
      await service.put(`/workouts/${props.eachWorkout._id}`, updateWorkout);
      navigate("/trainer");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
        // console.log(error)
      }
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      await service.delete(`/workouts/${props.eachWorkout._id}`)
      handleClose();
      props.getWorkouts()
    } catch (error) {
      navigate("/error")
    }
  }

  const handleWorkoutEdit = (event) => setWorkout(event.target.value);
  const handleMuscleEdit = (event) => setMuscle(event.target.value);
  const handleRepsEdit = (event) => setReps(event.target.value);
  const handleVideoDemoEdit = (event) => setVideoDemo(event.target.value);
  
  const handleClickAndSave = async (event) => {
    event.preventDefault();
    await handleEditWorkout(event); // la función necesita saber qué datos se ingresan en el formulario
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit WorkOut
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Workout</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-workout-input"
                label="Workout"
                color="limes"
                value={workout}
                onChange={handleWorkoutEdit}
              />
              <TextField
                id="outlined-muscle-input"
                label="Muscle"
                color="limes"
                value={muscle}
                onChange={handleMuscleEdit}
              />
              <TextField
                id="outlined-reps-input"
                label="Reps"
                color="limes"
                value={reps}
                onChange={handleRepsEdit}
              />
              <TextField
                id="outlined-videoDemo-input"
                label="URL Video"
                color="limes"
                value={videoDemo}
                onChange={handleVideoDemoEdit}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickAndSave}>Save</Button>
          <Button onClick={handleDeleteWorkout}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default EditModalWorkout;