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

  const startChrono = () => {
    setActivo(true);
  };
  const stopChrono = () => {
    setActivo(false);
  };
  const resetChrono = () => {
    setActivo(false);
    setTiempo(0);
  };
  return (
    <div className="chrono">
      <h1>Chrono</h1> <h2>{tiempo} secs</h2>
      <div className="buttons-chrono">
      <Button
        onClick={startChrono}
        variant="outlined"
        style={{ marginRight: "10px" }}
      >
        Go!
      </Button>
      <Button
        onClick={stopChrono}
        variant="outlined"
        style={{ marginRight: "10px" }}
      >
        Stop!
      </Button>
      <Button onClick={resetChrono} variant="outlined">
        Reset
      </Button>
      </div>
    </div>
  );
};
export default Chrono;
