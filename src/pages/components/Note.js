import {
  Spacer,
  Heading,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Icon } from "../../@uikit/Icon";
import EditNote from "./Modals";
import axios from "axios";

export default function Note({
  onDelete,
  title,
  content,
  _id,
  refreshData,
  archived,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toast = useToast();

  function handleDelete() {
    toast({
      title: "Deleting Note",
      position: "top-right",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    onDelete(_id);
  }

  const handleArchive = async () => {
    try {
      toast({
        title: "Archiving Note",
        position: "top-right",
        status: "loading",
        duration: 2000,
        isClosable: true,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/archive`,
        { id: _id },
        {
          withCredentials: true,
        }
      );
      if (data) {
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnarchive = async () => {
    try {
      toast({
        title: "Unarchiving Note",
        position: "top-right",
        status: "loading",
        duration: 2000,
        isClosable: true,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/unarchive`,
        { id: _id },
        {
          withCredentials: true,
        }
      );
      if (data) {
        refreshData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditOpen = (rowData) => {
    setIsEditModalOpen(true);
  };
  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Flex
      flexDir="column"
      backgroundColor="#fff"
      borderRadius="7px"
      boxShadow="0 2px 5px #ccc"
      padding="10px"
      gap="0.5rem"
      width={{ base: "47%", md: "48%", lg: "32%" }}
      //   margin="15px"
      //   float="left"
    >
      <Heading as="h4" size="md">
        {title}
      </Heading>
      <Text>{content}</Text>
      <Spacer />
      <Flex gap="0.5rem" mt="0.8rem" justifyContent="end">
        {archived ? (
          ""
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleEditOpen}
            borderColor={process.env.REACT_APP_BUTTON_COLOR}
          >
            <Icon name="edit-fill" color={process.env.REACT_APP_BUTTON_COLOR} />
          </Button>
        )}
        {archived ? (
          <Button
            size="sm"
            variant="outline"
            onClick={handleUnarchive}
            borderColor={process.env.REACT_APP_BUTTON_COLOR}
          >
            <Icon
              name="inbox-unarchive-fill"
              color={process.env.REACT_APP_BUTTON_COLOR}
            />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleArchive}
            borderColor={process.env.REACT_APP_BUTTON_COLOR}
          >
            <Icon
              name="archive-fill"
              color={process.env.REACT_APP_BUTTON_COLOR}
            />
          </Button>
        )}
        {archived ? (
          ""
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            borderColor={process.env.REACT_APP_BUTTON_COLOR}
          >
            <Icon
              name="delete-bin-fill"
              color={process.env.REACT_APP_BUTTON_COLOR}
            />
          </Button>
        )}
      </Flex>
      <EditNote
        isEditModalOpen={isEditModalOpen}
        handleModalClose={handleEditClose}
        _id={_id}
        title={title}
        content={content}
        refreshData={refreshData}
      />
    </Flex>
  );
}
