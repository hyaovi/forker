import axios from 'axios';
import {
  SET_SEARCHED_ITEM,
  SET_RESULTS,
  GET_ERROR,
  SET_PAGES,
  SET_PER_PAGE,
  SET_LOADING
} from './types';

export const fecthResults = (
  searchItem,
  perPage,
  page,
  history
) => dispatch => {
  dispatch({ type: SET_SEARCHED_ITEM, payload: searchItem });
  const [username, repository] = searchItem.split('/');
  dispatch({ type: SET_LOADING, payload: true });
  axios
    .get(
      `api/repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_RESULTS,
        payload: res.data
      });
      dispatch({ type: SET_PAGES });
    })
    .catch(error => {
      console.log(error.response);
      dispatch({ type: GET_ERROR, payload: error.response.data });
    });
};
export const setPerPage = () => dispatch => {
  dispatch({ type: SET_PER_PAGE });
};
