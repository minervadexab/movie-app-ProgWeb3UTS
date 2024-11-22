import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchMovies, { fetchGenres } from '../TmdbApi';
import MovieItem from '../components/MovieItem';

const GenreFilter = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreData = await fetchGenres();
        console.log('Fetched Genres:', genreData.genres);
        setGenres(genreData.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const fetchMoviesByGenre = async () => {
        try {
          const data = await fetchMovies(`discover/movie?with_genres=${selectedGenre}&page=${page}`);
          console.log('Fetched Movies:', data.results);
          setMovies((prevMovies) => ({
            ...prevMovies,
            [selectedGenre]: [...(prevMovies[selectedGenre] || []), ...data.results],
          }));
          if (data.page >= data.total_pages) {
            setHasMore(false);
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMoviesByGenre();
    }
  }, [selectedGenre, page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
    setHasMore(true);
    setMovies({});
  };

  return (
    <div className="genre-filter container mx-auto">
      <br />
      <h1 className="text-center text-4xl font-bold italic mb-9 mt-2 font-sans text-white shadow-gray-500/40">Popular Movies by Genre</h1>
      <div className="genres flex flex-wrap justify-center mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            className={`btn btn-outline m-2 ${selectedGenre === genre.id ? 'btn-active' : ''}`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {selectedGenre && (
        <InfiniteScroll
          dataLength={(movies[selectedGenre] || []).length}
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
            {(movies[selectedGenre] || []).map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default GenreFilter;