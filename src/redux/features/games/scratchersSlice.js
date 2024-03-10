import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameTicket: {},
  previousGameTicket: {},
  moneyStats: {
    wagered: 0,
    won: 0,
    profit: 0,
  },
  readyToScratch: false,
  scratchedAlready: false,
  scratcherHistory: [],
};

const scratchersSlice = createSlice({
  name: 'scratcher',
  initialState,
  reducers: {
    SET_GAME_TICKET(state, action) {
      state.gameTicket = action.payload;
    },
    SET_PREVIOUS_GAME_TICKET(state, action) {
      state.previousGameTicket = action.payload;
    },
    SET_SCRATCHERS_MONEY_STATS(state, action) {
      state.moneyStats = action.payload;
    },
    SET_READT_TO_SCRATCH(state, action) {
      state.readyToScratch = action.payload;
    },
    SET_SCRATCHED_ALREADY(state, action) {
      state.scratchedAlready = action.payload;
    },
    SET_SCRATCHER_HISTORY(state, action) {
      state.scratcherHistory.push(action.payload);
      //   state.scratcherHistory = [];
    },
    SET_RESET_SCRATCHER_HISTORY(state, action) {
      if (action.payload === true) {
        state.scratcherHistory = [];
        state.moneyStats = { wagered: 0, won: 0, profit: 0 };
      }
    },
    RESET_SCRATCHERS_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_GAME_TICKET,
  SET_PREVIOUS_GAME_TICKET,
  SET_READT_TO_SCRATCH,
  SET_SCRATCHERS_MONEY_STATS,
  SET_SCRATCHED_ALREADY,
  SET_SCRATCHER_HISTORY,
  SET_RESET_SCRATCHER_HISTORY,
  RESET_SCRATCHERS_SLICE,
} = scratchersSlice.actions;

export const selectGameTicket = (state) => state.scratcher.gameTicket;
export const selectPreviousGameTicket = (state) =>
  state.scratcher.previousGameTicket;
export const selectScratchersMoneyStats = (state) => state.scratcher.moneyStats;
export const selectReadyToScratch = (state) => state.scratcher.readyToScratch;
export const selectScratchedAlready = (state) =>
  state.scratcher.scratchedAlready;
export const selectScratcherHistory = (state) =>
  state.scratcher.scratcherHistory;

export default scratchersSlice.reducer;
