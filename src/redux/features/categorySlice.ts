import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGetListCategory } from '@api/category';
import { CategoryModel } from '@models/Category';

export type CategoryState = {
  isLoading: boolean;
  isError: boolean;
  data: CategoryModel[];
  totalItems: number;
};

const initialState: CategoryState = {
  isLoading: false,
  isError: false,
  data: [],
  totalItems: 0
};

export const getListTypeSongs = createAsyncThunk('category/list', async () => {
  const res = await apiGetListCategory();
  if (res.success) return res.result;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListTypeSongs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getListTypeSongs.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.data = action.payload.data;
          state.totalItems = action.payload.totalItems;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(getListTypeSongs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;

export default categoryReducer;
