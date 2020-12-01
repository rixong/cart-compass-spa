import {
  CategoriesState,
  categoryActions,
  REORDERED_CATEGORIES,
  ADD_CATEGORIES,
  ADD_SORT_ORDER,
  CLEAR_SORT_ORDER
} from './types';

const initialState: CategoriesState = {
  categories: [],
  sortOrder: [],
}

export default function categoryReducer(
  state = initialState,
  action: categoryActions
): CategoriesState {
  switch (action.type) {
    case REORDERED_CATEGORIES:
      return { ...state, sortOrder: action.payload }
    case ADD_CATEGORIES:
      return { ...state, categories: action.payload }
    case ADD_SORT_ORDER:
      return { ...state, sortOrder: action.payload }
    case CLEAR_SORT_ORDER:
      return initialState;
    default:
      return state
  }
}
