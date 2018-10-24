import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movies from './Movies/';
import SearchBox from './SearchBox/';

class Search extends Component {
  render() {
    let { items, isSearching, history } = this.props;

    return (
      <div className="container">
        <SearchBox history={history} />
        {
          items.length === 0
          ? (
            <p className="Movies__NoResults">
              { isSearching ? 'Loading...' : 'No results found. Try to search for something else...' }
            </p>
          )
          : (
            <Movies movies={items} />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => {
  return {
    items: movies.items,
    isSearching: movies.isLoading,
    error: movies.error,
  };
};

export default connect(
  mapStateToProps
)(Search);