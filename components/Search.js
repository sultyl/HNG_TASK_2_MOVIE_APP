import React, { useState } from 'react'
import { styled } from "styled-components"
import { FiSearch } from "react-icons/fi";
import ReactModal from 'react-modal';

const SearchDiv = styled.div`
    display: flex;
    width: 50%;
    padding: 6px 10px;
    justify-content: space-between; 
    align-items: center;
    border-radius: 6px;
    border: 2px solid var(--gray-300, #D1D5DB);
    @media screen and (max-width: 760px) {
        width: 100%;
        padding: 3px 5px;
    }
`;
const TextArea = styled.textarea`
    margin: 10px;
    border: none;
    overflow-x: hidden;
    resize: none;
    word-wrap: break-word;
    outline: none;
    background-color: transparent;
    color: white;

    &::placeholder {
        color: var(--white, #FFF);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
    }

    @media screen and (max-width: 760px) {
        width: 100%; 
        &::placeholder {
        font-size: 9px;
    }   
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

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const TMDB_API_KEY = 'cadd9abec953fb8c5988c2d8010e3894';

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
        setIsModalOpen(true);
    };

    return (
        <form onSubmit={handleSearch}>
            <SearchDiv>
                <TextArea
                    name='search'
                    id='search'
                    rows='1'
                    cols="60"
                    placeholder="What do you want to watch?"
                    title="Search"
                    aria-label="Search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit">
                    {loading ? 'Loading...' : <FiSearch className='text-white sm:text-2xl'/>}
                </button>
            </SearchDiv>
            <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <GridBox>
                {movies.map(movie => (
                    <Link href={`/movies/${movie.id}`} key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                    </Link>
                    
                ))}
                </GridBox>
            </ReactModal>
        </form>
    );
}
