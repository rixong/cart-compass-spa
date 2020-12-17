import {
  SystemState,
  SystemActionTypes,
  ADDED_CURRENT_USER,
  SET_CURRENT_LIST,
  USER_CLEARED,
  STARTED_LOADING,
  FINISHED_LOADING,
  ADDED_NOTIFICATION,
  CLEARED_NOTIFICATION,
} from './types'

const initialState: SystemState = {
  curUser: {
    name: '',
    email: '',
    currentList: '',
    id: '',
    sharedWithMe: [],
  },
  notification: {
    isError: false,
    message: ''
  },
  loading: false,
}

export default function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  // console.log('From reducer', action.payload)
  switch (action.type) {
    case ADDED_CURRENT_USER:
      return {
        ...state, curUser: action.payload
      }
    case USER_CLEARED:
      return initialState
    case SET_CURRENT_LIST:
      const tempUser = Object.assign({}, state.curUser)
      tempUser.currentList = action.payload
      return { ...state, curUser: tempUser }
    case ADDED_NOTIFICATION:
      const newNotification = {isError: true, message: action.payload }
      return { ...state, notification: newNotification }
    case CLEARED_NOTIFICATION:
      return { ...state, notification: {isError: false, message: ''} }
    case STARTED_LOADING:
      return { ...state, loading: true }
    case FINISHED_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
};