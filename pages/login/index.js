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
import { chakra } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
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

  // if the user submits the login form
  const handleSubmit = async (event) => {
    event.preventDefault();

    await logInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            Don{"'"}t have an account?{" "}
            <chakra.span color="brand.300">
              <Link href="/register">
                <a>Sign up</a>
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
          <chakra.form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  _placeholder={{
                    color: "gray.100",
                  }}
                  borderColor="gray.500"
                  type="email"
                  placeholder="E-mail Address"
                  value={email}
                  required
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
                    borderColor="gray.500"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    placeholder="Password"
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
                    borderColor="teal.400"
                    variant="outline"
                    rounded="none"
                    type="submit"
                  >
                    Sign in
                  </Button>
                  <Text fontSize={"md"} color={"cyan.100"} align={"center"}>
                    OR
                  </Text>
                  <Button
                    rounded="none"
                    leftIcon={<Icon as={FcGoogle} w={6} h={6} />}
                    onClick={signInWithGoogle}
                  >
                    Sign in with Google
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </chakra.form>
        </Box>
      </Stack>
    </Flex>
  );
}
