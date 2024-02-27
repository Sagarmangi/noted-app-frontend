import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

export default function Page404() {
  return (
    <Box textAlign="center" marginTop="40vh">
      <Heading>Sorry Page Not Found</Heading>
      <Text>
        Return to <Link href="/">Home</Link>
      </Text>
    </Box>
  );
}
