import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Center from './Center';
import MovieDetails from './MovieDetails';
import { fetchTopRatedMovies } from '@/lib/tmdb';

const Tilte = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
  margin-left: 20px;
  @media screen and (max-width: 760px) {
    }
`;

const H1 = styled.h1`
  color: #000;
  font-size: 36px;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: 760px) {
      font-size: 24px;    
    }
`;

const BoxLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--rose-700, #BE123C);
  font-size: 18px;
  font-weight: 400;
  @media screen and (max-width: 760px) {
      /* display: none; */
    }
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 2fr;
  gap: 60px;
  @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 80px;
    }
`;


const MovieCard = () => {

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top-rated movies when the component mounts
    fetchTopRatedMovies()
    .then((data) => {
      // Filter to get only the top 10 rated movies
      const top10RatedMovies = data.slice(0, 10);
      setTopRatedMovies(top10RatedMovies);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching top-rated movies:', error);
      setLoading(false);
    });
}, []);

  return (
    <div className='mt-[70px]' data-testid='movie-card'>
      <>
        <Tilte>
          <H1>Top Rated Movies</H1>
          <BoxLink href='/'>
            See more
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
            <path d="M7.5 4.66668L13.3333 10.5L7.5 16.3333" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BoxLink>
        </Tilte>
        <Center>
        <GridBox>
          {loading ? (
            <div>Loading...</div>
          ) : (
            topRatedMovies.map((movieData) => (
              <Link href={`/movies/${movieData.id}`} key={movieData.id}>  
                <MovieDetails 
                  key={movieData.id} 
                  movie={movieData} 
                />
              </Link>
            ))
          )}
        </GridBox>
        </Center>
      </>
    </div>
  )
}

export default MovieCard;