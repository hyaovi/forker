import {
  SET_RESULTS,
  SET_SEARCHED_ITEM,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SET_TOTAL_PAGES,
  RESET_RESULTS,
  SET_FIRST_RESULTS
} from '../actions/types';
const initialState = {
  searchedItem: '',
  perPage: 20,
  currentPage: 1,
  totalPages: null,
  results: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCHED_ITEM:
      return {
        ...state,
        searchedItem: action.payload
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_FIRST_RESULTS:
      return { ...state, results: [action.payload] };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_RESULTS:
      return {
        ...state,
        results: [...state.results, action.payload],
        loading: false
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: Math.round(action.payload / state.perPage)
      };
    case RESET_RESULTS:
      return {
        ...state,
        results: []
      };
    default:
      return state;
  }
}
