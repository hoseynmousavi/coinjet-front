import Input from "./Input"
import Button from "./Button"
import VerticalPanel from "./VerticalPanel"
import {useContext, useState} from "react"
import ExchangeActions from "../../context/exchange/ExchangeActions"
import {ExchangeContext} from "../../context/exchange/ExchangeReducer"
import numberCorrection from "../../helpers/numberCorrection"

function AddPortfo({close})
{
    const {dispatch} = useContext(ExchangeContext)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const disabled = Object.values(values).filter(item => !!item).length < 4

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: numberCorrection(value)}))
    }

    function submit()
    {
        setIsLoading(true)
        ExchangeActions.addUserExchange({
            dispatch,
            ...values,
            exchange_id: "61b4799ee1699274c1a7e360",
        })
            .then(() =>
            {
                setIsLoading(false)
                close()
            })
            .catch(() => setIsLoading(false))
    }

    return (
        <VerticalPanel close={close}>
            <div className="home-side-add-title">افزودن حساب</div>
            <div className="home-side-add-desc">لطفا اطلاعات حساب kucoin خودتون رو وارد کنید.</div>
            <Input className="home-side-add-input" name="name" onChange={onChange} label="نام حساب" placeholder="نام انتخابی خود را وارد کنید" required noSpace/>
            <Input className="home-side-add-input" name="user_key" onChange={onChange} label="Key" placeholder="لطفا Key را وارد کنید" required noSpace/>
            <Input className="home-side-add-input" name="user_secret" onChange={onChange} label="Secret" placeholder="لطفا Secret را وارد کنید" required noSpace/>
            <Input className="home-side-add-input" name="user_passphrase" onChange={onChange} label="Passphrase" placeholder="لطفا Passphrase را وارد کنید" required noSpace/>
            <Button className="home-side-add-submit" disable={disabled} loading={isLoading} onClick={submit}>
                ثبت
            </Button>
        </VerticalPanel>
    )
}

export default AddPortfo