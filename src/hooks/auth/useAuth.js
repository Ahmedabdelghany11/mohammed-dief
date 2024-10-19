import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utilities/axiosInstance";
import { jwtDecode } from "jwt-decode";

import { setUser } from "../../redux/slices/userSlice";

function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const { token, id } = cookies;

  const { decodedToken, isExpired } = useMemo(() => {
    if (!token) return { decodedToken: null, isExpired: true };
    try {
      const currentTime = Date.now() / 1000;
      const decoded = jwtDecode(token);
      const expired = decoded.exp < currentTime;
      return { decodedToken: decoded, isExpired: expired };
    } catch (err) {
      console.error("Error decoding token:", err);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setIsAuthed(true);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    if (isExpired) {
      // ||  decodedToken?.uid === id
      console.log("isExpired in", isExpired);
      dispatch(setUser({}));
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      setIsAuthed(false);
      return;
    } else {
      setLoading(false);
      setIsAuthed(true);
    }
  }, [decodedToken?.uid, dispatch, id, isExpired, removeCookie]);

  return { loading, isAuthed };
}

export default useAuth;
