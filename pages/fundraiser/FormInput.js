import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/react';

const FormInput = ({
  title,
  id,
  icon,
  type,
  formValue,
  onChange,
  placeholder,
}) => {
  return (
    <FormControl id={id}>
      <FormLabel>{title}</FormLabel>
      {id === 'details' ? (
        <Textarea
          value={formValue}
          required
          onChange={onChange}
          size="sm"
          style={{ caretColor: '#bcf5ec' }}
          focusBorderColor="gray.500"
          border="1px solid #363636"
          placeholder={placeholder}
          _placeholder={{ color: 'whiteAlpha.500' }}
        />
      ) : (
        <InputGroup size="md">
          <Input
            type={type}
            value={formValue}
            required
            onChange={onChange}
            style={{ caretColor: '#bcf5ec' }}
            focusBorderColor="gray.500"
            border="1px solid #363636"
            rounded="sm"
            placeholder={placeholder}
            _placeholder={{ color: 'whiteAlpha.500' }}
          />
          <InputLeftElement>
            <Icon
              as={icon}
              p={2}
              h="2rem"
              w="2rem"
              color="whiteAlpha.700"
              icon={icon}
              aria-label={`${title} input element`}
            />
          </InputLeftElement>
        </InputGroup>
      )}
    </FormControl>
  );
};

export default FormInput;
