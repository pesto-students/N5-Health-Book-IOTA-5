import Link from 'next/link'
import React from 'react'
import styles from './Left.module.css'
// import img from '../../public/Logo.png'


function Left() {
    return (
        <div>
            <div className={styles.there}>
            <div className="container h-100 w-100 align-self-center">
                <div className="row h-100 align-items-center">
                    <div className="col mt-3">
                        <div className="mb-5">
                            <Link  href="/"><img src="/images/Logo.png" alt="logo" style={{"height":"80px"}} /></Link>
                        </div>
                        <div className={styles.rectangle}>
                            <img src="/images/docpatient.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Left
