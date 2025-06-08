import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const API_KEY = '2461f7'; // Replace this with your actual key

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movies">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
