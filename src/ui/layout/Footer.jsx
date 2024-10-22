import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12 p-2">
            <Link to="/" className="logo">
              <img src="/icons/fav.svg" alt="logo" />
              <div className="logo-title">
                <span className="title">{t("appTitle")}</span>
                <span className="sub-title">{t("appSubtitle")}</span>
              </div>
            </Link>
            <div className="social_media">
              <Link>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link>
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link>
                <i className="fab fa-youtube"></i>
              </Link>
              <Link>
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <h2 className="footer_title">{t("footer.importantLinks")}</h2>
            <ul className="footer_links">
              <li>
                <Link className="footer_link" to="/products">
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {t("navbar.products")}
                </Link>
              </li>
              <li>
                <Link className="footer_link" to="/requests">
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {t("navbar.requests")}
                </Link>
              </li>
              <li>
                <Link className="footer_link" to="/about">
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {t("navbar.about")}
                </Link>
              </li>
              <li>
                <Link className="footer_link" to="/privacy">
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {t("navbar.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link className="footer_link" to="/terms">
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {t("navbar.termsOfUse")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <h2 className="footer_title">{t("navbar.contactUs")}</h2>
            <Link
              target="_blank"
              rel="noreferrer"
              className="footer_link"
              to="https://maps.app.goo.gl/j6WbAMuZs9ZnEKU67"
            >
              <i className="fas fa-map-marker-alt"></i> <span>UAE, Dubi</span>
            </Link>
            <Link to="mailto:mohammed@dief.com" className="footer_link">
              <i className="fas fa-envelope"></i> <span>mohammed@dief.com</span>
            </Link>
            <Link to="tel:+971559413667" className="footer_link">
              <i className="fas fa-phone"></i> <span>+971559413667</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="copy_rights">
          <h6>
            <span>&copy; {new Date().getFullYear()}. </span>{" "}
            {t("footer.copyright")} <Link to="/">{t("appTitle")}</Link>
          </h6>
        </div>
      </div>
    </footer>
  );
}
