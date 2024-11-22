import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page p-8 bg-gray-1500 text-white min-h-screen">
        <br />
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        Your Favorite
      </h1>
      <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-xl">No favorites added yet!</p>
        ) : (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="movie-item group relative p-4 from-gray-800 via-gray-700 to-gray-600  shadow-gray-500/40 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto mb-4 rounded-xl shadow-md group-hover:opacity-80 transition-opacity duration-300"
                />
                <h2 className="text-xl font-semibold text-center group-hover:text-red-500 transition-colors duration-300">{movie.title}</h2>
              </Link>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-full shadow-md transform hover:scale-110 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent Link from triggering
                    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    const newFavorites = favorites.filter((fav) => fav.id !== movie.id);
                    localStorage.setItem('favorites', JSON.stringify(newFavorites));
                    setFavorites(newFavorites);
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

export default FavoritesPage;
