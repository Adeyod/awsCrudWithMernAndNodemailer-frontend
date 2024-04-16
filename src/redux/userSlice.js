import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : null,

  access: localStorage.getItem('access')
    ? JSON.parse(localStorage.getItem('access'))
    : null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      console.log('payload:', action.payload);
      const { user, access } = action.payload;
      state.currentUser = user;
      state.access = access;
      localStorage.setItem('access', JSON.stringify(state.access));
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess(state) {
      state.currentUser = null;
      state.access = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      state.error = false;
    },

    updateUser(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = false;
    },

    removeUser(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      state.error = false;
    },
  },
});

export const {
  removeUser,
  updateUser,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
