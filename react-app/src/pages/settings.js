import React, { useState, useEffect } from "react";
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
  useToast,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const Settings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/profile");
      setPersonalInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error fetching profile",
        description: error.response?.data?.message || "Unable to fetch profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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

  const saveChanges = async () => {
    setLoading(true);
    try {
      await axios.put("/api/profile", personalInfo);
      setEditMode(false);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error saving changes",
        description: error.response?.data?.message || "Unable to save changes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteProfile = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/profile");
      toast({
        title: "Profile deleted",
        description: "Your profile has been deleted successfully.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      setPersonalInfo({ fullName: "", email: "", phone: "", bio: "" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error deleting profile",
        description: error.response?.data?.message || "Unable to delete profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Tabs variant="enclosed">
            <TabList>
              <Tab>About You</Tab>
              <Tab>Actions</Tab>
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
                    <Button colorScheme="blue" onClick={saveChanges} isLoading={loading}>
                      Save Changes
                    </Button>
                    <Button colorScheme="gray" onClick={toggleEditMode}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Box>
                    <Text mb={2}>
                      <strong>Name:</strong> {personalInfo.fullName || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Email:</strong> {personalInfo.email || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Phone:</strong> {personalInfo.phone || "N/A"}
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

              {/* Actions Tab */}
              <TabPanel>
                <Heading as="h2" size="md" mb={4}>
                  Account Actions
                </Heading>
                <Button colorScheme="red" onClick={deleteProfile} isLoading={loading}>
                  Delete Profile
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Flex>
  );
};

export default Settings;
