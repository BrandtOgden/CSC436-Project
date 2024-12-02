import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Register from "./pages/register"; 
import Landing from "./pages/landing"
// import Home from "./pages/home";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Friends from "./pages/friends";
import Climbs from "./pages/climbs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Layout />}>
          <Route path="view_posts" element={<h1>View Posts</h1>} />
          <Route path="climbs" element={<Climbs />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Settings />} /> 
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
