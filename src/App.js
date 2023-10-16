import React from "react";
import "./App.css";
import SnackbarProvider from "./utils/snackbar";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className='App'>
      <SnackbarProvider>
        <HomePage />
      </SnackbarProvider>
    </div>
  );
}
