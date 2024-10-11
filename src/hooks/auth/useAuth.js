import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utilities/axiosInstance";

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

  
}

export default useAuth;
