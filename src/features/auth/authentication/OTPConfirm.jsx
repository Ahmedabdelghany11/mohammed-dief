import { useState } from "react";
import { useTranslation } from "react-i18next";

import OtpContainer from "../../../ui/form-elements/OtpContainer";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

function OTPConfirm({ setFormType }) {
  const { t } = useTranslation();
  const [otpVerifyCode, setOtpVerifyCode] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFormType("reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.confirmOTPTitle")} </h2>
        <p className="sub-head">{t("auth.confirmOTPSubtitle")}</p>
      </div>

      <OtpContainer formData={otpVerifyCode} setFormData={setOtpVerifyCode} />

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
        <SubmitButton name={t("auth.verify")} loading={loading} />
      </div>
    </form>
  );
}

export default OTPConfirm;
