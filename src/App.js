import "./App.css";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
