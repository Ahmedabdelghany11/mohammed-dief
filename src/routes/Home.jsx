// import ParticlesComponent from "../ui/layout/ParticlesComponent";

import { useTranslation } from "react-i18next";
import useGetCategories from "../hooks/category/useGetCategories";
import useGetColors from "../hooks/colors/useGetColors";
import useGetUnits from "../hooks/units/useGetUnits";
import { useSelector } from "react-redux";
import useGetCurrencies from "../hooks/general/useGetCurrencies";
import useGetTaxes from "../hooks/general/useGetTaxes";

function Home() {
  const { t } = useTranslation();
  const { data: colors } = useGetColors();
  const { data: units } = useGetUnits();
  const { data: categories } = useGetCategories();
  const { data: currencies } = useGetCurrencies();
  const { data: taxes } = useGetTaxes();

  const lang = useSelector((state) => state.language.lang);

  return (
    <>
      {/* <ParticlesComponent /> */}

      <section className="landing d-flex flex-column gap-4 p-4">
        {/* Colors */}
        {colors ? (
          <div className="d-flex flex-column gap2">
            <h5>{t("colors.colors")}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {colors.map((color) => (
                <div key={color.id}>
                  {lang === "ar" ? color.nameAr : color.nameEn}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* Units */}
        {units ? (
          <div className="d-flex flex-column gap2">
            <h5>{t("units.units")}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {units.map((unit) => (
                <div key={unit.id}>
                  {lang === "ar" ? unit.nameAr : unit.nameEn}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* Categories */}
        {categories ? (
          <div className="d-flex flex-column gap2">
            <h5>{t("categories.categories")}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {categories.map((category) => (
                <div key={category.id}>
                  {lang === "ar" ? category.nameAr : category.nameEn}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* Currencies */}
        {currencies ? (
          <div className="d-flex flex-column gap2">
            <h5>{t("currencies.currencies")}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {currencies.map((currency) => (
                <div key={currency.id}>
                  {lang === "ar" ? currency.nameAr : currency.nameEn}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {/* Taxes */}
        {taxes ? (
          <div className="d-flex flex-column gap2">
            <h5>{t("taxes.taxes")}</h5>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {taxes.map((tax) => (
                <div key={tax.id}>
                  {lang === "ar" ? tax.nameAr : tax.nameEn}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Home;
