export interface IUser {
  userId: string;
  email: string;
  password: string;
  currentList: string;
}

export interface INotification {
  error: boolean;
  message: string;
}

export type UserState = {
  curUser: IUser;
  notification: INotification;
  loading: boolean;
}

export const ADDED_CURRENT_USER = "ADDED_CURRENT_USER"
export const USER_CLEARED = "USER_CLEARED"
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

interface StartLoadingAction {
  type: typeof STARTED_LOADING;
  payload: IUser;
}

interface FinishLoadingAction {
  type: typeof FINISHED_LOADING;
  payload: IUser;
}

interface AddNotificationAction {
  type: typeof ADDED_NOTIFICATION;
  payload: IUser;
}

interface ClearNotificationAction {
  type: typeof CLEARED_NOTIFICATION;
  payload: IUser;
}

export type SystemActionTypes = 
  AddCurrentUserAction | UserClearAction | StartLoadingAction | 
  FinishLoadingAction | AddNotificationAction | ClearNotificationAction
  