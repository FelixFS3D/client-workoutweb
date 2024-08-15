import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import service from "../service/service.config";
import { useState } from "react";


function EditModalAvatar(props) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
  const handleCreate = async (event) => {
    event.preventDefault();
    const newAvatar = {
      imgUser: imageUrl,
    };
    try {
      await service.patch("/users/avatar", newAvatar);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  const handleClickAndSave = async (event) => {
    event.preventDefault();
    await handleCreate(event); // la función necesita saber qué datos se ingresan en el formulario
    // props.getUserDetails()
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant = "avatar"onClick={handleClickOpen}>
        Edit Avatar
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
        <DialogTitle className="edit-avatar-title" sx= {{
         
        }}>Edit Avatar</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              "& .MuiText-root": {textTransform: "capitalize"},
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-imgUser-input"
                type="file"
                name="imgUser"
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
          <Button onClick={handleClickAndSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditModalAvatar;
