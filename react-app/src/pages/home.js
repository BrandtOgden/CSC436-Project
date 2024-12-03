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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaComment, FaPlusCircle, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdForum, MdTerrain, MdGroup, MdSettings, MdArrowBack } from "react-icons/md";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // For simulating bottom loading

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [opacity, setOpacity] = useState(1);
  const [error, setError] = useState(null);


  // Dummy data for the feed
  const dummyPosts = [
    {
      id: 1,
      title: "Rocky Mountain Adventure",
      description: "A thrilling climb up the Rockies with a breathtaking view.",
      picture_url: "https://plus.unsplash.com/premium_photo-1661891527856-3e21f318fa39?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9jayUyMGNsaW1iaW5nfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      title: "Desert Peaks",
      description: "An unforgettable climb in the desert sands.",
      picture_url: "https://images.unsplash.com/photo-1621970937306-eb2fd0ed84c9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Sunset Climb",
      description: "Watching the sunset while climbing was magical.",
      picture_url: "https://images.unsplash.com/photo-1523031399724-41be21913d75?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNsaW1iaW5nfGVufDB8fDB8fHww",
    },
  ];

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
                to="/climbs"
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
                Your Profile
              </Heading>
              <Text fontSize="sm" textAlign="center" mb={4}>
                Manage your personal details and climbing achievements.
              </Text>
              <Button
                as={Link}
                to="/profile"
                colorScheme="blue"
                variant="solid"
                size="sm"
              >
                View Profile
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
                to="/settings"
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
      <Box justifyContent={'center'} width='100px' alignContent={'center'}>      <Spinner position={'center'} size="xl" mt={6} />
      </Box>

    </Box>
  );
};

export default Home;
