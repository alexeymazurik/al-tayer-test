import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import debounce from 'lodash/debounce';
import { fetchMoviesSearch } from '../modules/movies';


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.applyResults = debounce(this.applyResults, 300);
  }

  handleChange(e) {
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
        <input
          type="text"
          className="form-control input-group-lg"
          defaultValue={this.props.initialSearch}
          placeholder="Search Movies..."
          onChange={this.handleChange}
        />
        { isMoviesSearching ? <div className="lds-dual-ring"></div> : '' }
      </form>
    );
  }
}

const mapStateToProps = ({ movies }) => ({
  isMoviesSearching: movies.isLoading,
  initialSearch: movies.currentSearch,
});

const mapDispatchToProps = {
  fetchMoviesSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
