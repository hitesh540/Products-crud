import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("product/getPost", async () => {
  return fetch(`http://localhost:5000/restaurant`).then((res) =>
    res.json()
  );
});

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setEdit } = ProductSlice.actions;
export default ProductSlice.reducer;
