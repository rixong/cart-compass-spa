export interface IUser {
  id: string;
  name: string;
  email: string;
  currentList: string;
  sharedWithMe: string[];
}

export interface ILogin {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface INotification {
  error: boolean;
  message: string;
}

export type SystemState = {
  readonly curUser: IUser;
  readonly notification: INotification;
  readonly loading: boolean;
}

export const ADDED_CURRENT_USER = "ADDED_CURRENT_USER"
export const USER_CLEARED = "USER_CLEARED"
export const SET_CURRENT_LIST = "SET_CURRENT_LIST"
export const STARTED_LOADING = "STARTED_LOADING"
export const FINISHED_LOADING = "FINISHED_LOADING"
export const ADDED_NOTIFICATION = "ADDED_NOTIFICATION"
export const CLEARED_NOTIFICATION = "CLEARED_NOTIFICATION"

interface AddCurrentUserAction {
  type: typeof ADDED_CURRENT_USER;
  payload: IUser;
}

interface UserClearAction {
  type: typeof USER_CLEARED;
  payload: IUser;
}

interface doSetCurrentList {
  type: typeof SET_CURRENT_LIST;
  payload: string;
}

interface StartLoadingAction {
  type: typeof STARTED_LOADING;
  // payload: INotification;
}

interface FinishLoadingAction {
  type: typeof FINISHED_LOADING;
  // payload: INotification;
}

interface AddNotificationAction {
  type: typeof ADDED_NOTIFICATION;
  payload: INotification;
}

interface ClearNotificationAction {
  type: typeof CLEARED_NOTIFICATION;
  payload: INotification;
}

export type SystemActionTypes =
  AddCurrentUserAction | UserClearAction | doSetCurrentList | StartLoadingAction |
  FinishLoadingAction | AddNotificationAction | ClearNotificationAction
