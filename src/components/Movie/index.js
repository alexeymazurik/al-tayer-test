import React, { Component } from 'react';
import PropTypes from 'prop-types'
import OnVisible from 'react-on-visible';

import { DefaultPlaceholder } from '../../constants/settings';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.updateVisible = this.updateVisible.bind(this);
  }

  getMoviePoster(posterUrl) {
    return posterUrl !== 'N/A'
      ? posterUrl
      : DefaultPlaceholder;
  }

  updateVisible() {
    console.log(`Movie view(#${this.props.index}): ${this.props.movie.Title}`); // eslint-disable-line no-console
  }

  render() {
    let { movie, index } = this.props;

    return (
      <div className="Movie">
        <OnVisible key={`movie-${movie.Title}-${index}`} onChange={this.updateVisible}>
          <div className="card">
            <img className="card-img-top" src={this.getMoviePoster(movie.Poster)} alt={movie.Title} />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
            </div>
          </div>
        </OnVisible>
      </div>
    );
  }
}

Movie.propTypes = {
  index: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
};

export default Movie;