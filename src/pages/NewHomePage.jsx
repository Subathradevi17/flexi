import React from "react";
import { Box } from "@mui/material";
import NewField from "./NewField";
import fieldData from "../utils/fields.json";

function NewHomePage(props) {
  return (
    <div>
      <Box>
        {Object.keys(fieldData).map((sectionName) => (
          <NewField
            key={sectionName}
            sectionName={sectionName}
            sectionData={fieldData[sectionName]}
          />
        ))}
      </Box>
    </div>
  );
}

export default NewHomePage;
