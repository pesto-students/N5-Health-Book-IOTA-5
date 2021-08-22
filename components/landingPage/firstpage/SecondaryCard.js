import React from 'react'
import styles from './SecondaryCard.module.css'



function SecondaryCard(props) {
    return (
        <div className={styles.secondary__chat} style={{ background: props.background, marginTop: props.marginTop }}>
            <img src={props.imgsrc} className={styles.img} />
            <div className={styles.secondary__chat__text}>
                <h1>{props.title}</h1>
                <p>{props.desciption}</p>
                {/* <a href={props.href}>Know more <i className="bi bi-chevron-right"></i> </a> */}
            </div>
        </div>
    )
}

export default SecondaryCard
