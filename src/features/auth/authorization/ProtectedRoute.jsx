import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";
import AuthModal from "../../../ui/modals/AuthModal";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthed } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthed) {
      setShowAuth(true);
    }
  }, [isAuthed, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthed ? children : null}
      <AuthModal
        type="login"
        show={showAuth}
        setShow={setShowAuth}
        protectedFlag={true}
      />
    </>
  );
}

export default ProtectedRoute;
