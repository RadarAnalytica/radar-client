import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'
import DashboardFilter from '../components/DashboardFilter'
import MediumPlate from '../components/MediumPlate'
import SmallPlate from '../components/SmallPlate'
import BigChart from '../components/BigChart'
import FinanceTable from '../components/FinanceTable'
import StorageTable from '../components/StorageTable'
import ChartTable from '../components/ChartTable'
import WidePlate from '../components/WidePlate'
import { URL } from '../service/config'
import { abcAnalysis, filterArrays, formatDate, generateDateList } from '../service/utils'
import { ServiceFunctions } from '../service/serviceFunctions'
import MobileMenu from '../components/MobileMenu'

const DashboardPage = () => {

    const { user, authToken, showMobile } = useContext(AuthContext)


    const [wbData, setWbData] = useState()
    const [days, setDays] = useState(30)

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            if (!user || (user && !user.isOnboarded)) {
                // navigate('/development/onboarding')
            }
        }, 1500);
    }, [user])

    const [content, setContent] = useState()
    const [state, setState] = useState()

    const [brandNames, setBrandNames] = useState()
    const [activeBrand, setActiveBrand] = useState()
    useEffect(() => {
        if (user) {
            ServiceFunctions.getBrandNames(user.id).then(data => {
                let names = [...new Set(data)]
                setBrandNames(names)
            })
        }
    }, [user])
    useEffect(() => {
        if (brandNames && brandNames.length) {
            setActiveBrand(brandNames[0])
        }
    }, [brandNames])


    useEffect(() => {
        if (user && activeBrand) {
            ServiceFunctions.getDataCollection(user.id, days, activeBrand).then(data => setWbData(filterArrays(data, days)))
            ServiceFunctions.getDataCollection(user.id, days, activeBrand).then(data => setState(data))
        }
    }, [user, activeBrand])

    useEffect(() => {
        if (wbData) {
            setContent(wbData.content)
        }
    }, [wbData])

    // Заказы
    const orders = wbData && wbData.orders ? wbData.orders.data : []
    // продажи
    const sales = wbData && wbData.sales ? wbData.sales.data : []
    // склады
    const warehouses = wbData && wbData.warehouses ? wbData.warehouses.data : []

    const [reportDaily, setReportDaily] = useState()
    const [reportWeekly, setReportWeekly] = useState()
    const [reportTwoWeeks, setReportTwoWeeks] = useState()
    const [reportMonthly, setReportMonthly] = useState()
    const [reportThreeMonths, setReportThreeMonths] = useState()

    useEffect(() => {
        if (wbData) {
            setReportDaily(wbData.reportDaily?.data?.data?.groups[0]?.statistics)
            setReportWeekly(wbData.reportWeekly?.data?.data?.groups[0]?.statistics)
            setReportTwoWeeks(wbData.reportTwoWeeks?.data?.data?.groups[0]?.statistics)
            setReportMonthly(wbData.reportMonthly?.data?.data?.groups[0]?.statistics)
            setReportThreeMonths(wbData.reportThreeMonths?.data?.data?.groups[0]?.statistics)
        }
    }, [wbData])

    const [curOrders, setCurOrders] = useState()
    useEffect(() => {
        if (days == 1) {
            setCurOrders(reportDaily)
        } else if (days == 7) {
            setCurOrders(reportWeekly)
        } else if (days == 14) {
            setCurOrders(reportTwoWeeks)
        } else if (days == 30) {
            setCurOrders(reportMonthly)
        } else if (days == 92) {
            setCurOrders(reportThreeMonths)
        }
    }, [days, wbData])


    const storeData = [
        {
            name: "FBO",
            initialPrice: content?.fbo?.fboAmount * 1000,
            salesPrice: content?.fbo?.fbo?.toFixed(0) || 0,
            quantity: content?.fbo?.fboAmount || 0,
        },
        {
            name: "FBS",
            initialPrice: content?.fbo?.fbsAmount * 1000,
            salesPrice: content?.fbo?.fbs,
            quantity: content?.fbo?.fbsAmount || 0,
        },
        {
            name: "Едет к клиенту",
            initialPrice: content?.toClient?.reduce((acc, el) => acc + (el.inWayToClient), 0) * 1000,
            salesPrice: content?.toClient?.reduce((acc, el) => acc + (el.inWayToClient * el.Price), 0) || 0,
            quantity: content?.toClient?.reduce((acc, el) => acc + (el.inWayToClient), 0) || 0,
        },
        {
            name: "Едет от клиента",
            initialPrice: '-',
            salesPrice: content?.fromClient?.reduce((acc, el) => acc + (el.inWayFromClient * el.Price), 0) || 0,
            quantity: content?.fromClient?.reduce((acc, el) => acc + (el.inWayFromClient), 0) || 0,
        },
        {
            name: "Не распределено",
            initialPrice: content?.notSorted?.amount * 1000,
            salesPrice: content?.notSorted?.sum,
            quantity: content?.notSorted?.amount,
        },
    ]

    const costsData = [
        {
            name: 'Реклама (ДРР (общий))',
            amount: content?.advertisment?.expensesCurrentPeriod || '0',
            percent: content?.advertisment?.expensesPercentageCurrentPeriod || '0',
            percentRate: content?.advertisment?.growthPercentageExpenses || '0',
            percentRate2: content?.advertisment?.growthPercentageExpensesPercentage || '0'
        },
        {
            name: 'Комиссия (от выручки)',
            amount: content?.commissionFromProfit?.commissionSum || '0',
            percent: content?.commissionFromProfit?.commissionPercent || '0',
            percentRate: content?.commissionFromProfit?.commissionSumGrowth || '0',
            percentRate2: content?.commissionFromProfit?.commissionPercentGrowth || '0'
        },
        {
            name: 'Логистика (от выручки)',
            amount: content?.logisticsFromProfit?.deliverySum || '0',
            percent: content?.logisticsFromProfit?.percent || '0',
            percentRate: content?.logisticsFromProfit?.deliveryGrowth || '0',
            percentRate2: content?.logisticsFromProfit?.percentGrowth || '0'
        },
    ]

    const financeData = [
        {
            name: 'Выручка',
            amount: content?.profit?.sum || '0',
            rate: content?.profit?.sumPercent || '0',
        },
        {
            name: 'Себестоимость продаж',
            amount: curOrders?.selectedPeriod?.buyoutsCount * 1000 || '0',
            rate: 0,
        },
        {
            name: 'Маржинальная стоимость',
            amount: content?.marginCosts?.currentGrossMargin || '0',
            rate: content?.marginCosts?.marginGrowth?.toFixed(2) || '0',
        },
        {
            name: 'Валовая прибыль',
            amount: content?.grossProfit?.sum - (curOrders?.selectedPeriod?.buyoutsCount * 1000) || '0',
            rate: content?.grossProfit?.percent,
        },
        {
            name: 'Налог',
            amount: content?.tax.sum || '0',
            rate: content?.tax?.percent || '0',
        },
        {
            name: 'Чистая прибыль',
            amount: content?.netProfit?.sum || '0',
            rate: content?.netProfit?.marginGrowth?.toFixed(2),
        },
        {
            name: 'Средняя прибыль',
            amount: content?.averageProfit?.averageReceiptLastDays || '0',
            rate: content?.averageProfit?.growthRate?.toFixed(2) || '0',
        },
    ]

    const calcRoi = (stock) => {
        const sum = stock?.reduce((acc, item) => acc + (item.quantity + item.quantityFull) * 1000, 0)
        return sum || 0
    }

    const profitabilityData = [
        {
            name: 'Процент выкупа',
            value: curOrders?.selectedPeriod?.conversions?.buyoutsPercent || '0'
        },
        {
            name: 'ROI',
            value: curOrders?.selectedPeriod?.buyoutsSumRub / calcRoi(wbData?.stocks?.data) * 100 || '0'
        },
        {
            name: 'Рентабельность ВП',
            value: content?.vpProfitMargin?.percent || '0'
        },
        {
            name: 'Рентабельность ОП',
            value: content?.opProfitMargin?.percent || '0'
        },
    ]


    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 8000);
    }, [loading])


    const changePeriod = () => {
        setLoading(true)
        if (user && days && activeBrand) {
            ServiceFunctions.getFilteredCollection(user.id, days, activeBrand).then(data => setWbData(filterArrays(data, days)))
        }
    }

    useEffect(() => {
        changePeriod()
    }, [days, activeBrand])

    const [chartUnitRub, setChartUnitRub] = useState(true)

    const dateList = days ? generateDateList(Number(days)) : generateDateList(7)

    const orderValuesRub = orders && orders.length ? orders?.map(i => ({ price: i.finishedPrice, date: new Date(i.date).toLocaleDateString() })) : []
    const salesValuesRub = sales && sales.length ? sales?.map(i => ({ price: i.finishedPrice, date: new Date(i.date).toLocaleDateString() })) : []

    const summedOrderRub = orderValuesRub.reduce((acc, curr) => {
        if (acc[curr.date]) {
            acc[curr.date] += curr.price;
        } else {
            acc[curr.date] = curr.price;
        }
        return acc;
    }, {});

    const summedSalesRub = salesValuesRub.reduce((acc, curr) => {
        if (acc[curr.date]) {
            acc[curr.date] += curr.price;
        } else {
            acc[curr.date] = curr.price;
        }
        return acc;
    }, {});

    const summedOrderArray = Object.keys(summedOrderRub).map(date => (summedOrderRub[date].toFixed(2))).slice(0, days);
    const summedSalesArray = Object.keys(summedSalesRub).map(date => (summedSalesRub[date].toFixed(2))).slice(0, days);


    const ordersByDate = orderValuesRub.reduce((acc, item) => {
        const { date } = item;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const salesByDate = salesValuesRub.reduce((acc, item) => {
        const { date } = item;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const totalOrByDate = Object.entries(ordersByDate).map(([date, count]) => count).slice(0, days);
    const totalsalesByDate = Object.entries(salesByDate).map(([date, count]) => count).slice(0, days);

    const [orderOn, setOrderOn] = useState(true)
    const [salesOn, setSalesOn] = useState(true)


    const uniquSalesDate = [...new Set(sales.map(i => formatDate(new Date(i.date))))]
    const uniquOrdersDate = [...new Set(orders.map(i => formatDate(new Date(i.date))))]
    const labels = [...new Set(uniquOrdersDate.concat(uniquSalesDate))]

    const data = {
        labels: labels?.map(item => item.split(' ')) || [],
        datasets: [
            orderOn ? {
                label: 'Заказы',
                backgroundColor: 'rgba(240, 173, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                data: chartUnitRub ? summedOrderArray : totalOrByDate ? totalOrByDate : [],
            } : {
                label: 'Заказы',
                backgroundColor: 'rgba(240, 173, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                data: []
            },
            salesOn ? {
                label: 'Продажи',
                backgroundColor: 'rgba(83, 41, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                data: chartUnitRub ? summedSalesArray : totalsalesByDate ? totalsalesByDate : [],
            } : {
                label: 'Продажи',
                backgroundColor: 'rgba(83, 41, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                data: []
            },
        ],
    };

    const sortedValuesArray = data?.datasets?.map(arr => arr?.data).flat(1)?.sort((a, b) => b - a)
    const maxValue = sortedValuesArray && sortedValuesArray.length ? sortedValuesArray[0] : 0

    // console.log(curOrders);
    // console.log(wbData);

    return (
        user && <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Сводка продаж'} />

                <DashboardFilter
                    brandNames={brandNames}
                    defaultValue={days}
                    setDays={setDays}
                    changeBrand={setActiveBrand}
                />
                {
                    loading ?
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
                            <span className="loader"></span>
                        </div>
                        :
                        wbData && user &&

                        <div>

                            <div className="container dash-container p-4 pt-0 d-flex gap-3">
                                <MediumPlate name={'Заказы'}
                                    value={curOrders?.selectedPeriod?.ordersSumRub || 0}
                                    quantity={curOrders?.selectedPeriod?.ordersCount || 0}
                                    percent={curOrders?.periodComparison?.avgPriceRubDynamics || 0}
                                    percent2={curOrders?.periodComparison?.avgOrdersCountPerDayDynamics || 0}
                                    text={curOrders?.selectedPeriod?.avgPriceRub * curOrders?.selectedPeriod?.avgOrdersCountPerDay || 0}
                                    text2={curOrders?.selectedPeriod?.avgOrdersCountPerDay || 0}
                                />
                                <MediumPlate
                                    name={'Продажи'}
                                    value={curOrders?.selectedPeriod?.buyoutsSumRub || 0}
                                    quantity={curOrders?.selectedPeriod?.buyoutsCount || 0}
                                    percent={curOrders?.periodComparison?.buyoutsSumRubDynamics || 0}
                                    percent2={curOrders?.periodComparison?.buyoutsCountDynamics || 0}
                                    text={curOrders?.selectedPeriod?.buyoutsSumRub / days || 0}
                                    text2={curOrders?.selectedPeriod?.buyoutsCount / days || 0}
                                />
                                <MediumPlate
                                    name={'Возвраты'}
                                    value={curOrders?.selectedPeriod?.cancelSumRub || 0}
                                    quantity={curOrders?.selectedPeriod?.cancelCount || 0}
                                    percent={curOrders?.periodComparison?.cancelSumRubDynamics || 0}
                                    percent2={curOrders?.periodComparison?.cancelCountDynamics || 0}
                                // text={content?.returned?.currentReturnsCount || 0}
                                // text2={content?.returned?.currentReturnsCount || 0}
                                />
                                <div className="col d-flex flex-column">
                                    <div className='mb-3'>
                                        <SmallPlate
                                            name={'Процент выкупа'}
                                            value={curOrders?.selectedPeriod?.conversions?.buyoutsPercent || 0}
                                            type={'percent'}
                                            percent={curOrders?.periodComparison?.conversions?.buyoutsPercent || '0'}
                                        />
                                    </div>
                                    <SmallPlate
                                        name={'Средний чек'}
                                        value={curOrders?.selectedPeriod?.avgPriceRub || 0}
                                        type={'price'}
                                        percent={curOrders?.periodComparison?.avgPriceRubDynamics || 0}
                                    />
                                </div>
                            </div>
                            <div className="container dash-container p-4 pt-0 pb-3 d-flex gap-3">
                                <div className="col chart-wrapper">
                                    <BigChart name={'Заказы и продажи'} data={data}
                                        orderOn={orderOn}
                                        salesOn={salesOn}
                                        setOrderOn={setOrderOn}
                                        setSalesOn={setSalesOn}
                                        setChartUnitRub={setChartUnitRub}
                                        chartUnitRub={chartUnitRub}
                                        maxValue={maxValue}
                                    />
                                </div>
                            </div>


                            <div className="container dash-container p-4 pt-0 pb-3 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate smallText={true}
                                        name={'Себестоимость проданных товаров'}
                                        nochart={true}
                                        type={'price'}
                                        quantity={curOrders?.selectedPeriod?.buyoutsCount || 0}
                                        value={1000 * curOrders?.selectedPeriod?.buyoutsCount || 0}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate
                                        smallText={true}
                                        name={'Возвраты'}
                                        value={curOrders?.selectedPeriod?.cancelSumRub || 0}
                                        quantity={curOrders?.selectedPeriod?.cancelCount || 0 || '0'}
                                        type={'price'}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Штрафы WB'} value={content?.penalty || 0} type={'price'} nochart={true} />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Доплаты WB'} value={content?.additionalPayment || 0} type={'price'} nochart={true} />
                                </div>
                            </div>
                            <div className="container dash-container p-4 pt-0 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Комиссия WB'} value={content?.wbComission?.currentPeriodCommission || 0} type={'price'}
                                        percent={content?.wbComission?.growthPercentage || 0}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Расходы на логистику'} value={content?.logistics?.totalDeliveryCostCurrentPeriod || 0} type={'price'}
                                        percent={content?.logistics?.percentageGrowth || 0}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Маржинальная прибыль'}
                                        value={(curOrders?.selectedPeriod?.buyoutsSumRub || 0) - content?.initialPrice || 0}
                                        percent={content?.marginRevenue?.profitGrowth || 0}
                                        type={'price'}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Упущенные продажи'}
                                        type={'price'}
                                        value={curOrders?.selectedPeriod?.cancelSumRub || 0}
                                        quantity={curOrders?.selectedPeriod?.cancelCount || 0 || '0'}
                                    />
                                </div>
                            </div>

                            <div className="container dash-container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                                <div className="wrapper">
                                    <FinanceTable title={'Финансы'} data={financeData} />
                                    <StorageTable
                                        title={'Склад'}
                                        data={storeData}
                                        titles={['Где товар', "Капитализация", "", "Остатки"]}
                                        subtitles={['', 'Себестоимость', 'Розница', '']}
                                    />
                                </div>
                                <div className="wrapper">
                                    <FinanceTable title={'Прибыльность'} data={profitabilityData} sign={' %'} />
                                    <ChartTable title={'Расходы'} data={costsData} />
                                </div>
                            </div>
                            <div className="container dash-container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                                <WidePlate
                                    title={'ABC-анализ'}
                                    titles={['Группа А', "Группа В", "Группа С"]}
                                    data={wbData && wbData.sales ? abcAnalysis(wbData.sales.data) : []}
                                />
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default DashboardPage