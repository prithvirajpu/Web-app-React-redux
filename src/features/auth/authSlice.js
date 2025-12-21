import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, fetchProfile } from "./authThunks";

const initialState = {
  form: {
    username: "",
    email: "",
    password: "",
    confirm_password:'',
  },
  user: JSON.parse(localStorage.getItem('user'))|| null,
  accessToken: localStorage.getItem("access_token") || null,
  loading: false,
  error: null,
  profile: null, 
  isLoggedIn: !!localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem('user');
    },
    resetForm:state=>{
      state.form={
        username:'',email:'',password:'',confirm_password:'',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.isLoggedIn = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      });
  },
});

export const { updateForm, logout,resetForm } = authSlice.actions;
export default authSlice.reducer;
