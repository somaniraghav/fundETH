import { Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import LogoutBtn from "./LogoutBtn";
import styles from "./styles.module.css";

const SignupBtn = ({ onMenuItemClick, user, loading }) => {
  const router = useRouter();
  const menuButtonSize = useBreakpointValue({
    base: "xl",
    md: "sm",
  });

  if (!loading && user) {
    return <LogoutBtn onMenuItemClick={onMenuItemClick} />;
  }

  const onClick = (e) => {
    onMenuItemClick(e);
    router.push("/register");
  };

  return (
    <Box
      width={{ base: "100%", lg: "auto" }}
      textAlign={{ base: "center", lg: "left" }}
      marginY={{ base: 2, lg: 0 }}
    >
      <Button
        bg="brand.500"
        _hover={{
          bg: "brand.600",
        }}
        fontWeight="light"
        variant="solid"
        fontSize={menuButtonSize}
        letterSpacing={2}
        className={styles.button}
        padding={3}
        marginX={2}
        onClick={onClick}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SignupBtn;
