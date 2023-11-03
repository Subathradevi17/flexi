import React from "react";
import "./App.css";
import SnackbarProvider from "./utils/snackbar";
// import HomePage from "./pages/HomePage";
// import NewHomePage from "./pages/NewHomePage";
import Routes from "./routes";

export default function App() {
  return (
    <div className='App'>
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
    </div>
  );
}
