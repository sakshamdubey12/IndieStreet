import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: null,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
