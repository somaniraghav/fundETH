import React from 'react';
import NextLink from 'next/link';
import { chakra } from '@chakra-ui/system';

const Link = (props) => {
  // console.log('props :>> ', props);
  const { children, href, ...rest } = props;
  return (
    <NextLink passHref href={href}>
      <chakra.a {...rest}>{children}</chakra.a>
    </NextLink>
  );
};

export default Link;
