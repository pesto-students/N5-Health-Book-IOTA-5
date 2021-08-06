import React from 'react'
import styles from './EmailConfirmation.module.css'

function EmailConfirmation() {
    return (
       
            <div className="vw-100 vh-100 backcolor">
            <div className="row h-100  m-0 p-0">
                <div className="d-flex align-self-center justify-content-center">
                <div className={styles.EmailConfirmation}>
                        <img src="/email.png" className="mt-4" width="120px" height="120px" />
                        <h5 >We have sent the password reset link to your email EMAIL HERE. Please check your inbox.</h5>
                        <h6 >Haven’t received the mail yet? <a href="" >Resend email</a></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation
