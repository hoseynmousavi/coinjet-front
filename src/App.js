import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"
import Switch from "./views/components/Switch"
import {Suspense} from "react"
import LoadingWrapper from "./views/components/LoadingWrapper"
import urlConstant from "./constant/urlConstant"
import PrivateRoute from "./helpers/PrivateRoute"
import Home from "./views/containers/Home"
import LoginPage from "./views/pages/LoginPage"
import SignUpPage from "./views/pages/SignUpPage"

function App({location})
{
    return (
        <>
            <ThemeColorBar/>
            <Suspense fallback={<LoadingWrapper key="loading-wrapper"/>}>
                <Switch>
                    <PrivateRoute ifNotLogin dontChange path={urlConstant.login} render={() => <LoginPage/>}/>
                    <PrivateRoute ifNotLogin dontChange path={urlConstant.signUp} render={() => <SignUpPage/>}/>
                    <PrivateRoute path="*" render={() => <Home/>}/>
                </Switch>
            </Suspense>
            <ToastContainer location={location}/>
        </>
    )
}

export default App