import React from "react";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { styles } from "../../styles/constants";

const Logout = () => {
  const toast = useToast();

  Cookies.remove("tinytoolssession");

  toast({
    title: "Sessão expirada :(",
    description: "Por favor, tente logar novamente.",
    status: "error",
    duration: styles.TOAST_DURATION,
    isClosable: styles.TOAST_ISCLOSABLE,
    position: styles.TOAST_POSITION
  });

  return <Navigate to="/login" />;
};

export default Logout;
