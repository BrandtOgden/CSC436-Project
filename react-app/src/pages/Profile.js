import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  Grid,
  Avatar,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const dummyData = {
    u_name: "John Doe",
    pronouns: "he/him",
    followers: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
    following: [{ id: 3, name: "Charlie" }, { id: 4, name: "Diana" }],
    posts: [
      {
        id: 1,
        title: "Mountain Adventure",
        p_description: "A thrilling climb up the Rocky Mountains.",
        picture_url: "https://via.placeholder.com/200",
      },
      {
        id: 2,
        title: "Sunset Climb",
        p_description: "Enjoyed a beautiful sunset while climbing.",
        picture_url: "https://via.placeholder.com/200",
      },
    ],
    climbs: [
      {
        id: 1,
        c_name: "Rocky Peak",
        c_description: "A challenging climb with a breathtaking view.",
        grade: 5.12,
        location: "Colorado",
      },
      {
        id: 2,
        c_name: "Desert Spire",
        c_description: "A climb through the desert sands.",
        grade: 5.8,
        location: "Utah",
      },
    ],
    achievements: [{ a_name: "First Ascent" }, { a_name: "100 Climbs Milestone" }],
    events: [
      {
        id: 1,
        location: "Grand Canyon",
        e_time: "2024-12-10T14:00:00Z",
      },
      {
        id: 2,
        location: "Yosemite",
        e_time: "2025-01-05T09:00:00Z",
      },
    ],
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserData(dummyData); // Use dummy data for now
      setLoading(false);
    }
  };

  const handleEdit = (section, item) => {
    setEditData({ section, item });
    onOpen();
  };

  const handleSave = async () => {
    const { section, item } = editData;
    try {
      const token = localStorage.getItem("jwtToken");
      const updatedData = { ...userData };
      const index = updatedData[section].findIndex((i) => i.id === item.id);

      if (index >= 0) {
        updatedData[section][index] = item; // Update existing
      } else {
        item.id = Date.now(); // Temporary ID for new items
        updatedData[section].push(item); // Add new
      }

      setUserData(updatedData);
      await axios.put(`http://localhost:3000/api/profile/${section}`, updatedData[section], {
        headers: { Authorization: `Bearer ${token}` },
      });

      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async () => {
    const { section, item } = editData;
    try {
      const token = localStorage.getItem("jwtToken");
      const updatedData = { ...userData };
      updatedData[section] = updatedData[section].filter((i) => i.id !== item.id);

      setUserData(updatedData);
      await axios.delete(`http://localhost:3000/api/profile/${section}/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onClose();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!userData) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Text>Error loading profile.</Text>
      </Flex>
    );
  }

  const { u_name, pronouns, posts, climbs, achievements, events } = userData;

  return (
    <Box bg={bgColor} minHeight="100vh" p={6}>
      <Box maxWidth="70vw" mx="auto" bg={boxBgColor} p={6} rounded="lg" shadow="lg">
        {/* Profile Header */}
        <Flex align="center" mb={6}>
          <Avatar size="xl" name={u_name} />
          <Box ml={6}>
            <Heading size="lg">{u_name}</Heading>
            <Text color="gray.500">{pronouns}</Text>
          </Box>
        </Flex>

        {/* Posts Section */}
        <Heading size="md" mb={4}>
          Posts <Button size="sm" onClick={() => handleEdit("posts", {})}>Add</Button>
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} mb={6}>
          {posts.map((post) => (
            <Box key={post.id} bg="gray.100" rounded="md" shadow="md" position="relative">
              <IconButton
                size="sm"
                colorScheme="red"
                icon={<CloseIcon />}
                position="absolute"
                top={2}
                right={2}
                onClick={() => handleEdit("posts", post)}
              />
              <Image src={post.picture_url} alt={post.title} roundedTop="md" />
              <Box p={4}>
                <Heading size="sm" mb={2}>{post.title}</Heading>
                <Text fontSize="sm">{post.p_description}</Text>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Climbs Section */}
        <Heading size="md" mb={4}>
          Climbs <Button size="sm" onClick={() => handleEdit("climbs", {})}>Add</Button>
        </Heading>
        <Stack spacing={4} mb={6}>
          {climbs.map((climb) => (
            <Box key={climb.id} p={4} bg="gray.100" rounded="md" shadow="md" position="relative">
              <IconButton
                size="sm"
                colorScheme="red"
                icon={<CloseIcon />}
                position="absolute"
                top={2}
                right={2}
                onClick={() => handleEdit("climbs", climb)}
              />
              <Heading size="sm" mb={1}>{climb.c_name}</Heading>
              <Text fontSize="sm" color="gray.600">{climb.c_description}</Text>
              <Text fontSize="sm" color="gray.500">
                Grade: {climb.grade}, Location: {climb.location}
              </Text>
            </Box>
          ))}
        </Stack>

        {/* Achievements Section */}
        <Heading size="md" mb={4}>
          Achievements <Button size="sm" onClick={() => handleEdit("achievements", {})}>Add</Button>
        </Heading>
        <Stack spacing={2} mb={6}>
          {achievements.map((achievement) => (
            <Flex key={achievement.a_name} bg="blue.100" p={2} rounded="md" justify="space-between" align="center">
              <Text>{achievement.a_name}</Text>
              <IconButton
                size="sm"
                colorScheme="red"
                icon={<CloseIcon />}
                onClick={() => handleEdit("achievements", achievement)}
              />
            </Flex>
          ))}
        </Stack>

        {/* Modal for Add/Edit/Delete */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit {editData.section}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Title/Name"
                value={editData.item?.title || editData.item?.c_name || editData.item?.a_name || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    item: { ...editData.item, title: e.target.value || e.target.value },
                  })
                }
              />
              <Textarea
                placeholder="Description"
                value={editData.item?.p_description || editData.item?.c_description || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    item: { ...editData.item, p_description: e.target.value },
                  })
                }
                mt={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Profile;
