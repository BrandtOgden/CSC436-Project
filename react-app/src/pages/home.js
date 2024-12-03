import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  IconButton,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdTerrain, MdSettings, MdGroup } from "react-icons/md";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Posts data:", data); 
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        
      }
    };

    fetchPosts();

    const handleScroll = () => {
      const fadeEffect = 1 - window.scrollY / 100; // Adjust the denominator for fade sensitivity
      setOpacity(fadeEffect > 0 ? fadeEffect : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeStyle = {
    opacity,
    transition: "opacity 0.3s ease-out",
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box bg={bgColor} minHeight="100vh" p={6}>
      <Box maxWidth="800px" mx="auto">

        <Box style={fadeStyle} maxWidth="1200px" mx="auto" py={6} px={4}>
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Welcome to Climbify!
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={6}>
            Track your climbs, connect with fellow climbers, and take your climbing journey to new heights!
          </Text>

          {/* Highlights Section */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={6}>
            {/* Highlight 1 */}
            <Flex
              direction="column"
              bg={cardBgColor}
              p={6}
              rounded="md"
              shadow="lg"
              align="center"
              position="relative"
            >
              <Box position="relative" boxSize="150px" mb={4}>
                
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  align="center"
                  justify="center"
                  color="white"
                  fontSize="2xl"
                >
                  <MdTerrain size={100} color="black" />
                </Flex>
              </Box>
              <Heading size="md" mb={2}>
                Your Climbs
              </Heading>
              <Text fontSize="sm" textAlign="center" mb={4}>
                View your completed climbs and plan your next adventure.
              </Text>
              <Button
                as={Link}
                to="/home/climbs"
                colorScheme="blue"
                variant="solid"
                size="sm"
              >
                Explore Climbs
              </Button>
            </Flex>

            {/* Highlight 2 */}
            <Flex
              direction="column"
              bg={cardBgColor}
              p={6}
              rounded="md"
              shadow="lg"
              align="center"
              position="relative"
            >
              <Box position="relative" boxSize="150px" mb={4}>
               
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  align="center"
                  justify="center"
                  color="white"
                  fontSize="2xl"
                >
                  <MdGroup size={100} color="black" />
                </Flex>
              </Box>
              <Heading size="md" mb={2}>
                Your Friends
              </Heading>
              <Text fontSize="sm" textAlign="center" mb={4}>
                View and add your friends. 
              </Text>
              <Button
                as={Link}
                to="/home/friends"
                colorScheme="blue"
                variant="solid"
                size="sm"
              >
                View Friends
              </Button>
            </Flex>

            {/* Highlight 3 */}
            <Flex
              direction="column"
              bg={cardBgColor}
              p={6}
              rounded="md"
              shadow="lg"
              align="center"
              position="relative"
            >
              <Box position="relative" boxSize="150px" mb={4}>
                
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  align="center"
                  justify="center"
                  color="white"
                  fontSize="2xl"
                >
                  <MdSettings size={100} color="black" />
                </Flex>
              </Box>
              <Heading size="md" mb={2}>
                Settings
              </Heading>
              <Text fontSize="sm" textAlign="center" mb={4}>
                Customize your app preferences and manage your account.
              </Text>
              <Button
                as={Link}
                to="/home/settings"
                colorScheme="blue"
                variant="solid"
                size="sm"
              >
                Go to Settings
              </Button>
            </Flex>
          </Grid>

        </Box>




        {loading ? (
          <Spinner size="xl" mt={6} />
        ) : error ? (
          <Alert status="error" mt={6}>
            <AlertIcon />
            {error}
          </Alert>
        ) : posts.length === 0 ? (
          <Text textAlign="center" mt={6}>
            No posts found.
          </Text>
        ) : (
          <VStack spacing={6} align="stretch">
            {posts.map((post) => (
              <Box
                key={post.post_id}
                bg={cardBgColor}
                rounded="md"
                shadow="md"
                p={4}
                maxWidth="100%"
              >
                <Image
                  src={post.image_url || "https://via.placeholder.com/600"}
                  alt={post.title}
                  rounded="md"
                  mb={4}
                />
                <Heading as="h3" size="md" mb={2} color={textColor}>
                  {post.title}
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  {post.post_description}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  <strong>Author:</strong> {post.created_by}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  <strong>Date:</strong> {new Date(post.date_created).toLocaleString()}
                </Text>
                <HStack spacing={4}>
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Like post"
                    colorScheme="red"
                    size="sm"
                  />
                  <IconButton
                    icon={<FaComment />}
                    aria-label="Comment on post"
                    colorScheme="blue"
                    size="sm"
                  />
                </HStack>
              </Box>
            ))}
          </VStack>
        )}

      </Box>
    </Box>
  );
};

export default Home;
