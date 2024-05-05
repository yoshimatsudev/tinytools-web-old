import React, { useEffect, useState } from "react";

import Header from "../header";
import { Box, Icon, IconButton, Input, Text } from "@chakra-ui/react";
// import { BsCheck } from "react-icons/bs";
// import { styles } from "../../styles/constants";
import { ChevronRightIcon } from "@chakra-ui/icons";
import AuthInput from "../authInput";
import api from "../../services/api";
import { styles } from "../../styles/constants";
import { TbEdit } from "react-icons/tb";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const AuthsForm1= () => {
  const [userKeys, setUserKeys] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getKeys = async () => {
      const response = await api.getUserKeys();
      setUserKeys(response);
    };

    getKeys();
  }, []);

  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => setEditMode(false);

  return (
    <Header>
      <Box display="flex" flexDirection="column" color={styles.HIGHLIGHT_COLOR}>
        <Box>
          <Box>
            {/* <Text fontSize="4xl">Status</Text>
            <Box display="flex" alignItems="center">
              <Text>API Token </Text>
              <Icon color={styles.CONFIRM_COLOR} fontSize="24px" as={BsCheck} />
            </Box>
            <Box display="flex" alignItems="center">
              <Text>Cookie </Text>
              <Icon color={styles.CONFIRM_COLOR} fontSize="24px" as={BsCheck} />
            </Box> */}
          </Box>
          <Text fontSize="3xl">API Token</Text>
          <Text fontSize="xl">Obtendo API Token:</Text>
          <Text>
            1. Faça login na sua conta do Tiny. <br />
            2. Vá em: Configurações <Icon as={ChevronRightIcon} /> Geral
            <Icon as={ChevronRightIcon} /> TokenApi. <br />
            3. Copie e cole o token no campo abaixo:
          </Text>
          <AuthInput token="api_token" value={userKeys.apiKey} />
        </Box>
        <br />
        <Box>
          <Text fontSize="3xl">Cookies</Text>
          <Text display="flex">
            <Text color={styles.CONFIRM_COLOR} as="b">
              *NOVO*
            </Text>
            {"\u00A0"}Agora o Tinytools conta com gerenciamento automático de
            cookies.
          </Text>
          <Text>
            Para fazê-lo, basta criar um novo login no seu Tiny e adicioná-los
            abaixo:
          </Text>
          <Box display="flex" marginLeft="8px" alignItems="center">
            <Box marginTop="8px">
              <Input isDisabled={!editMode} />
              <Input isDisabled={!editMode} marginTop="8px" />
            </Box>
            {editMode ? (
              <Box w="100px">
                <IconButton
                  title="Cancelar"
                  icon={<AiOutlineCloseCircle />}
                  onClick={handleCancelClick}
                  color={styles.CANCEL_COLOR}
                  variant="unstyled"
                  rounded="full"
                  marginLeft="8px"
                />
                <IconButton
                  icon={<AiOutlineCheckCircle />}
                  title="Salvar"
                  // onClick={handleSaveClick}
                  color={styles.CONFIRM_COLOR}
                  variant="unstyled"
                  rounded="full"
                />
              </Box>
            ) : (
              <Box w="100px">
                <IconButton
                  title="Editar"
                  onClick={handleEditClick}
                  icon={<TbEdit />}
                  variant="unstyled"
                  rounded="full"
                  marginLeft="8px"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Header>
  );
};

export default AuthsForm1;
