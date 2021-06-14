import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "usersSlice/fetchUsers",
  async () => {
        const users = await (
          await fetch("https://jsonplaceholder.typicode.com/users")
        ).json();
        return users;
  }
);

const initialState = { users: {}, isLoading: true };

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    addUsers: (state, { payload }) => {
      state.users.push(...payload);
    },
    deleteUserById: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default usersSlice.reducer;
export const { addUser, addUsers, deleteUserById } = usersSlice.actions;
