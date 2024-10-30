import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SmallMenu() {
  const { t } = useTranslation();
  return (
    <div className="small_menu">
      <Link to="/" className="menu_item">
        <i className="fa-solid fa-house-chimney"></i>
        <span>{t("navbar.home")}</span>
      </Link>

      <Link to="/products" className="menu_item">
        <i className="fa-solid fa-columns"></i>
        <span>{t("navbar.products")}</span>
      </Link>

      <div className="menu_item">
        <Link className="center" to="/profile">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>

      <Link to="/orders" className="menu_item">
        <i className="fa-solid fa-file"></i>
        <span>{t("navbar.orders")}</span>
      </Link>

      <Link to="/about" className="menu_item">
        <i className="fa-solid fa-question-circle"></i>
        <span>{t("navbar.about")}</span>
      </Link>
    </div>
  );
}

export default SmallMenu;
