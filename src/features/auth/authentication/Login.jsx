import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import InputField from "../../../ui/form-elements/InputField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { handleChange } from "../../../utilities/helpers";
import axiosInstance from "../../../utilities/axiosInstance";
import {
  logout,
  setIsLogged,
  setRoles,
  setUser,
} from "../../../redux/slices/userSlice";

function Login({ setFormType, setShow }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [, setCookie, removeCookie] = useCookies(["token", "id"]);

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    const validInput = /^[a-zA-Z0-9]*$/;

    if (validInput.test(value)) {
      setFormData((prev) => ({
        ...prev,
        userName: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/Identity/Token", {
        ...formData,
      });
      if (res.status === 200) {
        setCookie("token", res.data?.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        const userDataReq = await axiosInstance.get("/Identity/UserData");

        if (userDataReq.status === 200) {
          dispatch(setUser(userDataReq.data?.data?.user));
          dispatch(setIsLogged(true));
          dispatch(setRoles(userDataReq.data?.data?.roles));
          setCookie("id", userDataReq.data?.data.user.id, {
            path: "/",
            secure: import.meta.env.MODE === "production",
            sameSite: "Strict",
            maxAge: 86400, // 1-day expiration for the user ID
          });
          toast.success(t("auth.loginSuccess"));
          const updatedParams = new URLSearchParams(searchParams);
          updatedParams.delete("redirect");
          setSearchParams(updatedParams);
          setShow(false);
        } else {
          dispatch(logout());
          removeCookie("token");
          removeCookie("id");
          throw new Error(userDataReq.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.loginTitle")}{" "}
          <img src="/images/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
      </div>

      <InputField
        required
        label={t("auth.userName")}
        placeholder={t("auth.userNamePlaceHolder")}
        id="userName"
        name="userName"
        value={formData.userName}
        onChange={(e) => handleChangeUserName(e, setFormData)}
      />

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <span className="forgetpass">{t("auth.forgetPassword")}</span>

      <SubmitButton name={t("auth.login")} loading={loading} />

      <span className="noAccount">
        {t("auth.noAccount")}{" "}
        <span onClick={() => setFormType("register")}>
          {t("auth.register")}
        </span>
      </span>
    </form>
  );
}

export default Login;
