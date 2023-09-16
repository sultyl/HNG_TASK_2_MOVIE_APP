import React from 'react'
import styled from 'styled-components'
import Center from './Center';
import Logo from './Logo';
import Search from './Search';
import BarsIcon from './Bars';

const StyledDiv = styled.div`
  background-color: rgb(0, 0, 0, 0.5);
  padding: 16px;
  height: 600px;
`;

const DescBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 93px;
  width: 404px;
`;

const DescTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  line-height: 56px; /* 116.667% */
`;
const RatingDiv = styled.div`
  display: flex;
  gap: 34px;
`;
const RatingBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px; /* 100% */
`;
const DescParagraph = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;
const Button = styled.button`
  display: flex;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: var(--rose-700, #BE123C);
`;
const ButtonText = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  text-transform: uppercase;
`;

const ButtonDiv = styled.div`
  @media screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

export default function HeroBanner() {
  return (
      <div className='w-[500px] lg:w-full h-[600px] bg-[url(../assets/john_wick.png)] bg-cover boverg-no-repeat text-white'>
        <StyledDiv>
          <Center>
            <div className='flex justify-between'>
              <Logo />
              <Search />
              <ButtonDiv className='flex items-center gap-4'>
                <button>Sign in</button>
                <BarsIcon /> 
              </ButtonDiv>  
            </div>
            <DescBox>
              <DescTitle>
                John Wick 3 : Parabellum
              </DescTitle>
              <RatingDiv>
                <RatingBox>
                  <img src="/imdb.png" alt="imdb"/>
                  86.0 / 100
                </RatingBox>
                <RatingBox>
                  <img src="/rotten.png" alt="rotten"/>
                  97%
                </RatingBox>
              </RatingDiv>
              <div className='w-[302px]'>
              <DescParagraph>
                John Wick is on the run after killing a member of the international assassins&apos; guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
            </DescParagraph>

              </div>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.5547 7.16795C9.24784 6.96338 8.8533 6.94431 8.52814 7.11833C8.20298 7.29235 8 7.63121 8 8V12C8 12.3688 8.20298 12.7077 8.52814 12.8817C8.8533 13.0557 9.24784 13.0366 9.5547 12.8321L12.5547 10.8321C12.8329 10.6466 13 10.3344 13 10C13 9.66565 12.8329 9.35342 12.5547 9.16795L9.5547 7.16795Z" fill="white"/>
                </svg>
                <ButtonText>
                  Watch trailer
                </ButtonText>
              </Button>
            </DescBox>
          </Center>
        </StyledDiv>
      </div>
    )
}
