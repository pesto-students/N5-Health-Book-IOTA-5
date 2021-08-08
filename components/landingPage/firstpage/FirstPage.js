import {React,useState} from 'react'
import styles from './FirstPage.module.css'
import Router from 'next/router';

function FirstPage() {
    const [searchtext, setSearchtext] = useState('')
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
                            <span className={styles.desc}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
