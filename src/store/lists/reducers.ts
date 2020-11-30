// import { SET_CURRENT_LIST } from '../system/types';
import {
  ListsActions,
  ListsState,
  IList,
  // IListItem,
  FETCHED_INITIAL_LISTS_AND_SORT_ORDER,
  ADDED_NEW_LIST,
  REMOVED_LIST,
  CLEARED_ALL_LISTS,
  // RETRIEVED_CURRENT_LIST_ITEMS,
  ADDED_ITEM_TO_CUR_LIST,
  CHANGED_ITEMS_STATUS,
  REMOVED_ITEM_FROM_ALL_LISTS,
  // RETRIEVED_LIST_ITEMS,
  // REMOVED_ITEMS_FROM_CUR_LIST,
} from './types';

const intitalState: ListsState = {
  lists: []
};

export default function listReducer(
  state = intitalState, 
  action: ListsActions
): ListsState {
  let idx;
  let currentList;
  switch (action.type) {
    case FETCHED_INITIAL_LISTS_AND_SORT_ORDER:
      return {...state, lists: action.payload.lists }
    case ADDED_NEW_LIST:
      return { ...state, lists: state.lists.concat(action.payload) }
    case REMOVED_LIST:
      idx = state.lists.findIndex(list => list._id === action.payload)
      return { ...state, lists: state.lists.slice(0, idx).concat(state.lists.slice(idx + 1)) }
    case CLEARED_ALL_LISTS:
      return intitalState
    
    // case RETRIEVED_CURRENT_LIST_ITEMS:
    //   let currentList = state.lists.find((list) => list._id === action.payload.currentListId)
    //   return { ...state, curListItems: action.payload.cuurentListId }

    case ADDED_ITEM_TO_CUR_LIST:
      idx = state.lists.findIndex((list) => list._id === action.payload.curList);
      currentList = { ...state.lists[idx] }
      currentList.listItems = action.payload.items
      return { ...state, lists: [...state.lists.slice(0, idx), currentList, ...state.lists.slice(idx + 1)] };

    case REMOVED_ITEM_FROM_ALL_LISTS:
      const lists = [...state.lists];
      let newLists: IList[] = [];
      lists.forEach ((list) => {
        let curListItems = [...list.listItems]
        curListItems = curListItems.filter((item) => {
          return item.masterItemId !== action.payload;
        });
        list.listItems = curListItems;
        newLists.concat(list);
      })
      return {...state, lists: newLists}

    case CHANGED_ITEMS_STATUS:
      let listIdx = state.lists.findIndex((list) => list._id === action.payload.curList);
      currentList = { ...state.lists[listIdx] }
      let items = [...currentList.listItems];
      let itemIdx = items.findIndex((ele) => ele._id === action.payload.item._id)
      items = [...items.slice(0, itemIdx), action.payload.item, ...items.slice(itemIdx + 1)]
      currentList.listItems = items;
      return { ...state, lists: [...state.lists.slice(0, listIdx), currentList, ...state.lists.slice(listIdx + 1)] };
    // case 'REMOVED_ITEMS_FROM_CUR_LIST':
    //   let tempItem = [...state.curListItems].filter(item => item.item_id !== action.payload)
    //   return { ...state, curListItems: tempItem }

    default:
      return state
  }
}
