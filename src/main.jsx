import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";

import "./styles/all.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/style.css";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./routes/ErrorFallback.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import InterceptorProvider from "./InterceptorProvider.jsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace("/")}
  >
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <InterceptorProvider>
            <App />
          </InterceptorProvider>
          <ToastContainer autoClose={2000} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);
