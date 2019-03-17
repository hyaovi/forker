import axios from 'axios';
import {
  SET_SEARCHED_ITEM,
  SET_RESULTS,
  GET_ERROR,
  SET_PAGES,
  SET_PER_PAGE,
  SET_LOADING,
  SET_RESULTS_TOTAL_PAGES
} from './types';

export const fecthResults = (searchedItem, perPage, page) => dispatch => {
  setSearchedItem(searchedItem);
  console.log(searchedItem);
  const [username, repository] = searchedItem.split('/');
  dispatch({ type: SET_LOADING, payload: true });
  axios
    .get(
      `/repos/${username}/${repository}/forks?per_page=${perPage}&page=${page}`
    )
    .then(res => {
      dispatch({
        type: SET_RESULTS,
        payload: res.data
      });
      dispatch({ type: SET_PAGES });
    })
    .then(
      axios
        .get(`/repos/${username}/${repository}`)
        .then(res => {
          dispatch({
            type: SET_RESULTS_TOTAL_PAGES,
            payload: res.data.forks_count
          });
        })
        .catch(error => {
          dispatch({ type: SET_LOADING, payload: false });
          dispatch({ type: GET_ERROR, payload: error.response.data });
        })
    )
    .catch(error => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_RESULTS, payload: null });
    });
};

export const setPerPage = () => dispatch => {
  dispatch({ type: SET_PER_PAGE });
};
export const setLocal = results => {
  console.log(results);
  localStorage.setItem('results', JSON.stringify(results));
  console.log(JSON.parse(localStorage.getItem('results')));
};

export const getTotalForks = (axios, username, repository) => dispatch => {
  axios
    .get(`/repos/${username}/${repository}`)
    .then(
      res => console.log('NUMBERS!  ', res.data.forks_count)
      // return res.data.forks_count;
    )
    .catch(error => {
      console.log(error.response.data);
      //   // dispatch({ type: GET_ERROR, payload: error.response.data });
      //   // return null;
    });
};

export const setSearchedItem = searchedItem => dispatch =>
  dispatch({ type: SET_SEARCHED_ITEM, payload: searchedItem });
