import React, { useEffect, useState } from "react";
import service from "../service/service.config";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "#515151",
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
         color: "#c1ff72"
  };
}
function EditWorkouts(props) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [names, setNames] = useState([]);
    
    useEffect(() => {
      getWorkouts();
    }, []);
  
    console.log(personName);
    const getWorkouts = async () => {
      try {
        const response = await service.get("/workouts");
        console.log(response.data);
        setNames(response.data);
  
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage);
        } else {
          navigate("/error");
        }
      }
    };
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(value);
  
      const workoutIds = value.map((workout) => workout._id)
      props.updateWorkouts(workoutIds)  // el update pasarle el value 
    };  
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-chip-label" sx={{
            color: "#c1ff72",
          }}>Workouts</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c1ff72", // Color de borde verde
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#95cb4e", // Color de borde verde al pasar el mouse
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c1ff72", // Color de borde verde al enfocarse
              },
              "& .MuiSvgIcon-root": {
                color: "#95cb4e", // Color de la flecha
              },
              color: "#95cb4e", // Color del texto
            }}/>}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, color: "#c1ff72", // Letra del chip verde
                "&.Mui-selected": {
                  color: "#c1ff72", // Texto en verde cuando está seleccionado
                },}}>
                {selected.map((value) => (
                  <Chip key={value._id} label={value.workout} sx={{
                    backgroundColor: "#222", // Chip gris oscuro
                    color: "#c1ff72", // Letra del chip verde
                  }} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name, index) => (
              <MenuItem
                key={index}
                value={name}
                style={getStyles(name.workout, personName, theme)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "333", // Fondo gris oscuro al seleccionarse
                    color: "#4caf50", // Texto en verde cuando está seleccionado
                  },
                  "&:hover": {
                    backgroundColor: "#444", // Fondo gris claro al pasar el mouse sobre un elemento
                  },
                }}
              >
                {name.workout}
                {console.log(name.workout)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
}

export default EditWorkouts