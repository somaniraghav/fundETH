import { useCallback } from "react";
import { Container, Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useCycle } from "framer-motion";
import styles from "./styles.module.css";
import MobileMenu from "./toggle";
import { mobileBreakpointsMap } from "../../config/theme";
import { easing, menuAnim } from "../../config/animations";
import NavItem from "./NavItem";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginBtn from "./LoginBtn";
import SignupBtn from "./SignupBtn";
import { auth } from "../../config/firebase";

const Navigation = () => {
  const MotionContainer = motion(Container);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const isMobile = useBreakpointValue(mobileBreakpointsMap);

  const [user, loading, error] = useAuthState(auth);
  console.log('loading', loading)
  console.log('user', user)

  const onMenuItemClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isMobile) {
        toggleOpen();
      }
    },
    [isMobile, toggleOpen]
  );
  return (
    <>
      <Box
        display={{ base: "flex", xl: "none" }}
        alignItems="center"
        paddingTop={1}
        className={styles.menuBar}
        zIndex={100}
        top="3%"
      >
        <MobileMenu toggle={toggleOpen} isOpen={isOpen} />
      </Box>

      <MotionContainer
        width="100%"
        maxWidth={{ base: "100%", sm: "100%", lg: "50%", xl: "60%" }}
        className={styles.menu}
        right={{
          lg: "3.5%",
        }}
        initial="hide"
        animate={(!isMobile || isOpen) && "show"}
        style={{
          width: "100%",
          top: !isOpen && isMobile && "-100vh",
          opacity: !isOpen && isMobile && "0",
          left: isOpen && isMobile && 0,
        }}
        borderColor={isOpen && isMobile && "orange.500"}
        borderBottomWidth={isOpen && isMobile && "1px"}
        paddingBottom={isOpen && isMobile && "1px"}
        ease={easing}
        variants={menuAnim}
        marginTop={0}
        paddingTop={1}
        as="nav"
        bgColor={isMobile ? "rgba(17, 17, 17, 0.91)" : "none"}
      >
        <Flex
          justifyContent={{ base: "center", lg: "flex-end" }}
          direction={{
            base: "column",
            lg: "row",
          }}
          paddingX={{ base: "", sm: "10", lg: "0" }}
          paddingY={{
            base: "10",
            lg: "3",
          }}
          height={{ base: "100vh", lg: "auto" }}
          paddingRight="0"
          paddingBottom={isMobile ? 10 : "0"}
          onClick={() => isMobile && toggleOpen()}
        >
          <NavItem href="/" text="Home" onMenuItemClick={onMenuItemClick} />

          <NavItem
            href="/team"
            text="Our Team"
            onMenuItemClick={onMenuItemClick}
          />
          <NavItem
            href="/about"
            text="About Us"
            onMenuItemClick={onMenuItemClick}
          />
          <NavItem
            href="/contact"
            text="Contact"
            onMenuItemClick={onMenuItemClick}
          />
          <LoginBtn
            onMenuItemClick={onMenuItemClick}
            user={user}
            loading={loading}
          />
          <SignupBtn
            onMenuItemClick={onMenuItemClick}
            user={user}
            loading={loading}
          />
        </Flex>
      </MotionContainer>
    </>
  );
};

export default Navigation;
