import Logo from '@/components/Logo';
import Link from 'next/link';
import React from 'react'
import { AiFillStar, AiOutlineBars, AiOutlineDown } from 'react-icons/ai';
import { FiCalendar, FiCamera, FiHome, FiLogOut, FiTv } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import styled from 'styled-components';

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

const Links = styled(Link)`
    display: flex;
    gap: 15px;
    align-items: center;
    
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


const MovieDetailPage = ({ movieId }) => {

    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const releaseDate = new Date(movieId.release_date);
    const releaseYear = releaseDate.getFullYear();
    const API = 'cadd9abec953fb8c5988c2d8010e3894';
    
    useEffect(() => {
        // Fetch movie details from TMDb API
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`)
        .then((response) => response.json())
        .then((data) => {
            setMovieDetails(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching movie details:', error);
            setLoading(false);
        });
    }, [movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movieDetails) {
        return <div>Movie not found</div>;
    }

  return (
    <div className=''>
        <Nav>
            <Logo />
            <NavLink>
                <Links href="/">
                    <FiHome />
                    <H1>Home</H1>
                </Links>
                <Links href="/">
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
                    <h2 className='text-[13px] font-semibold text-[#5A5A5A]'>Play movie quizes and earn free tickets</h2>
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
            <div className='mb-[31px]'>
                <img src="/maverick.png" alt=""/>
            </div>
            <Box>
                <div className='flex flex-col gap-9'>
                    <div className='flex flex-col gap-[27px]'>
                        <div className='flex gap-4 items-center'>
                            <Title>{movieId.title} • {releaseYear} • PG-13 • {movieId.runtime}</Title>
                            <span>
                                <div className='flex gap-3'>
                                    <span className='border px-5 py-1 border-[#f6c5ed] rounded-2xl'>Action</span>
                                    <span className='border px-5 py-1 border-[#f6c5ed] rounded-2xl'>Drama</span>
                                </div>
                            </span>
                        </div>
                        <Overview>
                            {movieId.overview}
                        </Overview>
                    </div>

                    <CrewBox>
                        <h2>Director : <span className='text-[#BE123C]'>Joseph Kosinski</span></h2>
                        <h2>Writers : <span className='text-[#BE123C]'>Jim Cash, Jack Epps Jr, Peter Craig</span></h2>
                        <h2>Stars : <span className='text-[#BE123C]'>Tom Cruise, Jennifer Connelly, Miles Teller</span></h2>
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
                                <span className='text-[#666] font-medium'>8.5 | 350k</span>
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
  )
}

export default MovieDetailPage;