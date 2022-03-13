import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  IconButton,
  Heading,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../config/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return <div>loading...</div>;
    }
    if (user) router.push("/");
  }, [user, loading, router]);

  // if the user submits the signUp form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = `${firstName} ${lastName}`;
    await registerWithEmailAndPassword(name, email, password);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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
          <Heading fontSize={"4xl"}>Create a new account</Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            Already have an account?{" "}
            <chakra.span color="brand.300">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </chakra.span>
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
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <FormControl id="first-name">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    _placeholder={{
                      color: "gray.100",
                    }}
                    type="text"
                    value={firstName}
                    placeholder="John"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="last-name">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    _placeholder={{
                      color: "gray.100",
                    }}
                    type="text"
                    value={lastName}
                    placeholder="Doe (optional)"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
                  _placeholder={{
                    color: "gray.100",
                  }}
                  placeholder="johndoe@ethereum.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    _placeholder={{
                      color: "gray.100",
                    }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    minLength="6"
                    placeholder="Must have atleast 6 characters"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="hideOrShowPass"
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Box color="blue.300">
                    <Link href="/reset">
                      <a>Forgot password?</a>
                    </Link>
                  </Box>
                </Stack>
                <Stack className="login-btns">
                  <Button
                    rounded="none"
                    type="submit"
                    bg="brand.600"
                    color="white"
                    _hover={{
                      bg: "brand.700",
                    }}
                  >
                    Sign up
                  </Button>
                  <Text fontSize={"md"} color={"gray.400"} align={"center"}>
                    OR
                  </Text>
                  <Button
                    rounded="none"
                    leftIcon={<Icon as={FcGoogle} w={6} h={6} />}
                    onClick={signInWithGoogle}
                  >
                    Sign up with Google
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
