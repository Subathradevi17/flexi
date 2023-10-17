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
import { inputFormElements } from "../productJson";
import Fields from "../components/Field";
import { useForm } from "react-hook-form";
import http from "../utils/http-common";
import { makeColumn, url } from "../utils/utility";
import { useSnackbar } from "../utils/snackbar";
import MuiTable from "../components/MuiTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function ProductPage(props) {
  const { showSnackbar } = useSnackbar();
  const [product, setProduct] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const initialValues = {};
  const col = makeColumn(product);
  const data = product;
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
    </Box>
  );
  inputFormElements.forEach((item) => {
    initialValues[item.name] = "";
  });
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
  const getProduct = async () => {
    try {
      const response = await http.get(url.fetchProduct);
      if (response.status === 200) {
        setProduct([...response.data]);
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
        ? url.updateProduct + `/${editData._id}`
        : url.createProduct;

      const response = isEdit
        ? await http.put(URL, data)
        : await http.post(URL, data);
      if (response.status === 200) {
        showSnackbar(
          `Product ${isEdit ? "updated" : "created"} successfully`,
          "success"
        );
        reset(initialValues);
        setIsEdit(false);
        getProduct();
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
    getProduct();
  });
  const handleEdit = (data) => {
    setIsEdit(true);
    reset(data);
    setEditData({ ...data });
  };

  const handleDelete = async (data) => {
    try {
      const response = await http.delete(url.deleteProduct + "/" + data._id);
      if (response.status === 200) {
        showSnackbar(`Product Deleted successfully`, "success");
        getProduct();
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showSnackbar(error, "error");
      throw error;
    }
  };
  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ margin: "0 auto" }}>
          <CardContent>
            <Typography sx={{ color: "#9c27b0" }}>
              Add Product Details
            </Typography>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {inputFormElements.map((input, i) => (
                  <Grid xs={input.xs} sm={input.sm} item key={input.name}>
                    <Fields
                      index={i}
                      fields={input}
                      formControl={formControl}
                    />
                  </Grid>
                ))}
              </Grid>
              <br />

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

export default ProductPage;
