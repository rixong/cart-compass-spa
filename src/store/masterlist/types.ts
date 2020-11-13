export interface IMasterListItem {
  name: string;
  categoryId: number;
}

export type MasterlistState = {
  masterlist: IMasterListItem[];
}

export const ADDED_ITEM_TO_MASTERLIST = 'ADDED_ITEM_TO_MASTERLIST'
export const REMOVED_FROM_MASTER_LIST = 'REMOVED_FROM_MASTER_LIST'

interface AddItemToMasterlistAction {
  type: typeof ADDED_ITEM_TO_MASTERLIST
  payload: {
    item: string
    user_id: string
    list_id: string
  }
}

interface RemoveItemToMasterlistAction {
  type: typeof REMOVED_FROM_MASTER_LIST
}

export type MasterlistActions = AddItemToMasterlistAction | RemoveItemToMasterlistAction