import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utilities/axiosInstance";
import { jwtDecode } from "jwt-decode";

import {
  logout,
  setIsLogged,
  setRoles,
  setUser,
} from "../../redux/slices/userSlice";

import { useSearchParams } from "react-router-dom";

function useAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id"]);
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
    async function fetchData() {
      const userDataReq = await axiosInstance.get("/Identity/UserData");

      if (userDataReq.status === 200) {
        dispatch(setUser(userDataReq.data?.data?.user));
        dispatch(setIsLogged(true));
        dispatch(setRoles(userDataReq.data?.data?.roles));
        // setCookie("id", userDataReq.data?.data.user.id, {
        //   path: "/",
        //   secure: import.meta.env.MODE === "production",
        //   sameSite: "Strict",
        //   maxAge: 86400, // 1-day expiration for the user ID
        // });

        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("redirect");
        setSearchParams(updatedParams);
      } else {
        dispatch(logout());
        removeCookie("token");
        removeCookie("id");
        throw new Error(userDataReq.data.message);
      }
    }
    if (token) {
      fetchData();
      setIsAuthed(true);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [dispatch, removeCookie, searchParams, setCookie, setSearchParams, token]);

  useEffect(() => {
    if (isExpired) {
      // ||  decodedToken?.uid === id
      dispatch(logout());
      // removeCookie("token");
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
