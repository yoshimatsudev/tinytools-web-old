import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { ReactComponent as TinyToolsLogo } from "../../images/tinytools-logo.svg";
import { styles } from "../../styles/constants";
import { BsCheckAll, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";

const Header = ({ children }) => {
  return (
    <Box
      position="absolute"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      w="100vw"
      minHeight="100vh"
      backgroundColor={styles.BACKGROUND_COLOR}
      backgroundImage={styles.BACKGROUND_IMAGE}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom="15px"
        color={styles.HIGHLIGHT_COLOR}
      >
        <Icon
          as={TinyToolsLogo}
          marginTop="20px"
          w="250px"
          h="200px"
          style={{ fill: styles.HIGHLIGHT_COLOR }}
        />
        <Breadcrumb>
          <BreadcrumbItem>
            <Icon as={AiOutlineHome} marginRight="5px" />
            <BreadcrumbLink href="/home">Início</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Icon
              color={styles.CONFIRM_COLOR}
              as={BsCheckAll}
              marginRight="5px"
            />
            <BreadcrumbLink href="/auths">Autenticações</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Icon as={BsInfoCircle} marginRight="5px" />
            <BreadcrumbLink href="/logs">Logs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Icon as={AiOutlineLogout} marginRight="5px" />
            <BreadcrumbLink href="/logout">Logout</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      {children}
    </Box>
  );
};

export default Header;
