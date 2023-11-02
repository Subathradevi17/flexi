import { Box, Button, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Fields from "../components/Field";
import http from "../utils/http-common";
import MuiTable from "../components/MuiTable";
import { makeColumn } from "../utils/utility";

import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "../utils/snackbar";
function NewField({ sectionName, sectionData, onBack }) {
  const { showSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const col = makeColumn(data);
  console.log(sectionData);
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
  const handleEdit = (data) => {
    setIsEdit(true);
    reset(data);
    setEditData({ ...data });
    setShowForm(true);
  };
  // console.log(editData);
  const initialValues = {};
  sectionData.fields.forEach((field) => {
    initialValues[field.name] = field.value !== undefined ? field.value : "";
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...initialValues,
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (sectionData) {
      try {
        const endpoint = isEdit
          ? sectionData.onUpdate.endPoint + `/${editData._id}`
          : sectionData.onSubmit.endPoint;

        const response = isEdit
          ? await http.put(endpoint, data)
          : await http.post(endpoint, data);
        if (response.status === 200) {
          showSnackbar(
            `Employee ${isEdit ? "updated" : "created"} successfully`,
            "success"
          );
          reset(initialValues);
          setIsEdit(false);
          getData();
          return response.data;
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
  // const hanldeSubmit = async (data) => {
  //   try {
  //     const requestData = {
  //       ...data,
  //     };

  //     const response = await http({
  //       method: sectionData.onSubmit.apiType,
  //       url: sectionData.onSubmit.endPoint,
  //       data: requestData,
  //     });

  //     if (response.status === 200) {
  //       console.log(response.data);
  //     } else {
  //       console.error("API Error:", response);
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //   }
  // };
  const handleCreateClick = () => {
    setShowForm(true);
    setShowTable(false);
  };

  const handleViewClick = () => {
    setShowTable(true);
    setShowForm(false);
    getData();
  };

  const getData = async () => {
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
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type='submit' variant='contained' color='secondary'>
            {isEdit ? "Update" : "Submit"}
          </Button>
          {/* <Button type='submit'>Submit</Button> */}
        </form>
      )}
      {showTable && (
        <Grid item xs={12}>
          <MuiTable columns={col} data={data} actions={actions} />
        </Grid>
      )}
      {/* {isEdit &&()} */}
      <Button onClick={onBack}>Back</Button>
    </div>
  );
}

export default NewField;
