import React, { useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Passwords are not matching!");
    } else {
      axios
        .post("http://localhost:5000/api/register", {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
        })
        .then((res) => res.data)
        .then((res) => {
          if (res.status === "ok") {
            navigate("/login");
          } else {
            alert(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box>
      <Typography>Register</Typography>
      <Box component="form" onSubmit={handleRegister}>
        <FormControl>
          <TextField
            label="First Name"
            margin="normal"
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Last Name"
            margin="normal"
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
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
        <FormControl>
          <TextField
            label="Re-enter Password"
            margin="normal"
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <Stack m={4}>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
