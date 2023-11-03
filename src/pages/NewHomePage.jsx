import React, { useState, useEffect } from "react";
import NewField from "./NewField";
import fieldData from "../utils/fields.json";

function NewHomePage(props) {
  const [selectedSection, setSelectedSection] = useState(props.sectionName);

  useEffect(() => {
    setSelectedSection(props.sectionName);
  }, [props]);

  return (
    <div>
      <NewField
        sectionName={selectedSection}
        sectionData={fieldData[selectedSection]}
        onBack={() => setSelectedSection(null)}
      />
    </div>
  );
}

export default NewHomePage;
