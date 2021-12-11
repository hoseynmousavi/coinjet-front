import {useContext} from "react"
import {ExchangeContext} from "../../context/exchange/ExchangeReducer"
import GetUserExchangeData from "../../helpers/GetUserExchangeData"
import MyLoader from "../components/MyLoader"
import showNumber from "../../helpers/showNumber"

function HomeContent()
{
    const {state: {myExchanges: {selectedExchange}}} = useContext(ExchangeContext)
    const {userExchangeData, userExchangeLoading} = GetUserExchangeData({userExchangeId: selectedExchange})
    const {prices, accounts} = userExchangeData || {}
    return (
        <div className="home-content">
            {
                selectedExchange ?
                    userExchangeLoading ?
                        <MyLoader/>
                        :
                        <>
                            <div className="home-content-header">
                                <div>
                                    <div className="home-content-value">${showNumber(Object.values(accounts).reduce((sum, item) => sum + item.available * +prices[item.currency], 0))}</div>
                                    {/*<div className="home-content-value-percent">-$0.00336</div>*/}
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="home-content-table">
                                <div className="home-content-table-col mobile">
                                    <div className="home-content-table-item title">نام</div>
                                    {Object.values(accounts).map((item, index) => <div key={index} className="home-content-table-item">{item.currency}</div>)}
                                </div>
                                <div className="home-content-table-col">
                                    <div className="home-content-table-item title">مقدار</div>
                                    {Object.values(accounts).map((item, index) => <div key={index} className="home-content-table-item">{showNumber(item.available)}</div>)}
                                </div>
                                <div className="home-content-table-col">
                                    <div className="home-content-table-item title">قیمت</div>
                                    {Object.values(accounts).map((item, index) => <div key={index} className="home-content-table-item">${showNumber(+prices[item.currency])}</div>)}
                                </div>
                                <div className="home-content-table-col mobile">
                                    <div className="home-content-table-item title">ارزش موجودی</div>
                                    {Object.values(accounts).map((item, index) => <div key={index} className="home-content-table-item">${showNumber(item.available * +prices[item.currency])}</div>)}
                                </div>
                                {/*<div className="home-content-table-col">*/}
                                {/*    <div className="home-content-table-item title">سود / زیان</div>*/}
                                {/*    <div className="home-content-table-item">3.81 %</div>*/}
                                {/*</div>*/}
                            </div>
                        </>
                    :
                    null
            }
        </div>
    )
}

export default HomeContent