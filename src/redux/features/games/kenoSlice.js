import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readyToChooseSpots: false,
  replayKenoGame: false,
  kenoSimStarted: false,
  kenoGame: {
    mode: '',
    spots: '',
    simulations: '',
    userChoices: [],
    recentWinningNums: [],
    matches: 0,
    payout: 0,
  },
  previousKenoGame: {
    mode: '',
    spots: '',
    simulations: '',
    userChoices: [],
    recentWinningNums: [],
    mappedMatches: [],
    fixedWinningNums: {},
    matches: 0,
    payout: 0,
  },
  regularKenoGameHistory: undefined,
  showKenoSimHistoryModal: false,
  showKenoRegHistoryModal: false,
  wageredKeno: 0,
  wonKeno: 0,
};

const kenoSlice = createSlice({
  name: 'keno',
  initialState,
  reducers: {
    SET_READY_TO_CHOOSE_SPOTS(state, action) {
      state.readyToChooseSpots = action.payload;
    },
    SET_KENO_GAME(state, action) {
      state.kenoGame = action.payload;
    },
    SET_PREVIOUS_KENO_GAME(state, action) {
      state.previousKenoGame = action.payload;
    },
    SET_FIXED_WINNING_NUMS(state, action) {
      state.previousKenoGame.fixedWinningNums = action.payload;
      //   state.regularKenoGameHistory[-1].fixedWinningNums = action.payload;
    },
    SET_KENO_SIM_HISTORY_MODAL(state, action) {
      state.showKenoSimHistoryModal = action.payload;
    },
    SET_KENO_REG_HISTORY_MODAL(state, action) {
      state.showKenoRegHistoryModal = action.payload;
    },
    SET_REGULAR_KENO_GAME_HISTORY(state, action) {
      if (!state.regularKenoGameHistory) {
        state.regularKenoGameHistory = [];
        state.regularKenoGameHistory.push(action.payload);
        console.log('payload');
        console.log(action.payload);
      }
      if (action.payload.length === 0) {
        state.regularKenoGameHistory = action.payload;
      } else {
        state.regularKenoGameHistory.push(action.payload);
      }

      //   state.regularKenoGameHistory = [];
    },
    SET_REPLAY_KENO_GAME(state, action) {
      state.replayKenoGame = action.payload;
    },
    SET_KENO_SIM_STARTED(state, action) {
      state.kenoSimStarted = action.payload;
    },
    SET_KENO_WAGERED_AND_WON(state, action) {
      if (!state.wageredKeno) {
        state.wageredKeno = 0;
      }
      if (!state.wonKeno) {
        state.wonKeno = 0;
      }
      console.log(action.payload);
      console.log('logging states');
      console.log(state.wageredKeno);
      console.log(state.wonKeno);
      if (action.payload.wageredKeno === 0) {
        state.wageredKeno = action.payload.wageredKeno;
        state.wonKeno = action.payload.wonKeno;
      } else {
        state.wageredKeno += action.payload.wageredKeno;
        state.wonKeno += action.payload.wonKeno;
      }
    },
    RESET_KENO_SLICE: () => {
      return initialState;
    },
  },
});

export const {
  SET_READY_TO_CHOOSE_SPOTS,
  SET_KENO_GAME,
  SET_PREVIOUS_KENO_GAME,
  SET_FIXED_WINNING_NUMS,
  SET_KENO_SIM_HISTORY_MODAL,
  SET_KENO_REG_HISTORY_MODAL,
  SET_REGULAR_KENO_GAME_HISTORY,
  SET_REPLAY_KENO_GAME,
  SET_KENO_SIM_STARTED,
  SET_KENO_WAGERED_AND_WON,
  RESET_KENO_SLICE,
} = kenoSlice.actions;
export const selectReadyToChooseSpots = (state) =>
  state.keno.readyToChooseSpots;
export const selectReplayKenoGame = (state) => state.keno.replayKenoGame;
export const selectKenoSimStarted = (state) => state.keno.kenoSimStarted;
export const selectKenoGame = (state) => state.keno.kenoGame;
export const selectPreviousKenoGame = (state) => state.keno.previousKenoGame;
export const selectShowKenoSimHistoryModal = (state) =>
  state.keno.showKenoSimHistoryModal;
export const selectShowKenoRegHistoryModal = (state) =>
  state.keno.showKenoRegHistoryModal;
export const selectRegularKenoGameHistory = (state) =>
  state.keno.regularKenoGameHistory;
export const selectWageredKeno = (state) => state.keno.wageredKeno;
export const selectWonKeno = (state) => state.keno.wonKeno;

export default kenoSlice.reducer;
