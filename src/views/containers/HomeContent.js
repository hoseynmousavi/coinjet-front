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
    const sortedAccounts = Object.values(accounts || []).sort((a, b) => (b.balance * +prices[b.currency]) - (a.balance * +prices[a.currency]))
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
                                    <div className="home-content-value">${showNumber(sortedAccounts.reduce((sum, item) => sum + item.balance * +prices[item.currency], 0))}</div>
                                    {/*<div className="home-content-value-percent">-$0.00336</div>*/}
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="home-content-table">
                                <div className="home-content-table-col mobile">
                                    <div className="home-content-table-item title">نام</div>
                                    {sortedAccounts.map((item, index) => <div key={index} className="home-content-table-item">{item.currency}</div>)}
                                </div>
                                <div className="home-content-table-col">
                                    <div className="home-content-table-item title">مقدار</div>
                                    {sortedAccounts.map((item, index) => <div key={index} className="home-content-table-item">{showNumber(item.balance)}</div>)}
                                </div>
                                <div className="home-content-table-col">
                                    <div className="home-content-table-item title">قیمت</div>
                                    {sortedAccounts.map((item, index) => <div key={index} className="home-content-table-item">${showNumber(+prices[item.currency])}</div>)}
                                </div>
                                <div className="home-content-table-col mobile">
                                    <div className="home-content-table-item title">ارزش موجودی</div>
                                    {sortedAccounts.map((item, index) => <div key={index} className="home-content-table-item">${showNumber(item.balance * +prices[item.currency])}</div>)}
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