import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Left from '../Left';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { signin, authenticate, isAuth, loginWithGoogle, loginWithFacebook } from '../../../actions/auth';
import Router from 'next/router';
import { signInWithEmailAndPassword } from '../../../services/firebase-auth-service';



export async function getStaticProps() {

    // ...
}


function Login() {

    const [values, setValues] = useState({
        eMail: '',
        password: '',
        showPassword: false,
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const [checkAuth, setCheckAuth] = useState(false)
    


    useEffect(() => {
        if (isAuth()) {
            Router.push(`/`);
        } else {
            setCheckAuth(true)
        }
    }, []);

    const { eMail, password, error, loading, message, showForm } = values;
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
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

            let otp = 543745
            console.log(otp, "Real otp")



            var enteredOtp = prompt("Please enter otp", "");
            user.uid = response.user.uid
            if (enteredOtp == otp) {
                authenticate({ user: user, loginVia: "Email" }, () => {
                    // console.log(isAuth(),"iS Auth")
                    if (isAuth()) {
                        console.log("IS AUTH")
                        Router.push(`/dashboard`);
                    }
                });
            }
            // authenticate({ user: user,response, loginVia: "Email" }, () => {
            //     // console.log(isAuth(),"iS Auth")
            //     if (isAuth()) {
            //         console.log("IS AUTH")
            //         Router.push(`/dashboard`);
            //     }
            // });





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

    const responseGoogle = (response) => {
        console.log(response);
        // ;

        const tokenId = response.tokenId;

        if (tokenId) {
            const oAuthId = response.googleId;
            let eMail = response.profileObj.email
            const user = { oAuthId, eMail, signUpVia: "Google" };
            authenticate({ user: user, loginVia: "Google" }, () => {
                console.log(isAuth(), "iS Auth")
                if (isAuth()) {
                    console.log("IS AUTH")
                    Router.push(`/dashboard`);
                }
            });

        } else {
            setValues({ error: "Error on Google Login." });
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
            authenticate({ user: user, loginVia: "Facebook" }, () => {
                console.log(isAuth(), "iS Auth")
                if (isAuth()) {
                    console.log("IS AUTH")
                    Router.push(`/dashboard`);
                }
            });

        } else {
            setValues({ error: "Error on Facebook Login." });
        }
    }


    const [success,setSuccess]=useState(false)
    const Loader = () => {
        return (<span className="loader"></span>)
    }
    const clearError = () => {
        setValues({ error: '' });
    }



    if (checkAuth) {
        return (
            <div>
                <div className="vw-100 h-100 backcolor">
                    <div className="row h-100 m-0 p-0">
                        <div className="col-sm-4 m-0 p-0 authLeft">
                            <Left />
                        </div>
                        <div className="col-12 col-sm-8 align-self-center">
                            <div className="container h-100">
                                <p className="text-end p-4" style={{ 'position': 'absolute', 'top': '0', 'right': '0' }} >Don't have an account? <Link className="" href="/auth/signup">Sign up now</Link></p>
                                <div className="justify-content-center">
                                    <div className={`authRight ${success ? "hideAll": ""}`}>
                                        <h1 className="auth_title" >Log in to Healthbook</h1>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="eMail" className="form-label searchLeft_label m-0">Email address</label>
                                                <input type="email" className="bg-transparent form-control" name="eMail"
                                                    onChange={handleChange} aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">

                                                <label htmlFor='password' className="searchLeft_label m-0 form-label">Password</label>

                                                <input type={values.showPassword ? 'text' : 'password'} className="bg-transparent form-control" name="password"
                                                    onChange={handleChange} />
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
                                                clientId={process.env.GID}  //"250519635268-751g3ofj1t9hc142aavrm4b2tl1686bj.apps.googleusercontent.com"     
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
                                    </div>
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
