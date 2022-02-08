import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loggedIn") === true) {
      setUserLoggedIn(true);
    }
  }, []);
  return (
    <Box>
      {userLoggedIn === "true" ? (
        <Button href="/">Logout</Button>
      ) : (
        <Box>
          <Typography>Chat App - 101266304</Typography>
          <Button href="/login">Login</Button>
          <Button href="/register">Register</Button>
        </Box>
      )}
    </Box>
  );
}
