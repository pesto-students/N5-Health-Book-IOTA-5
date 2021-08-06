import React, { useState } from 'react'

function NavBar() {
    const topSearches = [
        
    ]
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <nav className="NavBar">
            
        </nav>
    )
}

export default NavBar
