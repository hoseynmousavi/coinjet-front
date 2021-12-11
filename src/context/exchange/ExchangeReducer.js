import {createContext, useEffect, useReducer} from "react"
import logoutManager from "../../helpers/logoutManager"
import {LOGOUT} from "../auth/AuthTypes"
import {ADD_MY_EXCHANGE, DELETE_MY_EXCHANGE, GET_MY_EXCHANGES, SELECT_EXCHANGE} from "./ExchangeTypes"
import ExchangeActions from "./ExchangeActions"

export const ExchangeContext = createContext(null)

const initialState = {
    myExchanges: {
        list: {},
        selectedExchange: null,
        getDone: false,
    },
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case GET_MY_EXCHANGES:
        {
            const {exchanges} = action.payload
            const exchangeList = exchanges.reduce((sum, item) => ({...sum, [item._id]: item}), {})
            const selectedExchange = state.myExchanges.selectedExchange && exchangeList[state.myExchanges.selectedExchange] ? state.myExchanges.selectedExchange : exchanges[0]?._id || null
            if (selectedExchange) localStorage.setItem("selectedExchange", selectedExchange)
            else localStorage.removeItem("selectedExchange")
            return {
                ...state,
                myExchanges: {
                    ...state.myExchanges,
                    list: exchangeList,
                    selectedExchange,
                    getDone: true,
                },
            }
        }
        case SELECT_EXCHANGE:
        {
            const {selectedExchange} = action.payload
            if (selectedExchange) localStorage.setItem("selectedExchange", selectedExchange)
            else localStorage.removeItem("selectedExchange")
            return {
                ...state,
                myExchanges: {
                    ...state.myExchanges,
                    selectedExchange,
                },
            }
        }
        case ADD_MY_EXCHANGE:
        {
            const {addedExchange} = action.payload
            const selectedExchange = addedExchange._id
            if (selectedExchange) localStorage.setItem("selectedExchange", selectedExchange)
            else localStorage.removeItem("selectedExchange")
            return {
                ...state,
                myExchanges: {
                    ...state.myExchanges,
                    list: {...state.myExchanges.list, [addedExchange._id]: addedExchange},
                    selectedExchange,
                },
            }
        }
        case DELETE_MY_EXCHANGE:
        {
            const {userExchangeId} = action.payload
            const exchangeList = {...state.myExchanges.list}
            delete exchangeList[userExchangeId]
            const selectedExchange = state.myExchanges.selectedExchange && exchangeList[state.myExchanges.selectedExchange] ? state.myExchanges.selectedExchange : Object.values(exchangeList)[0]?._id || null
            if (selectedExchange) localStorage.setItem("selectedExchange", selectedExchange)
            else localStorage.removeItem("selectedExchange")
            return {
                ...state,
                myExchanges: {
                    ...state.myExchanges,
                    list: exchangeList,
                    selectedExchange,
                },
            }
        }
        case LOGOUT:
        {
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function ExchangeProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const selectedExchange = localStorage.getItem("selectedExchange")
        if (selectedExchange && selectedExchange !== "null") ExchangeActions.selectExchange({dispatch, selectedExchange})

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <ExchangeContext.Provider value={{state, dispatch}}>
            {children}
        </ExchangeContext.Provider>
    )
}

export default ExchangeProvider