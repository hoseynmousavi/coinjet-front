import ImageShow from "../components/ImageShow"
import logo from "../../media/images/logo.png"
import Input from "../components/Input"
import Button from "../components/Button"
import Material from "../components/Material"
import {useContext, useState} from "react"
import Link from "../components/Link"
import urlConstant from "../../constant/urlConstant"
import AuthActions from "../../context/auth/AuthActions"
import {AuthContext} from "../../context/auth/AuthReducer"
import toastManager from "../../helpers/toastManager"
import {FAIL_TOAST} from "../../constant/toastTypes"
import numberCorrection from "../../helpers/numberCorrection"

function LoginSignUp({isSignUp})
{
    const {dispatch} = useContext(AuthContext)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const disabled = !(values.password && values.email && (values.full_name || !isSignUp))

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: numberCorrection(value)}))
    }

    function onSubmit()
    {
        setIsLoading(true)
        AuthActions[isSignUp ? "signup" : "login"]({...values, dispatch})
            .then(() => window.history.replaceState("", "", urlConstant.home))
            .catch(err =>
            {
                if (err?.response?.status === 404 && err?.response?.data?.message) toastManager.addToast({message: err?.response?.data?.message, type: FAIL_TOAST})
                setIsLoading(false)
            })
    }

    return (
        <div className="login-page">
            <div className="login-page-content">
                <div className="login-page-header">
                    <ImageShow className="login-page-logo" src={logo}/>
                </div>
                <div className="login-page-desc">به {process.env.REACT_APP_NAME} خوش آمدید</div>
                {isSignUp && <Input focusOnMountDesktop autoComplete="new-password" type="text" name="full_name" label="نام و نام خانوادگی" placeholder="نام کامل خود را وارد کنید" required onChange={onChange} onSubmit={onSubmit}/>}
                <Input focusOnMountDesktop={!isSignUp} autoComplete="new-password" type="text" name="email" label="ایمیل" placeholder="ایمیل خود را وارد کنید" validation="email" ltr required onChange={onChange} onSubmit={onSubmit} checkExist={false}/>
                <Input autoComplete="new-password" type="password" name="password" label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" validation="password" ltr required onChange={onChange} onSubmit={onSubmit}/>
                {isSignUp ? <br/> : <Material className="login-forget">رمز عبور خود را فراموش کرده‌اید؟</Material>}
                <Button loading={isLoading} disable={disabled} onClick={onSubmit}>
                    {isSignUp ? "ثبت‌نام" : "ورود"}
                </Button>
                {
                    isSignUp ?
                        <div className="login-page-terms">با استفاده از این سرویس، با شرایط استفاده و سیاست حفظ حریم خصوصی ما موافقت می کنید.</div>
                        :
                        <Link to={urlConstant.signUp}>
                            <Material className="login-page-sign-btn">ثبت‌نام نکرده‌اید؟ <span className="login-page-sign-btn-label">ثبت‌نام</span></Material>
                        </Link>
                }
            </div>
        </div>
    )
}

export default LoginSignUp