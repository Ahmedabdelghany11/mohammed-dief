import { useState } from "react";
import AuthModal from "../modals/AuthModal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utilities/axiosInstance";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationModal from "../modals/ConfirmationModal";

function Header() {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [authType, setAuthType] = useState("login");

  const [, , deleteCookie] = useCookies();

  const user = useSelector((state) => state.user.user);
  const isLogged = useSelector((state) => state.user.isLogged);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      deleteCookie("token");
      deleteCookie("id");
      delete axiosInstance.defaults.headers.common["Authorization"];
      dispatch(logout());
      navigate("/", { replace: true });
      queryClient.clear();
      sessionStorage.clear();
      toast.success(t("auth.logoutSuccess"));
      setShowLogoutModal(false);
    } catch (error) {
      toast.error(t("somethingWentWrong"));
      console.error("Error during logout:", error);
      throw new Error(error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <Link to="/" className="logo-wrapper">
            <div className="logo-img">
              <img src="/icons/fav.svg" alt="Mohammed Deif" />
            </div>
            <div className="logo-title">
              <span className="title">{t("appTitle")}</span>
              <span className="sub-title">{t("appSubtitle")}</span>
            </div>
          </Link>
          <nav className="navbar-menu">
            <NavLink to="/" className="nav-item">
              {t("navbar.home")}
            </NavLink>
            <NavLink to="/products" className="nav-item">
              {t("navbar.products")}
            </NavLink>
            <NavLink to="/orders" className="nav-item">
              {t("navbar.orders")}
            </NavLink>
            <NavLink to="/dashboard" className="nav-item">
              {t("navbar.dashboard")}
            </NavLink>
            <NavLink to="/about" className="nav-item">
              {t("navbar.about")}
            </NavLink>
          </nav>
          <div className="icons-wrapper ">
            {/* Language */}
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img src="/icons/lang.svg" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <Dropdown.Item onClick={() => handleLang("ar")}>
                  العربية
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLang("en")}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Notification */}
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img src="/icons/bell.svg" alt="" />
                {/* {<span className="count"> 2 </span>} */}
              </Dropdown.Toggle>
              <Dropdown.Menu className="drop_Message_Menu">
                <div className="scroll_menu"></div>
                <Link
                  className="showall"
                  to="/notifications"
                  style={{ textDecoration: "none" }}
                >
                  عرض جميع الاشعارات
                </Link>
              </Dropdown.Menu>
            </Dropdown>

            {/* Profile */}
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="link">
                <img
                  src={`${user?.image ? user.image : "/icons/user.svg"}`}
                  alt=""
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="drop_Message_Menu">
                {isLogged ? (
                  <Dropdown.Item onClick={() => setShowLogoutModal(true)}>
                    {t("auth.logout")}
                  </Dropdown.Item>
                ) : (
                  <>
                    <Dropdown.Item
                      onClick={() => {
                        setAuthType("register");
                        setShowAuthModal(true);
                      }}
                    >
                      {t("auth.register")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAuthType("login");
                        setShowAuthModal(true);
                      }}
                    >
                      {t("auth.login")}
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
      <AuthModal
        type={authType}
        show={showAuthModal}
        setShow={setShowAuthModal}
      />
      <ConfirmationModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        type="logout"
        eventFun={handleLogout}
        loading={logoutLoading}
        buttonText={t("auth.logout")}
        text={t("auth.areYouSureYouWantToLogout")}
      />
    </>
  );
}

export default Header;
