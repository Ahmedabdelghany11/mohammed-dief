import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utilities/axiosInstance";
import { jwtDecode } from "jwt-decode";
import useGetAuthedUser from "./useGetAuthedUser";
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
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expired = decoded.exp < currentTime;
      return { decodedToken: decoded, isExpired: expired };
    } catch (err) {
      console.error("Error decoding token:", err);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [token]);

  const {
    data: profile,
    isFetched,
    refetch,
  } = useGetAuthedUser(Boolean(token && id && !isExpired));

  useEffect(() => {
    if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
      dispatch(setUser({}));
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      setIsAuthed(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isFetched) {
          if (profile) {
            dispatch(setUser(profile));
            setIsAuthed(true);
          } else {
            console.log("Profile data not available, refetching...");
            await refetch();
          }
        } else {
          await refetch();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [
    token,
    id,
    isExpired,
    isFetched,
    refetch,
    profile,
    removeCookie,
    dispatch,
    decodedToken?.sub,
  ]);

  return { loading, isAuthed };
}

export default useAuth;
