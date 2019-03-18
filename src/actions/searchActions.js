import axios from 'axios';
import {
  SET_SEARCHED_ITEM,
  SET_FIRST_RESULTS,
  SET_RESULTS,
  SET_ERROR,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SET_TOTAL_PAGES,
  RESET_ERROR,
  RESET_RESULTS
} from './types';

export const fecthNewResults = (
  searchedItem,
  perPage,
  page = 1
) => dispatch => {
  const [username, repository] = searchedItem.split('/');
  dispatch(setLoading(true));
  dispatch(resetError());
  axios
    .all([
      axios.get(`https://api.github.com/repos/${username}/${repository}`),
      axios.get(
        `repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
      )
    ])
    .then(
      axios.spread(function(reposInfos, reposForks) {
        dispatch(setTotalPages(reposInfos.data.forks_count));
        dispatch({
          type: SET_FIRST_RESULTS,
          payload: {
            page: 1,
            results: reposForks.data
          }
        });
        dispatch(setLoading(false));
      })
    )
    .catch(error => {
      dispatch(getError(error.response.data));
      dispatch(setLoading(false));
    });
  dispatch(setSearchedItem(searchedItem));
};

export const resetResults = () => dispatch => {
  dispatch({ type: RESET_RESULTS });
};

export const setLocal = results => {
  console.log(results);
  localStorage.setItem('results', JSON.stringify(results));
  console.log(JSON.parse(localStorage.getItem('results')));
};

export const setSearchedItem = searchedItem => {
  return { type: SET_SEARCHED_ITEM, payload: searchedItem };
};
export const setCurrentPage = page => dispatch => {
  dispatch({ type: SET_CURRENT_PAGE, payload: page });
};

export const setLoading = loading => {
  return { type: SET_LOADING, payload: loading };
};
export const setTotalPages = totalForks => {
  return { type: SET_TOTAL_PAGES, payload: totalForks };
};
export const getError = error => {
  return { type: SET_ERROR, payload: error };
};

export const resetError = () => {
  return { type: RESET_ERROR };
};

export const fecthResults = (
  searchedItem,
  perPage,
  totalPages,
  page
) => dispatch => {
  const [username, repository] = searchedItem.split('/');
  if (page <= totalPages) {
    dispatch(setLoading(true));
    axios
      .get(
        `repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
      )
      .then(res => {
        dispatch({
          type: SET_RESULTS,
          payload: {
            page: page,
            results: res.data
          }
        });
        dispatch(setLoading(false));
        dispatch({ type: SET_CURRENT_PAGE, payload: page });
      })
      .catch(error => {
        dispatch(getError(error.response.data));
        dispatch(setLoading(false));
      });
  }
};
