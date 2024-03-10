import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readyToPlayPowerball: false,
  currentPowerballGame: {
    userNumbers: [],
    winningNumbers: [],
    payout: 0,
  },
  previousPowerballGame: {
    userNumbers: [],
    winningNumbers: [],
    payout: 0,
  },
  startPowerballGame: false,
  moneyStats: {
    wagered: 0,
    won: 0,
    profit: 0,
  },
  powerballHistory: [],
  viewPowerballHistory: false,
};

const powerballSlice = createSlice({
  name: 'powerball',
  initialState,
  reducers: {
    SET_READY_TO_PLAY_POWERBALL(state, action) {
      state.readyToPlayPowerball = action.payload;
    },
    SET_CURRENT_POWERBALL_GAME(state, action) {
      state.currentPowerballGame = {
        ...state.currentPowerballGame,
        ...action.payload,
      };
    },
    SET_PREVIOUS_POWERBALL_GAME(state, action) {
      state.previousPowerballGame = {
        ...state.previousPowerballGame,
        ...action.payload,
      };
    },
    SET_START_POWERBALL_GAME(state, action) {
      state.startPowerballGame = action.payload;
    },
    SET_POWERBALL_MONEY_STATS(state, action) {
      console.log(action.payload);
      state.moneyStats = action.payload;
    },
    SET_POWERBALL_HISTORY(state, action) {
      state.powerballHistory.push(action.payload);
      //   state.numbersHistory = action.payload;
    },
    SET_RESET_POWERBALL_HISTORY(state, action) {
      if (action.payload === true) {
        state.moneyStats = {
          wagered: 0,
          won: 0,
          profit: 0,
        };

        state.powerballHistory = [];
      }
    },
    SET_VIEW_POWERBALL_HISTORY(state, action) {
      state.viewPowerballHistory = action.payload;
    },
    RESET_POWERBALL_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_READY_TO_PLAY_POWERBALL,
  SET_CURRENT_POWERBALL_GAME,
  SET_PREVIOUS_POWERBALL_GAME,
  SET_START_POWERBALL_GAME,
  SET_POWERBALL_MONEY_STATS,
  SET_POWERBALL_HISTORY,
  SET_RESET_POWERBALL_HISTORY,
  SET_VIEW_POWERBALL_HISTORY,
  RESET_POWERBALL_SLICE,
} = powerballSlice.actions;

export const selectCurrentPowerballGame = (state) =>
  state.powerball.currentPowerballGame;
export const selectPreviousPowerballGame = (state) =>
  state.powerball.previousPowerballGame;
export const selectReadyToPlayPowerball = (state) =>
  state.powerball.readyToPlayPowerball;
export const selectStartPowerballGame = (state) =>
  state.powerball.startPowerballGame;
export const selectPowerballMoneyStats = (state) => state.powerball.moneyStats;
export const selectPowerballHistory = (state) =>
  state.powerball.powerballHistory;
export const selectViewPowerballHistory = (state) =>
  state.powerball.viewPowerballHistory;

export default powerballSlice.reducer;
