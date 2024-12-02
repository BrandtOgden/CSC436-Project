import { useEffect, useState } from "react";
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

// FAKE CLIMBS - WILL EVENTUALLY GET FROM BACKEND
const all_climbs = [
    {
      c_name: "Moonlight Arete",
      grade: "V4",
      location: "Bishop, CA",
      c_description: "A beautiful arete climb with amazing views.",
      id:1
    },
    {
      c_name: "The Buttermilk Stem",
      grade: "V2",
      location: "Bishop, CA",
      c_description: "A classic problem requiring balance and precision.",
      id:2
    },
    {
      c_name: "The Shield",
      grade: "V10",
      location: "Hueco Tanks, TX",
      c_description: "A powerful climb with technical crimps.",
      id:3
    },
];

const completed_climbs = [
    {
        c_name: "The Shield",
        grade: "V10",
        location: "Hueco Tanks, TX",
        c_description: "A powerful climb with technical crimps.",
        id:3
    }
]

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
    const [completedClimbs, setCompletedClimbs] = useState([])
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const toast = useToast();

    // useEffect(() => {
    //     const getClimbs = async () =>
    // }, []);

    // ===============================================================================
    const markCompletedClick = (climb) => {
        console.log("Mark as completed clicked on:", climb.id)
    }
    
    const undoCompletionClick = (climb) => {
        console.log("Undo Completion Clicked on:", climb.id)
    }
    
    const fetchAllClimbs = async () => {
        setLoading(true);
        try {
            // No JWT for this request
            const climbs = await axios.get(`${API_URL}/climbs`);
            setAllClimbs(climbs.data);
        } catch (error) {
            console.error("ERROR in fetchAllClimbs():", error);
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
    };
    
    const fetchCompletedClimbs = async () => {
        setLoading(true);
        try {
            // Now we need JWT
            const token = localStorage.getItem("token");
            const climbs = await axios.get(`${API_URL}/climbs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCompletedClimbs(climbs.data);
        } catch (error) {
            console.error("ERROR in fetchCompletedClimbs():", error);
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
    }

    const handleTabChange = async (index) => {
        setActiveTab(index);

        // Could change this to not refetch every time but I'm just going to leave it like this for now
        if (index === 0) {
            await fetchAllClimbs();
        } else if (index === 1) {
            console.log("Fetching Completed Climbs")
            await fetchCompletedClimbs();
        } 
    }

    useEffect(() => {
        fetchAllClimbs();
    }, []);
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
                            <Spinner size="xl"/>
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
                            <Spinner size="xl"/>
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