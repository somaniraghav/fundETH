import { useEffect } from 'react';
import { Container, useBreakpointValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import Logo from '../Logo';
import styles from './styles.module.css';
import Navigation from './Navigation';
import { mobileBreakpointsMap } from '../../config/theme';
import useScrollDirection, {
  ScrollDirection,
} from '../../hooks/useScrollDirection';

const mobileMenuVariants = {
  hidden: {
    opacity: [1, 0.85, 0],
    y: -80,
    transition: {
      ease: 'easeInOut',
      duration: 0.35,
    },
  },
  show: {
    opacity: [0, 0.85, 1],
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.28,
    },
  },
};

const Menu = () => {
  const controls = useAnimation();
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  const scrollDirection = useScrollDirection(true, isMobile);
  useEffect(() => {
    if (scrollDirection === ScrollDirection.Down && isMobile) {
      controls.start('hidden');
    } else {
      controls.start('show');
    }
  }, [isMobile, controls, scrollDirection]);
  return (
    <header>
      <motion.div
        initial={isMobile ? 'hidden' : false}
        variants={mobileMenuVariants}
        animate={controls}
        className={isMobile ? styles.mobileMenuContainer : ''}
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          padding={{ base: 5, lg: 0 }}
          paddingY={{ base: 5, lg: 0 }}
          width="100vw"
          maxWidth="100vw"
          margin={0}
        >
          <Logo />
          <Navigation />
        </Container>
      </motion.div>
    </header>
  );
};

export default Menu;
