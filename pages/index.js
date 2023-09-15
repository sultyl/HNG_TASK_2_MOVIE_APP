import MovieCard from '@/components/MovieCard'
import HeroBanner from '@/components/heroBanner'
import React from 'react'
import styled from 'styled-components'

const GridBox = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 80px;
`;

export default function Home() {
  return (
      <>
        <HeroBanner />
        <MovieCard />
      </>
    )
}
