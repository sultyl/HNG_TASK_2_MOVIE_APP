import React, { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import styled from 'styled-components';

const CardBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  @media screen and (max-width: 760px) {
    width: 300px;
    margin-left: 40px;
  }
`;

const Image = styled.img`
  width: 250px;
  height: 370px;
  @media screen and (max-width: 760px) {
    width: 300px;
    height: 400px;
  }
`;

const FavoriteIcon = styled(AiFillHeart)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #F3F4F680;
  border-radius: 50%;
  padding: 5px;
  font-size: 30px;
  color: ${(props) => (props.isFavorite ? 'red' : '#D1D5DB')};
  cursor: pointer;
  z-index: 2;
`;

const Prodc = styled.div`
  color: var(--gray-400, #9CA3AF);
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
`;

const CardTitle = styled.div`
  color: var(--gray-900, #111827);
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

const RatingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const RatingBox = styled.div`
  display: flex;
  gap: 10px;
  color: var(--gray-900, #111827);
  font-size: 12px;
  font-weight: 400;
  align-items: center;
  line-height: 12px; /* 100% */
`;

const Genre = styled.div`
  color: var(--gray-400, #9CA3AF);
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
`;

const MovieDetails = ({movie}) => {
  console.log(movie);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
    alert(message);
  };

  if (!movie || movie instanceof Promise) {
    return <div>Loading...</div>;
  }

  const productionCountries = movie.production_countries.map((country) => country.iso_3166_1).join(', ');

  // Parse the release date and extract the year
  const releaseDate = new Date(movie.release_date);
  const releaseYear = releaseDate.getFullYear();

  const imdbRating = movie.vote_average.toFixed(1);
  const rottenTomatoesRating = (movie.vote_average * 10).toFixed(0) + '%';

  return (
        <CardBox data-testid='movie-card'>
          <div>
            <Image
              data-testid='movie-poster' 
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt='image'
            />
            {isFavorite && (
              <FavoriteIcon
                isFavorite={isFavorite}
                onClick={handleFavoriteToggle}
                data-testid="favorite-icon"
              />
            )}
          </div>
          <Prodc data-testid='movie-release-date'>{productionCountries}, {releaseYear}</Prodc>
          <CardTitle data-testid='movie-title'>
            {movie.original_title}
          </CardTitle>
          <RatingDiv>
            <RatingBox>
              <img src="/imdb.png" alt="imdb"/>
              {imdbRating} / 10
            </RatingBox>
            <RatingBox>
              <img src="/rotten.png" alt="rotten"/>
              {rottenTomatoesRating}
            </RatingBox>
          </RatingDiv>
          <Genre>{movie.genres?.map((genre) => genre.name).join(', ')}</Genre>
        </CardBox>
  )
}

export default MovieDetails;
