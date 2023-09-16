import React from 'react'
import styled from 'styled-components'

const Bars = styled.div`
    width: 30px;
    height: 30px;
    padding: 4px;
`;

export default function BarsIcon() {
    return (
        <Bars className='bg-[#BE123C] rounded-full p-2 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
        </Bars>
    )
}