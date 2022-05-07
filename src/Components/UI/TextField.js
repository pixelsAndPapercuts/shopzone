import React from "react";

import TextField from "@mui/material/TextField";

import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <TextField
        sx={{
          width: "100%",
          marginY: "15px",
        }}
        {...field}
        {...props}
        label={label}
        variant="standard"
        inputProps={{
          sx: {
            color: "white",
            height: "30px",
            borderBottom: "1px solid white",
          },
        }}
        InputProps={{
          sx: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
            },
          },
        }}
        InputLabelProps={{
          sx: { color: "text.secondary" },
        }}
        FormHelperTextProps={{
          sx: { color: "error.main" },
        }}
        helperText={
          <ErrorMessage
            component="span"
            name={field.name}
            style={{ position: "absolute" }}
          />
        }
      />
    </div>
  );
};

export default InputField;
