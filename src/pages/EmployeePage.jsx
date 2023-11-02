import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { inputFormElements } from "../employeeJson";
import Fields from "../components/Field";
import { useForm } from "react-hook-form";
import http from "../utils/http-common";
import { makeColumn, url } from "../utils/utility";
import { useSnackbar } from "../utils/snackbar";
import MuiTable from "../components/MuiTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ApplyLeavePage from "./ApplyLeavePage";
import { applyFormElements } from "../applyleaveJson";
import GenericDialog from "../components/Dialog";
function EmployeePage(props) {
  const { showSnackbar } = useSnackbar();
  const [employee, setEmployee] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [leaveData, setLeaveData] = useState({});
  const [leave, setLeave] = useState({});
  const [apply, setApply] = useState(false);
  const handleApplyLeave = () => {
    setApply(false);
    resetLeave(initialValuesLeave);
    setLeaveData({});
  };
  const initialValues = {};
  const initialValuesLeave = {};
  const collv = makeColumn(leave);
  const datalv = leave;
  const col = makeColumn(employee);
  const data = employee;
  const actions = ({ row, table }) => (
    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
      <IconButton
        color='secondary'
        onClick={() => {
          handleEdit(row.original);
        }}>
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          handleDelete(row.original);
        }}
        color='error'>
        <DeleteIcon />
      </IconButton>
      <Button
        onClick={() => {
          setLeaveData(row.original);
          setApply(true);
        }}
        variant='contained'
        color='secondary'
        size='small'
        style={{ marginRight: "8px" }}>
        Apply Leave
      </Button>
      <Button
        autoFocus
        onClick={() => {
          getLeave(row.original);
          setLeaveHistory(true);
        }}>
        View Leave History
      </Button>
    </Box>
  );
  applyFormElements.forEach((item) => {
    initialValuesLeave[item.name] = item.value !== undefined ? item.value : "";
  });
  inputFormElements.forEach((item) => {
    initialValues[item.name] = item.value !== undefined ? item.value : "";
  });
  const {
    handleSubmit: handleSubmitLeave,
    control: controlLeave,
    reset: resetLeave,
    formState: { errors: errorsLeave },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...initialValuesLeave,
    },
  });
  const onSubmitLeave = async (data) => {
    try {
      let URL = url.applyLeave;
      const response = await http.post(URL, {
        ...data,
        name: leaveData.name,
        empId: leaveData.empId,
      });
      if (response.status === 200) {
        showSnackbar(
          `Leave Applied for Employee ${leaveData.name} successfully`,
          "success"
        );
        resetLeave(initialValuesLeave);
        setApply(false);
        setLeaveData({});
        getEmployee();
        return response.data;
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...initialValues,
    },
  });
  const formControl = {
    control,
    errors,
  };
  const getEmployee = async () => {
    try {
      const response = await http.get(url.fetchEmployee);
      if (response.status === 200) {
        setEmployee([...response.data]);
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };
  const getLeave = async (data) => {
    try {
      const response = await http.get(url.fetchLeave + "/" + data.empId);
      if (response.status === 200) {
        setLeave([...response.data]);
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      let URL = isEdit
        ? url.updateEmployee + `/${editData._id}`
        : url.createEmployee;

      const response = isEdit
        ? await http.put(URL, data)
        : await http.post(URL, data);
      if (response.status === 200) {
        showSnackbar(
          `Employee ${isEdit ? "updated" : "created"} successfully`,
          "success"
        );
        reset(initialValues);
        setIsEdit(false);
        getEmployee();
        return response.data;
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };
  const handleReset = () => {
    reset(initialValues);
    setIsEdit(false);
  };

  useEffect(() => {
    getEmployee();
  }, []);
  const handleEdit = (data) => {
    setIsEdit(true);
    reset(data);
    setEditData({ ...data });
  };

  const handleDelete = async (data) => {
    try {
      const response = await http.delete(url.deleteEmployee + "/" + data._id);
      if (response.status === 200) {
        showSnackbar(`Employee Deleted successfully`, "success");
        getEmployee();
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };
  const [leaveHistory, setLeaveHistory] = useState(false);
  // const handleLeaveHistory = (data) => {
  //   setLeaveHistory(true);
  //   getLeave(data);
  // };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ margin: "0 auto" }}>
          <CardContent>
            <Typography sx={{ color: "#9c27b0" }}>
              Add Employee Details
            </Typography>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {inputFormElements.slice(0, 6).map((input, i) => (
                  <Grid xs={input.xs} sm={input.sm} item key={input.name}>
                    <Fields
                      isEdit={isEdit}
                      index={i}
                      fields={input}
                      formControl={formControl}
                    />
                  </Grid>
                ))}
              </Grid>
              <br />
              {apply && (
                <ApplyLeavePage
                  open={apply}
                  onClose={handleApplyLeave}
                  onSubmit={handleSubmitLeave(onSubmitLeave)}
                  leaveData={leaveData}
                  contents={
                    <Grid container spacing={2}>
                      {applyFormElements.map((input, i) => (
                        <Grid xs={input.xs} sm={input.sm} item key={input.name}>
                          <Fields
                            index={i}
                            value={input.value}
                            fields={input}
                            formControl={{
                              control: controlLeave,
                              errors: errorsLeave,
                            }}
                          />
                        </Grid>
                      ))}

                      <br />
                      <br />
                    </Grid>
                  }
                />
              )}

              {leaveHistory && (
                <GenericDialog
                  open={leaveHistory}
                  title={` Leave History `}
                  onClose={() => {
                    setLeaveHistory(false);
                  }}
                  onSubmit={handleSubmitLeave(onSubmitLeave)}
                  leaveData={leaveData}
                  content={<MuiTable columns={collv} data={datalv} />}
                />
              )}
              {/* {leaveHistory && (
                <Grid item xs={12}>
                  <MuiTable columns={collv} data={datalv} />
                </Grid>
              )} */}
              {/* {apply && (
                <Grid container spacing={2}>
                  {inputFormElements.slice(6).map((input, i) => (
                    <Grid xs={input.xs} sm={input.sm} item key={input.name}>
                      <Fields
                        index={i}
                        value={input.value}
                        fields={input}
                        formControl={formControl}
                      />
                    </Grid>
                  ))}
                </Grid>
              )} */}
              <Grid container spacing={1}>
                <Grid item xs={12} align='right'>
                  <Button
                    onClick={handleReset}
                    variant='outlined'
                    color='secondary'
                    style={{ marginRight: "8px" }}>
                    Reset
                  </Button>
                  <Button type='submit' variant='contained' color='secondary'>
                    {isEdit ? "Update" : "Submit"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <MuiTable columns={col} data={data} actions={actions} />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default EmployeePage;
