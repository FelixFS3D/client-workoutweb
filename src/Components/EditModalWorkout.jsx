import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import service from "../service/service.config";
import { useState } from "react";
import EditMuscle from "./EditMuscle";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
function EditModalWorkout(props) {
  const [open, setOpen] = useState(false);
  // cloudinary
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [workout, setWorkout] = useState(props.eachWorkout.workout);
  const [muscle, setMuscle] = useState(props.eachWorkout.muscle);
  const [reps, setReps] = useState(props.eachWorkout.reps);
  const [videoDemo, setVideoDemo] = useState(props.eachWorkout.videoDemo);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true); // to start the loading animation
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);

      setImageUrl(response.data.imageUrl);

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
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
      await service.put(`/workouts/${props.eachWorkout._id}`, updateWorkout);
      props.getWorkouts()
      navigate("/workouts");
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
  const updateMuscles = (muscle) => setMuscle(muscle);
  const handleRepsEdit = (event) => setReps(event.target.value);
  const handleVideoDemoEdit = (event) => setVideoDemo(event.target.value);
  
  const handleClickAndSave = async (event) => {
    event.preventDefault();
    await handleEditWorkout(event); // la función necesita saber qué datos se ingresan en el formulario
    handleClose();
    
  };

  return (
    <React.Fragment>
      <Button startIcon={<SaveAsOutlinedIcon/>} variant="outlined" onClick={handleClickOpen}>
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
            <div className="modal-container">
              <TextField
                id="outlined-workout-input"
                label="Workout"
                color="limes"
                value={workout}
                onChange={handleWorkoutEdit}
              />


              <EditMuscle updateMuscles={updateMuscles} />


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
              <TextField
                id="outlined-imgWork-input"
                type="file"
                name="imgWork"
                onChange={handleFileUpload}
                disabled={isUploading}
                color="limes"
              />
              {/* Mostrar mensaje de carga */}
              {isUploading ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress color="success" />
                </Stack>
              ) : null}

              {/* Mostrar vista previa de la imagen */}
              {imageUrl ? (
                <div>
                  <img src={imageUrl} alt="img" width={200} />
                </div>
              ) : null}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickAndSave} startIcon={<SaveAltOutlinedIcon />}>Save</Button>
          <Button onClick={handleDeleteWorkout} startIcon={<DeleteIcon />}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default EditModalWorkout;