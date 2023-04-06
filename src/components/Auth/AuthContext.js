import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {},
  tokens: {},
  setTokens: () => {},
  login: (user, tokens) => {},
});

export default AuthContext;
