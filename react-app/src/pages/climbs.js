import { useEffect, useState, useCallback } from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    VStack,
    Text,
    Button,
    Flex,
    useColorModeValue,
    useToast,
    Spinner
} from "@chakra-ui/react";
import axios from "axios";
import API_URL from "../config"

// Reusable component for a scrollable box of climbs
const ClimbList = ({climbs, buttonColor, buttonLabel, onButtonClick}) => {
    return (
        <Box maxH="400px"
        overflowY="auto"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p={4}>
            {climbs.length === 0 ? (
                <Text align="center" color="gray.500" fontSize="lg" mt={4}>
                    No climbs available to display.
                </Text>
            ) : (
            <VStack spacing={4} align="stretch">
                {climbs.map((climb, index) => (
                <Box key={index}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    shadow="md">
                    <Flex justify="space-between" mb={2}>
                        <Text fontWeight="bold" fontSize="lg">
                            {climb.c_name}
                        </Text>
                        <Text color="gray.500">
                            {climb.grade}
                        </Text>
                    </Flex>
                        <Text fontSize="sm" color="gray.600" mb={2}>
                            Location: {climb.location}
                        </Text>
                        <Text mb={4}>
                            {climb.c_description}
                        </Text>
                    <Button colorScheme={buttonColor} size="sm" onClick={() => onButtonClick(climb)}>
                        {buttonLabel}
                    </Button>
                </Box>
                ))}
            </VStack>
            )}        
        </Box>
    )
};

const Climbs = () => {
    const [allClimbs, setAllClimbs] = useState([]);
    const [completedClimbs, setCompletedClimbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const toast = useToast();

    // ===============================================================================
    const markCompletedClick = async (climb) => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${API_URL}/climbs`, 
                { climb_information_id: climb.id },
                { headers: { Authorization: `Bearer ${token}` }, }
            );
            toast({
                title: "Climb marked as completed!",
                status: "success",
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            toast({
                title: "Error marking climb as completed",
                description: error.response?.data?.message || "Unknown error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }
    
    const undoCompletionClick = async (climb) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/climbs?climb_information_id=${climb.climb_information_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Undo completion successful!",
                status: "success",
                duration: 5000,
                isClosable: true
            });

            // Removes deleted climb form list of completed climbs
            setCompletedClimbs((prevClimbs) =>
                prevClimbs.filter((c) => c.climb_information_id !== climb.climb_information_id)
            );
        } catch (error) {
            toast({
                title: "Error undoing completion",
                description: error.response?.data?.message || "Unknown error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };
    
    const fetchAllClimbs = useCallback(async () => {
        setLoading(true);
        try {
            // No JWT for this request
            const climbs = await axios.get(`${API_URL}/climbs`);
            setAllClimbs(climbs.data);
        } catch (error) {
            toast({
                title: "Error fetching climbs",
                description: error.response?.data?.message || "Unknown error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);
    
    const fetchCompletedClimbs = useCallback(async () => {
        setLoading(true);
        try {
            // Now we need JWT
            const token = localStorage.getItem("token");
            const climbs = await axios.get(`${API_URL}/climbs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCompletedClimbs(climbs.data);
        } catch (error) {
            toast({
                title: "Error fetching completed climbs",
                description: error.response?.data?.message || "Unknown error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const handleTabChange = async (index) => {
        setActiveTab(index);

        // Could change this to not refetch every time but I'm just going to leave it like this for now
        if (index === 0) {
            await fetchAllClimbs();
        } else if (index === 1) {
            await fetchCompletedClimbs();
        } 
    } 

    useEffect(() => {
        if (activeTab === 0) {
            fetchAllClimbs();
        } else if (activeTab === 1) {
            fetchCompletedClimbs();
        } else {
            console.log("Should never get here")
        }
    }, [activeTab, fetchAllClimbs, fetchCompletedClimbs]);
    // ======================================================================================

    return (
        <Box bg={useColorModeValue("white", "gray.800")}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%">
            <Tabs index={activeTab} onChange={handleTabChange}>
                <TabList>
                    <Tab>All Climbs</Tab>
                    <Tab>Completed Climbs</Tab>
                </TabList>

                <TabPanels>
                    {/* List of all Climbs */}
                    <TabPanel>
                        {loading ? (
                            <Box mt="6" display="flex" justifyContent="center" alignItems="center">
                                <Spinner size="xl" />
                            </Box>
                        ) : 
                        <ClimbList climbs={allClimbs} 
                                buttonColor="blue" 
                                buttonLabel="Mark as Completed"
                                onButtonClick={markCompletedClick}/>
                        }
                    </TabPanel>
                    {/* List of Completed Climbs */}
                    <TabPanel>
                        {loading ? (
                            <Box mt="6" display="flex" justifyContent="center" alignItems="center">
                                <Spinner size="xl" />
                            </Box>
                        ) : 
                        <ClimbList climbs={completedClimbs} 
                                buttonColor="red" 
                                buttonLabel="Undo Completion"
                                onButtonClick={undoCompletionClick}/>
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Climbs; 