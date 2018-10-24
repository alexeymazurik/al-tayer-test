import { SETTING_BASE_API_URL, SETTING_BASE_API_KEY } from '../constants/settings';
import fetch from 'node-fetch';
import * as MovieTypes from '../constants/action-types';

export function requestMoviesSearch() {
  return {
    type: MovieTypes.MOVIES_SEARCH_LOADING,
  };
}

export function receiveMoviesSearch(items, currentSearch) {
  return {
    type: MovieTypes.MOVIES_SEARCH_SUCCESS,
    payload: {
      data: {
        items,
        currentSearch,
      },
    },
  };
}

export function failMoviesSearch(error, currentSearch) {
  return {
    type: MovieTypes.MOVIES_SEARCH_FAIL,
    payload: { error, currentSearch },
  };
}

export function clearMoviesSearch() {
  return {
    type: MovieTypes.MOVIES_SEARCH_CLEAR,
  }
}

export function fetchMoviesSearch(params) {
  return (dispatch) => {
    dispatch(requestMoviesSearch());
    dispatch(clearMoviesSearch());

    const querySelectMovies = `?apikey=${SETTING_BASE_API_KEY}&s=${params}&type=movie`;

    return fetch(`${SETTING_BASE_API_URL}/${querySelectMovies}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.Error) {
          throw new Error(data.Error);
        }
        dispatch(receiveMoviesSearch(data.Search, params))
      })
      .catch(error => dispatch(failMoviesSearch(error, params)))
  };
}