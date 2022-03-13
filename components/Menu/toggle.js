/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { chakra } from '@chakra-ui/system';
import { motion } from 'framer-motion';

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(240, 100%, 94%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <chakra.button
    zIndex={3000}
    onClick={toggle}
    w="40px"
    h="40px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    aria-label="menu button for mobile"
  >
    <chakra.svg w="23px" h="23px" viewBox="0 0 23 18" zIndex={3000}>
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </chakra.svg>
  </chakra.button>
);

const MobileMenu = ({ isOpen, toggle }) => (
  <motion.nav
    initial={false}
    animate={isOpen ? 'open' : 'closed'}
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
    zIndex={2000}
  >
    <MenuToggle toggle={() => toggle()} />
  </motion.nav>
);

export default MobileMenu;
