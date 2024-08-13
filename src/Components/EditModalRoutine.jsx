import React from "react";
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
import EditWorkouts from "./EditWorkouts";

function EditModalRoutine(props) {
  const [open, setOpen] = useState(false);

  const [level, setLevel] = useState(props.eachRoutine.level);
  const [series, setSeries] = useState(props.eachRoutine.series);
  const [rest, setRest] = useState(props.eachRoutine.rest);
  const [workouts, setWorkouts] = useState(props.eachRoutine.workouts);

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditRoutine = async (event) => {
    event.preventDefault();
    const updateRoutine = {
      level,
      series,
      rest,
      workouts,
    };
    try {
      await service.put(`/routines/${props.eachRoutine._id}`, updateRoutine);
      navigate("/routines");
      props.getRoutines();
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

  const handleDeleteRoutine = async () => {
    try {
      await service.delete(`/routines/${props.eachRoutine._id}`);
      handleClose();
      props.getRoutines();
      props.getRoutines();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleLevelEdit = (event) => setLevel(event.target.value);
  const handleSeriesEdit = (event) => setSeries(event.target.value);
  const handleRestEdit = (event) => setRest(event.target.value);
  const updateWorkouts = (workouts) => setWorkouts(workouts);

  const handleClickAndSave = async (event) => {
    event.preventDefault();
    await handleEditRoutine(event);
    handleClose();
  };

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Edit Routine
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
          <DialogTitle>Edit Routine</DialogTitle>
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
                  id="outlined-level-input"
                  label="Level"
                  color="limes"
                  value={level}
                  onChange={handleLevelEdit}
                />
                <TextField
                  id="outlined-series-input"
                  label="Series"
                  color="limes"
                  value={series}
                  onChange={handleSeriesEdit}
                />
                <TextField
                  id="outlined-rest-input"
                  label="Rest"
                  color="limes"
                  value={rest}
                  onChange={handleRestEdit}
                />

                <EditWorkouts updateWorkouts = {updateWorkouts}/>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickAndSave}>Save</Button>
            <Button onClick={handleDeleteRoutine}>Delete</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default EditModalRoutine;
