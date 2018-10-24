import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import debounce from 'lodash/debounce';

import { clearMoviesSearch, fetchMoviesSearch } from '../../actions/movies';

import Loading from '../Loading/';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.applyResults = debounce(this.applyResults, 300);
  }

  handleChange(e) {
    if (e.target.value.length === 0) {
      this.props.clearMoviesSearch();
      return;
    }

    let trimmedStringValue = e.target.value.trim();
    this.setState({searchString: trimmedStringValue});

    if (trimmedStringValue.length > 2) {
      this.applyResults();
    }
  }

  applyResults() {
    let { searchString } = this.state;
    this.props.fetchMoviesSearch(searchString);
    this.props.history.push('/search?' + qs.stringify({s: searchString}));
  }

  render() {
    let { isMoviesSearching } = this.props;

    return (
      <form className="form-inline SearchBox" onSubmit={e => e.preventDefault()}>
        <FontAwesomeIcon className="SearchBox__icon" icon="search" />
        <input
          type="text"
          className="form-control input-group-lg SearchBox__input"
          defaultValue={this.props.initialSearch}
          placeholder="Search Movies..."
          onChange={this.handleChange}
        />
        { isMoviesSearching ? <Loading /> : '' }
      </form>
    );
  }
}

const mapStateToProps = ({ movies }) => ({
  isMoviesSearching: movies.isLoading,
  initialSearch: movies.currentSearch,
});

const mapDispatchToProps = {
  clearMoviesSearch,
  fetchMoviesSearch,
};

SearchBox.propTypes = {
  initialSearch: PropTypes.string.isRequired,
  fetchMoviesSearch: PropTypes.func.isRequired,
  clearMoviesSearch: PropTypes.func.isRequired,
  isMoviesSearching: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
