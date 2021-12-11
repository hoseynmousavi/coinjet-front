import {SET_USER} from "./AuthTypes"
import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"

const login = ({email, password, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.login, data: {email, password}})
        .then(user =>
        {
            setUser({user, dispatch})
            return user
        })
}

const signup = ({full_name, email, password, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.signup, data: {full_name, email, password}})
        .then(user =>
        {
            setUser({user, dispatch})
            return user
        })
}

const getUser = ({dispatch}) =>
{
    // request.get({url: apiUrlsConstant.getUser, dontCache: true, dontToast: true})
    //     .then(user =>
    //     {
    //         setUser({user, dispatch})
    //     })
}

// const getTokenWithRefreshToken = () =>
// {
//     return request.get({url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
//         .then(res =>
//         {
//             const {refreshToken, token} = res
//             localStorage.setItem("token", token)
//             localStorage.setItem("refreshToken", refreshToken)
//             return true
//         })
//         .catch(() =>
//         {
//             return false
//         })
// }

const setUser = ({user, dispatch}) =>
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

const AuthActions = {
    login,
    signup,
    getUser,
    setUser,
}

export default AuthActions