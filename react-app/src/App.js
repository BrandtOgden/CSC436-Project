import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Register from "./pages/register"; 
import Landing from "./pages/landing"
// import Home from "./pages/home";
import Settings from "./pages/settings";
import Profile from "./pages/profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Layout />}>
          <Route path="view_posts" element={<h1>View Posts</h1>} />
          <Route path="climbs" element={<Profile />} />
          <Route path="friends" element={<h1>Friends</h1>} />
          <Route path="settings" element={<Settings />} /> 
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
