// import { SET_CURRENT_LIST } from '../system/types';
import {
  ListsActions,
  ListsState,
  ADDED_NEW_LIST,
  // SET_CURRENT_LIST,
  // CHANGED_CURRENT_LIST,
  REMOVED_LIST,
  // RETRIEVED_LIST_ITEMS,
  ADDED_ITEM_TO_CUR_LIST,
  IList,
  IListItem,
  // REMOVED_ITEMS_FROM_CUR_LIST,
  CHANGED_ITEMS_STATUS,
} from './types';

const intitalState: ListsState = {
  lists: []
};

export default function listReducer(
  state = intitalState, action: ListsActions
): ListsState {
  let idx;
  let currentList;
  switch (action.type) {
    case ADDED_NEW_LIST:
      return { ...state, lists: state.lists.concat(action.payload) }
    case REMOVED_LIST:
      idx = state.lists.findIndex(list => list._id === action.payload)
      return { ...state, lists: state.lists.slice(0, idx).concat(state.lists.slice(idx + 1)) }

    // case 'RETRIEVED_LIST_ITEMS':
    //   return { ...state, curListItems: action.payload }

    case ADDED_ITEM_TO_CUR_LIST:
      idx = state.lists.findIndex((list) => list._id === action.payload.curList);
      currentList = { ...state.lists[idx] }
      currentList.listItems = action.payload.items
      return { ...state, lists: [...state.lists.slice(0, idx), currentList, ...state.lists.slice(idx + 1)] };
    case CHANGED_ITEMS_STATUS:
      idx = state.lists.findIndex((list) => list._id === action.payload.curList);
      currentList = { ...state.lists[idx] }
      let items = [...currentList.listItems];
      let itemIdx = items.findIndex((ele) => ele._id === action.payload.item._id)
      items = [...items.slice(0, itemIdx), action.payload.item, ...items.slice(itemIdx + 1)]
      currentList.listItems = items;
      return { ...state, lists: [...state.lists.slice(0, idx), currentList, ...state.lists.slice(idx + 1)] };
    
      // case 'REMOVED_ITEMS_FROM_CUR_LIST':
    //   let tempItem = [...state.curListItems].filter(item => item.item_id !== action.payload)
    //   return { ...state, curListItems: tempItem }
    
    default:
      return state
  }
}
