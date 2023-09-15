import Link from 'next/link';
import React from 'react'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import styled from 'styled-components';

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

const LinkBox = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 48px;
  color: var(--gray-900, #111827);
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

const Copyright = styled.div`
  color: var(--gray-500, #6B7280);
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

const Footer = () => {
  return (
    <div className='w-full text-center mt-[147px] mb-[73px] flex flex-col gap-9 justify-center items-center'>
      <IconBox>
        <FiFacebook className='w-6 h-6' />
        <FiInstagram className='w-6 h-6' />
        <FiTwitter className='w-6 h-6' />
        <FiYoutube className='w-6 h-6' />
      </IconBox>
      <LinkBox href='/'>
        <p>Conditions of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </LinkBox>
      <Copyright>
        © 2023 MovieBox by Adeleke Sultan - KingSultan  
      </Copyright>
    </div>
  )
}

export default Footer;