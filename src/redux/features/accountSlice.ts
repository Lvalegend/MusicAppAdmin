import { apiAllUser } from '@api/users';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type REF_STATE = {
  loading: boolean;
  error: boolean;
  data: any;
};

export type AccountState = {
  listAccount: REF_STATE;
};

const initialState: AccountState = {
  listAccount: {
    loading: false,
    error: false,
    data: []
  }
};

export const getUsers = createAsyncThunk(
  'users/all',
  async (args: { token: string }) => {
    const dataRes = await apiAllUser(args);

    if (dataRes.success) {
      return dataRes.data;
    }
  }
);

const accountSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(getUsers.pending, (state) => {
        state.listAccount.loading = true;
        state.listAccount.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.listAccount.loading = false;
        state.listAccount.error = false;
        state.listAccount.data = action.payload.data;
      })
      .addCase(getUsers.rejected, (state) => {
        state.listAccount.loading = false;
        state.listAccount.error = true;
      });
  }
});

const accountReducer = accountSlice.reducer;

export const {} = accountSlice.actions;

export default accountReducer;
