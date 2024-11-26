import React from "react";
import { Outlet, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { MdHome, MdSettings, MdMenu, MdContacts } from "react-icons/md";
import Home from "../pages/home";
import Settings from "../pages/settings";
import Profile from "../pages/profile";
import Friends from "../pages/friends";

const Layout = () => {
  const NavItem = ({ icon, label, to }) => (
    <Link to={to}>
      <Flex
        align="center"
        p="3"
        my="2"
        borderRadius="md"
        cursor="pointer"
        bg={useColorModeValue("gray.100", "gray.700")}
        color={useColorModeValue("black", "white")}
      >
        <Icon as={icon} boxSize="5" mr="3" />
        <Text>{label}</Text>
      </Flex>
    </Link>
  );

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        as="nav"
        width="240px"
        bg={useColorModeValue("gray.50", "gray.800")}
        p="4"
        shadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="6">
          Climbing App
        </Text>
        <NavItem icon={MdHome} label="Home" to="/" />
        {/* Add a new NavItem for the profile page*/}
        {/* Add icon for this navitem as stacked bars */}
        <NavItem icon={MdMenu} label="Profile" to="/profile" />
        <NavItem icon={MdSettings} label="Settings" to="/settings" />
          <NavItem icon={MdContacts} label="Friends" to="/friends" />


      </Box>
      <Box flex="1" p="6" bg={useColorModeValue("white", "gray.900")}>
        {/*  routes for Home and Settings */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
