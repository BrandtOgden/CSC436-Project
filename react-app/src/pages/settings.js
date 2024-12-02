import React, { useState, useEffect, useCallback } from "react";
import {
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
import API_URL from "../config"
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    username: "",
    pronouns: "",
    date_of_birth: "",
    ability: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersonalInfo(data[0]);
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
  }, [toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
      const token = localStorage.getItem("token")
      const { created_at, ...data } = personalInfo; // Get rid of created_at
      await axios.put(`${API_URL}/profile`, 
        data,
        { headers: { Authorization: `Bearer ${token}` } },
      );
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
      const token = localStorage.getItem("token")
      await axios.delete(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: "Profile deleted",
        description: "Your profile has been deleted successfully.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      setPersonalInfo({ fullName: "", email: "", phone: "", bio: "" });
      setLoading(false);
      navigate("/")
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
        ) : editMode ? (
          <Stack spacing={4} align="center">
            <Input
              name="username"
              value={personalInfo.username}
              onChange={handleInputChange}
              placeholder="Username"
              width="80%"
            />
            <Input
              name="pronouns"
              value={personalInfo.pronouns}
              onChange={handleInputChange}
              placeholder="Pronouns"
              width="80%"
            />
            <Input
              type="date"
              name="date_of_birth"
              value={personalInfo.date_of_birth}
              onChange={handleInputChange}
              placeholder="Date of Birth"
              width="80%"
            />
            <Input
              name="ability"
              value={personalInfo.ability}
              onChange={handleInputChange}
              placeholder="Ability"
              width="80%"
            />
            <Stack direction="row" spacing={6} width="80%" justify="center">
              <Button colorScheme="blue" onClick={saveChanges} isLoading={loading}>
                Save Changes
              </Button>
              <Button colorScheme="gray" onClick={toggleEditMode}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Box textAlign="center">
            <Text mb={2}>
              <strong>Username:</strong> {personalInfo.username || "N/A"}
            </Text>
            <Text mb={2}>
              <strong>Pronouns:</strong> {personalInfo.pronouns || "N/A"}
            </Text>
            <Text mb={2}>
              <strong>Date of Birth:</strong> {personalInfo.date_of_birth || "N/A"}
            </Text>
            <Text mb={2}>
              <strong>Ability:</strong> {personalInfo.ability || "Add a bio"}
            </Text>
            <Text mb={2}>
              <strong>Account Created On:</strong> {personalInfo.created_at || "N/A"}
            </Text>
            <Stack direction="row" spacing={6} justify="center" mt={4}>
              <Button colorScheme="blue" onClick={toggleEditMode}>
                Edit Info
              </Button>
              <Button colorScheme="red" onClick={deleteProfile} isLoading={loading}>
                Delete Profile
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

//   return (
//     <Flex direction="column" align="center" p={6}>
//       <Box
//         bg={useColorModeValue("white", "gray.800")}
//         borderRadius="lg"
//         boxShadow="lg"
//         p={6}
//         width="100%"
//         maxWidth="800px"
//       >
//         <Heading as="h1" size="lg" mb={4} textAlign="center">
//           Settings
//         </Heading>
//         {loading ? (
//           <Spinner size="xl" />
//         ) : (
//             {editMode ? (
//               <Stack spacing={4}>
//                 <Input
//                   name="fullName"
//                   value={personalInfo.fullName}
//                   onChange={handleInputChange}
//                   placeholder="Full Name"
//                 />
//                 <Input
//                   name="email"
//                   value={personalInfo.email}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                 />
//                 <Input
//                   name="phone"
//                   value={personalInfo.phone}
//                   onChange={handleInputChange}
//                   placeholder="Phone Number"
//                 />
//                 <Input
//                   name="bio"
//                   value={personalInfo.bio}
//                   onChange={handleInputChange}
//                   placeholder="Short Bio"
//                 />
//                 <Button colorScheme="blue" onClick={saveChanges} isLoading={loading}>
//                   Save Changes
//                 </Button>
//                 <Button colorScheme="gray" onClick={toggleEditMode}>
//                   Cancel
//                 </Button>
//               </Stack>
//             ) : (
//               <Box>
//                 <Text mb={2}>
//                   <strong>Username:</strong> {personalInfo.username || "N/A"}
//                 </Text>
//                 <Text mb={2}>
//                   <strong>Pronouns:</strong> {personalInfo.pronouns || "N/A"}
//                 </Text>
//                 <Text mb={2}>
//                   <strong>Date of Birth:</strong> {personalInfo.date_of_birth || "N/A"}
//                 </Text>
//                 <Text mb={2}>
//                   <strong>Ability:</strong> {personalInfo.ability || "Add a bio"}
//                 </Text>
//                 <Button mt={4} colorScheme="blue" onClick={toggleEditMode}>
//                   Edit Info
//                 </Button>
//                 <Button colorScheme="red" onClick={deleteProfile} isLoading={loading}>
//                   Delete Profile
//                 </Button>
//               </Box>
//             )}
//         )}
//       </Box>
//     </Flex>
//   );
// };

export default Settings;
