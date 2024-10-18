import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import language from "./slices/language";

const store = configureStore({
  reducer: {
    user,
    language,
  },
});

export default store;
