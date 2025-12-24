import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from '../../api/AxiosInstance';

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post('register/', formdata);

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      const data = err.response?.data;
      return rejectWithValue(data || { detail: 'Signup failed' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post("login/", { email, password });

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user',JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      const data = err.response?.data;
      return rejectWithValue(
        typeof data === 'string'
          ? data
          : data?.message || data?.detail || 'Login failed'
      );
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('profile/');
      return response.data;
    } catch (error) {
      return rejectWithValue('Session expired.');
    }
  }
);