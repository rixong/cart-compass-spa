/* 
const intitialState = {

}

export default function masterlistReducer(state, action) {
    case 'ADDED_ITEM_TO_MASTERLIST':
  return { ...state, masterList: state.masterList.concat(action.payload) }
    case 'REMOVED_FROM_MASTER_LIST':
  idx = state.masterList.findIndex(item => action.payload === item.id)
  return {
    ...state, masterList:
      state.masterList.slice(0, idx).concat(state.masterList.slice(idx + 1))
  }
  default:
  return state
} */