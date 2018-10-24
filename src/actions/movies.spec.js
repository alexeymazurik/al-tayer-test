import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../constants/action-types';
import * as actions from './movies';

import expect from 'expect' // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('does something', () => {
    const param = 'Skyfall';
    const mockedResponse = {
      Search: [
        { Title: 'Skyfall', Poster: 'http://example.com/Skyfall' }
      ]
    };


    fetch.mockResponse(
      JSON.stringify(mockedResponse),
      { status: 200 }
    );

    const expectedActions = [
      { type: types.MOVIES_SEARCH_LOADING },
      { type: types.MOVIES_SEARCH_CLEAR },
      { type: types.MOVIES_SEARCH_SUCCESS,
        payload: { data: { currentSearch: param, items: mockedResponse.Search } }
      }
    ];

    const store = mockStore({ items: [] });

    return store.dispatch(actions.fetchMoviesSearch(param))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});