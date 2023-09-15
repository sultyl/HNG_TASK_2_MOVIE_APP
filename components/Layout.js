import React from "react";
import { default as Head } from "next/head"
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>KingSultan-Moviexapp</title>
                <link rel="icon" href="/favicon.jpg" />
            </Head>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;