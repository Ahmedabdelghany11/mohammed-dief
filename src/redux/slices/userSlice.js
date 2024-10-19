import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogged: false,
  roles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    logout: (state) => {
      state.user = initialState;
    },
  },
});

export const { setUser, setIsLogged, setRoles, logout } = userSlice.actions;
export default userSlice.reducer;
