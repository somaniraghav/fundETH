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
import { HiLogin } from "react-icons/hi";
import { useState } from "react";
import { SiMinutemailer } from "react-icons/si";
import { useRouter } from "next/router";
import { sendPasswordReset } from "../../config/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendPasswordReset(email);
    setEmail("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "#111")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading align="center" fontSize={"4xl"}>
            Trouble Logging In?
          </Heading>
          <Text align="center" fontSize={"md"} color={"gray.400"}>
            Enter your email address and we${"'"}ll send you a link to get back
            into your account.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
          style={{
            background: "#232526",
            background: "-webkit-linear-gradient(top left, #232526, #414345)",
            background: "-moz-linear-gradient(top left, #232526, #414345)",
            background: "linear-gradient(to bottom right, #232526, #414345)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" mb={3}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  _placeholder={{
                    color: "gray.100",
                  }}
                  placeholder="E-mail Address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <Stack>
                <Stack className="login-btns" spacing={5}>
                  <Button
                    rounded="none"
                    leftIcon={<SiMinutemailer />}
                    type="submit"
                    bg="#39576A"
                    color="white"
                    _hover={{
                      bg: "#2F4858",
                    }}
                  >
                    Send Reset Link
                  </Button>
                  <Text fontSize={"md"} color={"gray.400"} align={"center"}>
                    OR
                  </Text>
                  <Button
                    leftIcon={<HiLogin />}
                    variant="outline"
                    borderColor="cyan.100"
                    onClick={() => router.push("/login")}
                  >
                    Back To Login
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
