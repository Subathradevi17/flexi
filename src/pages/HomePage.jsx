import React from "react";
import EmployeePage from "./EmployeePage";
import ProductPage from "./ProductPage";
import { Box, Tab, Tabs } from "@mui/material";

function HomePage(props) {
  const [value, setValue] = React.useState("employee");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "cyan",
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'>
          <Tab value='employee' label='Employee ' />
          <Tab value='product' label='Product ' />
        </Tabs>
      </Box>
      {value === "employee" && <EmployeePage />}
      {value === "product" && <ProductPage />}
    </div>
  );
}

export default HomePage;
