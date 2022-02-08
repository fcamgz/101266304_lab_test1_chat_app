import {
  Button,
  Box,
  FormControl,
  TextField,
  Typography,
  Paper,
  List,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [inputRoom, setInputRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [user, setUser] = useState({});
  const socket = useRef(io("http://localhost:8900"));
  const [numberOfMessages, setNumberOfMessages] = useState(0);

  /*
  socket.current.on("receive message", ({ message, username }) => {
    setArrivalMessage([...arrivalMessage, username + " : " + message]);
    console.log("frontend");
  });
  */
  useEffect(() => {
    socket.current.on("receive message", ({ message, username }) => {
      setArrivalMessage([...arrivalMessage, username + " : " + message]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setUserLoggedIn(true);
      axios
        .get(
          `http://localhost:5000/api/getUser/${localStorage.getItem("userId")}`
        )
        .then((res) => res.data)
        .then((res) => setUser(res));
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage === "" || inputRoom === "") return;
    socket.current?.emit(
      "send group message",
      inputMessage,
      inputRoom,
      user.username
    );
    setNumberOfMessages(numberOfMessages + 1);
    setMessages([...messages, user.username + " : " + inputMessage]);

    axios
      .post("http://localhost:5000/api/addMessage", {
        from_user: user.username,
        to_user: inputRoom,
        room: inputRoom,
        message: inputMessage,
      })
      .then((res) => res.data)
      .then((res) => {
        socket.current.on("receive message", ({ message, username }) => {
          setArrivalMessage([...arrivalMessage, username + " : " + message]);
          console.log("frontend");
        });
        console.log(res);
      });
    console.log(messages);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (inputRoom === "") return;
    setMessages([`Joined to room: ${inputRoom}`]);
    socket.current?.emit("join", inputRoom);
  };
  return (
    <Box>
      {userLoggedIn ? (
        <Button href="/logout">Log Out</Button>
      ) : (
        <Button href="/login">Log In</Button>
      )}
      <Box component="form">
        <FormControl>
          <TextField
            label="Message"
            margin="normal"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Room"
            margin="normal"
            type="text"
            value={inputRoom}
            onChange={(e) => setInputRoom(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
        <Button onClick={handleJoinRoom}>Join Room</Button>
      </Box>
      <Button onClick={handleSendMessage}>Send Message</Button>
      <Box>
        <Paper style={{ maxHeight: 200, overflow: "auto" }}>
          <List>
            <Typography>Sent Messages</Typography>
            {messages
              ? messages?.map((message) => <Typography>{message}</Typography>)
              : ""}
          </List>
        </Paper>
        <Paper style={{ maxHeight: 200, overflow: "auto" }}>
          <List>
            <Typography>Received Messages</Typography>
            {arrivalMessage?.map((message) => (
              <Typography>{message}</Typography>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
