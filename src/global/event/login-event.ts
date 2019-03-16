/*
 * 定义登录相关消息，及其创建方法
 */

import { PayloadAction } from 'typesafe-actions/dist/type-helpers';

/**
 * 事件类型
 */
export enum EventTypes {
  /** 请求数据 */
  INIT_LOGIN_STATE = 'INIT_LOGIN_STATE',
  /** 请求登录 */
  DO_LOGIN = 'DO_LOGIN',
}

interface ILoginData {
  username: string;
  password: string;
}

/**
 * 事件主体
 */
export interface IEventContent {
  loginData?: ILoginData;
}

/**
 * 事件类
 */
export interface IEvent extends PayloadAction<EventTypes, IEventContent> {
}

/**
 * 预设的事件创建方法
 */
export const EventCreators = {
  initLoginForm: () => ({
    type: EventTypes.INIT_LOGIN_STATE,
    payload: {}
  }),
  submit: (loginData: ILoginData) => ({
    type: EventTypes.DO_LOGIN,
    payload: { loginData }
  }),
};
