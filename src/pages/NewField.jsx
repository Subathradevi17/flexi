import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Fields from "../components/Field";
import http from "../utils/http-common";
function NewField({ sectionName, sectionData, onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const initialValues = {};
  sectionData.fields.forEach((field) => {
    initialValues[field.name] = field.value !== undefined ? field.value : "";
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...initialValues,
    },
  });

  return (
    <div>
      <h1 onClick={() => setShowForm(!showForm)}>{sectionName}</h1>
      {showForm && (
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const requestData = {
                ...data,
              };

              const response = await http({
                method: sectionData.onSubmit.apiType,
                url: sectionData.onSubmit.endPoint,
                data: requestData,
              });

              if (response.status === 200) {
                console.log(response.data);
              } else {
                console.error("API Error:", response);
              }
            } catch (error) {
              console.error("API Request Error:", error);
            }
          })}>
          <Grid container spacing={2}>
            {sectionData.fields.map((field, i) => (
              <Grid xs={field.xs} sm={field.sm} item key={field.name}>
                <Fields
                  index={i}
                  value={field.value}
                  fields={field}
                  formControl={{
                    control,
                    errors,
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default NewField;
