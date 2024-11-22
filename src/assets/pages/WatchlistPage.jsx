import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = () => {
      const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      setWatchlist(storedWatchlist);
    };

    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="watchlist-page p-8 bg-gray-900 text-white min-h-screen">
        <br />
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        Your Watchlist
      </h1>
      <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {watchlist.length === 0 ? (
          <p className="text-center text-xl text-gray-400">Your watchlist is empty!</p>
        ) : (
          watchlist.map((movie) => (
            <div
              key={movie.id}
              className="movie-item relative p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-gray-500/40 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Link to={`/movie/${movie.id}`} className="block group">
                <div className="relative w-full h-72 rounded-3xl overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-3xl transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-40 rounded-3xl transition-opacity group-hover:opacity-20"></div>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-gray-100 text-center">{movie.title}</h2>
                  <p className="text-sm text-gray-200 text-center mt-2">{movie.release_date}</p>
                </div>
              </Link>
              <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent Link from triggering
                    handleRemoveFromWatchlist(movie);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;