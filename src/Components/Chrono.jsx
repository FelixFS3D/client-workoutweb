import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const Chrono = () => {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (activo) {
      const id = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo + 1);
      }, 1000);

      setIntervalId(id);
    } else if (!activo && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => clearInterval(intervalId);
  }, [activo]);

  const iniciarCronometro = () => {
    setActivo(true);
  };
  const pararCronometro = () => {
    setActivo(false);
  };
  const resetearCronometro = () => {
    setActivo(false);
    setTiempo(0);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chrono</h1> <h2>{tiempo} secs</h2>
      <Button
        onClick={iniciarCronometro}
        variant="outlined"
        style={{ marginRight: "10px" }}
      >
        Go!
      </Button>
      <Button
        onClick={pararCronometro}
        variant="outlined"
        style={{ marginRight: "10px" }}
      >
        Stop!
      </Button>
      <Button onClick={resetearCronometro} variant="outlined">
        Reset
      </Button>
    </div>
  );
};
export default Chrono;
