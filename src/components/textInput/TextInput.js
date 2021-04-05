import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function TextInput({
  half,
  name,
  handleChange,
  label,
  autoFocus,
  type,
  required,
  id,
  defaultValue,
  InputLabelProps,
  handleShowPassword,
  error,
  errorMsg,
  value,
}) {
  return (
    <Grid item sm={half ? 6 : 12} xs={12}>
      <TextField
        id={id}
        defaultValue={defaultValue}
        InputLabelProps={InputLabelProps}
        name={name}
        onChange={handleChange}
        variant="outlined"
        required={required}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={error}
        value={value}
        InputProps={
          (name === "password" || name === "confirmPassword") && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
      {error ? (
        <p style={{ color: "red", fontSize: 12 }}>{errorMsg}</p>
      ) : (
        <p></p>
      )}
    </Grid>
  );
}

export default TextInput;
