import {useContext, useEffect, useRef} from "react"
import toastConstant from "../constant/toastConstant"
import {ExchangeContext} from "../context/exchange/ExchangeReducer"
import ExchangeActions from "../context/exchange/ExchangeActions"

function GetMyExchanges({doAfterGet} = {})
{
    const {state: {myExchanges: {list, selectedExchange, getDone}}, dispatch} = useContext(ExchangeContext)
    const myExchangesIsLoading = !getDone
    const request = useRef(null)

    useEffect(() =>
    {
        if (!myExchangesIsLoading)
        {
            if (doAfterGet) doAfterGet()
        }
        else
        {
            ExchangeActions.getMyExchanges({dispatch, cancel: cancelSource => request.current = cancelSource}).then(() => doAfterGet && doAfterGet())
        }

        return () => request?.current?.cancel && request.current.cancel(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [])

    return {myExchanges: list, myExchangesIsLoading, selectedExchange}
}

export default GetMyExchanges