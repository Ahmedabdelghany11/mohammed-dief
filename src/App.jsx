import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./ui/layout/AppLayout";
import i18n from "./utilities/i18n";
import Products from "./routes/Products";

// const Home = lazy(() => import("./pages/Home"));
// <Suspense fallback={<Spinner />}> "before routes"

function App() {
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/products"
        element={
          <AppLayout>
            <Products />
          </AppLayout>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
