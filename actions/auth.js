import fetch from 'isomorphic-fetch';
// import { API } from '../config';
import cookie from 'js-cookie';
const API= process.env.API

export const signup = user => {
    return fetch(`${API}/api/user/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = user => {
    console.log(process.env.API)
    return fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const forgetPassWord = user => {
    console.log(process.env.API)
    return fetch(`${API}/api/auth/reset-link`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const resetPassWord = user => {
    console.log(process.env.API)
    return fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    removeLocalStorage('token');
    next();

    // return fetch(`${API}/signout`, {
    //     method: 'GET'
    // })
    //     .then(response => {
    //         console.log('signout success');
    //     })
    //     .catch(err => console.log(err));
};

// set cookie
export const setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1
    });
};

export const removeCookie = key => {
    cookie.remove(key, {
        expires: 1
    });
};
// get cookie
export const getCookie = key => {
    
    let token =localStorage.getItem(key)
    
    if(token==="undefined"){
        return false
    }
    if(token){
        return token 
    }else{
        return false
    }
    
};
// localstorage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = key => {
    localStorage.removeItem(key);
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setLocalStorage('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    const cookieChecked = getCookie('token');
        if (cookieChecked && cookieChecked!=="undefined") {
            if (localStorage.getItem('user') && localStorage.getItem('user')!=="undefined") {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }else{
            return false;
        }
};
export const loginWithGoogle = user => {
    return fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const loginWithFacebook = user => {
    return fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signupWithGoogle = user => {
    return fetch(`${API}/api/user/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signupWithFacebook = user => {
    return fetch(`${API}/api/user/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};