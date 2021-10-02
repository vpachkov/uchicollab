import axios from "axios";

import history from "./history.js";
import Cookies from 'js-cookie'

export var serverAPI = "http://" + window.location.hostname + ":8080/api/"
export var authorizationService = serverAPI + "Authorization."
export var profileService = serverAPI + "Profile."
export var questionsService = serverAPI + "Questions."
export var notificationService = serverAPI + "Notification."

export var staticData = "http://" + window.location.hostname + ":8080/static/"
export var uploadStaticData = "http://" + window.location.hostname + ":8080/upload"

export var uploadStaticProfileData = "http://" + window.location.hostname + ":8080/upload/profile"
export var uploadStaticAnswerData = "http://" + window.location.hostname + ":8080/upload/answer"

function post(url, body, onResponse, onError, session) {
    axios.post(
        url,
        JSON.stringify({
            ...body,
            session
        })
    ).then(onResponse).catch((error) => {
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

    if (login === undefined || password === undefined) {
        history.push('/login')
    }

    let session = Cookies.get('session')

    if (session === undefined) {
        axios.post(authorizationService + "authorize", JSON.stringify({
            login: login,
            password: password
        })).then((response) => {
            Cookies.set('session', response.data.session)
            post(url, body, onResponse, onError, response.data.session)
        }).catch((error) => {
            if (error.response !== undefined && error.response.status === 401) {
                Cookies.remove('login')
                Cookies.remove('password')
                history.push('/login')
            }
        })
    } else {
        post(url, body, onResponse, onError, session)
    }
}

// export function PostForm(url, body, onResponse, onError) {
//     let login = Cookies.get('login')
//     let password = Cookies.get('password')
//
//     if (login === undefined || password === undefined) {
//         history.push('/login')
//     }
//
//     let session = Cookies.get('session')
//
//     if (session === undefined) {
//         axios.post(authorizationService+"authorize", JSON.stringify({
//             login: login, password: password
//         })).then((response) => {
//             Cookies.set('session', response.data.session)
//             post(url, body, onResponse, onError, response.data.session)
//         }).catch((error) => {
//             if (error.response !== undefined && error.response.status === 401) {
//                 Cookies.remove('login')
//                 Cookies.remove('password')
//                 history.push('/login')
//             }
//         })
//     } else {
//         post(url, body, onResponse, onError, session)
//     }
// }