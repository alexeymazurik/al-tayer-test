import React, { Component } from 'react';
import Movie from "../Movie/";

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

export default Movies;