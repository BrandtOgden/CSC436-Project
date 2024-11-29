// import React from "react"
import {useNavigate} from "react-router-dom";
import {
    Flex,
    Box,
    Heading,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Divider,
    Link
  } from "@chakra-ui/react";

const Landing = () => {
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.300");
    const navigate = useNavigate()
  
    return (
      <Flex align="center" justify="center" minHeight="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Box
          rounded="lg"
          bg={bgColor}
          boxShadow="lg"
          p="8"
          maxWidth="850px"
          textAlign="center"
        >
          <Stack spacing="8">
            <Box>
              <Heading color={textColor}>Welcome to Climbify</Heading>
              <Text color={textColor} mt="4">
                Share your adventures, track your progress, and connect with climbers around the world—all in one app.
              </Text>
            </Box>
  
            <Box>
              <Heading size="md" color={textColor}>
                Our Technology
              </Heading>
              <Divider my="4" />
              <Text color={textColor}>
                ClimbSync is built with a modern tech stack to ensure a fast, secure, and scalable experience:
              </Text>
              <Stack spacing="2" mt="4" textAlign="left">
                <Text>🚀 <strong>Flask</strong>: Python framework used to create the RESTful API which connects our database with the frontend</Text>
                <Text>📊 <strong>MySQL</strong>: The database we use to store all information including user profiles, climbs, and posts</Text>
                <Text>🎨 <strong>React</strong>: Used to implement the frontend and support user interaction</Text>
                <Text>☁️ <strong>AWS</strong>: Currently we have a MySQL database hosted on AWS' Relational Database Service</Text>
              </Stack>
              <Stack spacing="2" mt="4" textAlign="center">
                <Text>
                    Check out the repository on{" "}
                    <Link href="https://github.com/BrandtOgden/CSC436-Project" color="blue.500" isExternal>
                    Github
                    </Link>
                </Text>
              </Stack>
            </Box>
  
            <Box>
              <Stack spacing="4" direction="row" justify="center">
                <Button colorScheme="blue" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button variant="outline" colorScheme="blue" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    );
};

export default Landing;