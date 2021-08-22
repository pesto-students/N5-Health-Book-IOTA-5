import {React,useState,useEffect} from 'react'
import styles from './FirstPage.module.css'
import Router from 'next/router';
import {isAuth} from '../../../actions/auth'

function FirstPage() {
    const [searchtext, setSearchtext] = useState('')
    
    useEffect(() => {
        if (isAuth()) {
            Router.push(`/dashboard`);
        }
    }, [isAuth]);


    const handleChange =  (event) => {
        console.log(event.keyCode)
        if (event.keyCode === 13) {
            console.log("enter...")
            handleSubmit(event)
          }
        setSearchtext(event.target.value)
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        if(searchtext){
            Router.push('ProviderSearch?searchQuery='+searchtext)  
        }   

    }
    

    return (
        <div className={styles.home}>
            <div className="container">
                <div className="row h-100 align-items-center">
                    <div className="col-12 col-md-6">
                        <div className={styles.left}>
                            <h1 className={styles.heading_h1}>Get Started</h1>
                            <p className={styles.subtitle}> Track your health records digitally
                            <span className={styles.desc}> Enable Patient type end-users to manage their medical documents on the web app and can share them with the doctor including an illustration of the patient's diagnostic history.And Doctors can prescribe the patient more efficiently by their previous diagnosis history.
                            </span>
                            </p>
                            
                            
                        </div>
                    </div>
                    <div className="col-12 col-md-6 h-100">
                        {/* <div className={styles.img__img}></div> */}
                        <img className={styles.img__responsive} src="/images/FlowCreative.png" />
                    </div>
                </div>
                <div className="row"></div>
            </div>
        </div>
    )
}

export default FirstPage
