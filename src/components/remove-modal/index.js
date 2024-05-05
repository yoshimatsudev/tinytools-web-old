import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import api from "../../services/api";
import { useState } from "react";
import Logout from "../logout";
import { styles } from "../../styles/constants";

const RemoveModal = ({
  data,
  isOpen,
  onClose,
  changeIsLoaded,
  isLoaded,
  getItems,
}) => {
  const [expiredSession, setExpiredSession] = useState(false);
  const toast = useToast();

  const handleConfirmClick = async () => {
    changeIsLoaded(false);
    try {
      await api.deleteItem(data.id);
      onClose();
      toast({
        title: "Item excluído",
        description: "Item " + data.sku + " removido com êxito.",
        status: "success",
        duration: styles.TOAST_DURATION,
        isClosable: styles.TOAST_ISCLOSABLE,
        position: styles.TOAST_POSITION
      });
      await getItems();
      changeIsLoaded(true);
    } catch (err) {
      if (err.response.status === 401) {
        setExpiredSession(true);
      } else {
        toast({
          title: "Ocorreu um erro",
          description: err.message,
          status: "error",
          duration: styles.TOAST_DURATION,
          isClosable: styles.TOAST_ISCLOSABLE,
          position: styles.TOAST_POSITION
        });
      }
      changeIsLoaded(true);
    }
  };

  return (
    <>
      {expiredSession && <Logout />}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remover item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Você tem certeza que deseja remover o item "{data.sku}"?
            <br />
            <br />
            <i>Essa ação é irrervesível.</i>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={!isLoaded}
              colorScheme="blue"
              mr={3}
              onClick={handleConfirmClick}
            >
              Remover
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveModal;
