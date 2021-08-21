import LandingPage from "../components/landingPage/LandingPage";
import Head from 'next/head'


export default function Home() {
  return (
    <div className="test">
      <Head>
        <title>Healthbook</title>
        <link rel="icon" href="/images/hb_logo.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <LandingPage/>
    </div>
  )
}
