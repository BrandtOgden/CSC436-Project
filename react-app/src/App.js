import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings"; // Import the Settings page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*" // Use "/*" for nested routes within Layout
          element={<Layout />}
        />
      </Routes>
    </Router>
  );
};

export default App;
