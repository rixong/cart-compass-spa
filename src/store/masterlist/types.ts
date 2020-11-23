export interface IMasterListItem {
  _id: string;
  name: string;
  categoryId: string;
}

export type MasterListState = {
  masterList: IMasterListItem[];
}

export const ADD_MASTERLIST_ITEMS = 'ADD_MASTERLIST_ITEMS'
export const CLEARED_MASTERLIST = 'CLEARED_MASTERLIST'
export const ADDED_ITEM_TO_MASTERLIST = 'ADDED_ITEM_TO_MASTERLIST'
export const REMOVED_FROM_MASTER_LIST = 'REMOVED_FROM_MASTER_LIST'

interface AddItemToMasterListAction {
  type: typeof ADDED_ITEM_TO_MASTERLIST
  payload: IMasterListItem
}

interface RemoveItemToMasterListAction {
  type: typeof REMOVED_FROM_MASTER_LIST
  payload: string
}

interface ClearMasterListAction {
  type: typeof CLEARED_MASTERLIST
  payload: string
}


export type MasterListActions = AddItemToMasterListAction | RemoveItemToMasterListAction
            | AddItemToMasterListAction | ClearMasterListAction