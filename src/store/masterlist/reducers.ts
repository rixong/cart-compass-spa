import {
  MasterListState,
  MasterListActions,
  ADDED_ITEM_TO_MASTERLIST,
  REMOVED_FROM_MASTER_LIST
} from './types';

const intitialState: MasterListState = {
  masterList: []
}

export default function masterListReducer(
  state = intitialState,
  action: MasterListActions
) {
  switch (action.type) {
    case ADDED_ITEM_TO_MASTERLIST:
      return { ...state, masterList: state.masterList.concat(action.payload) }
    case REMOVED_FROM_MASTER_LIST:
      const idx = state.masterList.findIndex(item => action.payload === item._id)
      return {
        ...state, masterList:
          state.masterList.slice(0, idx).concat(state.masterList.slice(idx + 1))
      }
    default:
      return state
  }
}