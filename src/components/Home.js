import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';

import { fetchMoviesSearch } from '../modules/movies';

import Movie from './Movie';
import SearchBox from './SearchBox';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { location, fetchMoviesSearch } = this.props;
    console.log(this.props);

    let currentSearch = qs.parse(location.search)['s'];
    if (currentSearch && currentSearch.length > 3) {
      fetchMoviesSearch(currentSearch)
    }
  }

  handleSetActive(to) {
    console.log(to)
  }

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
            <div className="Movies">
              { items.map((item, index) => (
                <Movie key={`movie-parent-${item.Title}-${index}`} index={index} movie={item} />
              )) }
            </div>
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

const mapDispatchToProps = {
  fetchMoviesSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);