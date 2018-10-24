import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as Types from '../constants/action-types';
import * as MovieActions from './movies';

import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates correct actions when fetching movies has been done', () => {
    const searchString = 'Skyfall';
    const mockedResponse = {
      Search: [
        { Title: 'Skyfall', Poster: 'http://example.com/Skyfall' },
      ],
    };

    fetch.mockResponse(
      JSON.stringify(mockedResponse),
      { status: 200 }
    );

    const expectedActions = [
      { type: Types.MOVIES_SEARCH_LOADING },
      { type: Types.MOVIES_SEARCH_CLEAR },
      { type: Types.MOVIES_SEARCH_SUCCESS,
        payload: { data: { currentSearch: searchString, items: mockedResponse.Search } },
      },
    ];

    const store = mockStore({ items: [] });

    return store.dispatch(MovieActions.fetchMoviesSearch(searchString))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});