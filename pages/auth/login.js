import {React,useEffect} from 'react'
import Login from '../../components/auth/login/Login'
import Router from 'next/router'
import { isAuth } from '../../actions/auth';


const login = () => {


    return (
        <div>
            <Login/>
        </div>
    )
}
login.layout="auth";

export default login
