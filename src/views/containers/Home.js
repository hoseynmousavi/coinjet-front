import Switch from "../components/Switch"
import Route from "../components/Route"
import urlConstant from "../../constant/urlConstant"
import {lazy} from "react"

const HomePage = lazy(() => import("../pages/HomePage"))

function Home()
{
    return (
        <Switch>
            <Route path={urlConstant.home} render={() => <HomePage/>}/>
        </Switch>
    )
}

export default Home