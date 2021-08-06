import React from 'react'
import Footer from '../footer/seekerFooter/Footer'
import Header from '../header/seekerHeader/Header'
import Cta from './firstpage/Cta'
import FirstPage from './firstpage/FirstPage'
import Secondary from './firstpage/Secondary'

function LandingPage() {
    return (
        <div>
            <Header/>
            <FirstPage />
            <Secondary />
            <Cta />
            <Footer />
        </div>
    )
}

export default LandingPage
