import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Input, Text, useToast } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import api from "../../services/api";
import { styles } from "../../styles/constants";
import { TbEdit } from "react-icons/tb";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const AuthsForm = () => {
  const [apiKeyEditMode, setApiKeyEditMode] = useState(false);
  const [apiKeyIsLoading, setApiKeyIsLoading] = useState(true);
  const [apiKeyIsInvalid, setApiKeyIsInvalid] = useState(false);
  const [accountEditMode, setAccountEditMode] = useState(false);
  const [accountIsLoading, setAccountIsLoading] = useState(true);
  const [accountIsInvalid, setAccountIsInvalid] = useState(false);

  const [apiKeyValue, setApiKeyValue] = useState();
  const [usernameValue, setUsernameValue] = useState();
  const [passwordValue, setPasswordValue] = useState();

  const [apiKeyPlaceholder, setApiKeyPlaceholder] = useState();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState();
  const [passwordPlaceholder, setPasswordPlaceholder] = useState();

  const toast = useToast();

  const handleApiTokenEditClick = () => setApiKeyEditMode(true);
  const handleApiTokenCancelClick = () => setApiKeyEditMode(false);
  const handleApiTokenConfirmClick = async () => {
    try {
      if (apiKeyValue === undefined || apiKeyValue.trim() === "") {
        setApiKeyIsInvalid(true);
        setApiKeyValue();
        throw new Error("O valor da api key não pode estar vazio!");
      }
      setApiKeyIsLoading(true);
      await api.editApiKey(apiKeyValue);
      toast({
        title: "Alteração feita",
        description: "Api key alterada com sucesso!",
        status: "success",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
    } catch (e) {
      setAccountIsInvalid(true);
      toast({
        title: "Ocorreu um erro",
        description: e.message,
        status: "error",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
    }

    setApiKeyIsLoading(false);
    setApiKeyEditMode(false);
  };

  const handleAccountEditClick = () => setAccountEditMode(true);
  const handleAccountCancelClick = () => setAccountEditMode(false);
  const handleAccountConfirmClick = async () => {
    try {
      setAccountIsLoading(true);
      await api.editTinyAccount(usernameValue, passwordValue);
      toast({
        title: "Alteração feita",
        description: "Conta tiny verificada e alterada com sucesso!",
        status: "success",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
    } catch (e) {
      toast({
        title: "Ocorreu um erro",
        description: e.message,
        status: "error",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION,
      });
    }

    setAccountIsLoading(false);
    setAccountEditMode(false);
  };

  const handleApiTokenChange = (e) => {
    setApiKeyValue(e.target.value);
    setApiKeyIsInvalid(false);
  };

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
    setAccountIsInvalid(false);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
    setAccountIsInvalid(false);
  };

  const setIsLoading = (value) => {
    setApiKeyIsLoading(value);
    setAccountIsLoading(value);
  };

  useEffect(() => {
    const getKeys = async () => {
      const response = await api.getUserKeys();
      setApiKeyPlaceholder(response["apiKey"]);
      setUsernamePlaceholder(response["tinyLogin"]);
      setPasswordPlaceholder(response["tinyPassword"]);
      setIsLoading(false);
    };
    getKeys();
  }, []);

  return (
    <Box color={styles.HIGHLIGHT_COLOR} marginTop="20px">
      <Box>
        <Text fontSize="2xl">Api Key:</Text>
        <Text>
          1. Faça login na sua conta do Tiny. <br />
          2. Vá em: Configurações <Icon as={ChevronRightIcon} /> Geral
          <Icon as={ChevronRightIcon} /> TokenApi. <br />
          3. Copie e cole o token no campo abaixo:
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="8px"
          position="relative"
        >
          <Text fontSize="xs" position="absolute" right="2">
            api key
          </Text>
          <Input
            placeholder={apiKeyPlaceholder}
            value={apiKeyValue}
            isDisabled={!apiKeyEditMode}
            onChange={handleApiTokenChange}
            isInvalid={apiKeyIsInvalid}
          />
          {apiKeyEditMode ? (
            <Box
              display="flex"
              justifyContent="space-around"
              w="100%"
              marginTop="8px"
            >
              <Button
                variant="ghost"
                colorScheme="green"
                w="150px"
                padding="0"
                onClick={handleApiTokenConfirmClick}
                isLoading={apiKeyIsLoading}
              >
                <AiOutlineCheckCircle />
                <Text marginLeft="8px">Confirmar</Text>
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                w="150px"
                padding="0"
                onClick={handleApiTokenCancelClick}
                isLoading={apiKeyIsLoading}
              >
                <AiOutlineCloseCircle />
                <Text marginLeft="8px">Cancelar</Text>
              </Button>
            </Box>
          ) : (
            <Button
              variant="ghost"
              onClick={handleApiTokenEditClick}
              marginTop="8px"
              isLoading={apiKeyIsLoading}
            >
              <TbEdit />
              Alterar
            </Button>
          )}
        </Box>
      </Box>
      <Box marginTop="30px" display="flex" flexDirection="column">
        <Text fontSize="2xl">Conta Tiny:</Text>
        <Text>
          1. Crie um novo login para o Tiny tools. <br />
          2. Insira o login e senha abaixo:
        </Text>
        <Box marginTop="8px" position="relative">
          <Text fontSize="xs" position="absolute" right="2">
            username
          </Text>
          <Input
            placeholder={usernamePlaceholder}
            value={usernameValue}
            isDisabled={!accountEditMode}
            isInvalid={accountIsInvalid}
            onChange={handleUsernameChange}
          />
        </Box>
        <Box marginTop="8px" position="relative">
          <Text fontSize="xs" position="absolute" right="2">
            password
          </Text>
          <Input
            type="password"
            placeholder={passwordPlaceholder}
            value={passwordValue}
            isDisabled={!accountEditMode}
            isInvalid={accountIsInvalid}
            onChange={handlePasswordChange}
          />
        </Box>
        {accountEditMode ? (
          <Box
            display="flex"
            justifyContent="space-around"
            w="100%"
            marginTop="8px"
          >
            <Button
              variant="ghost"
              colorScheme="green"
              w="150px"
              padding="0"
              onClick={handleAccountConfirmClick}
              isLoading={accountIsLoading}
            >
              <AiOutlineCheckCircle />
              <Text marginLeft="8px">Verificar</Text>
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              w="150px"
              padding="0"
              onClick={handleAccountCancelClick}
              isLoading={accountIsLoading}
            >
              <AiOutlineCloseCircle />
              <Text marginLeft="8px">Cancelar</Text>
            </Button>
          </Box>
        ) : (
          <Button
            variant="ghost"
            onClick={handleAccountEditClick}
            marginTop="8px"
            isLoading={accountIsLoading}
          >
            <TbEdit />
            Alterar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AuthsForm;
