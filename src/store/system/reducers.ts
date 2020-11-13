/* const initialState = {
  name: '',
  email: '',
  id: '',
  currentList: '',
  notification: '',
  loading: false,
}

export default function systemReducer(
  state = initialState, action
) {
  // console.log('From reducer', action.payload)
  switch (action.type) {
    case 'ADDED_CURRENT_USER':
      return {
        ...state,
        curUser: { email: action.payload.email, id: action.payload.id, currentList: action.payload.current_list },
        // lists: action.payload.lists,
        // masterList: action.payload.items,
        // categories: action.payload.categories,
        loading: false
      }
    case 'USER_CLEARED':
      console.log('Logout in reducer')
      return { ...state, ...initialState }
    case 'ADDED_NOTIFICATION':
      return { ...state, notification: action.payload }
    case 'CLEARED_NOTIFICATION':
      return { ...state, notification: action.payload }
    case 'STARTED_LOADING':
      return { ...state, loading: true }
    case 'FINISHED_LOADING':
      return { ...state, loading: false }
    default:
      return state
  }
}; */