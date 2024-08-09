import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
            backgroundColor: '#333',
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

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthWrapper>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthWrapper>
);