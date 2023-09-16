import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineBars, AiOutlineDown } from 'react-icons/ai';
import { FiCalendar, FiCamera, FiHome, FiLogOut, FiTv } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import styled from 'styled-components';
import { fetchTopRatedMovies } from '@/lib/tmdb';
import { useRouter } from 'next/router';
import Logo from '@/components/Logo';

const Nav = styled.nav`
    width: 226px;
    height: 100vh;
    flex-shrink: 0;
    border-radius: 0px 45px 45px 0px;
    border: 1px solid rgba(0, 0, 0, 0.30);
    background: #FFF;
    padding: 52px 20px 69px 20px;
    position: fixed;
`;

const NavLink = styled.div`
    display: flex;
    flex-direction: column;
    gap: 47px;
    margin-top: 75px;
    padding-left: 20px;
`;

const Links = styled.a`
    display: flex;
    gap: 15px;
    align-items: center;
    text-decoration: none; /* Added to remove underline */
    color: inherit; /* Added to inherit text color */
    
    &:hover {
        color: #BE123C; /* Added to change color on hover */
    }
`;

const H1 = styled.h1`
    color: #666;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const ReferBox = styled.div`
    margin-right: 18px;
    border-radius: 20px;
    border: 1px solid rgba(190, 18, 60, 0.70);
    background: rgba(248, 231, 235, 0.40);
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    padding: 42px 17px 17px 17px;
`;

const Button = styled.button`
    border-radius: 30px;
    background: rgba(190, 18, 60, 0.20);
    color: #BE123C;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 17px;
`;

const TrailerContainer = styled.div`
  position: relative;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
  font-size: 36px;
  color: #fff;
  cursor: pointer;
  z-index: 1;
`;

const Box = styled.div`
    display: grid;
    grid-template-columns: 1.9fr 1fr;
    gap: 28px;
`;

const Title = styled.div`
    color: #404040;
    font-size: 23px;
    font-weight: 500;
`;

const Overview = styled.div`
    color: #333;
    font-size: 20px;
    font-weight: 400;
`;

const CrewBox = styled.div`
    color: #333;
    font-size: 20px;
    font-weight: 400;
`;

const Movie = () => {
    const API_KEY = 'cadd9abec953fb8c5988c2d8010e3894';
    const router = useRouter();
    const { id } = router.query;
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState('');
    const [posterUrl, setPosterUrl] = useState('');


    useEffect(() => {  
        if (id) {
            fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=${API_KEY}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`TMDB API Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const directors = data.credits.crew.filter(member => member.job === 'Director');
                const writers = data.credits.crew.filter(member => ['Writer', 'Screenplay', 'Story'].includes(member.job));
                const stars = data.credits.cast.slice(0, 3);
                const youtubeTrailer = data.videos && data.videos.results ? data.videos.results.find(video => video.site === 'YouTube') : null;
                const posterPath = data.poster_path;
                if (posterPath) {
                const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                // Set the poster URL in your component state
                setPosterUrl(posterUrl);
                }

                setMovieDetails({...data, 
                    director: directors.map(director => director.name).join(', '),
                    writers: writers.map(writer => writer.name).join(', '),
                    stars: stars.map(star => star.name).join(', '),
                    youtubeTrailerKey: youtubeTrailer ? youtubeTrailer.key : null
            });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            });

            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                // Find the trailer with type "Trailer"
                const trailer = data.results.find((video) => video.type === 'Trailer');
                if (trailer) {
                // Set the trailer key in your component state
                setTrailerKey(trailer.key);
                }
            })
            .catch((error) => {
                console.error('Error fetching movie videos:', error);
            });
        }
    }, [id]);

    if (!id) {
        return <div>Movie ID not found.</div>;
    }
    const rating = movieDetails?.vote_average.toFixed(1);


    return (
        <div className=''>
            <Nav>
                <Logo />
                <NavLink>
                    <Links href="/">
                        <FiHome />
                        <H1>Home</H1>
                    </Links>
                    <Links href="/" className=''>
                        <FiCamera />
                        <H1>Movies</H1>
                    </Links>
                    <Links href="/">
                        <FiTv />
                        <H1>Tv Series</H1>
                    </Links>
                    <Links href="/">
                        <FiCalendar/>
                        <H1>Upcoming</H1>
                    </Links>
                    <ReferBox>
                        <h2 className='text-[13px] font-semibold text-[#5A5A5A]'>Play movie quizzes and earn free tickets</h2>
                        <p className='text-[#666] font-medium text-[10px]'>50k people are playing now</p>
                        <Button>Start Playing</Button>
                    </ReferBox>
                    <Links href="/">
                        <FiLogOut />
                        <H1>Logout</H1>
                    </Links>
                </NavLink>
            </Nav>

            <div className='p-[40px] lg:ml-56'>
                <div className='mb-[31px] lg:border rounded-xl'>
                <TrailerContainer>
                    <iframe
                        className='w-full rounded-xl'
                        height="400"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                </TrailerContainer>
                </div>
                <Box>
                    <div className='flex flex-col gap-9'>
                        <div className='flex flex-col gap-[27px]'>
                            <div className='flex gap-4 items-center'>
                                <Title><span data-testid='movie-title'>{movieDetails?.title}</span> • <span data-testid='movie-release-date'>{movieDetails?.release_date?.substring(0, 4)}</span> • PG-{movieDetails?.adult} • <span data-testid='movie-runtime'>{movieDetails?.runtime} minutes</span></Title>
                                <span>
                                    <div className='flex gap-3'>
                                        {movieDetails?.genres.map((genre, index) => (
                                            <span
                                              key={index}
                                              className='border px-5 py-1 border-[#f6c5ed] rounded-2xl'>
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </span>
                            </div>
                            <Overview data-testid='movie-overview'>
                                {movieDetails?.overview}
                            </Overview>
                        </div>

                        <CrewBox>
                            <h2>Director : <span className='text-[#BE123C]'>{movieDetails?.director}</span></h2>
                            <h2>Writers : <span className='text-[#BE123C]'>{movieDetails?.writers}</span></h2>
                            <h2>Stars : <span className='text-[#BE123C]'>{movieDetails?.stars}</span></h2>
                        </CrewBox>

                        <div className='border border[#C7C7C7] rounded-xl flex justify-between items-center text-[20px] pr-6'> 
                            <div className='flex gap-6'>
                                <h2 className='bg-[#BE123C] text-white rounded-xl p-3'>Top rated movie #65</h2>
                                <h2 className='p-3'>Award 9 nominations</h2>
                            </div>
                            <AiOutlineDown />
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-3 text-xl'>
                            <div className='flex justify-between mb-3'>
                                <div></div>
                                <div className='flex items-center gap-3'>
                                    <BsBookmark />
                                    <AiFillStar className='text-yellow-500' />
                                    <span className='text-[#666] font-medium'>{rating} | {movieDetails?.vote_count}k</span>
                                </div>
                            </div>
                            <div className='flex items-center rounded-md py-2 gap-2 text-white bg-[#BE123C] justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                </svg>
                                <h2>See Showtimes</h2>
                            </div>
                            <div className='flex items-center rounded-md py-2 gap-2 text-black bg-[#DBCCCF] border border-[#BE123C] justify-center'>
                                <AiOutlineBars />
                                <h2>More watch options</h2>
                            </div>
                        </div>
                        <div>
                            <img src="/next_trending.png" alt=""/>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default Movie;
