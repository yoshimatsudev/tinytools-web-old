import React, { useEffect, useState, useRef } from "react";
import { InputLeftElement, InputGroup, Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { styles } from "../../styles/constants";

const SearchBar = ({ onSearch, products }) => {
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const filteredProducts = products.filter((product) =>
          product.sku.toLowerCase().includes(inputValue.toLowerCase())
        );
        onSearch(filteredProducts);
      } catch (e) {
        console.error(e);
      }
    };

    clearTimeout(timerRef.current);

    if (inputValue) {
      timerRef.current = setTimeout(() => {
        getItems();
      }, 500);
    } else {
      onSearch(products); 
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [inputValue, products, onSearch]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <InputGroup w="80vw">
      <InputLeftElement color={styles.HIGHLIGHT_COLOR}>
        <BsSearch />
      </InputLeftElement>
      <Input
        placeholder="Pesquisar produto"
        _placeholder={{ color: styles.HIGHLIGHT_COLOR }}
        _hover={{}}
        borderRadius="8px 8px 0 0"
        borderColor={styles.HIGHLIGHT_COLOR}
        color={styles.HIGHLIGHT_COLOR}
        value={inputValue}
        onChange={handleInputChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
