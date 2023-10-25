import React from "react";
import GenericDialog from "../components/Dialog";

function ApplyLeavePage(props) {
  return (
    <div>
      <GenericDialog
        onSubmit={props.onSubmit}
        onClose={props.onClose}
        open={props.open}
        title={`Apply Leave for ${props.leaveData.name}`}
        buttonText={"Submit"}
        content={props.contents}
      />
    </div>
  );
}

export default ApplyLeavePage;
