import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  SimpleGrid,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  return (
    <SimpleGrid
      my={10}
      px={6}
      py={4}
      alignItems="center"
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: "black",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={24}
      >
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="blackAlpha"
          rounded="full"
        >
          Ethereum
        </Badge>
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.50")}
          lineHeight="shorter"
        >
          Blockchain based{" "}
          <Text
            display={{ base: "block", lg: "inline" }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            crowdfunding
          </Text>{" "}
          platform
        </chakra.h1>
        <Button
          color="gray.100"
          variant="solid"
          fontSize="2xl"
          bg="brand.700"
          _hover={{
            bg: "brand.800",
          }}
          py={8}
          size="lg"
          w="full"
          mt={2}
          mb={1}
          onClick={() => router.push("/fundraiser")}
        >
          Start a Fundraiser
        </Button>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="sm"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          We aim to develop the next generation platform for crowdfunding that
          will minimize investments risks.
        </chakra.p>
      </Flex>
      <Box>
        <Image
          src="/ethereum.svg"
          shadow="2xl"
          alt="ethereum logo with violet background color"
          fit="fill"
          w="620px"
          h="auto"
          bg="gray.100"
          loading="lazy"
        />
      </Box>
    </SimpleGrid>
  );
};

export default Landing;
