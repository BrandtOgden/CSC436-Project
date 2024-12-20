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
  Select,
  Spinner
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config"

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [ability, setAbility] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!username || !password || !confirmPassword || !pronouns || !ability || !dob) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // API call to register the user
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        password,
        pronouns,
        ability,
        dob,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // Here instead of else would need to catch 409 and tell user their username already exists
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      if (err.status === 409) {
        setError("Username already exists!! Pick a different one.")
      } else {
        setError(err.response?.data?.description || "An unknown error occurred during registration.");
      }
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
          <Heading>Register</Heading>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <form onSubmit={handleRegister}>
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
            <FormControl id="confirmPassword" isRequired mt="4">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="pronouns" isRequired mt="4">
              <FormLabel>Pronouns</FormLabel>
              <Select
                placeholder="Select pronouns"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
              >
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl id="ability" isRequired mt="4">
              <FormLabel>Ability</FormLabel>
              <Select
                  placeholder="Select your skill level"
                  value={ability}
                  onChange={(e) => setAbility(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Select>
            </FormControl>

            <FormControl id="dob" isRequired mt="4">
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Box mt="6" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
              </Box>
            ) : 
            <Button type="submit" mt="6" colorScheme="blue" width="full">
              Register
            </Button>
            }
          </form>
          <Text mt="4">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Login
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Register;
