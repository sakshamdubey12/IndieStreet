import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: null,
  filters: {
    priceRange: [0, Infinity],
  },
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
});

export const { setSortBy, setFilters } = sortSlice.actions;

export default sortSlice.reducer;
