import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

function Footer() {
    return (
        <div className={styles.footer}>
            <div className="container ml-3">
                <div className="row justify-content-center ml-3">
                    <div className="col-12 col-md-4 align-self-center">
                        <div className="row m-0">
                            <img src="/images/Logo.png"/>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <p>No Copyright © 2021 </p>
                            </div>
                        </div>
                        <div className="row">
                            <a className={styles.social__links} href="https://www.instagram.com"><i className="bi bi-instagram "></i></a>
                            <a className={styles.social__links} href="http://twitter.com/"><i className="bi bi-twitter"></i></a>
                            <a className={styles.social__links} href="http://youtube.com/"><i className="bi bi-youtube"></i></a>
                            <a className={styles.social__links}  href="http://www.linkedin.com/in/"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-6 col-md-2 ">
                        <h5>Company</h5>
                        <ul className="list-unstyled links__link">
                            <li className={styles.li}><Link href="/">Become a Doctor</Link></li>
                            <li className={styles.li}><Link href="">FAQs</Link></li>
                            <li className={styles.li}><Link href="">Blog</Link></li>
                            <li className={styles.li}><Link href="">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-2">
                        <h5>Support</h5>
                        <ul className="list-unstyled">
                            <li className={styles.li}><Link href="">Terms of service</Link></li>
                            <li className={styles.li}><Link  href="">Privacy policy</Link></li>
                            <li className={styles.li}> </li>
                            <li className={styles.li}> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
