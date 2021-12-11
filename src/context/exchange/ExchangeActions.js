import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_MY_EXCHANGE, DELETE_MY_EXCHANGE, GET_EXCHANGE_DATA, GET_MY_EXCHANGES, SELECT_EXCHANGE} from "./ExchangeTypes"

const getMyExchanges = ({dispatch, cancel}) =>
{
    return request.get({url: apiUrlsConstant.userExchange, cancel})
        .then(exchanges =>
        {
            dispatch({
                type: GET_MY_EXCHANGES,
                payload: {exchanges},
            })
        })
}

const getUserExchangeData = ({dispatch, userExchangeId, cancel}) =>
{
    return request.get({url: apiUrlsConstant.kucoinUserExchangeData, cancel, param: userExchangeId})
        .then(data =>
        {
            dispatch({
                type: GET_EXCHANGE_DATA,
                payload: {userExchangeId, data},
            })
        })
}

const selectExchange = ({selectedExchange, dispatch}) =>
{
    dispatch({
        type: SELECT_EXCHANGE,
        payload: {selectedExchange},
    })
}

const addUserExchange = ({exchange_id, name, user_key, user_secret, user_passphrase, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.userExchange, data: {exchange_id, name, user_key, user_secret, user_passphrase}})
        .then(addedExchange =>
        {
            dispatch({
                type: ADD_MY_EXCHANGE,
                payload: {addedExchange},
            })
        })
}

const removeUserExchange = ({userExchangeId, dispatch}) =>
{
    return request.del({url: apiUrlsConstant.userExchange, data: {userExchangeId}})
        .then(() =>
        {
            dispatch({
                type: DELETE_MY_EXCHANGE,
                payload: {userExchangeId},
            })
        })
}

const ExchangeActions = {
    getMyExchanges,
    getUserExchangeData,
    selectExchange,
    addUserExchange,
    removeUserExchange,
}

export default ExchangeActions