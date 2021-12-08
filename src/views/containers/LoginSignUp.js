import ImageShow from "../components/ImageShow"
import logo from "../../media/images/coinjet.png"
import Input from "../components/Input"
import Button from "../components/Button"
import Material from "../components/Material"
import {useState} from "react"
import Link from "../components/Link"
import urlConstant from "../../constant/urlConstant"

function LoginSignUp({isSignUp})
{
    const [values, setValues] = useState({})
    const disabled = !(values.password && values.email)

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function onSubmit()
    {

    }

    return (
        <div className="login-page">
            <div className="login-page-content">
                <div className="login-page-header">
                    <ImageShow className="login-page-logo" src={logo}/>
                </div>
                <div className="login-page-desc">به {process.env.REACT_APP_NAME} خوش آمدید</div>
                <Input autoComplete="new-password" type="text" name="email" label="ایمیل" placeholder="ایمیل خود را وارد کنید" validation="email" ltr required onChange={onChange} onSubmit={onSubmit} checkExist={false}/>
                <Input autoComplete="new-password" type="password" name="password" label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" validation="password" ltr required onChange={onChange} onSubmit={onSubmit}/>
                {isSignUp ? <br/> : <Material className="login-forget">رمز عبور خود را فراموش کرده‌اید؟</Material>}
                <Button loading={false} disable={disabled} onClick={onSubmit}>
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