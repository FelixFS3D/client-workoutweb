import React from "react";

import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";

import { styled } from "@mui/system";
import clsx from "clsx";
function SignUp() {
  return (
    <div>
      <FormName />
      <FormEmail />
      <FormPassword />
      <FormReEnterPassword />
      <br />
      <Button>Create account</Button>
    </div>
  );
}
function FormName() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl value={value} onChange={handleChange} required>
      <Label>Name</Label>
      <StyledInput placeholder="Write your name here" />
      <HelperText />
    </FormControl>
  );
}
function FormEmail() {
  return (
    <FormControl required>
      <Label>Email</Label>
      <StyledInput placeholder="Write your email here" />
      <HelperText />
    </FormControl>
  );
}
function FormPassword() {
  return (
    <FormControl required>
      <Label>Password</Label>
      <StyledInput placeholder="Write your password here" />
      <HelperText />
    </FormControl>
  );
}
function FormReEnterPassword() {
  return (
    <FormControl required>
      <Label>Re-enter-password</Label>
      <StyledInput placeholder="Rewrite your password here" />
      <HelperText />
    </FormControl>
  );
}
const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${grey[300] };
    background: ${grey[900] };
    border: 1px solid ${ grey[700] };
    box-shadow: 0px 2px 2px ${
     grey[900]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        blue[600] 
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#CFFCE2",
  200: "#A0F9C5",
  400: "#48D995",
  500: "#3BC47E",
  600: "#32AC6D",
  900: "#094036",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `
);
export default SignUp;
