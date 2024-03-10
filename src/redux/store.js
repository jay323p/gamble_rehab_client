import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { SET_LOGOUT_USER } from '../redux/features/auth/authSlice';
import kenoReducer from '../redux/features/games/kenoSlice';
import numbersReducer from '../redux/features/games/numbersSlice';
import powerballReducer from '../redux/features/games/powerballSlice';
import scratchersReducer from '../redux/features/games/scratchersSlice';
import slotReducer from '../redux/features/games/slotSlice';
import storage from 'redux-persist/lib/storage';
import { PURGE, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
  auth: authReducer,
  keno: kenoReducer,
  numbers: numbersReducer,
  powerball: powerballReducer,
  scratcher: scratchersReducer,
  slot: slotReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = (state, action) => {
  if (action.type === 'SET_LOGOUT_USER') {
    console.log('we in here yeah');
    storage.removeItem('persist:root');
    localStorage.clear();

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
