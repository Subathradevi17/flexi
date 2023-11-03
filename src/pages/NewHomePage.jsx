import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NewField from "./NewField";
import fieldData from "../utils/fields.json";
import { useLocation } from "react-router-dom";
function NewHomePage(props) {
  const [selectedSection, setSelectedSection] = useState(props.sectionName);
  const location = useLocation();
  // console.log(location);
  useEffect(() => {
    const sectionNameFromURL = location.pathname.substring(1);
    // console.log(sectionNameFromURL);
    if (fieldData[sectionNameFromURL]) {
      setSelectedSection(sectionNameFromURL);
    } else {
      setSelectedSection(null);
    }
  }, [location.pathname]);
  console.log(selectedSection);
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
