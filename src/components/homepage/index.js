import React, { useCallback, useEffect, useState } from "react";
import ItemsTable from "../items-table";
import SearchBar from "../searchbar";
import TableCell from "../table-cell";
import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import api from "../../services/api";
import Logout from "../logout";
import Header from "../header";
import { styles } from "../../styles/constants";

const Homepage = () => {
  const [itemsValue, setItemsValue] = useState([]);
  const [returnedValues, setReturnedValues] = useState([]);
  const [expiredSession, setExpiredSession] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isActiveIsLoading, setIsActiveIsLoading] = useState(false);
  // const [activateAllHandler, setActivateAllHandler] = useState({
  //   clicked: false,
  //   state: true,
  // });
  // const [deactivateAllHandler, setDeactivateAllHandler] = useState({
  //   clicked: false,
  //   state: true,
  // });

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleActivateAll = useCallback(() => {
  //   setActivateAllHandler({
  //     clicked: true,
  //     state: !activateAllHandler.state,
  //   });
  // }, [activateAllHandler]);

  // const handleDeactivateAll = useCallback(() => {
  //   setDeactivateAll(!deactivateAll);
  // }, [deactivateAll]);

  const handleActivateButton = async () => {
    try {
      setIsActiveIsLoading(true);
      await api.editIsActive(!isActive);
      setIsActive(!isActive);
      setIsActiveIsLoading(false);
    } catch (e) {
      if (e.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro",
          description:
            "Um erro inesperado ocorreu ao tentar ativar o Tinytools",
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION,
        });
      }
      setIsActiveIsLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setItemsValue(results);
  };

  const getIsActive = useCallback(async () => {
    try {
      const response = await api.getIsActive();

      console.log(response.botIsActive);
      setIsActive(response.botIsActive);
    } catch (e) {
      if (e.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro",
          description:
            "Um erro inesperado ocorreu ao tentar ativar o Tinytools",
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION,
        });
      }
    }
  }, [toast]);

  const getItems = useCallback(async () => {
    try {
      const response = await api.getItems();

      setReturnedValues(response);
      setItemsValue(response);
    } catch (error) {
      if (error.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro",
          description: "Um erro inesperado ocorreu",
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION,
        });
      }
    }
  }, [toast]);

  useEffect(() => {
    getItems();
    getIsActive();
  }, [getItems, getIsActive]);

  return (
    <>
      {expiredSession && <Logout />}

      <Header>
        <SearchBar products={returnedValues} onSearch={handleSearchResults} />

        <Box display="flex" justifyContent="center" w="80vw" h="50vh">
          <ItemsTable getItems={getItems} isOpen={isOpen} onClose={onClose}>
            {itemsValue.length > 0
              ? itemsValue.map((element) => {
                  return (
                    <TableCell
                      key={element.sku}
                      item={{
                        id: element.id,
                        sku: element.sku,
                        price: element.price,
                        isActive: element.isActive,
                        aliPrice: element.aliPrice,
                        aliActive: element.aliActive,
                        sheinPrice: element.sheinPrice,
                        sheinActive: element.sheinActive,
                        mercadoPrice: element.mercadoPrice,
                        mercadoActive: element.mercadoActive,
                        shopeePrice: element.shopeePrice,
                        shopeeActive: element.shopeeActive,
                      }}
                      getItems={getItems}
                      // activateAll={activateAllHandler}
                      // deactivateAll={deactivateAllHandler}
                      creation={false}
                    />
                  );
                })
              : null}
          </ItemsTable>
        </Box>

        <Box marginTop="20px">
          <Button
            variant="link"
            color={styles.HIGHLIGHT_COLOR}
            onClick={onOpen}
          >
            Adicionar novo(s) produto(s)
          </Button>
        </Box>

        <Box marginTop="20px">
          <Button
            variant="link"
            color={styles.HIGHLIGHT_COLOR}
            onClick={handleActivateButton}
            isLoading={isActiveIsLoading}
          >
            Tiny tools está
            {isActive ? (
              <Text color={styles.CONFIRM_COLOR}>{"\u00A0"}ativo</Text>
            ) : (
              <Text color={styles.CANCEL_COLOR}>{"\u00A0"}inativo</Text>
            )}
          </Button>
        </Box>
        <Box margin="20px" display="flex">
          <Button
            variant="link"
            color={styles.HIGHLIGHT_COLOR}
            // onClick={handleActivateAll}
            isDisabled
          >
            Ativar todos
          </Button>
          <Text
            marginLeft="8px"
            marginRight="8px"
            color={styles.HIGHLIGHT_COLOR}
          >
            /
          </Text>
          <Button
            variant="link"
            color={styles.HIGHLIGHT_COLOR}
            // onClick={handleDeactivateAll}
            isDisabled
          >
            Desativar todos
          </Button>
        </Box>
      </Header>
    </>
  );
};

export default Homepage;
