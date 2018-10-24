import { createReducer } from '../utils';
import * as MovieTypes from '../constants/action-types';

const initialState = {
  isLoading: false,
  items: [],
  currentSearch: '',
  error: null,
};

export default createReducer(initialState, {
  [MovieTypes.MOVIES_SEARCH_LOADING]: () => ({
    isLoading: true,
    error: null,
  }),
  [MovieTypes.MOVIES_SEARCH_SUCCESS]: (state, { data: { items, currentSearch } }) => ({
    isLoading: false,
    error: null,
    items: items,
    currentSearch: currentSearch
  }),
  [MovieTypes.MOVIES_SEARCH_FAIL]: (state, { error, currentSearch }) => ({
    isLoading: false,
    items: [],
    error: error,
    currentSearch: currentSearch
  }),
  [MovieTypes.MOVIES_SEARCH_CLEAR]: () => ({
    items: []
  })
});