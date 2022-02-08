import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Logout() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/api/logout");
    localStorage.setItem("loggedIn", false);
  }, []);
  return (
    <Box>
      <Button href="/login">Login</Button>
    </Box>
  );
}
