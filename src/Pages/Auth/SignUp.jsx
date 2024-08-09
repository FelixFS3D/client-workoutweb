import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  palette: {
    limes: {
      light: '#CFFCE2', // muy claro y suave, adecuado para fondos o elementos con bajo contraste
      hovers: '#A0F9C5', // un tono más claro para hover effects
      main: '#48D995', // principal. verde lima
      forButtons: '#3BC47E', // ligeramente más oscuro que el principal, ideal para botones o elementos interactivos
      dark: '#32AC6D', // tono oscuro que mantiene el contraste
      contrastText: '#094036', // textos o elementos de alto contraste.
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#3BC47E',  // Color del label por defecto
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#32AC6D',  // Color del label cuando está enfocado
          },
          '& .MuiOutlinedInput-root': {
            '& input::placeholder': {
              color: '#fff',  // Color del placeholder
            },
            '& input': {
              color: '#fff',  // Color del texto ingresado
            },
            '& fieldset': {
              borderColor: '#48D995',  // Color del borde por defecto
            },
            '&:hover fieldset': {
              borderColor: '#A0F9C5',  // Color del borde al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#32AC6D',  // Color del borde cuando está enfocado
            },
          },
        },
      },
    },
  },
});
function SignUp() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      name,
      password,
    };
    //CONTACTAR AL BACK-END PARA CREAR EL USUARIO

    try {
      await service.post("/auth/signup", newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        onSubmit={handleSignup}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            onChange={handleNameChange}
            id="outlined-name-input"
            label="Name"
            color="limes"
          />
            <TextField
              onChange={handleEmailChange}
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              color="limes"
            />
          <TextField
            onChange={handlePasswordChange}
            id="outlined-password-input"
            label="Password"
            type="password"
            color="limes"
            />
          <TextField
            id="outlined-reenter-input"
            label="Password"
            type="password"
            color="limes"
          />
          <Button type="submit" variant="contained" color="limes">
            Create Account
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default SignUp;
