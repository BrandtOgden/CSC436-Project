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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with actual login logic
    if (username === "user" && password === "password") {
      navigate("/");
    } else {
      setError("Invalid username or password.");
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
            <Button type="submit" mt="6" colorScheme="blue" width="full">
              Login
            </Button>
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
