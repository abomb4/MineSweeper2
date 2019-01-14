import { combineReducers, Reducer } from 'redux';
import { StateType } from 'typesafe-actions';
import { Reducer as LoginReducer } from './login-state';

export const createRootReducer = () => combineReducers({
  LoginReducer
});

export type RootState = StateType<ReturnType<typeof createRootReducer>>;
