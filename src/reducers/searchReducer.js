import {
  SET_RESULTS,
  SET_SEARCHED_ITEM,
  SET_PAGES,
  SET_LOADING,
  SET_RESULTS_TOTAL_PAGES,
  RESET_RESULTS
} from "../actions/types";
const initialState = {
  searchedItem: "",
  perPage: 30,
  page: 1,
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
    case SET_PAGES:
      return {
        ...state,
        page: state.page + 1
      };
    case SET_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.payload],
        loading: false
      };
    case SET_RESULTS_TOTAL_PAGES:
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
