import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";

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
