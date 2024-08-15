import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Mui.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserWrapper } from "./context/user.context.jsx";

const theme = createTheme({
  palette: {
    limes: {
      light: "#c1ff75", // muy claro y suave, adecuado para fondos o elementos con bajo contraste
      hovers: "#95cb4e", // un tono más claro para hover effects
      main: "#48D995", // principal. verde lima
      forButtons: "#c1ff72", // ligeramente más oscuro que el principal, ideal para botones o elementos interactivos
      dark: "#32AC6D", // tono oscuro que mantiene el contraste
      contrastText: "#094036", // textos o elementos de alto contraste.
    },
  },
  typography: {
    fontFamily: "Pragmatica, Arial, sans-serif",
   
    color:`#c1ff75`
  },
  components: {


    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#333",
          color: "#FFFFFF",
        },
      },
    },
 

    MuiButton: {
      styleOverrides: {
        extenNavbar: {
          border: `transparent`,
          "&:hover": {
            backgroundColor: "transparent",

            border: "transparent",
          },
        },
        avatar: {
          backgroundColor: "transparent",
          color: "black",
          textTransform: "capitalize",
          boxShadow: "none",
          margin: 7,
          padding: 0,
          minWidth: 0,

          border: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            color: "black",
            border: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
          "& .MuiTouchRipple-root": {
            display: "none", // Elimina el ripple effect
          },
        },

        root: {
          color: `#c1ff72`,
          border: "2px solid #c1ff72",
          fontFamily: "Pragmatica",
          "&:hover": {
            backgroundColor: `#95cb4e`,
            color: `white`,
            border: "2px solid #c1ff72",
          },
        },
      },
    },
    MuiDialogTitle:{

root:{
  color:`#c1ff75`,
}

    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#c1ff72", // Color del label por defecto
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#c1ff75", // Color del label cuando está enfocado
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#515151",
            "& input::placeholder": {
              color: "#fff", // Color del placeholder
            },
            "& input": {
              color: "#c1ff75", // Color del texto ingresado
            },
            "& fieldset": {
              borderColor: "#c1ff75", // Color del borde por defecto
            },
            "&:hover fieldset": {
              borderColor: "#95cb4e", // Color del borde al hacer hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c1ff75", // Color del borde cuando está enfocado
            },
          },
        },
      },
    },
  },
  
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <UserWrapper>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </UserWrapper>
  </AuthWrapper>
);
