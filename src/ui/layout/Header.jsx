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
      <header style={{ background: "#4381f8", color: "#fff" }}>
        <div
          className="container d-flex align-items-center py-2 px-1"
          style={{ gap: "24px" }}
        >
          <Link to="/" className="logo-wrapper d-flex align-items-center gap-2">
            <div className="logo-img">
              {/* <img src="" alt="" /> */}
              <h1
                style={{
                  color: "#fff",
                  fontSize: "72px",
                  fontWeight: "800",
                  lineHeight: "1",
                }}
              >
                M
              </h1>
            </div>
            <div className="logo-title d-flex flex-column">
              <h4 className="title" style={{ color: "#fff", lineHeight: "1" }}>
                {t("appTitle")}
              </h4>
              <h6
                className="sub-title"
                style={{ color: "#fff", lineHeight: "1" }}
              >
                {t("appSubtitle")}
              </h6>
            </div>
          </Link>
          <nav
            className="navbar-menu d-flex align-items-center gap-4"
            style={{ flex: "1 0" }}
          >
            <NavLink to="/" className="nav-item" style={{ color: "#fff" }}>
              {t("navbar.home")}
            </NavLink>
            <NavLink
              to="/products"
              className="nav-item"
              style={{ color: "#fff" }}
            >
              {t("navbar.products")}
            </NavLink>
            <NavLink
              to="/orders"
              className="nav-item"
              style={{ color: "#fff" }}
            >
              {t("navbar.orders")}
            </NavLink>
            <NavLink
              to="/dashboard"
              className="nav-item"
              style={{ color: "#fff" }}
            >
              {t("navbar.dashboard")}
            </NavLink>
            <NavLink to="/about" className="nav-item" style={{ color: "#fff" }}>
              {t("navbar.about")}
            </NavLink>
          </nav>
          <div className="icons-wrapper d-flex align-items-center gap-2">
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
