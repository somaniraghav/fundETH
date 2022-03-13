import { Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { logout } from "../../config/firebase";
import styles from "./styles.module.css";

const LogoutBtn = ({ onMenuItemClick }) => {
  const router = useRouter();
  const menuButtonSize = useBreakpointValue({
    base: "xl",
    md: "sm",
  });

  const onClick = (e) => {
    onMenuItemClick(e);
    logout();
    router.push("/");
  };

  return (
    <Box
      width={{ base: "100%", lg: "auto" }}
      textAlign={{ base: "center", lg: "left" }}
      marginY={{ base: 2, lg: 0 }}
    >
      <Button
        bg="red.500"
        _hover={{
          bg: "red.600",
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
        Logout
      </Button>
    </Box>
  );
};

export default LogoutBtn;
