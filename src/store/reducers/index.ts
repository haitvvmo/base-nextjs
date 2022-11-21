import { combineReducers } from 'redux';
import auth from './auth.reducer';

const rootReducer = combineReducers({
  auth: auth.reducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
