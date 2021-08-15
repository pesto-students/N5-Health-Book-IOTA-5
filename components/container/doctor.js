import React, { ReactNode } from "react";
import Header from '../header/Header'
import Head from "next/head";


const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header/>
    <main>
    
    {children}
    </main>


  </div>
);

export default Layout;