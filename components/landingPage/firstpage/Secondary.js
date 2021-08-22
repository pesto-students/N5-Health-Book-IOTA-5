import React from 'react'
import styles from './Secondary.module.css'
import SecondaryCard from './SecondaryCard'

function Secondary() {
    return (
        <div className={styles.secondary}>
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 secondary__left">
                    <div className="secondary__left__heading">
                        <h1>Get more from Us</h1>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nibh facilisis mattis consectetur.</p> */}
                    </div>
                    <SecondaryCard  marginTop="80px" background="#e4e0f7" imgsrc="/images/secondaryLeftImg.png" title="Track Previous Visits" desciption="Doctors and Patients can review previous diagnostic hitory." href="/chats" />
                </div>
                <div className="col-12 col-md-6 secondary__right">
                    {/* <SecondaryCardRight_1/> */}
                    {/* <SecondaryCardRight_2/> */}
                    <SecondaryCard marginTop="40px" background="#fdf0df" imgsrc="/images/secondaryRightImg1.png" title="Treament Timeline" desciption="Doctors and Patient can view visit history in fetching timeline" href="/chats" />
                    <SecondaryCard marginTop="40px" background="#D9F5FD" imgsrc="/images/secondaryRightImg2.png" title="Track Medical Documents" desciption="User can upload and view the report documents for better treatment." href="/chats" />
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Secondary
