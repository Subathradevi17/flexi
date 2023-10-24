import React from "react";
import {
  TextField,
  Select,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

// Text Field
const Textfield = React.forwardRef(
  ({ label, error, required, helperText, ...props }, ref) => (
    <TextField
      fullWidth
      autoComplete='off'
      inputRef={ref}
      label={label}
      value={props.value}
      inputMode={props.inputMode}
      error={error}
      required={required}
      helperText={helperText}
      {...props}
    />
  )
);

Textfield.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  helperText: PropTypes.string,
};

// Select
const SelectField = React.forwardRef(
  ({ label, error, required, helperText, options, ...props }, ref) => (
    <FormControl fullWidth error={error}>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        fullWidth
        inputRef={ref}
        label={label}
        error={error}
        required={required}
        {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Checkbox
const CheckboxField = React.forwardRef(
  ({ label, error, required, helperText, ...props }, ref) => (
    <Checkbox
      inputRef={ref}
      label={label}
      error={error}
      required={required}
      helperText={helperText}
      {...props}
    />
  )
);

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
};

// Radio Group
const RadioGroupField = React.forwardRef(
  ({ label, error, required, helperText, options, ...props }, ref) => (
    <RadioGroup
      inputRef={ref}
      aria-label={label}
      name={label}
      error={error}
      required={required}
      helperText={helperText}
      {...props}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  )
);

RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export { Textfield, SelectField, CheckboxField, RadioGroupField };
