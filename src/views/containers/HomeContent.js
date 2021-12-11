function HomeContent()
{
    // const {state: {myExchanges: {selectedExchange}}} = useContext(ExchangeContext)
    // const [activeAccount, setActiveAccount] = useState(null)

    // const {yes} = GetUserExchangeData({userExchangeId: selectedExchange})

    return (
        <div className="home-content">
            <div className="home-content-header">
                <div>
                    <div className="home-content-value">$0.075664</div>
                    <div className="home-content-value-percent">-$0.00336</div>
                </div>
                <div>

                </div>
            </div>
            <div className="home-content-table">
                <div className="home-content-table-col">
                    <div className="home-content-table-item title">نام</div>
                    <div className="home-content-table-item">Bitcoin</div>
                </div>
                <div className="home-content-table-col">
                    <div className="home-content-table-item title">مقدار</div>
                    <div className="home-content-table-item">0.00008191</div>
                </div>
                <div className="home-content-table-col">
                    <div className="home-content-table-item title">قیمت</div>
                    <div className="home-content-table-item">$548.07</div>
                </div>
                <div className="home-content-table-col">
                    <div className="home-content-table-item title">ارزش موجودی</div>
                    <div className="home-content-table-item">$0.045292</div>
                </div>
                <div className="home-content-table-col">
                    <div className="home-content-table-item title">سود / زیان</div>
                    <div className="home-content-table-item">3.81 %</div>
                </div>
            </div>
        </div>
    )
}

export default HomeContent