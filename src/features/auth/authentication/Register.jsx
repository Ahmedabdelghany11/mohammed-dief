import { toast } from "react-toastify";
import InputField from "../../../ui/form-elements/InputField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import PhoneField from "../../../ui/form-elements/PhoneField.jsx";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { handleChange } from "../../../utilities/helpers";
import axiosInstance from "../../../utilities/axiosInstance";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Register({ setFormType, setShow }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    gmail: "",
    phoneNumber: "",
    Pasword: "",
  });

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    const validInput = /^[a-zA-Z0-9]*$/;

    if (validInput.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const res = await axiosInstance.post("/Identity/Register", formData);
      if (res.status === 200) {
        toast.success(t("auth.registerSuccess"));
        setFormType("login");
        setShow(true);
      } else {
        toast.error(res.data?.message || "An error occurred");
        throw new Error(res.data?.message || "An error occurred");
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
        <h2 className="head text-centera">
          {t("auth.registerTitle")}{" "}
          {/* <img src="/images/icons/waving-hand.svg" alt="hand-wave" /> */}
        </h2>
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>

      <InputField
        required
        label={t("auth.firstName")}
        placeholder={t("writeHere")}
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={(e) => handleChangeUserName(e, setFormData)}
      />

      <InputField
        required
        label={t("auth.lastName")}
        placeholder={t("writeHere")}
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => handleChangeUserName(e, setFormData)}
      />

      <InputField
        required
        label={t("auth.userName")}
        placeholder={t("writeHere")}
        id="userName"
        name="userName"
        value={formData.userName}
        onChange={(e) => handleChangeUserName(e, setFormData)}
      />

      <InputField
        label={t("auth.email")}
        placeholder="example@example.com"
        type="email"
        name="email"
        id="email"
        required={true}
        formData={formData?.gmail}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <InputField
        label={t("auth.gmail")}
        placeholder="example@example.com"
        type="gmail"
        name="gmail"
        id="gmail"
        required={true}
        formData={formData?.gmail}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <PhoneField
        label={t("auth.phone")}
        onChange={(e) => handleChange(e, setFormData)}
        value={formData.phoneNumber}
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        placeholder={t("123-456-7890")}
        required={true}
      />

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="Pasword"
        name="Pasword"
        value={formData.Pasword}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <SubmitButton name={t("register")} loading={loading} />

      <span className="noAccount">
        {t("auth.haveAccount")}{" "}
        <span onClick={() => setFormType("login")}>{t("auth.login")}</span>
      </span>
    </form>
  );
}

export default Register;
