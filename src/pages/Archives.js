import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import { fetchUserData } from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

export default function Archives() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [cookies] = useCookies([]);

  useEffect(() => {
    if (cookies.auth_token) {
      dispatch(fetchUserData(cookies.auth_token));
    }
  }, [dispatch, cookies.auth_token]);

  const filteredNotes = data?.archivedNotes?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box p="1.5rem 1rem">
        <Flex gap="1.1rem" flexWrap="wrap">
          {filteredNotes?.length > 0 ? (
            filteredNotes.map((note, index) => (
              <Note
                key={index}
                _id={note._id}
                title={note.title}
                content={note.content}
                // onDelete={deleteNote}
                // refreshData={refreshNote}
                archived
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
