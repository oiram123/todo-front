import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const useAuthenticate = () => {
  console.log('called')
  const { isAuthenticated, setIsAuthenticated, setTokens } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let isAuth = localStorage.getItem("isAuthenticated");

    if (isAuth) {
      console.log("you are authinticated");
      setIsAuthenticated(true);
      setTokens({
        access: { token: accessToken },
      });
    } else if (isAuth === false || accessToken === null) {
      console.log("go to login");
      navigate("/");
    }
  }, [isAuthenticated, navigate, setIsAuthenticated]);
};

export default useAuthenticate;
