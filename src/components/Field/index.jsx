import React from "react";
import {
  CheckboxField,
  RadioGroupField,
  SelectField,
  Textfield,
} from "../Dynamic_forms";
import { Controller } from "react-hook-form";

const field = {
  text: Textfield,
  select: SelectField,
  radio: RadioGroupField,
  checkbox: CheckboxField,
};
function Fields(props) {
  const { fields, formControl, index } = props;
  const { errors, control } = formControl;
  const Component = field[fields.type];
  if (!fields.type) {
    return null;
  }
  return (
    <Controller
      name={fields.name}
      control={control}
      rules={{ required: fields.required, pattern: fields.pattern }}
      render={({ field }) => (
        <Component
          {...field}
          key={index}
          label={fields.label}
          variant={fields.variant}
          options={fields.options}
          error={!!errors[fields.name]}
          helperText={
            errors[fields.name]
              ? errors[fields.name]["type"] === "required"
                ? "This field is required"
                : errors[fields.name]["message"]
              : ""
          }
        />
      )}
    />
  );
}

export default Fields;
