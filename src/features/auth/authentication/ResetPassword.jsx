import { useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { handleChange } from "../../../utilities/helpers";

function ResetPassword({ setFormType }) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFormType("login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.changePasswordTitle")} </h2>
        <p className="sub-head">{t("auth.changePasswordSubtitle")}</p>
      </div>

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <PasswordField
        label={t("auth.passwordConfirmation")}
        placeholder={t("auth.passwordConfirmation")}
        required
        id="password_confirmation"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <div className="d-flex align-items-center gap-2">
        <button
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("forget");
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>

        <SubmitButton name={t("save")} loading={loading} />
      </div>
    </form>
  );
}

export default ResetPassword;
