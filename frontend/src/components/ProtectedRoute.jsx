// if we wrap something in the protected route, then we need to have an authorization token before we able to access this route

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  //as soon as we load the protected route try to do this
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  //refresh the access token for us automatically
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  //check if we need to refresh the token or if we are good to go
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  //untill state is not null, loading and checking the tokens or potentially refreshing
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  //otherwise if we are authorized, return children we wrapped, otherwise return a component Navigate to login page
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
