import React, { useState } from "react";
import * as s from "./styled";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import ProductInput from "../product-input-form";
import { styles } from "../../styles/constants";
import api from "../../services/api";
import Logout from "../logout";

const ItemsTable = ({ children, getItems, isOpen, onClose }) => {
  const defaultItem = {
    id: Date.now(),
    sku: "",
    price: 0,
    isActive: true,
    aliPrice: 0,
    aliActive: false,
    sheinPrice: 0,
    sheinActive: false,
    mercadoPrice: 0,
    mercadoActive: false,
    shopeePrice: 0,
    shopeeActive: false,
    isInvalidSku: false,
    isInvalidPrice: false,
  };
  const [items, setItems] = useState([defaultItem]);
  const [isLoading, setIsLoading] = useState(false);
  const [expiredSession, setExpiredSession] = useState(false);
  const toast = useToast();

  const handleCreateItems = async () => {
    try {
      setIsLoading(true);
      const response = await api.addItems(items);

      response.forEach((product, index) => {
        const returnMessage = product[items[index].sku];
        if (returnMessage.includes("Error")) {
          let description = `Um erro inesperado ocorreu ao tentar adicionar o item ${items[index].sku}.`;

          if (returnMessage.includes("duplicate"))
            description = `Item ${items[index].sku} já existe.`;

          if (returnMessage.includes("Unprocessable"))
            description = `Preço '${items[index].price}' do item ${items[index].sku} é inválido.`;

          toast({
            title: "Ocorreu um erro",
            description,
            status: "error",
            duration: styles.TOAST_DURATION,
            isClosable: styles.TOAST_ISCLOSABLE,
            position: styles.TOAST_POSITION,
          });
        } else {
          toast({
            title: "Sucesso!",
            description: `Item ${items[index].sku} adicionado com sucesso!`,
            status: "success",
            duration: styles.TOAST_DURATION,
            isClosable: styles.TOAST_ISCLOSABLE,
            position: styles.TOAST_POSITION,
          });
        }
      });
      setIsLoading(false);
      await getItems();
    } catch (e) {
      if (e.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro.",
          description: e.message,
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION,
        });
      }
      setIsLoading(false);
    }
  };

  const canAddProducts = items.every(
    (item) => !item.isInvalidSku && !item.isInvalidPrice
  );

  const handleRemoveItem = (index) => {
    setItems(items.filter((element, i) => i !== index));
  };

  const handleInput = (e, index, type) => {
    const { value } = e.target;
    const isValid =
      type === "sku" ? value !== "" : /^[0-9]+(,[0-9]{1,2})?$/.test(value);
    setItems((prevItems) =>
      prevItems.map((el, i) =>
        i === index
          ? {
              ...el,
              [type]: value,
              [`isInvalid${type.charAt(0).toUpperCase()}${type.slice(1)}`]:
                !isValid,
            }
          : el
      )
    );
  };

  const handleAddNewItem = () => setItems([...items, defaultItem]);

  return (
    <>
      {expiredSession && <Logout />}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar produtos</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column">
              {items.map((element, index) => {
                return (
                  <ProductInput
                    key={element.id}
                    item={element}
                    remove={() => handleRemoveItem(index)}
                    skuInput={(e) => handleInput(e, index, "sku")}
                    priceInput={(e) => handleInput(e, index, "price")}
                  />
                );
              })}
              <IconButton
                marginTop="20px"
                variant="ghost"
                size="lg"
                rounded="full"
                fontSize="25px"
                icon={<AiOutlineAppstoreAdd />}
                onClick={handleAddNewItem}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme={styles.COLOR_SCHEME}
                mr={3}
                onClick={handleCreateItems}
                isDisabled={!canAddProducts}
                isLoading={isLoading}
              >
                Adicionar produtos
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <s.TableContainerDiv
        borderWidth="0 1px 1px 1px"
        borderRadius="0 0 8px 8px"
        borderColor={styles.HIGHLIGHT_COLOR}
      >
        <Table
          color={styles.HIGHLIGHT_COLOR}
          colorScheme="marine"
          variant="simple"
          background={styles.TRANSPARENT_BACKGROUND}
          borderRight="1px"
        >
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                SKU
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                PRECO BASE
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                ATIVO
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                PRECO ALI
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                ATIVO ALI
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                PRECO SHOPEE
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                ATIVO SHOPEE
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                PRECO MERCADO
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                ATIVO MERCADO
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                PRECO SHEIN
              </Th>
              <Th textAlign="center" color={styles.HIGHLIGHT_COLOR}>
                ATIVO SHEIN
              </Th>
              <Th color={styles.HIGHLIGHT_COLOR}></Th>
            </Tr>
          </Thead>
          <Tbody position="relative">{children}</Tbody>
        </Table>
      </s.TableContainerDiv>
    </>
  );
};

export default ItemsTable;
