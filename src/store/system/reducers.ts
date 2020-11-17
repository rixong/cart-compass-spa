import {
  SystemState, 
  SystemActionTypes, 
  ADDED_CURRENT_USER, 
  USER_CLEARED, 
  STARTED_LOADING, 
  FINISHED_LOADING,
  ADDED_NOTIFICATION,
  CLEARED_NOTIFICATION
} from './types'

const initialState = {
  curUser: {
    name: '',
    email: '',
    currentList: '',
    id: ''
  },
  notification: {
    error: false,
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
        ...state, curUser: action.payload, loading: false
      }
    case USER_CLEARED:
      console.log('Logout in reducer')
      return { ...state, ...initialState }
    case ADDED_NOTIFICATION:
      return { ...state, notification: action.payload }
    case CLEARED_NOTIFICATION:
      return { ...state, notification: action.payload }
    case STARTED_LOADING:
      return { ...state, loading: true }
    case FINISHED_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
};