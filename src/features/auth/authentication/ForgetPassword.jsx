import { useTranslation } from "react-i18next";
import { handleChange } from "../../../utilities/helpers";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import InputField from "../../../ui/form-elements/InputField";
import { useState } from "react";

function ForgetPassword({ setFormType, formData, setFormData }) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFormType("otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">{t("auth.resetPasswordSubtitle")}</p>
      </div>

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

      <div className="d-flex align-items-center gap-2">
        <button
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("login");
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        <SubmitButton name={t("send")} loading={loading} />
      </div>
    </form>
  );
}

export default ForgetPassword;
