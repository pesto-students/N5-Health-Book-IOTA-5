import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { isAuth,signout } from '../../../../actions/auth';
import Router from 'next/router';

function HeaderFix() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }

    const handleLogout = () => {
        signout( () => {
            Router.push(`/`);
        });
    }
    const [logged, setLogged] = useState();

    useEffect(() => {
        let user = isAuth()
        if (user) {
            setLogged(user)
        }
    }, []);


    return (
        <div className="fixed-top">
            <header className="header_main header_fix">
                <div className="header_left" >
                    <Link href="/"><img src="/images/Logo.png" height="35px" alt="logo" /></Link> 
                </div>
                <div className="header_menu_icon" onClick={handleClick}>
                    <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'}></i>
                </div>
                {logged && (
                    <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                        <li className="header_links2"><p className="m-0">{logged.eMail}</p></li>
                        <li><Link href="/auth/signup" ><button className="btn__signup" onClick={handleLogout}>Logout</button></Link></li>
                        {/* <li className="header_links2"><i className="bi bi-chevron-down"></i></li> */}
                        
                        
                    </ul>
                )}
                {!logged && (
                    <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                        {/* <li><a href="/chats" className="header_links hover"><i className="bi bi-play-circle"></i> How it works?</a></li> */}
                        <li><Link href="/auth/login" ><button className="btn__login">Log in</button></Link></li>
                        <li><Link href="/auth/signup" ><button className="btn__signup">Sign up</button></Link></li>
                    </ul>
                )}







            </header>
        </div>
    )
}

export default HeaderFix
