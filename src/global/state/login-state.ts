import { IEvent as LoginEvent } from '../event/login-event';

/*
 * 全局登录状态
 */

const defaultState: IState = {
  initingForm: false
}

/**
 * 登录状态
 */
export interface IState {
  initingForm: boolean;
}

/**
 * 根据不同的消息修改登录状态 的函数，称之为 Reducer
 *
 * @param state  原状态
 * @param action 消息
 */
export function Reducer(state: IState | undefined = defaultState, action: LoginEvent): IState {
  return state;
}
