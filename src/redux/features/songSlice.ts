import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGetListSong, apiUploadSong } from '@api/song';
import { SongModel } from '@models/Song';

export type SongState = {
  isLoading: boolean;
  isError: boolean;
  data: SongModel[];
  totalItems: number;
  isCreated: boolean;
};

const initialState: SongState = {
  isLoading: false,
  isError: false,
  data: [],
  totalItems: 0,
  isCreated: false
};

export const getListSong = createAsyncThunk('songs/list', async () => {
  const res = await apiGetListSong();
  if (res.success) return res.result;
});

export const addSong = createAsyncThunk(
  'song/upload',
  async (args: {
    name: string;
    releaseDate: string;
    image: File;
    audio: File;
    totalView?: string;
  }) => {
    const res = await apiUploadSong(args);
    if (res.success) return res.result;
  }
);

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListSong.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getListSong.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload?.data;
        state.totalItems = action.payload?.totalItems;
      })
      .addCase(getListSong.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addSong.pending, (state) => {
        state.isLoading = true;
        state.isCreated = false;
        state.isError = false;
      })
      .addCase(addSong.fulfilled, (state, action: PayloadAction<any>) => {
        state.isCreated = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addSong.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isCreated = false;
      });
  }
});

const songReducer = songSlice.reducer;
export const {} = songSlice.actions;

export default songReducer;
