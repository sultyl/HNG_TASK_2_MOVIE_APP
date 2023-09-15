const TMDB_API_KEY = 'cadd9abec953fb8c5988c2d8010e3894'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// export async function fetchTopRatedMovies() {
//     const response = await fetch(
//       `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`
//     );
//     const data = await response.json();
//     return data.results.map(async (movie) => {
//       const movieResponse = await fetch(
//         `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}`
//       );
//       const movieData = await movieResponse.json();
//       return movieData;
//     });
//   }
export async function fetchTopRatedMovies() {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the movie IDs from the results
    const movieIds = data.results.map((movie) => movie.id);

    // Fetch detailed movie information for all movie IDs concurrently
    const movieDataPromises = movieIds.map(async (id) => {
      const movieResponse = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
      );

      if (!movieResponse.ok) {
        throw new Error(`TMDB API Error: ${movieResponse.status}`);
      }

      return movieResponse.json();
    });

    // Wait for all movie data promises to resolve
    const movieData = await Promise.all(movieDataPromises);

    return movieData;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    throw error;
  }
}
