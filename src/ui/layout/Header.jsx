import { useState } from "react";
import AuthModal from "../modals/AuthModal";

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");

  return (
    <>
      <div
        onClick={() => {
          setShowAuthModal(true);
          setAuthType("login");
        }}
      >
        Header
      </div>
      <AuthModal
        type={authType}
        show={showAuthModal}
        setShow={setShowAuthModal}
      />
    </>
  );
}

export default Header;
