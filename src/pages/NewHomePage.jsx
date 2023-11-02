import React, { useState } from "react";
import { Box } from "@mui/material";
import NewField from "./NewField";
import fieldData from "../utils/fields.json";

function NewHomePage(props) {
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <div>
      {selectedSection ? (
        <NewField
          sectionName={selectedSection}
          sectionData={fieldData[selectedSection]}
          onBack={() => setSelectedSection(null)}
        />
      ) : (
        <Box>
          {Object.keys(fieldData).map((sectionName) => (
            <div key={sectionName}>
              <h1 onClick={() => setSelectedSection(sectionName)}>
                {sectionName}
              </h1>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
}

export default NewHomePage;
