import Input from "./Input"
import Button from "./Button"
import VerticalPanel from "./VerticalPanel"
import {useContext, useState} from "react"
import ExchangeActions from "../../context/exchange/ExchangeActions"
import {ExchangeContext} from "../../context/exchange/ExchangeReducer"
import numberCorrection from "../../helpers/numberCorrection"
import exchangeConstant from "../../constant/exchangeConstant"

function AddPortfo({close})
{
    const {state: {supportedExchanges: {list}}, dispatch} = useContext(ExchangeContext)
    const [selectedExchange, setSelectedExchange] = useState(null)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const disabled = Object.values(values).filter(item => !!item).length < (selectedExchange?.id === exchangeConstant.kucoinExchangeId ? 4 : 2)

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: numberCorrection(value)}))
    }

    function selectEx(item)
    {
        return () =>
        {
            setValues({})
            setSelectedExchange(item)
        }
    }

    function submit()
    {
        setIsLoading(true)
        ExchangeActions.addUserExchange({
            dispatch,
            ...values,
            exchange_id: selectedExchange._id,
        })
            .then(() =>
            {
                setIsLoading(false)
                close()
            })
            .catch(() => setIsLoading(false))
    }

    return (
        !selectedExchange ?
            <VerticalPanel key="add-1" close={close}>
                <div className="home-side-add-title">افزودن حساب</div>
                <div className="home-side-add-desc">لطفا صرافی مورد نظرتون رو انتخاب کنید.</div>
                {
                    Object.values(list).map(item =>
                        <Button className="home-side-btn" key={item.name} onClick={selectEx(item)}>{item.name}</Button>,
                    )
                }
            </VerticalPanel>
            :
            <VerticalPanel key="add-2" dontPush close={close}>
                <div className="home-side-add-title">افزودن حساب</div>
                <div className="home-side-add-desc">لطفا اطلاعات حساب {selectedExchange.name} خودتون رو وارد کنید.</div>
                <Input className="home-side-add-input" name="name" onChange={onChange} label="نام حساب" placeholder="نام انتخابی خود را وارد کنید" required noSpace/>
                <Input className="home-side-add-input"
                       name="user_key"
                       onChange={onChange}
                       label={selectedExchange._id === exchangeConstant.kucoinExchangeId ? "Key" : "توکن"}
                       placeholder={`لطفا ${selectedExchange._id === exchangeConstant.kucoinExchangeId ? "Key" : "توکن"} را وارد کنید`}
                       required
                       noSpace
                />
                {
                    selectedExchange._id === exchangeConstant.kucoinExchangeId &&
                    <>
                        <Input className="home-side-add-input" name="user_secret" onChange={onChange} label="Secret" placeholder="لطفا Secret را وارد کنید" required noSpace/>
                        <Input className="home-side-add-input" name="user_passphrase" onChange={onChange} label="Passphrase" placeholder="لطفا Passphrase را وارد کنید" required noSpace/>
                    </>
                }
                <Button className="home-side-add-submit" disable={disabled} loading={isLoading} onClick={submit}>
                    ثبت
                </Button>
            </VerticalPanel>
    )
}

export default AddPortfo