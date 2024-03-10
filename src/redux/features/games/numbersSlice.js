import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readyToPlayNumbers: false,
  currentNumbersGame: {
    type: '',
    userNumbers: [],
    bets: [],
  },
  previousNumbersGame: {
    type: '',
    userNumbers: [],
    bets: [],
    wagered: 0,
    winningNums: [],
    wayWon: '',
    payout: 0,
  },
  startNumbersGame: false,
  cancelSimulation: false,
  moneyStats: {
    wagered: 0,
    won: 0,
    profit: 0,
  },
  numbersHistory: [],
};

const numbersSlice = createSlice({
  name: 'numbers',
  initialState,
  reducers: {
    SET_READY_TO_PLAY_NUMBERS(state, action) {
      state.readyToPlayNumbers = action.payload;
    },
    SET_CURRENT_NUMBERS_GAME(state, action) {
      state.currentNumbersGame = {
        ...state.currentNumbersGame,
        ...action.payload,
      };
    },
    SET_PREVIOUS_NUMBERS_GAME(state, action) {
      state.previousNumbersGame = {
        ...state.previousNumbersGame,
        ...action.payload,
      };
    },
    SET_START_NUMBERS_GAME(state, action) {
      state.startNumbersGame = action.payload;
    },
    SET_CANCEL_SIMULATION(state, action) {
      state.cancelSimulation = action.payload;
    },
    SET_NUMBERS_GAME_MONEY_STATS(state, action) {
      console.log('moneyStatsRedux');
      console.log(action.payload);
      state.moneyStats = action.payload;
    },
    SET_NUMBERS_GAME_MONEY_STATS_SIMULATOR(state, action) {
      state.moneyStats.wagered =
        state.moneyStats.wagered + action.payload.wagered;
      state.moneyStats.won = state.moneyStats.won + action.payload.won;
      state.moneyStats.profit = state.moneyStats.profit + action.payload.profit;
    },
    SET_NUMBERS_HISTORY(state, action) {
      state.numbersHistory.push(action.payload);
      //   state.numbersHistory = action.payload;
    },
    SET_RESET_NUMBERS_HISTORY(state, action) {
      if (action.payload === true) {
        state.moneyStats = {
          wagered: 0,
          won: 0,
          profit: 0,
        };

        state.numbersHistory = [];
      }
    },
    RESET_NUMBERS_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_CURRENT_NUMBERS_GAME,
  SET_READY_TO_PLAY_NUMBERS,
  SET_START_NUMBERS_GAME,
  SET_CANCEL_SIMULATION,
  SET_PREVIOUS_NUMBERS_GAME,
  SET_NUMBERS_GAME_MONEY_STATS,
  SET_NUMBERS_HISTORY,
  SET_RESET_NUMBERS_HISTORY,
  SET_NUMBERS_GAME_MONEY_STATS_SIMULATOR,
  RESET_NUMBERS_SLICE,
} = numbersSlice.actions;
export const selectCurrentNumbersGame = (state) =>
  state.numbers.currentNumbersGame;
export const selectReadyToPlayNumbers = (state) =>
  state.numbers.readyToPlayNumbers;
export const selectStartNumbersGame = (state) => state.numbers.startNumbersGame;
export const selectCancelSimulation = (state) => state.numbers.cancelSimulation;
export const selectPreviousNumbersGame = (state) =>
  state.numbers.previousNumbersGame;
export const selectNumbersGameMoneyStats = (state) => state.numbers.moneyStats;
export const selectNumbersHistory = (state) => state.numbers.numbersHistory;
export default numbersSlice.reducer;
