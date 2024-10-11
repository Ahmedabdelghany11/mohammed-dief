import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogged: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
});

export const { setUser, setIsLogged, logout } = userSlice.actions;
export default userSlice.reducer;
