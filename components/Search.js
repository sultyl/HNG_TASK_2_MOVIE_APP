import React from 'react'
import { styled } from "styled-components"
import { FiSearch } from "react-icons/fi";

const SearchDiv = styled.div`
    display: flex;
    width: 50%;
    padding: 6px 10px;
    justify-content: space-between; 
    align-items: center;
    border-radius: 6px;
    border: 2px solid var(--gray-300, #D1D5DB);
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
`;

export default function Search() { 
    return (
        <SearchDiv>
            <TextArea name='search' id='search' rows='1' cols="60" placeholder="What do you want to watch?" title="Search" aria-label="Search" type="search" />
            < FiSearch className='text-white'/>
        </SearchDiv>
    )
}