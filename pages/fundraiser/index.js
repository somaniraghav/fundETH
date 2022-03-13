import { Button, Heading } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import { AiOutlineMail } from "react-icons/ai";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import { Stack, VStack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { simpleOpacity } from "../../config/animations";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";
import { BsCalendar3 } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

// import crowdFundingObj from "../../config/crowdfunding";
import Web3 from "web3";

import contract_abi from "../../config/crowdfundInstance";
import project_abi from "../../config/crowdfundProjectInstance";

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const FundRaiser = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [amount, setAmount] = useState(null);

  
  const handleSubmit = (event) => {
    event.preventDefault();
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
    const address = "0x5Cde647A68123Bd8F8C0E8F087b03c6a19429c13";
    const crowdfundInstance = new web3.eth.Contract(contract_abi, address);
    let account = null;
    console.log(amount)
    console.log(typeof amount)

    try {

      function getAccounts(callback) {
        web3.eth.getAccounts((error,result) => {
            if (error) {
                console.log(error);
            } else {
                callback(result);
            }
        });
      }

      getAccounts(function(result) {
        console.log(result);
        crowdfundInstance.methods
        .startProject(
          title,
          details,
          deadline,
          web3.utils.toWei(amount, "ether")
        )
        .send({
          from: result[0],
        })
        .then((res) => {
          console.log(res)
          // const projectInfo = res.events.ProjectStarted.returnValues;
          // projectInfo.isLoading = false;
          // projectInfo.currentAmount = 0;
          // projectInfo.currentState = 0;
          // projectInfo.contract = new web3.eth.Contract(project_abi, projectInfo.contractAddress);
          // this.startProjectDialog = false;
          // this.newProject = { isLoading: false };
        });
      });

      
      //account = accounts;
      //console.log(account);

      //delay(1000)

      console.log("Hi2")


    } catch (error) {
      console.log("error :>> ", error);
    }

    setTitle("");
    setDetails("");
    setDeadline(null);
    setAmount(null);
  };
  // title, details, deadline(number of days), goal amount

  const MotionButton = motion(Button);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return <div>loading...</div>;
    }
    if (!user) router.push("/login");
  }, [user, loading, router]);

  return (
    <VStack p={2} bgColor="blackAlpha.200" shadow="lg" rounded="sm">
      <Heading
        size="md"
        as="h3"
        textAlign="center"
        letterSpacing={1.4}
        mt={20}
        color="gray.300"
      >
        Please enter the following details to start a fundraiser
      </Heading>
      <chakra.form
        onSubmit={handleSubmit}
        p={{ base: 3, md: 5 }}
        mt={{ base: 3, lg: 0 }}
      >
        <VStack spacing={10}>
          <Stack spacing={4}>
            <FormInput
              id="title"
              title="Title"
              icon={HiPencilAlt}
              type="text"
              placeholder="Enter the fundraiser title"
              formValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              id="amount"
              title="Amount"
              icon={AiOutlineMail}
              type="number"
              required
              placeholder="Amount to be raised (in Matic)"
              formValue={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <FormInput
              id="deadline"
              title="Deadline"
              type="number"
              required
              icon={BsCalendar3}
              placeholder="Number of days to raise the tokens"
              formValue={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <FormInput
              id="details"
              title="Details"
              placeholder="Enter the description for the fundraiser"
              formValue={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Stack>
          <Stack>
            <MotionButton
              type="submit"
              size="lg"
              variant="outline"
              borderWidth="1px"
              borderRadius="0"
              fontWeight="normal"
              fontSize="sm"
              width="fit-content"
              variants={simpleOpacity}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Create new Fundraiser
            </MotionButton>
          </Stack>
        </VStack>
      </chakra.form>
    </VStack>
  );
};
export default FundRaiser;
