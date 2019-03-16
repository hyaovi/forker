import {
  SET_RESULTS,
  SET_SEARCHED_ITEM,
  SET_PAGES,
  SET_LOADING
} from '../actions/types';
const initialState = {
  searchedItem: '',
  perPage: 10,
  page: 0,
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
      return { ...state, loading: true };
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
    default:
      return { ...state };
  }
}
