import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Input,
  Spinner,
  Switch,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import RemoveModal from "../remove-modal";
import api from "../../services/api";
import { styles } from "../../styles/constants";
import Logout from "../logout";

const iconButtonParams = {
  variant: "unstyled",
  rounded: "full",
  size: "md",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  _hover: { background: "rgba(255, 255, 255, 0.3)" },
  _active: { background: "rgba(255, 255, 255, 0.7)" },
  height: 10,
  width: 100,
};

const TableCell = ({ item, getItems, activateAll, deactivateAll }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [object, setObject] = useState(item);
  const [auxObject, setAuxObject] = useState(item);
  const [isModified, setIsModified] = useState(false);
  const [expiredSession, setExpiredSession] = useState(false);

  const handleDataChange = (e, type) => {
    setObject({
      ...object,
      [type]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setAuxObject(object);
  };

  const handleCancelClick = () => {
    setObject(auxObject);
    setEditMode(false);
  };

  const handleIsActiveClick = async () => {
    setIsLoaded(false);
    if (!isModified) setIsModified(true);
    setObject({ ...object, isActive: !object.isActive });
  };

  const handleIsActiveClickMercado = async () => {
    setIsLoaded(false);
    if (!isModified) setIsModified(true);
    setObject({ ...object, mercadoActive: !object.mercadoActive });
  };

  const handleIsActiveClickShopee = async () => {
    setIsLoaded(false);
    if (!isModified) setIsModified(true);
    setObject({ ...object, shopeeActive: !object.shopeeActive });
  };

  const handleIsActiveClickAli = async () => {
    setIsLoaded(false);
    if (!isModified) setIsModified(true);
    setObject({ ...object, aliActive: !object.aliActive });
  };

  const handleIsActiveClickShein = async () => {
    setIsLoaded(false);
    if (!isModified) setIsModified(true);
    setObject({ ...object, sheinActive: !object.sheinActive });
  };

  const handleSaveClick = useCallback(async () => {
    setIsLoaded(false);
    const priceRegex = /^[0-9]+(,[0-9]{1,2})?$/;

    if (!priceRegex.test(object.price)) {
      toast({
        title: "Preço inválido.",
        description: "Por favor, insira no seguinte formato:\nEx. 10,00",
        status: "error",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
      setIsLoaded(true);
      return;
    }

    try {
      await api.editItem(item.id, object);
      setEditMode(false);
      setIsLoaded(true);
      toast({
        title: "Sucesso!",
        description: `Item ${object.sku} salvo com êxito.`,
        status: "success",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
      await getItems();
    } catch (err) {
      if (err.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro.",
          description: err.message,
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION,
        });
      }
      setIsLoaded(true);
    }
  }, [toast, getItems, item.id, object]);

  useEffect(() => {
    //Precisa ser assim
    if (object.isActive !== auxObject.isActive || isModified) {
      handleSaveClick();
    }
  }, [object.isActive, auxObject.isActive, handleSaveClick, isModified]);

  // useEffect(() => {
  //   if (activateAll.clicked) console.log("teste");
  // }, [activateAll]);

  const renderText = (data, type) => {
    if (editMode) {
      return (
        <Input
          placeholder={data}
          value={data}
          textAlign="center"
          onChange={(e) => handleDataChange(e, type)}
          color={styles.HIGHLIGHT_COLOR}
        />
      );
    } else {
      return <Text>{data}</Text>;
    }
  };

  const renderIcons = () => {
    if (editMode) {
      return (
        <Box display="flex" justifyContent="center">
          <IconButton
            {...iconButtonParams}
            icon={<AiOutlineCheckCircle />}
            title="Salvar"
            marginRight="8px"
            onClick={handleSaveClick}
            color={styles.CONFIRM_COLOR}
          />
          <IconButton
            {...iconButtonParams}
            title="Cancelar"
            icon={<AiOutlineCloseCircle />}
            onClick={handleCancelClick}
            color={styles.CANCEL_COLOR}
          />
        </Box>
      );
    } else {
      return (
        <Box display="flex" justifyContent="center">
          <IconButton
            {...iconButtonParams}
            colorScheme={iconButtonParams.colorScheme}
            icon={<TbEdit />}
            marginRight="8px"
            title="Editar"
            onClick={handleEditClick}
          />
          <IconButton
            {...iconButtonParams}
            colorScheme={iconButtonParams.colorScheme}
            title="Remover"
            icon={<TbTrash />}
            onClick={onOpen}
          />
        </Box>
      );
    }
  };

  return (
    <>
      {expiredSession && <Logout />}
      {!isLoaded && (
        <Box
          zIndex="overlay"
          position="absolute"
          height="100px"
          width="100%"
          backdropFilter="auto"
          backdropBlur="8px"
          display="flex"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="green.500" mb="4" />
        </Box>
      )}
      <RemoveModal
        data={item}
        isOpen={isOpen}
        onClose={onClose}
        changeIsLoaded={setIsLoaded}
        getItems={getItems}
        isLoaded={isLoaded}
      />
      <Tr>
        <Td textAlign="center" width="1%">
          {renderText(object.sku, "sku")}
        </Td>
        <Td textAlign="center" width="1%">
          {renderText(object.price, "price")}
        </Td>
        <Td textAlign="center" width="1%">
          <Switch
            isChecked={object.isActive}
            isDisabled={editMode}
            onChange={handleIsActiveClick}
          />
        </Td>
        <Td textAlign="center" width="1%">
          {renderText(object.aliPrice, "aliPrice")}
        </Td>
        <Td textAlign="center" width="1%">
          <Switch
            isChecked={object.aliActive}
            isDisabled={editMode}
            onChange={handleIsActiveClickAli}
          />
        </Td>
        <Td textAlign="center" width="1%">
          {renderText(object.shopeePrice, "shopeePrice")}
        </Td>
        <Td textAlign="center" width="1%">
          <Switch
            isChecked={object.shopeeActive}
            isDisabled={editMode}
            onChange={handleIsActiveClickShopee}
          />
        </Td>
        <Td textAlign="center" width="1%">
          {renderText(object.mercadoPrice, "mercadoPrice")}
        </Td>
        <Td textAlign="center" width="1%">
          <Switch
            isChecked={object.mercadoActive}
            isDisabled={editMode}
            onChange={handleIsActiveClickMercado}
          />
        </Td>
        <Td textAlign="center" width="1%">
          {renderText(object.sheinPrice, "sheinPrice")}
        </Td>
        <Td textAlign="center" width="1%">
          <Switch
            isChecked={object.sheinActive}
            isDisabled={editMode}
            onChange={handleIsActiveClickShein}
          />
        </Td>
        <Td textAlign="center" width="1%">
          {renderIcons()}
        </Td>
      </Tr>
    </>
  );
};

export default TableCell;
