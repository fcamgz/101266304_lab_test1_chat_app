import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
