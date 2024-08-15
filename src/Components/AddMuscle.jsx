import React, { useState } from "react";
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
const names = [
  "Abductors",
  "Adductors",
  "Biceps",
  "Calves",
  "Deltoids",
  "Erector spinae",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hip flexors",
  "Latissimus dorsi",
  "Obliques",
  "Pectorals",
  "Quadriceps",
  "Rectus abdominis",
  "Rhomboids",
  "Serratus anterior",
  "Transverse abdominis",
  "Trapezius",
  "Triceps",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        color: "#c1ff72"
  };
}
function AddMuscle(props) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    props.updateMuscles(value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            color: "#c1ff72", // Color de la letra del label
          }}
        >
          Muscle
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Chip"
              sx={{
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
              }}
            />
          }
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                color: "#c1ff72", // Letra del chip verde
                "&.Mui-selected": {
                  color: "#c1ff72", // Texto en verde cuando está seleccionado
                },
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{
                  backgroundColor: "#222", // Chip gris oscuro
                  color: "#c1ff72", // Letra del chip verde
                }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
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
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default AddMuscle;
