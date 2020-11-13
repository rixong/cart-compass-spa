export interface ICategory {
  categoryId: string;
  name: string;
  sortOrder: number;
}

export type CategoriesState = {
  categories: ICategory[];
}

export const REORDERED_CATEGORIES = 'REORDERED_CATEGORIES'

interface ReorderCategoariesAction {
  type: typeof REORDERED_CATEGORIES
}

export type categoryActions = ReorderCategoariesAction