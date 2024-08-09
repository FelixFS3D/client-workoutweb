import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import service from "../service/service.config";
import { useState } from "react";

function CreateModalWorkout() {
  const [open, setOpen] = React.useState(false);
  // cloudinary
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create WorkOut
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
        <DialogTitle>Creating Workout</DialogTitle>
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
              />
              <TextField
                id="outlined-muscle-input"
                label="Muscle"
                color="limes"
              />
              <TextField id="outlined-reps-input" label="Reps" color="limes" />
              <TextField
                id="outlined-videoDemo-input"
                label="URL Video"
                color="limes"
              />
              <TextField
                id="outlined-imgWork-input"
                label="Select Image"
                color="limes"
                onClick={() =>
                  document.getElementById("file-upload-input").click()
                } // Activar input oculto
                InputProps={{
                  endAdornment: (
                    <input
                      type="file"
                      id="file-upload-input"
                      name="image"
                      onChange={handleFileUpload}
                      style={{ display: "none" }} // Ocultar el input
                      disabled={isUploading}
                    />
                  ),
                }}
              />
              {/* Mostrar mensaje de carga */}
              {isUploading ? <h3>... uploading image</h3> : null}

              {/* Mostrar vista previa de la imagen */}
              {imageUrl ? (
                <div>
                  <img src={imageUrl} alt="img" width={200} />
                </div>
              ) : null}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateModalWorkout;
