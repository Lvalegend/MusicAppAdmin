import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiAddSinger, apiGetListSinger } from '@api/singer';
import { SingerModel } from '@models/Singer';

export type SingerState = {
  isLoading: boolean;
  isError: boolean;
  data: SingerModel[];
  totalItems: number;
  isCreated: boolean;
};

const initialState: SingerState = {
  isLoading: false,
  isError: false,
  data: [],
  totalItems: 0,
  isCreated: false
};

export const getListSinger = createAsyncThunk('singer/list', async () => {
  const res = await apiGetListSinger();
  if (res.success) return res.result;
});

export const addSinger = createAsyncThunk(
  'singer/add',
  async (args: {
    name: string;
    dob: string;
    description: string;
    liked?: string;
    image?: File;
  }) => {
    const res = await apiAddSinger(args);
    if (res.success) return res.result;
  }
);

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListSinger.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getListSinger.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getListSinger.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addSinger.pending, (state) => {
        state.isLoading = true;
        state.isCreated = false;
        state.isError = false;
      })
      .addCase(addSinger.fulfilled, (state, action: PayloadAction<any>) => {
        state.isCreated = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addSinger.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isCreated = false;
      });
  }
});

const singerReducer = singerSlice.reducer;
export const {} = singerSlice.actions;

export default singerReducer;
