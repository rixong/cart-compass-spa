import { 
  CategoriesState,
  categoryActions, 
  REORDERED_CATEGORIES,
  ADD_CATEGORIES
} from './types';

const initialState: CategoriesState = {
  categories: []
}

export default function categoryReducer(
  state = initialState, 
  action: categoryActions
  ) {
  switch (action.type) {
    case REORDERED_CATEGORIES:
      // let reorder = action.payload.map((ele, idx) => {
      //   let temp = [...state.categories].find(cat => cat._id === ele)
      //   // temp.sort_order = idx;
      //   return temp;
      // })
      // return { ...state, categories: reorder }
      return state;
      case ADD_CATEGORIES:        
        return {...state, categories: action.payload}
    default:
      return state
  }
}
