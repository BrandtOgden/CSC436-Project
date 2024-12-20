import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.description || "Unknown error occurred. Please try again.");
        return;
      }

      const data = await response.json();
      const token = data.jwt; // Assuming the API returns a JWT
      localStorage.setItem("token", token); // Save token in localStorage or a secure cookie
      navigate("/home/view_posts");
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        p="8"
      >
        <Stack spacing="4">
          <Heading>Login</Heading>
          {error && <Text color="red.500">{error}</Text>}
          <form onSubmit={handleLogin}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Box mt="6" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
              </Box>
            ) : 
            <Button type="submit" mt="6" colorScheme="blue" width="full">
              Login
            </Button>
            }
          </form>
          <Text mt="4">
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Register
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
