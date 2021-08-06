import {React,useEffect} from 'react'
import Login from '../../components/auth/login/Login'
import Router from 'next/router'
import { isAuth } from '../../actions/auth';


function login() {


    return (
        <div>
            <Login/>
        </div>
    )
}

export default login
