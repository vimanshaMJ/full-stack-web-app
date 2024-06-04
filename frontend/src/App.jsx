import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// loging us out
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// if somebody is registering, first clear the local storage. So we dont have any access token
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return;
  <></>;
}

export default App;
