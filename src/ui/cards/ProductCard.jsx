import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function ProductCard({ product }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  return (
    <div
      className="col-lg-4 col-md-6 col-12 p-2 d-flex flex-column gap-2"
      style={{ border: "1px solid gray", borderRadius: "12px" }}
    >
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{
          height: "200px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={product?.itemPicsSourses[0]?.url}
          alt=""
          className="h-100"
          style={{ objectFit: "cover", borderRadius: "12px" }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <h5>#{product?.id}</h5>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span>{t("product.name")}</span>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {lang === "ar" ? product?.nameAr : product?.nameEn}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span>{t("product.description")}</span>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {product?.description}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span>{t("product.category")}</span>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {lang === "ar" ? product?.categoryNameAr : product?.categoryNameEn}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span>{t("product.color")}</span>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {lang === "ar" ? product?.colorNameAr : product?.colorNameEn}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span>{t("product.unit")}</span>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {lang === "ar" ? product?.unitNameAr : product?.unitNameEn}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
