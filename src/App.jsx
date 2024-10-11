import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import AppLayout from "./ui/layout/AppLayout";

// const Home = lazy(() => import("./pages/Home"));
// <Suspense fallback={<Spinner />}> "before routes"

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
