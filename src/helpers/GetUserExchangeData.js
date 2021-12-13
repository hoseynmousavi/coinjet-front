import {useContext, useEffect, useRef} from "react"
import toastConstant from "../constant/toastConstant"
import {ExchangeContext} from "../context/exchange/ExchangeReducer"
import ExchangeActions from "../context/exchange/ExchangeActions"
import exchangeConstant from "../constant/exchangeConstant"

function GetUserExchangeData({userExchangeId, doAfterGet})
{
    const {state: {myExchanges, supportedExchanges}, dispatch} = useContext(ExchangeContext)
    const {list} = myExchanges
    const userExchangeData = list[userExchangeId]?.data
    const userExchangeLoading = !userExchangeData?.getDone
    const request = useRef(null)

    useEffect(() =>
    {
        if (!userExchangeLoading)
        {
            if (doAfterGet) doAfterGet()
        }
        else if (userExchangeId && list[userExchangeId] && Object.values(supportedExchanges.list).length)
        {
            ExchangeActions.getUserExchangeData({dispatch, userExchangeId, isKucoin: supportedExchanges.list[list[userExchangeId].exchange_id]._id === exchangeConstant.kucoinExchangeId, cancel: cancelSource => request.current = cancelSource})
                .then(() => doAfterGet && doAfterGet())
        }

        return () => request?.current?.cancel && request.current.cancel(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [supportedExchanges, userExchangeId, myExchanges])

    return {userExchangeData, userExchangeLoading}
}

export default GetUserExchangeData