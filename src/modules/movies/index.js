import { createReducer } from '../../utils';
import { SETTING_BASE_API_URL, SETTING_BASE_API_KEY } from '../../constants/settings';

const MOVIES_SEARCH_LOADING = 'MOVIES_SEARCH_LOADING';
const MOVIES_SEARCH_SUCCESS = 'MOVIES_SEARCH_SUCCESS';
const MOVIES_SEARCH_FAIL = 'MOVIES_SEARCH_FAIL';
const MOVIES_SEARCH_CLEAR = 'MOVIES_SEARCH_CLEAR';

const initialState = {
  isLoading: false,
  items: [],
  currentSearch: '',
  error: null
};

export default createReducer(initialState, {
  [MOVIES_SEARCH_LOADING]: () => ({
    isLoading: true,
    error: null,
  }),
  [MOVIES_SEARCH_SUCCESS]: (state, { data: { items, currentSearch } }) => ({
    isLoading: false,
    error: null,
    items: items,
    currentSearch: currentSearch
  }),
  [MOVIES_SEARCH_FAIL]: (state, { error, currentSearch }) => ({
    isLoading: false,
    items: [],
    error: error,
    currentSearch: currentSearch
  }),
  [MOVIES_SEARCH_CLEAR]: () => ({
    items: []
  })
});

export function requestMoviesSearch() {
  return {
    type: MOVIES_SEARCH_LOADING,
  };
}

export function receiveMoviesSearch(items, currentSearch) {
  return {
    type: MOVIES_SEARCH_SUCCESS,
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
    type: MOVIES_SEARCH_FAIL,
    payload: { error, currentSearch },
  };
}

export function clearMoviesSearch() {
  return {
    type: MOVIES_SEARCH_CLEAR,
  }
}

export function fetchMoviesSearch(params) {
  return (dispatch) => {
    dispatch(requestMoviesSearch());
    dispatch(clearMoviesSearch());

    const querySelectMovies = `?apikey=${SETTING_BASE_API_KEY}&s=${params}&type=movie`;

    return fetch(`${SETTING_BASE_API_URL}/${querySelectMovies}`)
      .then(response => response.json())
      .then(data => {
        if (data.Error) {
          throw new Error(data.Error);
        }
        dispatch(receiveMoviesSearch(data.Search, params))
      })
      .catch(error => dispatch(failMoviesSearch(error, params)))
  };
}