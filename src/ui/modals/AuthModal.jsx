import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../../features/auth/authentication/Login";
import Register from "../../features/auth/authentication/Register";
import useAuth from "../../hooks/auth/useAuth";

function AuthModal({ show, setShow, type, protectedFlag = false }) {
  const [formType, setFormType] = useState("login");
  const { isAuthed } = useAuth();

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
          <div className="img_wrapper">
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/auth-1.jpg"
            />
          </div>
          <div className="form_wrapper">
            {formType === "login" && (
              <Login setFormType={setFormType} setShow={setShow} />
            )}
            {formType === "register" && (
              <Register setFormType={setFormType} setShow={setShow} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
