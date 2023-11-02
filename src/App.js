import React from "react";
import "./App.css";
import SnackbarProvider from "./utils/snackbar";
// import HomePage from "./pages/HomePage";
import NewHomePage from "./pages/NewHomePage";

export default function App() {
  return (
    <div className='App'>
      <SnackbarProvider>
        <NewHomePage />
      </SnackbarProvider>
    </div>
  );
}
