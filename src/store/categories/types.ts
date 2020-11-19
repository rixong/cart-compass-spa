export interface ICategory {
  _id: string;
  name: string;
  sortOrder: number;
}

export type CategoriesState = {
  categories: ICategory[];
}

export const REORDERED_CATEGORIES = 'REORDERED_CATEGORIES';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';

interface ReorderCategoriesAction {
  type: typeof REORDERED_CATEGORIES,
  payload: ICategory[],
}

interface AddCategoriesAction {
  type: typeof ADD_CATEGORIES,
  payload: ICategory[],
}

export type categoryActions = ReorderCategoriesAction | AddCategoriesAction