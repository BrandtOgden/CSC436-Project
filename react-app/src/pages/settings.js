import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

const Settings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    bio: "Climbing enthusiast and adventure seeker!",
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveChanges = () => {
    console.log("Saved changes:", personalInfo);
    toggleEditMode();
  };

  return (
    <Flex direction="column" align="center" p={6}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        maxWidth="800px"
      >
        <Heading as="h1" size="lg" mb={4} textAlign="center">
          Settings
        </Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>About You</Tab>
            <Tab>Appearance</Tab>
          </TabList>
          <TabPanels>
            {/* About You Tab */}
            <TabPanel>
              <Heading as="h2" size="md" mb={4}>
                Your Profile
              </Heading>
              {editMode ? (
                <Stack spacing={4}>
                  <Input
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                  />
                  <Input
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  <Input
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                  />
                  <Input
                    name="bio"
                    value={personalInfo.bio}
                    onChange={handleInputChange}
                    placeholder="Short Bio"
                  />
                  <Button colorScheme="blue" onClick={saveChanges}>
                    Save Changes
                  </Button>
                </Stack>
              ) : (
                <Box>
                  <Text mb={2}>
                    <strong>Name:</strong> {personalInfo.fullName}
                  </Text>
                  <Text mb={2}>
                    <strong>Email:</strong> {personalInfo.email}
                  </Text>
                  <Text mb={2}>
                    <strong>Phone:</strong> {personalInfo.phone}
                  </Text>
                  <Text mb={2}>
                    <strong>Bio:</strong> {personalInfo.bio || "Add a bio"}
                  </Text>
                  <Button mt={4} colorScheme="blue" onClick={toggleEditMode}>
                    Edit Info
                  </Button>
                </Box>
              )}
            </TabPanel>

            {/* Appearance Tab */}
            <TabPanel>
              <Heading as="h2" size="md" mb={4}>
                Appearance
              </Heading>
              <Text mb={2}>Adjust Font Size:</Text>
              <Select placeholder="Select font size" width="200px">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Select>
              <Button mt={4} colorScheme="blue">
                Save Changes
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Settings;
