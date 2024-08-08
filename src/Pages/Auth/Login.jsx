import React from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { FormControl, useFormControlContext } from "@mui/base/FormControl";
// import { Input, inputClasses } from "@mui/base/Input";
// import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
// import { styled } from "@mui/system";
// import clsx from "clsx";

import Button from '@mui/material/Button'
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
    <ThemeProvider theme={theme}>
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
      <Button type="submit" variant="contained" color="limes">Login</Button>
      {errorMessage && <p>{errorMessage}</p>}
</div>
      </Box>
      </ThemeProvider>

      // <form onSubmit={handleLogin}>
      //   <FormEmail handleEmailChange={handleEmailChange} />
      //   <FormPassword handlePasswordChange={handlePasswordChange} />
      //   <br />
      //   <Button type="submit">Login</Button>
      //   {errorMessage && <p>{errorMessage}</p>}
      // </form>
    
  );
}
// function FormEmail({ handleEmailChange }) {
//   return (
//     <FormControl required>
//       <Label>Email</Label>
//       <StyledInput
//         onChange={handleEmailChange}
//         type="email"
//         placeholder="Write your email here"
//       />
//       <HelperText />
//     </FormControl>
//   );
// }
// function FormPassword({ handlePasswordChange }) {
//   return (
//     <FormControl required>
//       <Label>Password</Label>
//       <StyledInput
//         onChange={handlePasswordChange}
//         type="password"
//         placeholder="Write your password here"
//       />
//       <HelperText />
//     </FormControl>
//   );
// }
// const StyledInput = styled(Input)(
//   () => `

//   .${inputClasses.input} {
//     width: 320px;
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     font-weight: 400;
//     line-height: 1.5;
//     padding: 8px 12px;
//     border-radius: 8px;
//     color: ${grey[300]};
//     background: ${grey[900]};
//     border: 1px solid ${grey[700]};
//     box-shadow: 0px 2px 2px ${grey[900]};

//     &:hover {
//       border-color: ${blue[400]};
//     }

//     &:focus {
//       outline: 0;
//       border-color: ${blue[400]};
//       box-shadow: 0 0 0 3px ${blue[600]};
//     }
//   }
// `
// );

// const Label = styled(({ children, className }) => {
//   const formControlContext = useFormControlContext();
//   const [dirty, setDirty] = React.useState(false);

//   React.useEffect(() => {
//     if (formControlContext?.filled) {
//       setDirty(true);
//     }
//   }, [formControlContext]);

//   if (formControlContext === undefined) {
//     return <p>{children}</p>;
//   }

//   const { error, required, filled } = formControlContext;
//   const showRequiredError = dirty && required && !filled;

//   return (
//     <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
//       {children}
//       {required ? " *" : ""}
//     </p>
//   );
// })`
//   font-family: "IBM Plex Sans", sans-serif;
//   font-size: 0.875rem;
//   margin-bottom: 4px;

//   &.invalid {
//     color: red;
//   }
// `;

// const HelperText = styled((props) => {
//   const formControlContext = useFormControlContext();
//   const [dirty, setDirty] = React.useState(false);

//   React.useEffect(() => {
//     if (formControlContext?.filled) {
//       setDirty(true);
//     }
//   }, [formControlContext]);

//   if (formControlContext === undefined) {
//     return null;
//   }

//   const { required, filled } = formControlContext;
//   const showRequiredError = dirty && required && !filled;

//   return showRequiredError ? <p {...props}>This field is required.</p> : null;
// })`
//   font-family: "IBM Plex Sans", sans-serif;
//   font-size: 0.875rem;
// `;

// const blue = {
//   100: "#CFFCE2",
//   200: "#A0F9C5",
//   400: "#48D995",
//   500: "#3BC47E",
//   600: "#32AC6D",
//   900: "#094036",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E5EAF2",
//   200: "#DAE2ED",
//   300: "#C7D0DD",
//   400: "#B0B8C4",
//   500: "#9DA8B7",
//   600: "#6B7A90",
//   700: "#434D5B",
//   800: "#303740",
//   900: "#1C2025",
// };

// const Button = styled(BaseButton)(
//   ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 600;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   background-color: ${blue[500]};
//   padding: 8px 16px;
//   border-radius: 8px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   border: 1px solid ${blue[500]};
//   box-shadow: 0 2px 1px ${
//     theme.palette.mode === "dark"
//       ? "rgba(0, 0, 0, 0.5)"
//       : "rgba(45, 45, 60, 0.2)"
//   }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

//   &:hover {
//     background-color: ${blue[600]};
//   }

//   &.${buttonClasses.active} {
//     background-color: ${blue[700]};
//     box-shadow: none;
//     transform: scale(0.99);
//   }

//   &.${buttonClasses.focusVisible} {
//     box-shadow: 0 0 0 4px ${
//       theme.palette.mode === "dark" ? blue[300] : blue[200]
//     };
//     outline: none;
//   }

//   &.${buttonClasses.disabled} {
//     background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
//     border: 0;
//     cursor: default;
//     box-shadow: none;
//     transform: scale(1);
//   }
//   `
// );

export default Login;
