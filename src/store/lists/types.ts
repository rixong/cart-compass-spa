export interface IList {
  _id: string;
  userId: string;
  name: string;
  dateCreated: string;
  sharedWith: [];
  listItems: IListItem[];
}

export interface IListItem {
  _id: string;
  masterItemId: string;
  quantity: string;
  active?: boolean;
}

export interface INewItem {
  name: string;
  categoryId: string;
  quantity: string;
}

export interface ICompleteItem {
  name: string;
  id: string;
  quantity: string;
  active: boolean;
  categoryId: string;
  sortOrder: number;
}

export type ListsState = {
  lists: IList[];
  curListItems: IListItem[];
}

export const FETCHED_INITIAL_LISTS = 'FETCHED_INITIAL_LISTS,'
export const ADDED_NEW_LIST = 'ADDED_NEW_LIST'
export const REMOVED_LIST = 'REMOVED_LIST'
export const CLEARED_ALL_LISTS = 'CLEARED_ALL_LISTS'
export const FETCHED_CURRENT_LIST_ITEMS = 'FETCHED_CURRENT_LIST_ITEMS'
export const ADDED_ITEM_TO_CUR_LIST = 'ADDED_ITEM_TO_CUR_LIST'
export const REMOVED_ITEM_FROM_ALL_LISTS = 'REMOVED_ITEM_FROM_ALL_LISTS'
export const REMOVED_ITEMS_FROM_CUR_LIST = 'REMOVED_ITEMS_FROM_CUR_LIST'
export const CHANGED_ITEMS_STATUS = 'CHANGED_ITEMS_STATUS'

interface FetchInitialDataAction {
  type: typeof FETCHED_INITIAL_LISTS,
  payload: {
    lists: IList[],
  }
}

interface AddNewListAction {
  type: typeof ADDED_NEW_LIST
  payload: IList
}

interface RemoveListAction {
  type: typeof REMOVED_LIST
  payload: string
}

interface ClearedListsAction {
  type: typeof CLEARED_ALL_LISTS
}

interface FetchCurrentListItemsAction {
  type: typeof FETCHED_CURRENT_LIST_ITEMS
  payload: { items: IListItem[] }
}

interface AddToCurrentListAction {
  type: typeof ADDED_ITEM_TO_CUR_LIST
  payload: { item: IListItem }
}

interface RemoveFromAllListsAction {
  type: typeof REMOVED_ITEM_FROM_ALL_LISTS
  payload: string
}

interface RemoveFromCurrentListAction {
  type: typeof REMOVED_ITEMS_FROM_CUR_LIST
}

interface ChangeItemStatusAction {
  type: typeof CHANGED_ITEMS_STATUS,
  payload: { item: IListItem, curList: string }
}

export type ListsActions =
  FetchInitialDataAction | AddNewListAction | RemoveListAction | ClearedListsAction |
  AddToCurrentListAction | RemoveFromAllListsAction | RemoveFromCurrentListAction | 
  ChangeItemStatusAction | FetchCurrentListItemsAction
