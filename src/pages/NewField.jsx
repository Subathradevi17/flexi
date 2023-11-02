import { Box, Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Fields from "../components/Field";
import http from "../utils/http-common";
import MuiTable from "../components/MuiTable";
import { makeColumn } from "../utils/utility";
import formData from "../utils/fields.json";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "../utils/snackbar";
function NewField({ sectionName, sectionData, onSubmit, onBack }) {
  const { showSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const col = makeColumn(data);

  const actions = ({ row, table }) => (
    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
      <IconButton
        color='secondary'
        onClick={() => {
          handleEdit(row.original);
        }}>
        <EditIcon />
      </IconButton>
    </Box>
  );
  const handleEdit = (data) => {};
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
  // useEffect(() => {
  //   if (showTable) {
  //     setShowForm(false);
  //   }
  // }, [showTable]);
  const handleCreateClick = () => {
    setShowForm(true);
    setShowTable(false);
  };

  const handleViewClick = () => {
    setShowTable(true);
    setShowForm(false);
    getData(sectionName, "GET");
  };
  // const baseURL = "http://localhost:8080/api/employee";

  // const fetchData = async (endpoint, method) => {
  //   try {
  //     const response = await axios({ method, url: `${baseURL}/${endpoint}` });

  //     if (response.status === 200) {
  //       setData([...response.data]);
  //       console.log(setData);
  //       console.log("Data received:", response.data);
  //     } else {
  //       console.error("API Error:", response);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //     return null;
  //   }
  // };
  // const getData = async (sectionName, method) => {
  //   if (sectionData[sectionName]) {
  //     const endpoint = sectionData[sectionName].onSubmit.getEndpoint;
  //     const data = await fetchData(endpoint, method);
  //     console.log(getData);
  //     if (data) {
  //       console.log(`${sectionName} Data:`, data);
  //     }
  //   } else {
  //     console.error("Section not found:", sectionName);
  //   }
  // };
  const getData = async (sectionName, method) => {
    if (sectionData) {
      try {
        const endpoint = sectionData.onFetch.endPoint;
        const response = await http.get(endpoint);
        if (response.status === 200) {
          setData([...response.data]);
        } else {
          showSnackbar("Error", "error");
        }
      } catch (error) {
        console.error("API Error:", error);
        showSnackbar(error, "error");
        throw error;
      }
    }
  };
  return (
    <div>
      <h1>{sectionName}</h1>
      <Button onClick={handleCreateClick}>Create</Button>
      <Button onClick={handleViewClick}>View</Button>
      <Button>Edit</Button>
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
          <Button type='submit'>Submit</Button>
        </form>
      )}
      {showTable && (
        <Grid item xs={12}>
          <MuiTable columns={col} data={data} actions={actions} />
        </Grid>
      )}
      <Button onClick={onBack}>Back</Button>
    </div>
  );
}

export default NewField;
