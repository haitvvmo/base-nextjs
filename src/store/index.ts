
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [logger]
})
export const persistor = persistStore(store);

export default store;
