import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";
import { fetchUserData } from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [cookies] = useCookies([]);

  const refreshNote = () => {
    dispatch(fetchUserData(cookies.auth_token));
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        refreshNote();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (cookies.auth_token) {
      dispatch(fetchUserData(cookies.auth_token));
    }
  }, [dispatch, cookies.auth_token]);

  const filteredNotes = data?.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box p="1.5rem 1rem">
        <CreateNote addNote={refreshNote} />
        <Flex gap="1.1rem" flexWrap="wrap">
          {filteredNotes?.length > 0 ? (
            filteredNotes.map((note, index) => (
              <Note
                key={index}
                _id={note._id}
                title={note.title}
                content={note.content}
                onDelete={deleteNote}
                refreshData={refreshNote}
              />
            ))
          ) : (
            <Text>No notes found</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
