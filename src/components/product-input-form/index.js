import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ProductInput = ({ item, index, remove, skuInput, priceInput }) => {
  return (
    <HStack display="flex" spacing="8px">
      <InputGroup display="flex" flexDirection="column">
        <Text fontSize="xs">Sku</Text>
        <Input
          type="text"
          value={item.sku || ""}
          placeholder="Novo sku"
          onChange={skuInput}
          isInvalid={item.isInvalidSku}
        />
        {item.isInvalidSku ? (
          <Text textColor="red.400" fontSize="xs">
            Sku inválido
          </Text>
        ) : (
          <Box height="18px" />
        )}
      </InputGroup>
      <InputGroup display="flex" flexDirection="column">
        <Text fontSize="xs">Preço</Text>
        <Input
          type="text"
          value={item.price || ""}
          placeholder="0,00"
          onChange={priceInput}
          isInvalid={item.isInvalidPrice}
        />
        {item.isInvalidPrice ? (
          <Text textColor="red.400" fontSize="xs">
            Preço inválido
          </Text>
        ) : (
          <Box height="18px" />
        )}
      </InputGroup>
      <IconButton
        variant="ghost"
        rounded="full"
        fontSize="20px"
        icon={<AiOutlineCloseCircle />}
        onClick={() => remove(index)}
      />
    </HStack>
  );
};

export default ProductInput;
