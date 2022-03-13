import { Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import React, { memo } from 'react';
import Link from '../Link';
import styles from './styles.module.css';

const NavItem = ({ text, href, onMenuItemClick }) => {
  const menuButtonSize = useBreakpointValue({
    base: 'xl',
    md: 'sm',
  });

  return (
    <Box
      width={{ base: '100%', lg: 'auto' }}
      textAlign={{ base: 'center', lg: 'left' }}
      marginY={{ base: 2, lg: 0 }}
    >
      <Link
        fontWeight="light"
        variant="ghost"
        fontSize={menuButtonSize}
        letterSpacing={2}
        className={styles.item}
        padding={2}
        marginX={2}
        href={href}
        onClick={onMenuItemClick}
        as="button"
      >
        {text}
      </Link>
    </Box>
  );
};

export default memo(NavItem);
