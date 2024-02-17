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
import { generateDateList } from '../service/utils'

const DashboardPage = () => {

    const [wbData, setWbData] = useState()

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (!user) {
                navigate('/development/onboarding')
            }
        }, 1000);
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
            }
        })
        const data = await res.json()
        return data
    }

    function filterArrays(obj, days) {
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                if (obj[key].length && obj[key].find(el => el.date)) {
                    obj[key] = obj[key].filter(item => {
                        const date = new Date(item.date);
                        const weekAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
                        return date >= weekAgo;
                    });
                }
            }
        }
        return obj
    }



    useEffect(() => {
        let found = localStorage.getItem('dashboard')
        if (user && period && !found) {
            getWBSales(user, period, dateTo).then(data => {

                if (data && (data.orders?.length || data.sales?.length)) {
                    const hash = {}
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
    }, [user, period])

    // const dashData = localStorage.getItem('dashboard')

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

    useEffect(() => {
        const sumSales = sales && sales.length ? sales.map(i => i.forPay)?.reduce((a, b) => a + b, 0)?.toFixed(2) : 0
        setSumSales(sumSales)
        const sumOrders = orders && orders.length ? orders.map(i => i.finishedPrice)?.reduce((a, b) => a + b, 0)?.toFixed(2) : 0
        setSUmOrders(sumOrders)
        const canceled = orders && orders.length ? orders.filter(i => i.isCancel === true) : []
        setCanceled(canceled)
        const sumCanceled = canceled && canceled.length ? canceled.map(i => i.finishedPrice)?.reduce((a, b) => a + b, 0) : 0
        setSumCanceled(sumCanceled)

        const buyOutPrice = sumOrders && sumCanceled ? (sumCanceled / (sumOrders / 100))?.toFixed(2) : 0
        setBuyoutPrice(buyOutPrice)
        const averageCheck = sumOrders && orders ? (Number(sumOrders) / orders.length)?.toFixed(2) : 0
        setAverageCheck(averageCheck)

    }, [wbData])


    // К перечислению продавцу

    const inWayToClient = stocks && stocks.length ? stocks.filter(i => i.inWayToClient) : []
    const inWayFromClient = stocks && stocks.length ? stocks.filter(i => i.inWayFromClient) : []

    // console.log(inWayFromClient);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 7000);
    }, [loading])

    const [days, setDays] = useState(31)

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date) && date.getTime() >= (new Date().getTime() - period?.days * 24 * 60 * 60 * 1000);
    }

    // Рекурсивная функция для обхода всех значений объекта и его подобъектов
    function filterObjects(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => Array.isArray(item) || typeof item === 'object' ? filterObjects(item) : item);
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, filterObjects(value)])
            );
        } else if (isValidDate(new Date(obj))) {
            // Преобразуем объекты Date в строки
            return new Date(obj).toISOString();
        } else {
            return obj;
        }
    }


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
        labels: dateList || [],
        datasets: [
            orderOn ? {
                label: 'Заказы',
                backgroundColor: 'rgba(240, 173, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(240, 173, 0, 7)',
                data: chartUnitRub ? summedOrderArray : totalOrByDate,
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
                data: chartUnitRub ? summedSalesArray : totalsalesByDate,
            } : {
                label: 'Продажи',
                backgroundColor: 'rgba(83, 41, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(83, 41, 255, 0.7)',
                data: []
            },
        ],
    };

    const mockData = [117, 782, 100, 101, 701, 100, 14, 104]
    const mockData2 = ['В день ~ 9 329,01 ₽', 'В день ~ 4 560,01 ₽', 'В день ~ 4 шт', 'В день ~ 3 шт']


    return (
        <div className='dashboard-page'>
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
                        data && <div>

                            <div className="container p-4 pt-0 d-flex gap-3">
                                <MediumPlate name={'Заказы'} value={sumOrders} quantity={orders?.length || 0} percent={mockData[0]} percent2={mockData[3]}
                                    text={mockData2[0]} text2={mockData2[1]}
                                />
                                <MediumPlate name={'Продажи'} value={sumSales} quantity={sales?.length || 0} percent={80} percent2={90}
                                    text={mockData2[3]} text2={mockData2[2]}
                                />
                                <MediumPlate name={'Возвраты'} value={sumCanceled || 4} quantity={canceled?.length || 0} percent={mockData[0]} percent2={20}
                                    text={''} text2={''}
                                />
                                <div className="col d-flex flex-column">
                                    <div className='mb-3'>
                                        <SmallPlate name={'Процент выкупа'} value={buyOutPrice || 0} type={'percent'} percent={mockData[6]} />
                                    </div>
                                    <SmallPlate name={'Средний чек'} value={averageCheck || 0} type={'price'} percent={mockData[7]} />
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
                                    />
                                </div>
                            </div>
                            {/* <div className="container p-4 pt-0 pb-3 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate name={'Себестоимость проданных товаров'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Возвраты'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Штрафы WB'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Доплаты WB'} />
                                </div>
                            </div>
                            <div className="container p-4 pt-0 d-flex gap-3">
                                <div className="col">
                                    <SmallPlate name={'Комиссия WB'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Расходы на логистику'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Маржинальная прибыль'} />
                                </div>
                                <div className="col">
                                    <SmallPlate name={'Упущенные продажи'} />
                                </div>
                            </div>

                            <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                                <div className="wrapper">
                                    <FinanceTable title={'Финансы'} data={[]} />
                                    <StorageTable title={'Склад'} data={[]} titles={[]} subtitles={[]} />
                                </div>
                                <div className="wrapper">
                                    <FinanceTable title={'Прибыльность'} data={[]} />
                                    <ChartTable title={'Расходы'} />
                                </div>
                            </div>
                            <div className="container p-4 pt-0 pb-3 d-flex gap-3" style={{ width: '100%' }}>
                                <WidePlate title={'ABC-анализ'} />
                            </div> */}
                        </div>
                }

            </div>
        </div>
    )
}

export default DashboardPage