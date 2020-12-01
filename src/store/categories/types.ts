export interface ICategory {
  _id: string;
  name: string;
  sortOrder: number;
}

export interface ISortOrder {
  _id: string;
  categoryId: string;
  order: number
}

export type CategoriesState = {
  categories: ICategory[];
  sortOrder: ISortOrder[];
}

export const REORDERED_CATEGORIES = 'REORDERED_CATEGORIES';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_SORT_ORDER = 'ADD_SORT_ORDER';
export const CLEAR_SORT_ORDER = 'CLEAR_SORT_ORDER';

interface ReorderCategoriesAction {
  type: typeof REORDERED_CATEGORIES,
  payload: ISortOrder[],
}

interface AddCategoriesAction {
  type: typeof ADD_CATEGORIES,
  payload: ICategory[],
}

interface AddSortOrderAction {
  type: typeof ADD_SORT_ORDER,
  payload: ISortOrder[],
}

interface ClearAllAction {
  type: typeof CLEAR_SORT_ORDER,
}

export type categoryActions = ReorderCategoriesAction | AddCategoriesAction 
| AddSortOrderAction | ClearAllAction