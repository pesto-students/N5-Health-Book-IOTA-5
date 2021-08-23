import Link from 'next/link';
import React, { useState,useEffect } from 'react'
import Left from '../Left';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { signup,authenticate,isAuth,signupWithGoogle,signupWithFacebook } from '../../../actions/auth';
import Router from 'next/router';
import axios from "axios"
import {firebaseService} from '../../../services/firebase-db-service';
import {createUserWithEmailAndPassword} from '../../../services/firebase-auth-service';
import DOMPurify from 'dompurify';

function Signup() {

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);


    const [values, setValues] = useState({
        fullName: '',
        eMail: '',
        mobileNum: '',
        password: '',
        checkBox: false,
        showPassword: false,
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    useEffect(() => {
        console.log(values,"values")
    }, []);

    const [success,setSuccess]=useState(false)
    
    const [timerdata,setTimer]=useState(5)
    const calculateTimeLeft = () => { 
        if(!success) return 0        
        return timerdata
    };
    
    const callSuccess=()=>{       
        setSuccess(true)     
    } 
 

    useEffect(() => {
        if(success){
            if(!timerdata){
                Router.push('/auth/login')
            }
            setTimeout(() => {
                setTimer(calculateTimeLeft()-1)
              }, 1000);
        }
      });
    

    const handleChange =  (event) => {     
        let value = DOMPurify.sanitize(event.target.value);
        setValues({...values,[event.target.name]:value}) 
        if (typeof onChange === "function") {
            onChange(value);
        }     
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleCheckBox = (event) => {

        setValues({ ...values, checkBox: !values.checkBox });
        if (typeof onChange === "function") {
            onChange(event.target.value);
        } 
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    let { fullName,eMail, password,mobileNum,checkBox, error, loading, message, showForm } = values;
    const handleSubmit = (event) => {
  
        event.preventDefault()
        if(fullName ==''){
            
        }
        if(!fullName || !eMail||!password||checkBox){
            setValues({ ...values, error: "Error", loading: false });
        }
        setValues({...values,loading: true, error: false });
        const user = { uid: null,mobileNum, name:fullName,eMail,hashedPassword:password,signUpVia: "Email",pptcAccepted:checkBox,isActive:true,roleId:1 };
        console.log(user,"user");
       
            createUserWithEmailAndPassword(user.eMail,user.hashedPassword).then((response) => {  
                            
                var fbService = new firebaseService("Users");
                user.uid = response.user.uid;
                let signUp=fbService.create(user);

                const profile = {
                    fullName: user.name,
                    mobile:user.mobileNum,
                    uid: user.uid,
                    gender: "",
                    dob: "",
                    bloodGroup:"",
                    allergies:"",
                    maritalStatus:"",
                    address:"",
                    city:"",
                    state:"",
                    weight: ""                    
                  };
                var fbProf = new firebaseService("Patient");
                fbProf.create(profile);
                // console.log(signUp,"signUp....fb")
                callSuccess()
               })
               .catch((error) => {                 
                   setValues({ ...values, error: error.message, loading: false });
               });


    }
    
    const responseGoogle = (response) => {
        console.log(response);
       
        
        const oAuthId = response.googleId;
        let eMail =response.profileObj.email
        let name=response.profileObj.name
        
        const user = { name,oAuthId,eMail ,signUpVia:"Google",pptcAccepted:checkBox,isActive:true,roleId:1};
        console.log(user,"user")
        
    

        createUserWithEmailAndPassword(user.eMail,makePasswd()).then((response) => {   
                  
            var fbService = new firebaseService("Users");
            user.uid = response.user.uid;
            let signUp=fbService.create(user);

                const profile = {
                    fullName: user.name,
                    mobile:"",
                    uid: user.uid,
                    gender: "",
                    dob: "",
                    bloodGroup:"",
                    allergies:"",
                    maritalStatus:"",
                    address:"",
                    city:"",
                    state:"",
                    weight: ""                    
                  };
                var fbProf = new firebaseService("Patient");
                fbProf.create(profile);
            // Router.push(`/auth/login`);
            callSuccess()
           })
           .catch((error) => {                 
               setValues({ ...values, error: error.message, loading: false });
           });
    }
    function makePasswd() {
        var passwd = '';
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (i=1;i<8;i++) {
          var c = Math.floor(Math.random()*chars.length + 1);
          passwd += chars.charAt(c)
        }
      
        return passwd;
      
      }

    const clearError =()=>{
        setValues({ error: '' });
    }
    const Loader = () => {
        return (<span className="loader"></span>)
    }


    const responseFacebook = (response) => {
        console.log(response,"FACEBOOK");
       
        const oAuthId = response.userID;
        let eMail =response.email
        let name=response.name
        if(!oAuthId){
            return null;
        }
        const user = { name,oAuthId,eMail ,signUpVia:"Google",pptcAccepted:checkBox,isActive:true,roleId:1};
 
        createUserWithEmailAndPassword(user.eMail,makePasswd()).then((response) => {                
            var fbService = new firebaseService("Users");
            user.uid = response.user.uid;
            let signUp=fbService.create(user);
            const profile = {
                fullName: user.name,
                mobile:"",
                uid: user.uid,
                gender: "",
                dob: "",
                bloodGroup:"",
                allergies:"",
                maritalStatus:"",
                address:"",
                city:"",
                state:"",
                weight: ""                    
              };
            var fbProf = new firebaseService("Patient");
            fbProf.create(profile);
           
            // Router.push(`/auth/login`);
            callSuccess()
           })
           .catch((error) => {                 
               setValues({ ...values, error: error.message, loading: false });
           });
    }

    return (
        <div className="vw-100 h-100 backcolor ">
            <div className="row h-100 m-0 p-0">
                <div className="col-sm-4 m-0 p-0 authLeft">
                    <Left/>
                </div>
                <div className="col-12 col-sm-8 align-self-center">
                    <div className="container h-100">
                        <p className="text-end p-4 " style={{'position':'absolute', 'top':'0', 'right':'0'}}>Already an account? <Link href="/auth/login">Log in</Link></p>
                        <div className="">
                            <div  className={`authRight ${success ? "hideAll": ""}`}>
                                

                                <h1 className="auth_title">Create Account</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="fullName" className="form-label searchLeft_label m-0">Full Name</label>
                                        <input type="text" className="bg-transparent form-control" name="fullName" required value={fullName}
                                            onChange={handleChange}  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label searchLeft_label m-0">Email address</label>
                                        <input type="email" className="bg-transparent form-control" name="eMail" required value={values.eMail}
                                            onChange={handleChange}  aria-describedby="emailHelp" />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobileNum" className="form-label searchLeft_label m-0">Mobile Number</label>
                                        <input type="num" className="bg-transparent form-control" required name="mobileNum" value={values.mobileNum}
                                            onChange={handleChange}  />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="password" className="form-label searchLeft_label m-0">Password</label>
                                        </div>
                                        <input type="password" className="bg-transparent form-control" required name="password" value={values.password}
                                            onChange={handleChange}  />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input 
                                            onClick={handleCheckBox} type="checkbox" required className="form-check-input" name="checkBox"  checked={values.checkBox ? "true":'' } />
                                        <label className="form-check-label searchLeft_label m-0" htmlFor="checkBox">I agree to the <a className="auth_terms" href="">Terms of Service</a> and <a className="auth_terms" href="">Privacy Policy</a></label>
                                    </div>
                                    <button type="submit" className="btn_theme btn_medium" style={{ 'width': '100%', 'height':'44px' , 'margin': '10px 0px' }}>Submit {loading ? <Loader /> : null}</button>
                                </form>
                                <p className="text-center" >OR</p>
                                <div className="d-flex justify-content-between ">
                                        <GoogleLogin
                                            clientId={process.env.GID}//"26122348563-5sb0k4cg489bs2t7bo47uf253e1muokb.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <button
                                                    onClick={renderProps.onClick}
                                                    disabled={renderProps.disabled}
                                                    // isSignedIn={true}
                                                    className="btn_theme_outline btn_medium btn_auth"
                                                >
                                                    {/* <img src="/images/googlee.png"></img>  */}
                                                    <svg width={22} height={18} xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335" /><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" /><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05" /><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853" /><path fill="none" d="M0 0h18v18H0z" /></g></svg>

                                                     Sign up with Google
                                                </button>
                                            )}
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />


                                        <FacebookLogin
                                        style={{'color':'red !important'}}
                                            appId={process.env.FB_APP_ID}
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            cssClass="btn_theme_outline btn_medium btn_auth"
                                            icon={<i className="bi bi-facebook" style={{ 'color': '#4267B2' }}></i>}
                                            textButton=" Sign up with Facebook"
                                        />
                                        


                                        {/* <button className="btn_theme_outline btn_medium " style={{ 'width': '48%', 'height': '44px', 'margin': '10px 0px' }}> Log in with Facebook</button> */}
                                </div>
                                    {error &&<div className="d-flex justify-content-between ">
                                        <div className="alert-Box flex-container">
                                        <div><i className="icon-error fa fa-exclamation-circle"></i></div>
                                        <div className="error">{error}</div>
                                        <div className="close" title="Close" onClick={clearError} ><i className="icon-error fa fa-times "></i></div>
                                        </div>

                                    </div>}
                            </div>
                            <div  className={`authRight ${success ? "": "hideAll"}`}>
                                

                                <h1 className="auth_title">Congrats... your account has been successfully created.</h1>

                                <img src={'/success.png'} width={400} />
                                <p> You will be redirected to login page in {timerdata} sec.</p>                              
                                
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Signup
