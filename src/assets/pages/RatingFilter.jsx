import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchMovies from '../TmdbApi';
import MovieItem from '../components/MovieItem';

const RatingFilter = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const [applyFilter, setApplyFilter] = useState(false);

  useEffect(() => {
    const fetchMoviesByRating = async () => {
      try {
        // Validasi nilai minRating dan maxRating
        if (minRating < 0 || minRating > 10 || maxRating < 0 || maxRating > 10 || minRating > maxRating) {
          console.error('Invalid rating range');
          return;
        }

        const data = await fetchMovies(`discover/movie?sort_by=vote_average.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&page=${page}`);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        if (data.page >= data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching movies by rating:', error);
      }
    };

    if (applyFilter) {
      fetchMoviesByRating();
    }
  }, [page, applyFilter, minRating, maxRating]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleApplyFilter = () => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setApplyFilter(true);
  };

  return (
    <div className="rating-filter">
      <br />
      <h1 className="text-center text-5xl font-bold italic mb-9 mt-2 font-sans text-white shadow-gray-500/40">Movies by Rating</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <label>
          Min Rating:
          <input
            type="number"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            min="0"
            max="10"
            className="ml-2 p-1 rounded"
          />
        </label>
        <label>
          Max Rating:
          <input
            type="number"
            value={maxRating}
            onChange={(e) => setMaxRating(Number(e.target.value))}
            min="0"
            max="10"
            className="ml-2 p-1 rounded"
          />
        </label>
        <button
          onClick={handleApplyFilter}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Apply Filter
        </button>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={
          <p className="text-center">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RatingFilter;
