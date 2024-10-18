import { useState } from "react";
import AuthModal from "../modals/AuthModal";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";
import { useDispatch } from "react-redux";

function Header() {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");

  const dispatch = useDispatch();

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
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
                <img src="/icons/user.svg" alt="" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="drop_Message_Menu">
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
    </>
  );
}

export default Header;
