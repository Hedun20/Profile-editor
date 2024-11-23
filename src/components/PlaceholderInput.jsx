import React from "react";
import ErrorMessage from "./ErrorMessage";
import { TextField } from "@mui/material";

const PlaceholderInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  label,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <TextField
        sx={{
          borderRadius: "10px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default PlaceholderInput;
