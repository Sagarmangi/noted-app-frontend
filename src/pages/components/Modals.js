import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditNote({
  title,
  content,
  _id,
  isEditModalOpen,
  handleModalClose,
  refreshData,
}) {
  const [noteValues, setNoteValues] = useState({
    title: title,
    content: content,
    id: _id,
  });
  const toast = useToast();

  useEffect(() => {
    if (isEditModalOpen) {
      setNoteValues({ title: title, content: content, id: _id });
    }
  }, [isEditModalOpen, setNoteValues, _id, title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Updating Note",
      position: "top-right",
      status: "loading",
      duration: 2500,
      isClosable: true,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/edit`,
        { ...noteValues },
        { withCredentials: true }
      );
      if (data) {
        handleModalClose();
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoteValues((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  return (
    <Modal isOpen={isEditModalOpen} size="lg" onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Flex flexDir="column" gap="1rem">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="title"
                  value={noteValues?.title}
                  placeholder="Title"
                  focusBorderColor={process.env.REACT_APP_PRIMARY_COLOR}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea
                  onChange={handleChange}
                  placeholder="Content"
                  name="content"
                  value={noteValues?.content}
                  rows="3"
                  focusBorderColor={process.env.REACT_APP_PRIMARY_COLOR}
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="yellow"
              bgColor={process.env.REACT_APP_BUTTON_COLOR}
              type="submit"
              me="8px"
            >
              Save
            </Button>

            <Button variant="outline" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
