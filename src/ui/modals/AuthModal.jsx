import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useAuth from "../../hooks/auth/useAuth";
import Login from "../../features/auth/authentication/Login";
import Register from "../../features/auth/authentication/Register";
import ForgetPassword from "../../features/auth/authentication/ForgetPassword";
import OTPConfirm from "../../features/auth/authentication/OTPConfirm";
import ResetPassword from "../../features/auth/authentication/ResetPassword";

export default function AuthModal({ show, setShow, type, protectedFlag }) {
  const [formType, setFormType] = useState("login");
  const { isAuthed } = useAuth();

  const [otpCode, setOtpCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setFormType(type);
  }, [type]);

  const handleClose = () => {
    if (!isAuthed && protectedFlag) {
      navigate("/");
    } else {
      setShow(false);
    }
    setFormType("login");
  };

  return (
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="xl"
    >
      <Modal.Body>
        <button className="closeModal" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
        <section className="auth_section">
          {/* <div className="img_wrapper">
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/auth-benner.png"
            />
          </div> */}
          <div className="form_wrapper">
            {formType === "login" && (
              <Login setFormType={setFormType} setShow={setShow} />
            )}
            {formType === "register" && (
              <Register setFormType={setFormType} setShow={setShow} />
            )}
            {formType === "forget" && (
              <ForgetPassword
                setFormType={setFormType}
                setShow={setShow}
                setOtpCode={setOtpCode}
              />
            )}
            {formType === "otp" && (
              <OTPConfirm
                setFormType={setFormType}
                setShow={setShow}
                otpCode={otpCode}
              />
            )}
            {formType === "reset" && (
              <ResetPassword setFormType={setFormType} setShow={setShow} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
