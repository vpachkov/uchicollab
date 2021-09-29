import axios from "axios";

import history from "./history.js";
import Cookies from 'js-cookie'

export var serverAPI = "http://" + window.location.hostname + ":8080/api/"
export var authorizationService = serverAPI + "Authorization."
export var profileService = serverAPI + "Profile."

function post(url, body, onResponse, onError, session) {
    axios.post(
        url,
        JSON.stringify({
            ...body,
            session
        })
    ).then(onResponse).catch((error)=> {
        if (error.response !== undefined && error.response.status === 401) {
            Cookies.remove('session')
            Post(url, body, onResponse, onError)
        } else if (onError !== undefined) {
            onError(error)
        }
    })
}

export function Post(url, body, onResponse, onError) {
    let login = Cookies.get('login')
    let password = Cookies.get('password')

    // uncomment when login is done
    // if (login === undefined || password === undefined) {
    //     history.push('/login')
    // }

    let session = Cookies.get('session')

    if (session === undefined) {
        axios.post(authorizationService+"authorize", JSON.stringify({
            login: "login", password: "password"
        })).then((response) => {
            Cookies.set('session', response.data.session)
            post(url, body, onResponse, onError, response.data.session)
        }).catch(onError)
    } else {
        post(url, body, onResponse, onError, session)
    }
}