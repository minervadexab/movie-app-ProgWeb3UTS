import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchMovies from '../TmdbApi';  // Ensure the fetchMovies function is correctly set up
import MovieItem from '../components/MovieItem';
import Navbar from '../components/Navbar';  // Import Navbar to use it

const Home = () => {
  const [movies, setMovies] = useState([]);  // Movies state to display
  const [page, setPage] = useState(1);  // Pagination for infinite scroll
  const [hasMore, setHasMore] = useState(true);  // Control infinite scroll
  const [query, setQuery] = useState('');  // Search query state

  // Fetch popular movies or search results based on query
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = query ? `search/movie?query=${query}&page=${page}` : `movie/popular?page=${page}`;
      try {
        const data = await fetchMovies(endpoint);  // Fetch data based on query or default
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        if (data.page >= data.total_pages) {
          setHasMore(false);  // Disable further fetching if no more pages
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [page, query]);  // Effect triggers on page or query change

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);  // Increase the page number to fetch more data
  };

  return (
    <div className="home">
      {/* <Navbar setQuery={setQuery} setMovies={setMovies} />  Pass setQuery and setMovies to Navbar */}
      <br />
      <h1 className="text-center text-5xl font-bold italic mb-9 mt-2 font-sans text-white shadow-gray-500/40">
        Welcome to MovieApp
      </h1>

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={<p className="text-center"><b>Yay! You have seen it all</b></p>}
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

export default Home;
