import {
  KEY_STORAGE,
  removeDataFromLocalStorage,
  saveDataToLocalStorage
} from '@/src/local-storage/config';
import { apiLogin } from '@api/auth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  user: any;
  token: string;
  loading: boolean;
  error: boolean;
  role: string;
  loginCode: number | null; // 0 - failed, 1 - success, 2 - admin
};

export const authLogin = createAsyncThunk(
  'auth/login',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLogin(args);
    if (dataRes.status) {
      if (dataRes.data?.role === 'admin') {
        return {
          ...dataRes.data,
          loginCode: 2
        };
      } else {
        return {
          ...dataRes.data,
          loginCode: 1
        };
      }
    } else {
      return { ...dataRes.data, loginCode: 0 };
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: '',
  role: '',
  loading: false,
  error: false,
  loginCode: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      state.loginCode = null;
      removeDataFromLocalStorage(KEY_STORAGE.USER);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload?.data_user;
        state.loginCode = action.payload.loginCode;
        state.token = action.payload.jwt_token;
        state.loading = false;
        state.error = false;
        saveDataToLocalStorage(KEY_STORAGE.USER, action.payload);
      })
      .addCase(authLogin.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

const authReducer = authSlice.reducer;

export const { setDataUser, setToken, logout } = authSlice.actions;
export default authReducer;
