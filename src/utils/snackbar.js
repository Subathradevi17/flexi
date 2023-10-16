import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);
SnackbarProvider.propTypes = {
  children: PropTypes.any,
};
export default function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={closeSnackbar}
          severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
