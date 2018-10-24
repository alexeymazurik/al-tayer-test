import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie/';

class Movies extends Component {
  render() {
    return (
      <div className="Movies">
        { this.props.movies.map((item, index) => (
          <Movie key={`movie-parent-${item.Title}-${index}`} index={index} movie={item} />
        )) }
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default Movies;