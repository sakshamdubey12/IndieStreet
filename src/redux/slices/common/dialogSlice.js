import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDialogOpen: false,
  refetch: false,
};

const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
    triggerRefetch: (state) => {
      state.refetch = !state.refetch;
    },
  },
});
 
export const { openDialog, closeDialog, triggerRefetch } = DialogSlice.actions;
export default DialogSlice.reducer;
