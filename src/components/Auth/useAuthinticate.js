import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const useAuthenticate = () => {
  const { isAuthenticated, setIsAuthenticated, setTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let refreshToken = localStorage.getItem("refreshTokens");
    let accessToken = localStorage.getItem("accessToken");
    let expireTime = localStorage.getItem("expireTime");
    let isAuth = localStorage.getItem("isAuthenticated");

    if (Date.now() < Date.parse(expireTime)) {
      console.log("greater");
    }

    if (isAuth === true && refreshToken && accessToken && expireTime) {
      setIsAuthenticated(true);
      if (Date.now() < Date.parse(expireTime)) {
        setIsAuthenticated(true);
        setTokens({
          refresh: { token: refreshToken, expires: expireTime },
          access: { token: accessToken, expires: expireTime },
        });
      } else {
        localStorage.removeItem("refreshTokens");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expireTime");
        navigate("/login");
      }
    } else if (isAuth === false || refreshToken === null) {
      console.log("go to login");
      navigate("/login");
    }
  }, [isAuthenticated, navigate, setIsAuthenticated]);
};

export default useAuthenticate;
