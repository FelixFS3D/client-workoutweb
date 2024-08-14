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
import SelectWorkouts from "./SelectWorkouts";

function CreateModalRoutine() {

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ name, setName ] = useState("")
  const [ level, setLevel ] = useState("")
  const [ series, setSeries ] = useState("")
  const [ rest, setRest ] = useState("")
  const [ workouts, setWorkouts ] = useState("")
 


  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async (event) => {
    event.preventDefault()

    const newRoutine = {
      name,
        level,
        series,
        rest,
        workouts
    }

    try {
        await service.post("/routines", newRoutine)
        navigate("/routines")
    } catch (error) {
        console.log(error)
        navigate("/error")
    }
  }
  const handleNameCreate = (event) => setName(event.target.value)
  const handleLevelCreate = (event) => setLevel(event.target.value)
  const handleSeriesCreate = (event) => setSeries(event.target.value)
  const handleRestCreate = (event) => setRest(event.target.value)
  const updateWorkouts = (workouts) => {
    setWorkouts(workouts)
  } // Levantar estado
  


  const handleClickAndSave = async (event) => {
    event.preventDefault();
    await handleCreate(event);
   handleClose()
}

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Routines
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
        <DialogTitle>Creating Routine</DialogTitle>
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
                id="outlined-name-input"
                label="Name"
                color="limes"
                onChange={handleNameCreate}
              />
              <TextField
                id="outlined-level-input"
                label="Level"
                color="limes"
                onChange={handleLevelCreate}
              />
              <TextField
                id="outlined-series-input"
                label="Series"
                color="limes"
                onChange={handleSeriesCreate}
              />

              <TextField
                id="outlined-rest-input"
                label="Rest"
                color="limes"
                  onChange={handleRestCreate}
              />



             <SelectWorkouts updateWorkouts={updateWorkouts}/>




              {errorMessage && <p>{errorMessage}</p>}
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

export default CreateModalRoutine;
