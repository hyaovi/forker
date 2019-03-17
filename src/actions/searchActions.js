import axios from "axios";
import {
  SET_SEARCHED_ITEM,
  SET_RESULTS,
  GET_ERROR,
  SET_PAGES,
  SET_PER_PAGE,
  SET_LOADING,
  SET_RESULTS_TOTAL_PAGES,
  RESET_ERROR,
  RESET_RESULTS
} from "./types";

export const resetResults = () => dispatch => {
  dispatch({ type: RESET_RESULTS });
};
export const fecthResults = (searchedItem, perPage, page) => dispatch => {
  //set search item
  dispatch({ type: SET_SEARCHED_ITEM, payload: searchedItem });
  //parse searching item
  const [username, repository] = searchedItem.split("/");
  //set loading compponent
  dispatch({ type: SET_LOADING, payload: true });
  // reset error
  dispatch({ type: RESET_ERROR });
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
  localStorage.setItem("results", JSON.stringify(results));
  console.log(JSON.parse(localStorage.getItem("results")));
};

export const setSearchedItem = searchedItem => dispatch => {
  return dispatch({ type: SET_SEARCHED_ITEM, payload: searchedItem });
};
