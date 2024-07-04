import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunk to handle vendor signup
const base = process.env.NEXT_PUBLIC_BASE_URL
export const vendorSignup = createAsyncThunk(
  'auth/vendorSignup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base}/vendor/auth/register`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vendorSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set('token', action.payload.token, { expires: 7 });
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        toast.success(action.payload.message);
      })
      .addCase(vendorSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
