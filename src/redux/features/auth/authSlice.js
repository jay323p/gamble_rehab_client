import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: '',
  user: {
    name: '',
    email: '',
  },
  gamePlaying: '',
  gameData: {},
  gameHistoryUpdated: false,
  page: 'Home',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      if (localStorage.getItem('name')) {
        state.name = localStorage.getItem('name');
      } else {
        state.name = '';
      }
    },
    SET_USER(state, action) {
      const profile = action.payload;

      state.user.name = profile.name;
      state.user.email = profile.email;
    },
    SET_PAGE(state, action) {
      state.page = action.payload;
    },
    SET_GAME_PLAYING(state, action) {
      state.gamePlaying = action.payload;
    },
    SET_GAME_DATA(state, action) {
      state.gameData = action.payload;
    },
    SET_GAME_HISTORY_UPDATED(state, action) {
      state.gameHistoryUpdated = action.payload;
    },
    SET_LOGOUT_USER(state, action) {
      state.user = { name: '', email: '' };
      state.isLoggedIn = false;
      state.name = '';
      localStorage.removeItem('name');
      localStorage.clear();
    },
    RESET_AUTH_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  SET_LOGOUT_USER,
  SET_PAGE,
  SET_GAME_PLAYING,
  SET_GAME_DATA,
  SET_GAME_HISTORY_UPDATED,
  RESET_AUTH_SLICE,
} = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectPage = (state) => state.auth.page;
export const selectGamePlaying = (state) => state.auth.gamePlaying;
export const selectGameData = (state) => state.auth.gameData;
export const selectGameHistoryUpdated = (state) =>
  state.auth.gameHistoryUpdated;

export default authSlice.reducer;
