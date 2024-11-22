import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './assets/components/ErrorBoundary';

// Lazily load pages and components
const Navbar = lazy(() => import('./assets/components/Navbar'));
const Home = lazy(() => import('./assets/pages/Home'));
const GenreFilter = lazy(() => import('./assets/pages/GenreFilter'));
const MovieDetail = lazy(() => import('./assets/pages/MovieDetail'));
const FavoritesPage = lazy(() => import('./assets/pages/FavoritePage'));
const WatchlistPage = lazy(() => import('./assets/pages/WatchlistPage'));
const RatingFilter = lazy(() => import('./assets/pages/RatingFilter')); // Tambahkan ini
const Search = lazy(() => import('./assets/pages/Search'));

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genre" element={<GenreFilter />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/rating" element={<RatingFilter />} /> {/* Tambahkan ini */}
              <Route path="/search" element={Search} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;