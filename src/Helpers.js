import { store, persistor } from './redux/Store';
import {
    apiUrl
} from './App.json';

import {
    logout
} from './redux/actions/AuthActions'

export const PostMan = async(uriPath, method, payload, stringified=true) => {
    let responseObject
    const {
        auth
    } = store.getState()

    // console.log("Postman store", store.getState())

    const setHeaders = () => {
        let headers = {}
        if (auth.user) { headers['Authorization'] = `jwt ${auth.accessToken}` }
        if (stringified) { headers['Content-Type'] = 'application/json' }
        if (stringified) { headers['Accept'] = 'application/json' }
        headers['Accept'] = 'application/json'
        return headers
    }

    // console.log("payload: ", payload)

    // console.log("stringified: ", stringified)

    // console.log("apiUrl + uriPath: ", apiUrl + uriPath)
    
    await fetch(apiUrl + uriPath, {
        method: method,
        headers: new Headers(setHeaders()),
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: stringified ? JSON.stringify(payload) : payload
    })
    .then(async response => {
        console.log("response: ", response)
        let errorData

        const contentType = response.headers.get("content-type");

        if (response.ok) {
            if (response.status === 200 || response.status === 201) {

                if (contentType.indexOf("application/json") !== -1) {
                    return {
                        statusCode: response.status,
                        data: await response.json(),
                    }
                } else if (contentType.indexOf("application/pdf") !== -1 || contentType.indexOf("image/") !== -1) {
                    return {
                        statusCode: response.status,
                        data: await response.blob(),
                    }
                } else {
                    return {
                        statusCode: response.status,
                        data: await response.text(),
                    }
                }
            }
        } else {
            if (response.status === 400) {
                return {
                    statusCode: response.status,
                    data: await response.json(),
                }
            }

            if (response.status === 401) {
                return store.dispatch(logout())
                // return {
                //     statusCode: response.status,
                //     data: await response.json(),
                // }
            }

            if (response.status === 404) {
                return {
                    statusCode: response.status,
                    data: await response.text(),
                }
            }

            if (response.status === 500) {
                return {
                    statusCode: response.status,
                    data: await response.text(),
                }
            }

            // console.log("contentType: ", contentType)

            errorData = await response.json()
            throw new Error(errorData.message)
        }
    })
    .then(responseData => {
        console.log('POSTMAN responseData: ', responseData)
        if (responseData.statusCode == 400) {
            responseObject = {
                data: responseData.data,
                status: 'bad_request',
            }
        } else if (responseData.statusCode == 401) {
            responseObject = {
                data: responseData.data,
                status: 'unauthorized',
            }
        } else if (responseData.statusCode == 404) {
            responseObject = {
                data: {
                    message: "not_found",
                    content: responseData.data
                },
                status: 'error',
            }
        } else if (responseData.statusCode == 500) {
            responseObject = {
                data: {
                    message: "Something went wrong",
                    content: responseData.data
                },
                status: 'error',
            }
        } else {
            responseObject = {
                data: responseData.data,
                status: 'success',
            }
        }
    })
    .catch(errorData => {
        // console.log("errorData: ", errorData.message)
        responseObject = {
            data: {
                message: errorData.message,
            },
            status: 'error',
        }
    })
    return responseObject
}


export const isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));