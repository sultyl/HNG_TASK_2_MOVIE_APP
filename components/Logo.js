import React from 'react'
import { styled } from "styled-components"

const LogoDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-items: center;
    @media screen and (max-width: 760px) {
        gap: 10px;
    } 
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    @media screen and (max-width: 760px) {
    width: 30px;
    height: 30px;
  }
`;
const LogoTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    line-height: 24px; /* 100% */
    @media screen and (max-width: 760px) {
        font-size: 12px;
  }
`;

export default function Logo() { 
    return (
        <LogoDiv>
            <Image src="/tv.png" alt="MovieBox"/>
            <LogoTitle>MovieBox</LogoTitle>
        </LogoDiv>
    )
}