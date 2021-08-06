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
                            <h1 className={styles.heading_h1}>Track You Health record digitally</h1>
                            
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
