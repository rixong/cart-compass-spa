export interface IList {
  listId: string;
  userId: string;
  name: string;
  dateCreated: Date;
  sharedWith: [];
  curItems: IListItem[];
}

export interface IListItem {
  masterItemId: string;
  categoryId: string;
  quantity: string;
  active: boolean;
}

export type ListsState = {
  lists: IList[];
  currentListItems: IListItem[];
}

export const ADDED_NEW_LIST = 'ADDED_NEW_LIST'
export const CHANGED_CURRENT_LIST = 'CHANGED_CURRENT_LIST'
export const REMOVED_LIST = 'REMOVED_LIST'
export const RETRIEVED_LIST_ITEMS = 'RETRIEVED_LIST_ITEMS'
export const ADDED_ITEM_TO_CUR_LIST = 'ADDED_ITEM_TO_CUR_LIST'
export const REMOVED_ITEMS_FROM_CUR_LIST = 'REMOVED_ITEMS_FROM_CUR_LIST'
export const CHANGED_ITEMS_STATUS = 'CHANGED_ITEMS_STATUS'

interface AddNewListAction {
  type: typeof ADDED_NEW_LIST
}

interface ChangeCurrentListAction {
  type: typeof CHANGED_CURRENT_LIST
}

interface RemoveListAction {
  type: typeof REMOVED_LIST
}

interface RetreiveListItemsAction {
  type: typeof RETRIEVED_LIST_ITEMS
}

interface AddToCurrentListAction {
  type: typeof ADDED_ITEM_TO_CUR_LIST
}

interface RemoveFromCurrentListAction {
  type: typeof REMOVED_ITEMS_FROM_CUR_LIST
}

interface ChangeItemStatusAction {
  type: typeof CHANGED_ITEMS_STATUS
}

export type ListActions = 
  AddNewListAction | ChangeCurrentListAction | RemoveListAction | RetreiveListItemsAction |
  AddToCurrentListAction | RemoveFromCurrentListAction |  ChangeItemStatusAction


