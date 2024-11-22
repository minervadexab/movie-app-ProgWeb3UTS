import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../TmdbApi';
 // Ensure to import the correct function

const Navbar = ({ setQuery, setMovies }) => {
  const [query, setQueryLocal] = useState('');  // Local state for query input

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setQuery(query);  // Call setQuery passed from Home component
      const data = await searchMovies(query);  // Fetch movies based on query
      setMovies(data.results);  // Set the search results in the parent component's state
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <nav className="navbar bg-gray-900 p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-semibold text-white hover:text-gray-300 transition-all duration-300">
          MovieApp
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
            Home
          </Link>
          <Link to="/genre" className="text-white text-lg font-medium transition-colors duration-300 hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
            Genre
          </Link>
          <Link to="/favorites" className="text-white text-lg font-medium transition-colors duration-300 hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
            Favorites
          </Link>
          <Link to="/watchlist" className="text-white text-lg font-medium transition-colors duration-300 hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
            Watchlist
          </Link>
          <Link to="/rating" className="text-white text-lg font-medium transition-colors duration-300 hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
            Rating
          </Link>
        </div>
        {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex items-center mt-4">
          <div className="relative w-full">
            {/* Input Field */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQueryLocal(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full p-4 pr-16 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-4 focus:ring-blue-600 shadow-xl transition-all duration-300"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-6 py-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 shadow-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17l-4-4m0 0l4-4m-4 4h12"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;