/* export default function categoryReducer(state, action) {
    case 'REORDERED_CATEGORIES':
  let reorder = action.payload.map((ele, idx) => {
    let temp = [...state.categories].find(cat => cat.id === ele)
    temp.sort_order = idx;
    return temp;
  })
  return { ...state, categories: reorder }
      default:
  return state
} */