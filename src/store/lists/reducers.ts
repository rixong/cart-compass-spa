import {
  IList,
  IListItem,
  ListsActions,
  ListsState,
  ADDED_NEW_LIST,
  // CHANGED_CURRENT_LIST,
  // REMOVED_LIST,
  // RETRIEVED_LIST_ITEMS,
  // ADDED_ITEM_TO_CUR_LIST,
  // REMOVED_ITEMS_FROM_CUR_LIST,
  // CHANGED_ITEMS_STATUS,
} from './types';


const intitalState: ListsState = {
  lists: [],
  currentListItems: [],
};

export default function listReducer(
  state = intitalState, action: ListsActions
): ListsState {
  let idx;
  switch (action.type) {
    case ADDED_NEW_LIST:
      return { ...state, lists: state.lists.concat(action.payload)}
    // case 'REMOVED_LIST':
    //   idx = state.lists.findIndex(list => list.id === action.payload)
    //   return { ...state, lists: state.lists.slice(0, idx).concat(state.lists.slice(idx + 1)) }
    // case 'CHANGED_CURRENT_LIST':
    //   const tempUser = Object.assign({}, state.curUser)
    //   tempUser.currentList = action.payload
    //   return { ...state, curUser: tempUser }
    // case 'RETRIEVED_LIST_ITEMS':
    //   return { ...state, curListItems: action.payload }
    // case 'ADDED_ITEM_TO_CUR_LIST':
    //   return { ...state, curListItems: state.curListItems.concat(action.payload) }
    // case 'REMOVED_ITEMS_FROM_CUR_LIST':
    //   let tempItem = [...state.curListItems].filter(item => item.item_id !== action.payload)
    //   return { ...state, curListItems: tempItem }
    // case 'CHANGED_ITEMS_STATUS':
    //   idx = state.curListItems.findIndex(item => item.item_id === action.payload.item_id)
    //   return {
    //     ...state, curListItems:
    //       [...state.curListItems.slice(0, idx), action.payload, ...state.curListItems.slice(idx + 1)]
    //   }

    default:
      return state
  }
}
