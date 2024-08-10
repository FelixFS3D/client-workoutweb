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

function EditModalWorkout({id}) {
  const [open, setOpen] = useState(false);
  // cloudinary
  const [imageUrl, setImageUrl] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [workout, setWorkout] = useState("");
  const [muscle, setMuscle] = useState("");
  const [reps, setReps] = useState("");
  const [videoDemo, setVideoDemo] = useState("");
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
      imgWork: imageUrl,
    };
    try {
      await service.put("/workouts", updateWorkout);

      navigate("/trainer");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  useEffect(() => {
    console.log(id);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/workout/${params.id}`);

      setWorkout(response.data.workout);
      setMuscle(response.data.muscle);
      setReps(response.data.reps);
      setVideoDemo(response.data.videoDemo);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // navigate("/error");
        console.log(error);
      }
    }
  };
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
                onChange={handleWorkoutEdit}
              />
              <TextField
                id="outlined-muscle-input"
                label="Muscle"
                color="limes"
                onChange={handleMuscleEdit}
              />

              <TextField
                id="outlined-reps-input"
                label="Reps"
                color="limes"
                onChange={handleRepsEdit}
              />
              <TextField
                id="outlined-videoDemo-input"
                label="URL Video"
                color="limes"
                onChange={handleVideoDemoEdit}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickAndSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditModalWorkout;
