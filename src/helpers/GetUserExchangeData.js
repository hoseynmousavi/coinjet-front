import {useContext, useEffect, useRef} from "react"
import toastConstant from "../constant/toastConstant"
import {ExchangeContext} from "../context/exchange/ExchangeReducer"
import ExchangeActions from "../context/exchange/ExchangeActions"

function GetUserExchangeData({userExchangeId, doAfterGet})
{
    const {state: {myExchanges: {list}}, dispatch} = useContext(ExchangeContext)
    const userExchangeData = list[userExchangeId]?.data
    const userExchangeLoading = !userExchangeData?.getDone
    const request = useRef(null)

    useEffect(() =>
    {
        if (!userExchangeLoading)
        {
            if (doAfterGet) doAfterGet()
        }
        else if (userExchangeId)
        {
            console.log(userExchangeId, typeof userExchangeId)
            ExchangeActions.getUserExchangeData({dispatch, userExchangeId, cancel: cancelSource => request.current = cancelSource}).then(() => doAfterGet && doAfterGet())
        }

        return () => request?.current?.cancel && request.current.cancel(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [])

    return {userExchangeData, userExchangeLoading}
}

export default GetUserExchangeData