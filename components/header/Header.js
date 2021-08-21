import React, { useEffect, useState } from 'react'
import HeaderFix from './headerFix/HeaderFix';
import HeaderNav from './headerScroll/HeaderNav';
import NProgress from "nprogress";
import Router from "next/router";
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();
import 'font-awesome/css/font-awesome.min.css';

 function  Header() {
    let listener = null;
    const [scrollState, setScrollState] = useState("top")
    useEffect(() => {
        listener = document.addEventListener("scroll", (e) => {
            var scrolled = document.scrollingElement.scrollTop;
            // console.log(scrolled);
            if (scrolled >= 500) {
                if (scrollState !== "scrolled") {
                    setScrollState("scrolled");
                    // console.log(scrollState);
                }
            } else {
                if (scrollState !== "top") {
                    setScrollState("top");
                    // console.log(scrollState);

                }
            }
        })
        return () => {
            document.removeEventListener("scroll", listener);
        }
    }, [scrollState])

    return (
        <div>
            {/* {scrollState === "top" ? <HeaderFix /> : <HeaderNav />} */}
            <HeaderFix /> 
        </div>
    )
}

export default Header
