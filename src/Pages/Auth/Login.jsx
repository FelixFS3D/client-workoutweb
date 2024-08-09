import React from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };
    try {
      const response = await service.post("/auth/login", userCredentials);
      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();
      console.log(response.data.role);
      if (response.data.role === "admin") {
        navigate("/trainer");
      } else if (response.data.role === "user") {
        navigate("/user/:userid");
      } else {
        navigate("/");
      }
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
      <Box
        onSubmit={handleLogin}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
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
            autoComplete="current-password"
            color="limes"
          />
          <Button type="submit" variant="contained" color="limes">
            Login
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </Box>
  );
}

export default Login;
