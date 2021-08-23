import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Left from '../Left';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { signin, authenticate, isAuth, loginWithGoogle, loginWithFacebook } from '../../../actions/auth';
import Router from 'next/router';
import { signInWithEmailAndPassword } from '../../../services/firebase-auth-service';
import OtpInput from 'react-otp-input';
import DOMPurify from 'dompurify';



export async function getStaticProps() {

    // ...
}


const Login = () => {

    const [values, setValues] = useState({
        eMail: '',
        password: '',
        showPassword: false,
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const [checkAuth, setCheckAuth] = useState(false);

    const [otpScreen, setOtpScreen] = useState(false);
    const [otp, setOtp] = useState('');
    const [authenticateUser,setAuthenticate]=useState({});


    useEffect(() => {
        if (isAuth()) {
            Router.push(`/dashboard`);
        } else {
            setCheckAuth(true)
        }
    }, []);

    const { eMail, password, error, loading, message, showForm } = values;


    const handleChange = (event) => {

        let value = DOMPurify.sanitize(event.target.value);

        setValues({ ...values, [event.target.name]: value })
    };


    const handleClickShowPassword = (event) => {

        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { eMail, password, signUpVia: "Email" };
        signInWithEmailAndPassword(user.eMail, user.password).then((response) => {
            // console.log(response,"signInWithEmailAndPassword")
            
            setAuthenticate({ user: user,response, loginVia: "Email" })
            setOtpScreen(true)
            setValues({  loading: false });

        }).catch((error) => {
            console.log(error)
            let message
            if (error.code && error.code == 'auth/user-not-found') {
                message = 'User dose not exist'
            } else if (error.code && error.code == 'auth/wrong-password') {
                message = 'Invalid credintials'
            }
            setValues({ ...values, error: message ? message : error.message, loading: false });
        });


    }
    const submitOtp = ()=>{
        
        if(otp=='123456'){
            authenticate(authenticateUser, () => {
                // console.clear()
                console.log(authenticateUser,"authenticateUser")
                if (isAuth()) {
                    console.log("IS AUTH")
                    Router.push(`/dashboard`);
                }
            });
        }else{
            setValues({ error: "Entered wrong otp"  });
            setOtp('')
        }
    };

    const responseGoogle = (response) => {
       
 
        const tokenId = response.tokenId;

        if (tokenId) {
            const oAuthId = response.googleId;
            let eMail = response.profileObj.email
            const user = { oAuthId, eMail, signUpVia: "Google" };
            setAuthenticate({ user: user, loginVia: "Google" })
            setOtpScreen(true)
            setValues({  loading: false });
            

        }
    }




    const responseFacebook = (response) => {
        console.log(response);
        // ;
        const tokenId = response.accessToken;


        if (tokenId) {
            const oAuthId = response.userID;
            let eMail = response.email
            const user = { oAuthId, eMail, signUpVia: "Facebook", expTime: response.data_access_expiration_time };
            
            setAuthenticate({ user: user, loginVia: "Facebook" })
            setOtpScreen(true)
            setValues({  loading: false });

        } else {
            setValues({ error: "Error on Facebook Login." });
        }
    }


    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();
    const Loader = () => {
        return (<span className="loader"></span>)
    }
    const clearError = () => {
        setValues({ error: '' });
    }
    const handleOtp = (otp) => {
        setOtp(otp)
    }

    const fillLoginDetails = (userType) =>{
        if(userType == "patient"){
            setValues({ ...values, "eMail": "amit2@gmail.com","password": "Welcome@123" })
           
        }else{
            setValues({ ...values, "eMail": "ratanv@gmail.com","password": "123456" })
            
        }
    }

    


    if (checkAuth) {
        return (
            <div>
                {/* <button type="button" onClick={() => {
    throw new Error("Sentry Frontend Error");
}}>
    Throw error
</button> */}
                <div className="vw-100 h-100 backcolor">
                    <div className="row h-100 m-0 p-0">
                        <div className="col-sm-4 m-0 p-0 authLeft">
                            <Left />
                        </div>
                        <div className="col-12 col-sm-8 align-self-center">
                            <div className="container h-100">
                                <p className="text-end p-4" style={{ 'position': 'absolute', 'top': '0', 'right': '0' }} >Don't have an account? <Link className="" href="/auth/signup">Sign up now</Link></p>
                                <div className="justify-content-center">
                                    {!otpScreen && <div className={`authRight ${success ? "hideAll" : ""}`}>
                                        <p className="mb-2" style={{fontWeight:"bold"}}>For Final Demo Purpose Only</p>
                                    <p style={{color:'grey',fontSize:'12px',fontWeight:'bold'}}>For Doctor Login, U: ratanv@gmail.com, P: 123456</p><p><button name="doctor" className="btn btn-primary" style={{fontSize:"12px"}} onClick={()=> fillLoginDetails('doctor')}>Click Here To Fill Doctor Login Details</button></p>
                                        <p className="mt-2" style={{color:'grey',fontSize:'12px',fontWeight:'bold'}}>For Patient Login, U: amit2@gmail.com, P: Welcome@123</p><p><button name="patient" style={{fontSize:"12px"}} className="btn btn-primary" onClick={()=> fillLoginDetails('patient')}>Click Here To Fill Patient Login Details</button></p>
                                        <h1 className="auth_title" >Log in to Healthbook</h1>
                                        
                                        <form onSubmit={handleSubmit} >
                                            <div className="mb-3">
                                                <label htmlFor="eMail" className="form-label searchLeft_label m-0">Email Address</label>
                                                <input type="email" className="bg-transparent form-control" name="eMail" value={values.eMail}
                                                    onChange={handleChange} aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">

                                                <label htmlFor='password' className="searchLeft_label m-0 form-label">Password</label>

                                                <input type={values.showPassword ? 'text' : 'password'} className="bg-transparent form-control" name="password"
                                                    onChange={handleChange} value={values.password} />
                                                <div className=" d-flex justify-content-between searchLeft_label auth_terms">
                                                    <p />
                                                    <Link href="/auth/forget" >Forgot password? </Link>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn_theme btn_medium" style={{ 'width': '100%', 'height': '44px', 'margin': '10px 0px' }}>Log in {loading ? <Loader /> : null}</button>
                                        </form>
                                        <p className="text-center" >OR </p>
                                        <div className="d-flex justify-content-between ">
                                            <GoogleLogin
                                                clientId="26122348563-5sb0k4cg489bs2t7bo47uf253e1muokb.apps.googleusercontent.com" //{process.env.GID}  //"250519635268-751g3ofj1t9hc142aavrm4b2tl1686bj.apps.googleusercontent.com"     
                                                render={renderProps => (
                                                    <button
                                                        onClick={renderProps.onClick}
                                                        disabled={renderProps.disabled}
                                                        // isSignedIn={true}
                                                        className="btn_theme_outline btn_medium btn_auth"
                                                    >
                                                        {/* <img src="/images/googlee.png"></img>  */}
                                                        <svg width={22} height={18} xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335" /><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" /><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05" /><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853" /><path fill="none" d="M0 0h18v18H0z" /></g></svg>

                                                        Log in with Google
                                                    </button>
                                                )}
                                                buttonText="Login"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            />


                                            <FacebookLogin
                                                style={{ 'color': 'red !important' }}
                                                appId={process.env.FB_APP_ID} //Amit:"1202393070210653" 
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                cssClass="btn_theme_outline btn_medium btn_auth"
                                                icon={<i className="bi bi-facebook" style={{ 'color': '#4267B2' }}></i>}
                                                textButton=" Log in with Facebook"
                                            />


                                            {/* <button className="btn_theme_outline btn_medium " style={{ 'width': '48%', 'height': '44px', 'margin': '10px 0px' }}> Log in with Facebook</button> */}
                                        </div>
                                        {error && <div className="d-flex justify-content-between ">
                                            <div className="alert-Box flex-container">
                                                <div><i className="icon-error fa fa-exclamation-circle"></i></div>
                                                <div className="error">{error}</div>
                                                <div className="close" title="Close" onClick={clearError} ><i className="icon-error fa fa-times "></i></div>
                                            </div>
                                        </div>
                                        }
                                        
                                    </div> }
                                    {otpScreen && <div className={`authRight`}>
                                        <h1 className="auth_title" >Enter OTP</h1>
                                            <div className="bg-transparent form-control text-center">
                                                <OtpInput
                                                    className="text-center"
                                                    value={otp}
                                                    onChange={handleOtp}
                                                    numInputs={6}
                                                    separator={<span>-</span>}
                                                    inputStyle={{"width":"2em","margin":"0.5em 1em","border":"1px solig grey","&:focus":"outline :none"}}
                                                />
                                                
                                                <button type="button" onClick={submitOtp} className="btn_theme btn_medium" style={{ 'width': '100%', 'height': '44px', 'margin': '10px 0px' }}>Submit OTP {loading ? <Loader /> : null}</button>
                                                <p>Due to government policies, we are not able to send OTP to your mobile, please use default OTP: <b>123456</b>.</p>
                                            </div>
                                            
                                            {error && <div className="d-flex justify-content-between ">
                                            <div className="alert-Box flex-container">
                                                <div><i className="icon-error fa fa-exclamation-circle"></i></div>
                                                <div className="error">{error}</div>
                                                <div className="close" title="Close" onClick={clearError} ><i className="icon-error fa fa-times "></i></div>
                                            </div>
                                        </div>
                                        }
                                            </div>

                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Login
