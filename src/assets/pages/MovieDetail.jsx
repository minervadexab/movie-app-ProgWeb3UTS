import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchMovies from '../TmdbApi';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false); // New state for Watchlist

  // Mengambil daftar favorit dari localStorage
  const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
  };

  // Mengambil daftar watchlist dari localStorage
  const getWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist;
  };

  // Menambahkan atau menghapus dari favorit
  const toggleFavorite = () => {
    const favorites = getFavorites();
    if (isFavorite) {
      // Hapus dari favorit
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Tambahkan ke favorit
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // Menambahkan atau menghapus dari watchlist
  const toggleWatchlist = () => {
    const watchlist = getWatchlist();
    if (isInWatchlist) {
      // Hapus dari watchlist
      const newWatchlist = watchlist.filter(item => item.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      setIsInWatchlist(false);
    } else {
      // Tambahkan ke watchlist
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await fetchMovies(`movie/${id}`);
        setMovie(data);

        // Mengecek apakah film ini ada di favorit atau watchlist
        const favorites = getFavorites();
        if (favorites.some(fav => fav.id === data.id)) {
          setIsFavorite(true);
        }

        const watchlist = getWatchlist();
        if (watchlist.some(item => item.id === data.id)) {
          setIsInWatchlist(true);
        }

      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail p-6 bg-gray-900 text-white rounded-xl shadow-2xl max-w-4xl mx-auto mt-10">
      <br />
      <div className="flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-2">{movie.release_date}</p>
          <p className="text-lg text-gray-300 mb-6">{movie.overview}</p>
          <p className="text-lg font-semibold">Genres:</p>
          <ul className="text-gray-400">
            {movie.genres.map((genre) => (
              <li key={genre.id} className="text-sm">{genre.name}</li>
            ))}
          </ul>

          <div className="flex mt-4">
            <button
              onClick={toggleFavorite}
              className={`mr-4 px-6 py-2 rounded-full text-lg ${isFavorite ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500 transition`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <button
              onClick={toggleWatchlist}
              className={`px-6 py-2 rounded-full text-lg ${isInWatchlist ? 'bg-yellow-600' : 'bg-gray-700'} hover:bg-yellow-500 transition`}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;