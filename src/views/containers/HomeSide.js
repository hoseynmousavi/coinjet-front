import Button from "../components/Button"
import Input from "../components/Input"
import SearchSvg from "../../media/svg/SearchSvg"
import Material from "../components/Material"
import SortSvg from "../../media/svg/SortSvg"
import KuCoinSvg from "../../media/svg/KuCoinSvg"
import GetMyExchanges from "../../helpers/GetMyExchanges"
import {useContext, useState} from "react"
import MyLoader from "../components/MyLoader"
import AddPortfo from "../components/AddPortfo"
import TrashSvg from "../../media/svg/TrashSvg"
import ExchangeActions from "../../context/exchange/ExchangeActions"
import {ExchangeContext} from "../../context/exchange/ExchangeReducer"
import exchangeConstant from "../../constant/exchangeConstant"
import ImageShow from "../components/ImageShow"
import nobitexLogo from "../../media/images/nobitex.webp"

function HomeSide()
{
    const {dispatch} = useContext(ExchangeContext)
    const {myExchanges, myExchangesIsLoading, selectedExchange} = GetMyExchanges()
    const [addingPortfo, setAddingPortfo] = useState(false)

    function togglePortfo(flag)
    {
        return () => setAddingPortfo(flag)
    }

    function removeAccount(userExchangeId)
    {
        return e =>
        {
            e.stopPropagation()
            ExchangeActions.removeUserExchange({userExchangeId, dispatch})
        }
    }

    function selectAccount(selectedExchange)
    {
        return () => ExchangeActions.selectExchange({selectedExchange, dispatch})
    }

    return (
        <>
            <div className="home-side">
                <div className="home-side-add-cont">
                    <Button onClick={togglePortfo(true)}>افزودن پورتفو</Button>
                </div>
                <div className="home-side-header">
                    <div className="home-side-search">
                        <Input className="home-side-search-label" Icon={SearchSvg} placeholder="جستجو"/>
                    </div>
                    <Material className="home-side-sort"><SortSvg className="home-side-sort-icon"/></Material>
                </div>
                {
                    myExchangesIsLoading ?
                        <div className="home-side-item loading">
                            <MyLoader width={24}/>
                        </div>
                        :
                        Object.values(myExchanges)?.length ?
                            Object.values(myExchanges).map(item =>
                                <Material key={item._id} className={`home-side-item ${selectedExchange === item._id ? "active" : ""}`} onClick={selectAccount(item._id)}>
                                    {
                                        item.exchange_id === exchangeConstant.kucoinExchangeId ?
                                            <KuCoinSvg className="home-side-item-icon"/>
                                            :
                                            <ImageShow className="home-side-item-icon" src={nobitexLogo}/>
                                    }
                                    <div className="home-side-item-title">{item.name}</div>
                                    <TrashSvg className="home-side-item-delete" onClick={removeAccount(item._id)}/>
                                </Material>,
                            )
                            :
                            <div className="home-side-item none">شما حسابی ندارید.</div>
                }
            </div>

            {
                addingPortfo &&
                <AddPortfo close={togglePortfo(false)}/>
            }
        </>
    )
}

export default HomeSide