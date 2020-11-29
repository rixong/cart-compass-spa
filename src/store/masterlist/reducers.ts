import {
  MasterListState,
  MasterListActions,
  ADDED_ITEM_TO_MASTERLIST,
  REMOVED_FROM_MASTER_LIST,
  CLEARED_MASTERLIST
} from './types';

const intitialState: MasterListState = {
  masterList: []
}

export default function masterListReducer(
  state = intitialState,
  action: MasterListActions
): MasterListState {
  switch (action.type) {
    case ADDED_ITEM_TO_MASTERLIST:
      return { ...state, masterList: state.masterList.concat(action.payload) }
    case CLEARED_MASTERLIST:
      return intitialState;
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