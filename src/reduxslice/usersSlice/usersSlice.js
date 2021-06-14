import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "usersSlice/fetchUsers",
  async () => {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        const users = await (
          await fetch("https://jsonplaceholder.typicode.com/users")
        ).json();
        res(users);
      }, 3000);
    });
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
