import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-item p-4 bg-gray-800 text-white shadow-gray-500/40 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xs mx-auto">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-400 mb-2">{movie.release_date}</p>
        <p className="text-sm text-gray-300 mb-2">
          {movie.overview.length > 150 ? `${movie.overview.slice(0, 150)}...` : movie.overview}
        </p>
        <p className="text-sm text-yellow-300">Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieItem;
