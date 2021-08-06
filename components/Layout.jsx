import React, { ReactNode } from "react";
import { Nav } from "./Nav";
import {Link} from "./Link";
import Head from "next/head";


const Layout = ({ children, title = "Users Page Layout" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        {children}
      </div>
    </div>
       
    <footer className="text-center mt-4">
      <hr />
      <span>I am here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;