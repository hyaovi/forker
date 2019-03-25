import axios from 'axios';
import searchApi from '../utils/searchApi';
import {
  SET_SEARCHED_ITEM,
  SET_FIRST_RESULTS,
  SET_RESULTS,
  SET_ERROR,
  SET_CURRENT_PAGE,
  SET_LOADING
} from './types';

export const fecthNewResults = (
  searchedItem,
  perPage,
  page = 1
) => dispatch => {
  const [username, repository] = searchedItem.split('/');
  dispatch(setLoading(true));
  dispatch(setError({}));
  axios
    .all([
      searchApi.get(`repos/${username}/${repository}`),
      axios.get(
        `repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
      )
    ])
    .then(
      axios.spread(function(reposInfos, reposForks) {
        dispatch(setFirstResults(reposInfos.data.forks_count, reposForks.data));
      })
    )
    .catch(error => {
      dispatch(setError(error.response.data));
      dispatch({
        type: SET_RESULTS,
        payload: null
      });
    });
  dispatch(setSearchedItem(searchedItem));
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
        `https://api.github.com/repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
      )
      .then(res => {
        dispatch(setResults(page, res.data));

        dispatch({ type: SET_CURRENT_PAGE, payload: page });
      })
      .catch(error => {
        dispatch(setError(error.response.data));
        dispatch(setLoading(false));
      });
  }
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
export const setError = error => {
  return { type: SET_ERROR, payload: error };
};
export const setResults = (page, results) => {
  return {
    type: SET_RESULTS,
    payload: {
      page: page,
      results: results
    }
  };
};
export const setFirstResults = (totalPages, results) => {
  return {
    type: SET_FIRST_RESULTS,
    payload: {
      results: { page: 1, results: results },
      totalPages: totalPages
    }
  };
};
