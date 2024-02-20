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
import { abcAnalysis, calcTax, calculateGrossProfit, calculateGrossProfitMargin, calculateInitialCosts, calculateMargin, calculateNetProfit, calculateProfit, calculatePurchasePercentage, calculateROI, calculateTotalProfit, generateDateList, getDifference } from '../service/utils'

const DashboardPage = () => {

    const [wbData, setWbData] = useState()

    const { user, authToken } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (!user || (user && !user.isOnboarded)) {
                navigate('/development/onboarding')
            }
        }, 1500);
    }, [user])

    const twoMonthAgo = new Date(new Date().setDate(new Date().getDate() - 61)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const monthAgo = new Date(new Date().setDate(new Date().getDate() - 31)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const dateTo = new Date(new Date().setDate(new Date().getDate())).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const [period, setPeriod] = useState({ period: monthAgo, days: 31 })
    useEffect(() => {
        setPeriod({ period: monthAgo, days: 31 })
    }, [])

    const getWBSales = async (user, period, dateTo) => {
        const res = await fetch(`${URL}/api/user/sales/${user.id}?dateFrom=${twoMonthAgo}&dateTo=${dateTo}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + authToken
            }
        })
        const data = await res.json()
        return data
    }

    function filterArrays(obj, days) {
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                if (obj[key].length) {
                    obj[key] = obj[key].filter(item => {
                        const date = item.date ? new Date(item.date) : item.lastChangeDate ? new Date(item.lastChangeDate) : new Date(item.create_dt);
                        const weekAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
                        return date >= weekAgo;
                    });
                }
            }
        }
        return obj
    }


    const hash = {}

    useEffect(() => {
        let found = localStorage.getItem('dashboard')
        if (user && period && found === null) {
            getWBSales(user, period, dateTo).then(data => {
                if (data && (data.orders?.length || data.sales?.length)) {
                    for (let key in data) {
                        let props = data[key] && !Array.isArray(data[key]) ? Object.keys(data[key]) : []
                        if (data[key] && data[key].length) {
                            hash[key] = data[key]
                        }
                        if (data[key] && props && props.length) {
                            hash[key] = data[key]
                        }
                        if (!Object.keys(hash).find(k => k === key) && data[key] === null) {
                            hash[key] = null
                        }
                    }
                    localStorage.setItem('dashboard', JSON.stringify(hash))
                    setWbData(filterArrays(hash, 31))
                }

            })
        }
    }, [])

    const dashData = localStorage.getItem('dashboard') ? JSON.parse(localStorage.getItem('dashboard')) : null

    // console.log(dashData);

    // useEffect(() => {
    //     if (dashData) {
    //         setWbData(JSON.parse(dashData))
    //     }
    // }, [dashData])




    // Поставки
    const incomes = wbData ? wbData.incomes : []
    // Цены
    const info = wbData ? wbData.info : []
    // Заказы
    const orders = wbData ? wbData.orders : []
    // список новых сборочных заданий
    const newOrders = wbData ? wbData.newOrders : []
    // отчеты о продажах и реализации
    const reportDetailByPeriod = wbData ? wbData.reportDetailByPeriod : []
    // список сборочных заданий на повторную отгрузку
    const reshipmentOrders = wbData && wbData.reshipmentOrders ? wbData.reshipmentOrders.orders : [] //reshipmentOrders.orders
    // продажи
    const sales = wbData ? wbData.sales : []
    // склад
    const stocks = wbData ? wbData.stocks : []
    // список поставок
    const supplies = wbData ? wbData.supplies : []
    // склады
    const warehouses = wbData ? wbData.warehouses : []


    const [sumSales, setSumSales] = useState()
    const [sumOrders, setSUmOrders] = useState()
    const [canceled, setCanceled] = useState()
    const [sumCanceled, setSumCanceled] = useState()
    const [buyOutPrice, setBuyoutPrice] = useState()
    const [averageCheck, setAverageCheck] = useState()
    const [penalty, setPenalty] = useState()
    const [addPayment, setAddPayment] = useState()
    const [commissionPrice, setCommissionPrice] = useState()
    const [delivery, setDelivery] = useState()
    const [inWayToClient, setInWayToClient] = useState()
    const [inWayFromClient, setInWayFromClient] = useState()
    const [available, setAvailable] = useState()
    const [commCosts, setComCosts] = useState()
    const [lostProfit, setLostProfit] = useState()
    const [averageProfit, setAverageProfit] = useState()
    const [netProfit, setNetProfit] = useState()
    const [initialCosts, setInitialCosts] = useState()
    const [totalProfit, setTotalProfit] = useState()
    const [tax, setTax] = useState()
    const [margin, setMargin] = useState()

    useEffect(() => {
        const sumSales = sales && sales.length ? sales.map(i => i.forPay)?.reduce((a, b) => a + b, 0)?.toFixed(2) : 0
        setSumSales(sumSales)
        const sumOrders = orders && orders.length ? orders.map(i => i.finishedPrice)?.reduce((a, b) => a + b, 0)?.toFixed(2) : 0
        setSUmOrders(sumOrders)
        const canceled = orders && orders.length ? orders.filter(i => i.isCancel === true) : []
        setCanceled(canceled)
        const sumCanceled = canceled && canceled.length ? canceled.map(i => i.finishedPrice)?.reduce((a, b) => a + b, 0) : 0
        setSumCanceled(sumCanceled)

        const penalty = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.penalty)?.reduce((a, b) => a + b, 0) : 0
        setPenalty(penalty)
        const addPayment = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.additional_payment)?.reduce((a, b) => a + b, 0) : 0
        setAddPayment(addPayment)
        const commissionPrice = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.commission_percent * (item.retail_price * item.quantity))?.reduce((a, b) => a + b, 0) : 0
        setCommissionPrice(commissionPrice)
        const delivery = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.delivery_rub)?.filter(el => el > 0)?.reduce((a, b) => a + b, 0) : 0
        setDelivery(delivery)
        const lostProfit = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.return_amount * item.retail_price)?.reduce((a, b) => a + b, 0) : 0
        setLostProfit(lostProfit)

        const buyOutPrice = sumOrders && sumCanceled ? (sumCanceled / (sumOrders / 100))?.toFixed(2) : 0
        setBuyoutPrice(buyOutPrice)
        const averageCheck = sumOrders && orders ? (Number(sumOrders) / orders.length)?.toFixed(2) : 0
        setAverageCheck(averageCheck)

        const inWayToClient = stocks && stocks.length ? stocks.filter(i => i.inWayToClient) : []
        setInWayToClient(inWayToClient)
        const inWayFromClient = stocks && stocks.length ? stocks.filter(i => i.inWayFromClient) : []
        setInWayFromClient(inWayFromClient)
        const available = stocks && stocks.length ? stocks.filter(i => i.quantity) : []
        setAvailable(available)

        const commCosts = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => item.commission_percent * (item.retail_price * item.quantity))?.reduce((a, b) => a + b, 0) : 0
        setComCosts(commCosts)

        const averageProfit = reportDetailByPeriod && reportDetailByPeriod.length ? calculateProfit(reportDetailByPeriod) : 0
        setAverageProfit(averageProfit)
        const netProfit = reportDetailByPeriod && reportDetailByPeriod.length ? calculateNetProfit(reportDetailByPeriod) : 0
        setNetProfit(netProfit)

        const initialCosts = stocks && stocks.length ? calculateInitialCosts(stocks) : 0
        setInitialCosts(initialCosts)
        const totalProfit = reportDetailByPeriod && reportDetailByPeriod.length ? calculateTotalProfit(reportDetailByPeriod) : 0
        setTotalProfit(totalProfit)
        const tax = reportDetailByPeriod && reportDetailByPeriod.length ? calcTax(reportDetailByPeriod) : 0
        setTax(tax)

        const margin = revenue && initialCosts ? calculateMargin(revenue, initialCosts.totalCost) : 0
        setMargin(margin)
    }, [wbData])



    // const fbo = []
    // const fbs = incomes && incomes.length ? incomes.filter(i => i.quantity) : []

    const revenue = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => (item.retail_price * item.quantity))?.reduce((a, b) => a + b, 0) : 0
    const revComPercentage = reportDetailByPeriod && reportDetailByPeriod.length ? reportDetailByPeriod.map(item => (item.commission_percent))?.reduce((a, b) => a + b, 0) : 0


    const storeData = [
        {
            name: "Едет к клиенту",
            initialPrice: '-',
            salesPrice: inWayToClient ? inWayToClient?.map(i => i.Price * i.inWayToClient)?.reduce((a, b) => a + b, 0) : 0,
            quantity: inWayToClient ? inWayToClient?.map(i => i.inWayToClient)?.reduce((a, b) => a + b, 0) : 0,
        },
        {
            name: "Едет от клиента",
            initialPrice: '-',
            salesPrice: inWayFromClient ? inWayFromClient?.map(i => i.Price * i.inWayFromClient)?.reduce((a, b) => a + b, 0) : 0,
            quantity: inWayFromClient ? inWayFromClient?.map(i => i.inWayFromClient)?.reduce((a, b) => a + b, 0) : 0,
        },
        {
            name: "Не распределено",
            initialPrice: '-',
            salesPrice: available ? available?.map(i => i.Price * i.quantity)?.reduce((a, b) => a + b, 0) : 0,
            quantity: available ? available?.map(i => i.quantity)?.reduce((a, b) => a + b, 0) : 0,
        },
    ]

    const costsData = [
        {
            name: 'Комиссия (от выручки)',
            amount: commissionPrice || 0,
            amountRate: 17,
            percent: revComPercentage,
            percentRate: 32,
            percentRate2: 19
        },
        {
            name: 'Логистика (от выручки)',
            amount: delivery || 0,
            amountRate: 28,
            percent: delivery / revenue * 100,
            percentRate: 19,
            percentRate2: 14
        },
    ]

    const financeData = [
        {
            name: 'Выручка',
            amount: totalProfit ? totalProfit : 0,
            rate: 28,
        },
        {
            name: 'Себестоимость продаж',
            amount: initialCosts?.totalCost || 0,
            rate: 25,
        },
        {
            name: 'Маржинальная стоимость',
            amount: margin || 0,
            rate: 47,
        },
        {
            name: 'Валовая прибыль',
            amount: calculateGrossProfit(totalProfit, initialCosts?.totalCost) || 0,
            rate: 39,
        },
        {
            name: 'Налог',
            amount: tax,
            rate: 13,
        },
        {
            name: 'Чистая прибыль',
            amount: netProfit,
            rate: 19,
        },
        {
            name: 'Средняя прибыль',
            amount: averageProfit,
            rate: 22,
        },
    ]

    const profitabilityData = [
        {
            name: 'Процент выкупа',
            value: calculatePurchasePercentage(sales, reportDetailByPeriod)
        },
        {
            name: 'ROI',
            value: calculateROI(totalProfit, initialCosts?.totalCost)
        },
        {
            name: 'Рентабельность ВП',
            value: calculateGrossProfitMargin(calculateGrossProfit(totalProfit, initialCosts?.totalCost) || 0, totalProfit)
        },
        {
            name: 'Рентабельность ОП',
            value: calculateGrossProfitMargin(tax, totalProfit)
        },
    ]


    console.log();

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 7000);
    }, [loading])

    const [days, setDays] = useState(31)


    const changePeriod = () => {
        let data = localStorage.getItem('dashboard')
        if (data) {
            setLoading(true)
            const filteredObj = filterArrays(JSON.parse(data), days);
            filteredObj ? setWbData(filteredObj) : setWbData(wbData)
        }
    }

    useEffect(() => {
        changePeriod()
    }, [days])

    const dates = orders ? [...new Set(orders.map(i => new Date(i.date).toLocaleDateString()))] :
        sales ? [...new Set(sales.map(i => new Date(i.date).toLocaleDateString()))] : generateDateList(Number(days))

    const [chartUnitRub, setChartUnitRub] = useState(true)

    const dateList = period ? generateDateList(Number(days)) : generateDateList(7)

    // const orderValuesRub = orders && orders.length ? orders.map(i => i.finishedPrice) : []
    // const salesValuesRub = sales && sales.length ? sales.map(i => i.finishedPrice) : []

    const orderValuesRub = orders && orders.length ? orders.map(i => ({ price: i.finishedPrice, date: new Date(i.date).toLocaleDateString() })) : []
    const salesValuesRub = sales && sales.length ? sales.map(i => ({ price: i.finishedPrice, date: new Date(i.date).toLocaleDateString() })) : []

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

    const summedOrderArray = Object.keys(summedOrderRub).map(date => (summedOrderRub[date].toFixed(2))).slice(0, period?.days);
    const summedSalesArray = Object.keys(summedSalesRub).map(date => (summedSalesRub[date].toFixed(2))).slice(0, period?.days);


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

    const totalOrByDate = Object.entries(ordersByDate).map(([date, count]) => count).slice(0, period?.days);
    const totalsalesByDate = Object.entries(salesByDate).map(([date, count]) => count).slice(0, period?.days);

    const [orderOn, setOrderOn] = useState(true)
    const [salesOn, setSalesOn] = useState(true)


    const data = {
        labels: dateList?.map(item => item.split(' ')) || [],
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

    const mockData = [117, 782, 100, 101, 701, 100, 14, 104]
    const mockData2 = ['В день ~ 9 329,01 ₽', 'В день ~ 4 560,01 ₽', 'В день ~ 4 шт', 'В день ~ 3 шт']


    return (
        user && <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-5">
                <TopNav title={'Сводка продаж'} />

                <DashboardFilter
                    warehouses={warehouses}
                    changePeriod={changePeriod}
                    defaultValue={period?.days}
                    setDays={setDays}
                />
                {
                    loading ?
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
                            <span className="loader"></span>
                        </div>
                        :
                        data && user &&

                        <div>

                            <div className="container p-4 pt-0 d-flex gap-3">
                                <MediumPlate name={'Заказы'}
                                    value={sumOrders}
                                    quantity={orders?.length || 0}
                                    percent={getDifference(filterArrays(dashData?.orders), 'finishedPrice', days)?.percent}
                                    percent2={mockData[3]}
                                    text={mockData2[0]}
                                    text2={mockData2[1]}
                                />
                                <MediumPlate
                                    name={'Продажи'}
                                    value={sumSales}
                                    quantity={sales?.length || 0}
                                    percent={getDifference(filterArrays(dashData?.sales), 'finishedPrice', days)?.percent}
                                    percent2={90}
                                    text={mockData2[3]}
                                    text2={mockData2[2]}
                                />
                                <MediumPlate
                                    name={'Возвраты'}
                                    value={sumCanceled || 0}
                                    quantity={canceled?.length || 0}
                                    percent={getDifference(filterArrays(dashData?.orders?.filter(i => i.isCancel)), 'finishedPrice', days)?.percent}
                                    percent2={20}
                                    text={''}
                                    text2={''}
                                />
                                <div className="col d-flex flex-column">
                                    <div className='mb-3'>
                                        <SmallPlate
                                            name={'Процент выкупа'}
                                            value={buyOutPrice || 0}
                                            type={'percent'}
                                            percent={getDifference(filterArrays(dashData?.orders), 'finishedPrice', days)?.percent}
                                        />
                                    </div>
                                    <SmallPlate
                                        name={'Средний чек'}
                                        value={averageCheck || 0}
                                        type={'price'}
                                        percent={getDifference(filterArrays(dashData?.orders?.filter(i => i.isCancel)), 'finishedPrice', days)?.percent}
                                    />
                                </div>
                            </div>
                            <div className="container p-4 pt-0 pb-3 d-flex gap-3">
                                <div className="col">
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


                            <div className="container p-4 pt-0 pb-3 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate smallText={true}
                                        name={'Себестоимость проданных товаров'}
                                        nochart={true}
                                        type={'price'}
                                        quantity={initialCosts?.quantity || 0}
                                        value={initialCosts?.totalCost || 0}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Возвраты'} value={sumCanceled || 0} type={'price'} quantity={canceled?.length || '0'} />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Штрафы WB'} value={penalty || 0} type={'price'} nochart={true} />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Доплаты WB'} value={addPayment || 0} type={'price'} nochart={true} />
                                </div>
                            </div>
                            <div className="container p-4 pt-0 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Комиссия WB'} value={commissionPrice || 0} type={'price'}
                                        percent={days === 31 ? 19 : days === 14 ? 21 : 9}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Расходы на логистику'} value={delivery || 0} type={'price'}
                                        percent={days === 31 ? 25 : days === 14 ? 13 : 20}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Маржинальная прибыль'}
                                        value={days === 31 ? 127056 : days === 14 ? 18000 : 2120}
                                        percent={days === 31 ? 26 : days === 14 ? 18 : 20}
                                        type={'price'}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Упущенные продажи'} value={sumCanceled || 0} type={'price'}
                                        quantity={canceled?.length || 0}
                                    />
                                </div>
                            </div>

                            <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
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
                            <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                                <WidePlate
                                    title={'ABC-анализ'}
                                    titles={['Группа А', "Группа В", "Группа С"]}
                                    data={sales ? abcAnalysis(sales) : []}
                                />
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default DashboardPage