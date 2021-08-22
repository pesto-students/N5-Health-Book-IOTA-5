import React from 'react'
import Signup from '../../components/auth/signup/Signup'
import Head from "next/head";

const signup = ()=> {
    return (
        <>
        <Head>
 <link rel="icon" href="/images/hb_logo.png" />
        </Head>
        <div>
            <Signup/>
        </div>
        </>
    )
}
signup.layout = "auth";
export default signup
