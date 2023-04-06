import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./components/Auth/AuthContext";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [tokens, setTokens] = useState({});

  const login = (user, tokens) => {
    setIsAuthenticated(true);
    setUser(user);
    setTokens(tokens);
    localStorage.setItem("isAuthenticated", true)
    localStorage.setItem("accessToken", tokens)
    localStorage.setItem("userId", user._id)
  };
  return (
    <AuthContext.Provider
    value={{ isAuthenticated, setIsAuthenticated, user, tokens, setTokens, login }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
