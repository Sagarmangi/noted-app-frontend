import React, { useState } from "react";
import { Box, Input, Textarea, Button, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Icon } from "../../@uikit/Icon";

export default function CreateNote({ addNote }) {
  const [noteExpand, setNoteExpand] = useState(false);
  const toast = useToast();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  function expandNote() {
    setNoteExpand(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
    event.preventDefault();
  }

  const submitNote = async (e) => {
    e.preventDefault();
    toast({
      title: "Submitting",
      position: "top-right",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/post`,
        { ...note },
        { withCredentials: true }
      );
      if (data) {
        setNote({
          title: "",
          content: "",
        });
        setNoteExpand(false);
        addNote();
      } else {
        setNote({
          title: "",
          content: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
    setNote({
      title: "",
      content: "",
    });
  };

  return (
    <Box
      w={{ base: "20rem", md: "25rem", lg: "30rem" }}
      mx="auto"
      mb="2rem"
      bg="#fff"
      p="1rem"
      borderRadius="0.5rem"
      boxShadow="0 1px 5px rgb(138, 137, 137)"
    >
      <form onSubmit={(e) => submitNote(e)}>
        {noteExpand && (
          <Input
            name="title"
            onChange={handleChange}
            border="none"
            fontSize="1.2rem"
            focusBorderColor={process.env.REACT_APP_PRIMARY_COLOR}
            value={note.title}
            placeholder="Title"
          />
        )}

        <Textarea
          name="content"
          onClick={expandNote}
          onChange={handleChange}
          value={note.content}
          fontSize="1.2rem"
          border="none"
          focusBorderColor={process.env.REACT_APP_PRIMARY_COLOR}
          placeholder="Take a note..."
          rows={noteExpand ? 3 : 1}
        />
        {noteExpand && (
          <Flex justifyContent="space-between">
            <Button
              variant="outline"
              borderColor={process.env.REACT_APP_BUTTON_COLOR}
              mt="1rem"
              onClick={() => setNoteExpand(false)}
              size="sm"
            >
              <Icon
                name="close-fill"
                color={process.env.REACT_APP_BUTTON_COLOR}
              />
            </Button>
            <Button
              type="submit"
              variant="outline"
              borderColor={process.env.REACT_APP_BUTTON_COLOR}
              mt="1rem"
              size="sm"
            >
              <Icon
                name="add-line"
                color={process.env.REACT_APP_BUTTON_COLOR}
              />
            </Button>
          </Flex>
        )}
      </form>
    </Box>
  );
}
