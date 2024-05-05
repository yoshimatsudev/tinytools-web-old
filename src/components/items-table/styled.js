import styled from "styled-components";
import { Box } from "@chakra-ui/react";

export const TableContainerDiv = styled(Box)`
  width: 100%;
  max-height: 60vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: gray;
  }
`;
