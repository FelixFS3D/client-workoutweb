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
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectWorkouts(props) {
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
        // navigate("/error");
        console.log(error);
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
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Workouts</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value._id} label={value.workout} />
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

export default SelectWorkouts;
