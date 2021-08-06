import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { isAuth,signout } from '../../../../actions/auth';
import Router from 'next/router';


function HeaderScroll() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }
    const [logged, setLogged] = useState();

    useEffect(() => {
        let user = isAuth()
        if (user) {
            setLogged(user)
        }
    }, []);
    
    const handleLogout = () => {
        signout( () => {
            Router.push(`/`);
        });
    }
    return (
        <header className="header_main header_scroll">
            <div className="header_left" >
                <Link href="/"><img src="/images/Logo.png" alt="logo"  height="35px"/></Link>
                
            </div>
            <div className="header_menu_icon" onClick={handleClick}>
                <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'}></i>
            </div>


            {logged && (
                <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                    <li className="header_links2"><Link href="/chat" ><button className="message_icon"><img src="/images/messages.png" /></button></Link></li>
                    <li className="header_links2"><p className="m-0">{logged.name}</p></li>
                    {/* <li className="header_links2"><i className="bi bi-chevron-down"></i></li> */}
                    <li><Link href="/auth/signup" ><button className="btn__signup" onClick={handleLogout}>Logout</button></Link></li>
                </ul>
            )}
            {!logged && (
                <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                    <li><Link href="/auth/login" ><button className="btn__login">Log in</button></Link></li>
                    <li><Link href="/auth/signup" ><button className="btn__signup">Sign up</button></Link></li>
                </ul>
            )}
        </header>
    )
}

export default HeaderScroll
