import React from 'react'
import HeaderScroll from './HeaderScroll'
import NavBar from './NavBar'

function HeaderNav() {
    return (
        <div className="fixed-top">
            <HeaderScroll/>
            <NavBar/>
        </div>
    )
}

export default HeaderNav
