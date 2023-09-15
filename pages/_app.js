import React from 'react'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700&family=Poppins:wght@400;500;600;700&display=swap'); 
  body {
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    margin: 0;
    background-color: #eee;
  } 
`;

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
