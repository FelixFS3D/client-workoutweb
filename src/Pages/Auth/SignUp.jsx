import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../../Components/NavBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import myImage from "../../images/main_byw.jpg";

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
    <div>
      <NavBar />
      <div
        className="signup-background"
        style={{
          backgroundImage: `url(${myImage})`,
        }}
      >
        <div className="signup-area">
          <br />
          <div className="signup-card">
            <Box
              onSubmit={handleSignup}
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="signup-container">
                <h2>
                  Join<span id="white">Us</span>
                </h2>
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
                <Button type="submit" color="limes">
                  Create Account
                </Button>
                {errorMessage && <p>{errorMessage}</p>}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
