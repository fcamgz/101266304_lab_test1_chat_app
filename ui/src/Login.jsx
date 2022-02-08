import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        username: username,
        password: password,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res.data.username) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("userId", res.data._id);
          navigate("/chat");
        } else {
          localStorage.setItem("loggedIn", false);
        }
      })
      .catch((err) => console.log(err));
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box>
      <Typography>Login</Typography>
      <Box component="form" onSubmit={handleLogin}>
        <FormControl>
          <TextField
            label="Username"
            margin="normal"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <Stack m={4}>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
