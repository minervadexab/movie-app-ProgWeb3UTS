const apiKey = '1350af539262490dc7343bbd89a58f3d';
const readAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzUwYWY1MzkyNjI0OTBkYzczNDNiYmQ4OWE1OGYzZCIsIm5iZiI6MTczMTYzOTg0OC4wMzIwODA0LCJzdWIiOiI2NzM1NzZkMTZiZDQ4ODliZmJjNzZlMDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1TFaGHdb0P9n_bzhv3vX7tAVVlBVEvjTP2cS2sK32jU';

async function fetchMovies(endpoint) {
  const url = `https://api.themoviedb.org/3/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${readAccessToken}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to load movies');
  }
}

export async function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${readAccessToken}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to load genres');
  }
}

export async function searchMovies(query) {
  const url = `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${readAccessToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to search movies');
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error; // Rethrow the error so it can be handled in the component
  }
}

export default fetchMovies;