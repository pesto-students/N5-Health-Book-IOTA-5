import React, { useState } from 'react'
import Left from '../Left';
import {resetPassWord } from '../../../actions/auth'
import Router from 'next/router';

function NewPassword({props,token}) {
    const [values, setValues] = useState({
        newPassword: '',
        re_newPassword:"",
        showPassword: false,
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    const { newPassword, re_newPassword, showPassword,error, loading, message, showForm } = values;
    const handleChange =  (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

   
    const handleSubmit = (event) => {
        event.preventDefault()
        if (values.newPassword !==values.re_newPassword) {
            alert("entered new password doesnot match")
            return null
        }
        setValues({ ...values, loading: true, error: false });
        const user = { token, newPassword:newPassword, reEnterPassword:re_newPassword };

        resetPassWord(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({ loading: false });
                
                Router.push(`/auth/login`);
            }
        });

    }
    return (
        <div>
            <div className="vw-100 vh-100 backcolor">
                <div className="row h-100 m-0 p-0">
                    <div className="col-sm-4 m-0 p-0">
                        <Left />
                    </div>
                    <div className="col-12 col-sm-8 align-self-center">
                        <div className="container">
                            <div className=" d-flex justify-content-center ">
                                <div className="">
                                    <h1>Set New Password</h1>
                                    <p>Please set your new password to continue.</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                            </div>
                                            <input type="password" className="bg-transparent form-control" name="newPassword" value={values.newPassword}
                                                onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label htmlFor="re_newPassword" className="form-label">New Password</label>
                                            </div>
                                            <input type="password" className="bg-transparent form-control" name="re_newPassword" value={values.re_newPassword}
                                                onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 p-2 mt-3 mb-3">Set new password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPassword
