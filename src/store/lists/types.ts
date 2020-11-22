export interface IList {
  _id: string;
  userId: string;
  name: string;
  dateCreated: Date;
  sharedWith: [];
  listItems: IListItem[];
}

export interface IListItem {
  _id?: string;
  masterItemId: string;
  quantity: string;
  active?: boolean;
}

export interface INewItem {
  name: string;
  categoryId: string;
  quantity: string;
}

export type ListsState = {
  lists: IList[];
}

export const ADDED_NEW_LIST = 'ADDED_NEW_LIST'
export const REMOVED_LIST = 'REMOVED_LIST'
// export const RETRIEVED_LIST_ITEMS = 'RETRIEVED_LIST_ITEMS'
export const ADDED_ITEM_TO_CUR_LIST = 'ADDED_ITEM_TO_CUR_LIST'
export const REMOVED_ITEMS_FROM_CUR_LIST = 'REMOVED_ITEMS_FROM_CUR_LIST'
export const CHANGED_ITEMS_STATUS = 'CHANGED_ITEMS_STATUS'

interface AddNewListAction {
  type: typeof ADDED_NEW_LIST
  payload: IList
}

interface RemoveListAction {
  type: typeof REMOVED_LIST
  payload: string
}

// interface RetreiveListItemsAction {
//   type: typeof RETRIEVED_LIST_ITEMS
// }

interface AddToCurrentListAction {
  type: typeof ADDED_ITEM_TO_CUR_LIST
  payload: {items: IListItem[], curList: string}
}

interface RemoveFromCurrentListAction {
  type: typeof REMOVED_ITEMS_FROM_CUR_LIST
}

interface ChangeItemStatusAction {
  type: typeof CHANGED_ITEMS_STATUS,
  payload: {item: IListItem, curList: string}
}

export type ListsActions = 
  AddNewListAction | RemoveListAction |
  AddToCurrentListAction | RemoveFromCurrentListAction |  ChangeItemStatusAction


