import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axiosInstance from "./utilities/axiosInstance";
import { setUser } from "./redux/slices/userSlice";

const setupAxiosInterceptors = (setCookie, token, removeCookie, dispatch) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!token) {
          delete axiosInstance.defaults.headers.common.Authorization;
          dispatch(setUser({}));
          return Promise.reject(err);
        }

        // No token refresh logic (since you don't have refresh tokens)

        return Promise.reject(err);
      }

      return Promise.reject(err);
    }
  );
};

const InterceptorProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { token } = cookies;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setupAxiosInterceptors(setCookie, token, removeCookie, dispatch);
  }, [setCookie, token, removeCookie, dispatch]);

  return <>{children}</>;
};

export default InterceptorProvider;
