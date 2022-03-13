import { memo, useState } from "react";
import { Image, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { mobileBreakpointsMap } from "../../config/theme";
import { simpleOpacity } from "../../config/animations";

const Logo = () => {
  const [isLogoLoaded, setLogoLoaded] = useState(false);
  const MotionImage = motion(Image);
  const isMobile = useBreakpointValue(mobileBreakpointsMap);

  return (
    <AnimatePresence>
      <Link href="/" passHref>
        <MotionImage
          className={!isMobile ? styles.logo : ""}
          boxSize={isMobile ? "120px" : "120px"}
          objectFit="contain"
          src="./fundETH.png"
          fallbackSrc="./fundETH.png"
          alt="fundEth logo"
          variants={simpleOpacity}
          initial="initial"
          animate={isLogoLoaded && "animate"}
          onLoad={() => setLogoLoaded(true)}
          zIndex={1000}
        />
      </Link>
    </AnimatePresence>
  );
};

export default memo(Logo);
