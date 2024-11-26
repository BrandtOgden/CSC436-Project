import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Stack,
    Flex,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast,
    Spinner,
} from "@chakra-ui/react";

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newFriendId, setNewFriendId] = useState("");
    const [currentUser, setCurrentUser] = useState(""); // State for the current user's username
    const toast = useToast();

    // Fetch the current user's info
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/current_user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user info");
            }

            const data = await response.json();
            setCurrentUser(data.username); // Assuming the backend returns { username: "Nick" }
        } catch (err) {
            console.error("Error fetching user info:", err);
            setCurrentUser("Unknown User");
        }
    };

    // Fetch friends from the backend
    const fetchFriends = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5000/friends", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 204) {
                setFriends([]); // No friends yet
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch friends");
            }

            const data = await response.json();
            setFriends(data);
        } catch (err) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Add a new friend
    const addFriend = async () => {
        if (!newFriendId) {
            toast({
                title: "Error",
                description: "Please enter a valid Friend ID.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ friend_id: parseInt(newFriendId) }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.description || "Failed to add friend.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            toast({
                title: "Success",
                description: "Friend added successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setNewFriendId("");
            fetchFriends(); // Refresh the friend list
        } catch (err) {
            toast({
                title: "Error",
                description: "An error occurred while adding the friend.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Remove a friend
    const removeFriend = async (friendId) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/friends", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ friend_id: friendId }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove friend.");
            }

            toast({
                title: "Success",
                description: "Friend removed successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setFriends((prev) => prev.filter((friend) => friend.friend_id !== friendId));
        } catch (err) {
            toast({
                title: "Error",
                description: err.message || "An error occurred while removing the friend.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Fetch current user and friends on component mount
    useEffect(() => {
        fetchCurrentUser();
        fetchFriends();
    }, []);

    return (
        <Box maxW="600px" mx="auto" mt="6">
            <Heading mb="6">Friends</Heading>

            <Text fontSize="lg" fontWeight="bold" mb="4">
                Logged in as: {currentUser}
            </Text>

            {loading ? (
                <Spinner />
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : friends.length === 0 ? (
                <Text>No friends yet. Add some below!</Text>
            ) : (
                <Stack spacing="4">
                    {friends.map((friend) => (
                        <Flex
                            key={friend.friend_id}
                            align="center"
                            justify="space-between"
                            bg="gray.100"
                            p="3"
                            borderRadius="md"
                            shadow="sm"
                        >
                            <Box>
                                <Text fontWeight="bold">{friend.username}</Text>
                                <Text fontSize="sm" color="gray.600">
                                    Added on: {new Date(friend.date_accepted).toLocaleDateString()}
                                </Text>
                            </Box>
                            <Button
                                colorScheme="red"
                                size="sm"
                                onClick={() => removeFriend(friend.friend_id)}
                            >
                                Remove
                            </Button>
                        </Flex>
                    ))}
                </Stack>
            )}

            <Box mt="6">
                <FormControl>
                    <FormLabel>Add Friend by ID</FormLabel>
                    <Flex>
                        <Input
                            placeholder="Enter Friend ID"
                            value={newFriendId}
                            onChange={(e) => setNewFriendId(e.target.value)}
                        />
                        <Button
                            ml="2"
                            colorScheme="blue"
                            onClick={addFriend}
                        >
                            Add
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Friends;
