import axios from 'axios';

export const baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export const API = {
    get: ({url, params, ...rest}) =>
        axios({
            method: 'GET',
            url,
            params,
            baseURL,
            ...rest
        }),
    post: ({url, data, ...rest}) =>
        axios({
            method: 'POST',
            url,
            data,
            baseURL,
            params: {
                developer: 'Urmat'
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...rest
        })
}