import fetch from 'isomorphic-fetch';
// import { API } from '../config';
import cookie from 'js-cookie';
const API= process.env.API
import axios from 'axios'

export const search = data => {
    return fetch(`${API}/api/provider/fetch`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const bookSessionRequest = (data,chat_id) => {
    // console.log(data,"data send message..")
    var config = {
        method: 'put',
        url: `${API}/api/order/session-reply/${chat_id}`,
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