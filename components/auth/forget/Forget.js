import Link from 'next/link';
import React, { useState } from 'react'
import Left from '../Left';
import {forgetPassWord} from '../../../actions/auth'
import Router from 'next/router';

function Forget() {
    const [values, setValues] = useState({
        eMail: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    const { eMail, error, loading, message, showForm } = values;
    const handleChange =  (event) => {
        setValues({...values,[event.target.name]:event.target.value})
        console.log(values,"values.....")
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, loading: true, error: false });
        const user = { eMail };
        console.log(user,"........user")

        forgetPassWord(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({ loading: false });
                console.log(values)
                alert('Password Sent to Email... ')
                // Router.push(`/auth/login`);
            }
        });

    }
    return (
        <div>
            <div className="vw-100 h-100 backcolor">
                <div className="row h-100 m-0 p-0">
                    <div className="col-sm-4 m-0 p-0 authLeft">
                        <Left />
                    </div>
                    <div className="col-12 col-sm-8 align-self-center authRight">
                        <div className="container h-100">
                            <div className="d-flex justify-content-center">
                                <div className="" style={{'max-width':'450px'}}>
                                    <h1>Forgot Password</h1>
                                    <p>Forgot your password? No worries. Provide your login email address and we will send you a password reset link to your email address.</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className=" form-label">Email address</label>
                                            <input type="email" className=" bg-transparent form-control" name="eMail" value={values.email}
                                                onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn_theme btn_medium" style={{ 'width': '100%', 'margin': '10px 0px' }}>Send reset link</button>
                                        
                                    </form>
                                    <Link href="/auth/login"><button type="submit" className="btn_theme_outline btn_medium" style={{ 'width': '100%', 'margin': '10px 0px' }}>Back to Sign in</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget
