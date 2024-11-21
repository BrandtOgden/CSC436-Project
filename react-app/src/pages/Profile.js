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
} from "@chakra-ui/react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks must be called outside of conditional logic
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/profile"); // Replace with actual API endpoint
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserData(dummyData); // Use dummy data on error

      setLoading(false);
    }
  };

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

  const {
    u_name,
    pronouns,
    followers,
    following,
    posts,
    climbs,
    achievements,
    events,
  } = userData;

  return (
    <Box bg={bgColor} minHeight="100vh" p={6}>
      <Box maxWidth="70vw" mx="auto" bg={boxBgColor} p={6} rounded="lg" shadow="lg">
        {/* Profile Header */}
        <Flex align="center" mb={6}>
          <Avatar size="xl" name={u_name} src="/profile-picture-url" />
          <Box ml={6}>
            <Heading size="lg">{u_name}</Heading>
            <Text color="gray.500">{pronouns}</Text>
            <Flex mt={2}>
              <Text mr={4}>
                <strong>{followers.length}</strong> Followers
              </Text>
              <Text>
                <strong>{following.length}</strong> Following
              </Text>
            </Flex>
          </Box>
        </Flex>



        {/* Posts Section */}
        <Heading size="md" mb={4}>
          Posts
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} mb={6}>
          {posts.map((post) => (
            <Box key={post.id} bg="gray.100" rounded="md" shadow="md">
              <Image src={post.picture_url} alt={post.title} objectFit="cover" roundedTop="md" />
              <Box p={4}>
                <Heading size="sm" mb={2}>
                  {post.title}
                </Heading>
                <Text fontSize="sm">{post.p_description}</Text>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Climbs Section */}
        <Heading size="md" mb={4}>
          Climbs
        </Heading>
        <Stack spacing={4} mb={6}>
          {climbs.map((climb) => (
            <Box key={climb.id} p={4} bg="gray.100" rounded="md" shadow="md">
              <Heading size="sm" mb={1}>
                {climb.c_name}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {climb.c_description}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Grade: {climb.grade}, Location: {climb.location}
              </Text>
            </Box>
          ))}
        </Stack>

        {/* Achievements Section */}
        <Heading size="md" mb={4}>
          Achievements
        </Heading>
        <Stack spacing={2} mb={6}>
          {achievements.map((achievement) => (
            <Text key={achievement.a_name} bg="blue.100" p={2} rounded="md">
              {achievement.a_name}
            </Text>
          ))}
        </Stack>

        {/* Events Section */}
        <Heading size="md" mb={4}>
          Events
        </Heading>
        <Stack spacing={4}>
          {events.map((event) => (
            <Box key={event.id} p={4} bg="gray.100" rounded="md" shadow="md">
              <Heading size="sm" mb={1}>
                {event.location}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {new Date(event.e_time).toLocaleString()}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
