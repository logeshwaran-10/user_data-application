import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
  loading: false,
};

const UserReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersList(state) {
      state.loading = true;
    },
    getUsersListSuccess(state, action) {
      state.loading = false;
      state.usersList = action?.payload;
    },
    getUsersListFailure(state) {
      state.loading = false;
    },
    updateData(state, action) {
      state.usersList = action?.payload;
    },
  },
});
export const {
  getUsersList,
  getUsersListSuccess,
  getUsersListFailure,
  updateData,
} = UserReducer.actions;
export default UserReducer.reducer;
