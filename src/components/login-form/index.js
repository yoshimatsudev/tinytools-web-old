import {
  Input,
  InputRightElement,
  Button,
  IconButton,
  Text,
  Box,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import { styles } from "../../styles/constants";
import { ReactComponent as TinyToolsLogo } from "../../images/tinytools-logo.svg";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginHasSucceed, setLoginHasSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleHideButton = () => setShow(!show);

  const handleEnterClick = async () => {
    setIsLoading(true);

    try {
      await api.login(username, password);

      setIsLoading(false);
      setLoginError(false);
      setLoginHasSucceed(true);
    } catch (e) {
      setLoginError(true);
      setIsUsernameInvalid(true);
      setIsPasswordInvalid(true);
      setIsLoading(false);
    }
  };

  const handleUsernameInputChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    setIsUsernameInvalid(!value);
  };

  const handlePasswordInputChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setIsPasswordInvalid(!value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      backgroundColor={styles.BACKGROUND_COLOR}
      backgroundImage={styles.BACKGROUND_IMAGE}
    >
      {loginHasSucceed && <Navigate to="/home" />}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="35px"
        h="500px"
        w="400px"
        borderRadius="50px"
        background={styles.TRANSPARENT_BACKGROUND}
      >
        <Icon
          as={TinyToolsLogo}
          marginTop="-60px"
          w="100px"
          h="100px"
          style={{ fill: styles.HIGHLIGHT_COLOR }}
        />
        {loginError ? (
          <Text
            textAlign="center"
            fontSize="14px"
            color="red"
            marginBottom="8px"
          >
            Usuário e/ou senha errado(s)
          </Text>
        ) : (
          <Box height="29px"></Box>
        )}
        <Input
          focusBorderColor={styles.HIGHLIGHT_COLOR}
          color={styles.HIGHLIGHT_COLOR}
          placeholder="Username"
          _placeholder={{ color: styles.HIGHLIGHT_COLOR }}
          value={username || ""}
          onChange={handleUsernameInputChange}
          isInvalid={isUsernameInvalid}
        />
        <InputGroup size="md" marginTop="10px">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            focusBorderColor={styles.HIGHLIGHT_COLOR}
            color={styles.HIGHLIGHT_COLOR}
            placeholder="Password"
            _placeholder={{ color: styles.HIGHLIGHT_COLOR }}
            value={password || ""}
            onChange={handlePasswordInputChange}
            isInvalid={isPasswordInvalid}
          />
          <InputRightElement width="3.5rem">
            <IconButton
              size="xs"
              rounded="full"
              onClick={handleHideButton}
              variant="outline"
              color={styles.HIGHLIGHT_COLOR}
              icon={show ? <BsEyeSlashFill /> : <BsEyeFill />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Button
          isLoading={isLoading}
          variant="outline"
          color={styles.HIGHLIGHT_COLOR}
          onClick={handleEnterClick}
          marginTop="20px"
          display="flex"
          w="100%"
        >
          Entrar
        </Button>
        <Button variant="link" color={styles.HIGHLIGHT_COLOR} marginTop="20px">
          Esqueceu a senha?
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
