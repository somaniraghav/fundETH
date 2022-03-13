import React, {useEffect, useLayoutEffect, useState} from "react";
import Web3 from "web3";
import contract_abi from "../../config/crowdfundInstance";
import project_abi from "../../config/crowdfundProjectInstance";
import {
  chakra,
  Flex,
  useColorModeValue,
  Stack,
  SimpleGrid,
  VStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import Campaign from "./Campaign";

export default function Campaigns() {

  const [data, updateData] = useState([])

  useEffect(() => {

    // Update the document title using the browser API
    const address = "0x5Cde647A68123Bd8F8C0E8F087b03c6a19429c13";
    let provider = window.ethereum;
    
    if(typeof provider != "undefined"){
      web3 = new Web3(provider);
      
      try{
        ethereum.enable();
      } catch (error) {
        // User denied account access...
        alert("Connection Failed")
      }
    } else {
      // Notify user
      alert("Connection Failed")
    }
    const crowdfundInstance = new web3.eth.Contract(contract_abi, address);
    let newData = []
    crowdfundInstance.methods
        .returnAllProjects()
        .call()
        .then((projects) => {
          projects.forEach((projectAddress) => {
            const projectInst = new web3.eth.Contract(project_abi, projectAddress);
            projectInst.methods
              .getDetails()
              .call()
              .then((projectData) => {
                // let dataCopy = projectData;
                // dataCopy.projectAddress = projectAddress
                // newData.push(projectData)
                projectData.projectAddress = projectAddress
                updateData([...data, projectData])
                //this.setState({ myArray: [...this.state.myArray, 'new value'] }) 
              });
          });
          
        });

      console.log("hello")
  }, []);

  
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack>
      {console.log("return run")}
      <Box bg="blackAlpha.50" _hover={{ bg: "blackAlpha.300" }} p={10}>
        <Heading>Ongoing fundraising campaigns</Heading>
      </Box>

      <Flex
        w="full"
        bg="black"
        p={50}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction={{ base: "column" }}
          w="full"
          bg={{ md: bg }}
          shadow="lg"
        >
          <SimpleGrid
            spacingY={3}
            columns={{ base: 1, md: 4 }}
            w={{ base: 120, md: "full" }}
            textTransform="uppercase"
            bg={bg3}
            color={"gray.300"}
            py={{ base: 1, md: 4 }}
            px={{ base: 2, md: 10 }}
            fontSize="md"
            fontWeight="hairline"
          >
            <chakra.span fontSize="large" fontWeight="bold">
              Title
            </chakra.span>
            <chakra.span fontSize="large" fontWeight="bold">
              Days Left
            </chakra.span>
            <chakra.span fontSize="large" fontWeight="bold">
              Amount Raised
            </chakra.span>
            <chakra.span
              textAlign={{ md: "right" }}
              fontSize="large"
              fontWeight="bold"
            >
              Donation (in Matic)
            </chakra.span>
          </SimpleGrid>
          {console.log(data)}
          {data.map((token, tid) => (
            <Campaign key={tid} token={token} />
          ))}
        </Stack>
      </Flex>
    </VStack>
  );
}
