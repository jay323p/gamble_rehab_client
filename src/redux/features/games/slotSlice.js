import { createSlice } from '@reduxjs/toolkit';
import cherry from '../../../assets/cherry.png';
import singleBar from '../../../assets/singleBar.png';
import doubleBar from '../../../assets/doubleBar.png';
import tripleBar from '../../../assets/tripleBar.png';
import seven from '../../../assets/seven.png';
import fiftyChip from '../../../assets/fiftyChip.png';

const initialState = {
  readyToSpin: false,
  currentGame: {},
  previousGames: [],
  guiders: [],
  moneyStats: {
    wagered: 0,
    won: 0,
    profit: 0,
  },
  calculateStats: false,
  payoutGuide: [],
  winners: [],
  history: [],
};

const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
    SET_READY_TO_SPIN(state, action) {
      state.readyToSpin = action.payload;
    },
    SET_CURRENT_SLOT_GAME(state, action) {
      state.currentGame = action.payload;
    },
    SET_PREVIOUS_SLOT_GAMES(state, action) {
      state.previousGames.push(action.payload);
    },
    SET_RESET_SLOT_HISTORY(state, action) {
      if (action.payload === true) {
        state.previousGames = [];
      }
    },
    SET_SLOTS_MONEY_STATS(state, action) {
      state.moneyStats = action.payload;
    },
    SET_RESET_SLOTS_MONEY_STATS(state, action) {
      state.moneyStats = { wagered: 0, won: 0, profit: 0 };
    },
    SET_CALCULATE_STATS(state, action) {
      state.calculateStats = action.payload;
    },
    SET_GUIDERS(state, action) {
      if (state.guiders === undefined) {
        state.guiders = [];
      } else {
        if (action.payload === false) {
          state.guiders = [];
        } else {
          state.guiders.push(action.payload);
        }
      }
    },
    SET_PAYOUT_GUIDE(state, action) {
      if (action.payload.reset === true) {
        state.payoutGuide = [
          {
            img: cherry,
            id: 'cherry',
            payout: 1,
            won: false,
          },
          {
            img: singleBar,
            id: 'singleBar',
            payout: 2,
            won: false,
          },
          {
            img: doubleBar,
            id: 'doubleBar',
            payout: 4,
            won: false,
          },
          {
            img: tripleBar,
            id: 'tripleBar',
            payout: 10,
            won: false,
          },
          {
            img: fiftyChip,
            id: 'fiftyChip',
            payout: 50,
            won: false,
          },
          {
            img: seven,
            id: 'seven',
            payout: 100,
            won: false,
          },
        ];
      } else {
        state.payoutGuide = action.payload;
      }
    },
    SET_WINNERS(state, action) {
      if (state.winners === undefined) {
        state.winners = [];
      }

      if (action.payload === false) {
        state.winners = [];
      } else {
        state.winners = action.payload;
        state.calculateStats = true;
      }
    },
    SET_SLOTS_HISTORY(state, action) {
      //   state.history = [];
      state.history.push(action.payload);
    },
    RESET_SLOTS_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_READY_TO_SPIN,
  SET_CURRENT_SLOT_GAME,
  SET_PREVIOUS_SLOT_GAMES,
  SET_RESET_SLOT_HISTORY,
  SET_SLOTS_MONEY_STATS,
  SET_RESET_SLOTS_MONEY_STATS,
  SET_CALCULATE_STATS,
  SET_GUIDERS,
  SET_PAYOUT_GUIDE,
  SET_WINNERS,
  SET_SLOTS_HISTORY,
  RESET_SLOTS_SLICE,
} = slotSlice.actions;

export const selectReadyToSpin = (state) => state.slot.readyToSpin;
export const selectCurrentSlotGame = (state) => state.slot.currentGame;
export const selectPreviousSlotGames = (state) => state.slot.previousGames;
export const selectGuiders = (state) => state.slot.guiders;
export const selectSlotMoneyStats = (state) => state.slot.moneyStats;
export const selectCalculateStats = (state) => state.slot.calculateStats;
export const selectPayoutGuide = (state) => state.slot.payoutGuide;
export const selectWinners = (state) => state.slot.winners;
export const selectSlotsHistory = (state) => state.slot.history;

export default slotSlice.reducer;
