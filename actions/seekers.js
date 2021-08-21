import fetch from 'isomorphic-fetch';
import axios from 'axios'
// import { API } from '../config';
import cookie from 'js-cookie';
const API= process.env.API

export const chatList = (id) => {
    return fetch(`/api/chat/seeker-chat-list/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const prochatList = (id) => {
    return fetch(`/api/chat/provider-chat-list/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getMessages =async (data) => {
    console.log(data,"Data...data")
    return fetch(`/api/chat/messages?seekerId=${data.seekerId}&providerId=${data.providerId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const sendMessages = async (data) => {
    // console.log(data,"data send message..")
    var config = {
        method: 'post',
        url: `/api/chat/create-chat`,
        headers: {
          'Content-Type': 'application/json'
        },
        data:data
      };
  
      return axios(config).then(response => {
        return response;
    })
    .catch(err => console.log(err));
    
        
};

export const bookSession = async (data) => {
    console.log(data,"data send message..")
    var config = {
        method: 'post',
        url: `/api/order/book-session`,
        headers: {
          'Content-Type': 'application/json'
        },
        data:data
      };
  
      return axios(config).then(response => {
        return response;
    })
    .catch(err => console.log(err));
    
        
};

