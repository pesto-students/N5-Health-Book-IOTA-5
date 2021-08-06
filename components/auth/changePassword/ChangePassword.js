import React, { useState } from 'react'
import Left from '../Left';

function ChangePassword() {
    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        re_newPassword: ""
    })
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (values.newPassword == values.re_newPassword) {
            alert("Changed password successfully")
        } else {
            alert("entered new password doesnot match")
        }
        console.log(values);
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
                                <div className="w-50">
                                    <h1>Change password</h1>
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                                            </div>
                                            <input type="password" className="bg-transparent form-control" id="oldPassword" value={values.oldPassword}
                                                onChange={handleChange('oldPassword')} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                            </div>
                                            <input type="password" className="bg-transparent form-control" id="newPassword" value={values.newPassword}
                                                onChange={handleChange('newPassword')} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label htmlFor="re_newPassword" className="form-label">New Password</label>
                                            </div>
                                            <input type="password" className="bg-transparent form-control" id="re_newPassword" value={values.re_newPassword}
                                                onChange={handleChange('re_newPassword')} />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 p-2 mt-3 mb-3">Change password</button>
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

export default ChangePassword
