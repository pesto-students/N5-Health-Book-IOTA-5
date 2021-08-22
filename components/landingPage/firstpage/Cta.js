import React from 'react'
import styles from './Cta.module.css'
import Router from 'next/router';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Cta() {
    const signUpRedirect = () => {
        Router.push(`/auth/signup`);
    }
    return (
        <div className={styles.cta}>
            <div className="row justify-content-between align-items-center">
                <div className="col-12 col-md-6">
                    <div className={styles.cta__colLeft}>
                        <h1> Record your health data digitally.</h1>
                        <button className={styles.button} onClick={signUpRedirect}>Get Started</button>
                    </div>
                </div>
                <div className="col-12 col-md-6 ">
                    <img className={styles.cta__img} src="/images/cta.png" />
                </div>
            </div>
        </div>
    )
}

export default Cta
