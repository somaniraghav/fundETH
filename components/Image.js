import NextImage from 'next/image';
import { chakra } from '@chakra-ui/system';

const Img = chakra(NextImage, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'layout'].includes(prop),
});

export const Image = (props) => {
  return <Img {...props} />;
};

export default Image;
