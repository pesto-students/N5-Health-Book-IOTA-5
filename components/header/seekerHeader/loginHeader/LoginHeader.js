import Link from 'next/link'
import React, { useState } from 'react'


function LoginHeader(props) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <header className="header_main header_scroll">
            <div className="header_left" >
                <Link href="/"><img src="/images/Logo.png" alt="logo" /></Link>
                
            </div>
            <div className="header_menu_icon" onClick={handleClick}>
                <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'}></i>
            </div>
            <div className="d-flex align-self-end">
                {/* <h1 className={window.location.pathname== "/my-profile/my-profile" ? "header_links2 active" :"header_links2"}><Link href="/my-profile/my-profile" >Messages</Link></h1> */}
                {/* <h1 className={window.location.pathname== "/my-profile/my-orders" ? "header_links2 active" :"header_links2"}><Link href="/my-profile/my-orders" >My Orders</Link></h1> */}
            </div>

            <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                <li className="header_links2"><Link href="" ><button className="message_icon"><img src="/images/messages.png" /></button></Link></li>
                <li className="header_links2"><img className="avatar_round" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" /> </li>
                <li className="header_links2"><p className="m-0">Arvind S</p></li>
                <li className="header_links2"><i className="bi bi-chevron-down"></i></li>
            </ul>
        </header>
    )
}

export default LoginHeader
