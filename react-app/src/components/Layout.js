import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { MdForum, MdTerrain, MdGroup, MdSettings, MdArrowBack  } from "react-icons/md";

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
          Climbify
        </Text>
        {/* Add any menu items here */}
        <NavItem icon={MdForum} label="View Posts" to="view_posts" />
        <NavItem icon={MdTerrain} label="Climbs" to="climbs" />
        <NavItem icon={MdGroup} label="Friends" to="friends" />
        <NavItem icon={MdSettings} label="Account Settings" to="settings" />
        <NavItem icon={MdArrowBack} label="Back to Landing" to="/" />
      </Box>
      <Box flex="1" p="6" bg={useColorModeValue("white", "gray.900")}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
