import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { styles } from "../../styles/constants";
import { TbEdit } from "react-icons/tb";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const AuthInput = ({ token, value }) => {
  const [inputValue, setInputValue] = useState();
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => setEditMode(true);

  const handleCancelClick = () => setEditMode(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <Box display="flex" alignItems="center" marginTop="8px">
      {/* <Icon fontSize="24px" color={styles.CONFIRM_COLOR} as={BsCheck} /> */}
      <Input
        placeholder={value}
        isDisabled={!editMode}
        value={inputValue}
        onChange={handleInputChange}
      />
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
  );
};

export default AuthInput;
