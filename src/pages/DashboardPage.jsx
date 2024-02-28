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
import { abcAnalysis, calcTax, calculateGrossProfit, calculateGrossProfitMargin, calculateInitialCosts, calculateMargin, calculateNetProfit, calculateProfit, calculatePurchasePercentage, calculateROI, calculateTotalProfit, formatDate, generateDateList, getDifference } from '../service/utils'
import { ServiceFunctions } from '../service/serviceFunctions'
import MobileMenu from '../components/MobileMenu'

const DashboardPage = () => {

    const { user, authToken, showMobile } = useContext(AuthContext)


    const [wbData, setWbData] = useState()
    const [days, setDays] = useState(31)

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
            ServiceFunctions.getBrandNames(user.id).then(data => setBrandNames(data))
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

    function filterArrays(obj, days) {
        for (let key in obj) {
            if (Array.isArray(obj[key]) && (key !== 'warehouses' && key !== 'info')) {
                if (typeof obj[key] === 'object' && obj[key].length) {
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

    // Заказы
    const orders = wbData ? wbData.orders : []
    // продажи
    const sales = wbData ? wbData.sales : []
    // склады
    const warehouses = wbData ? wbData.warehouses : []


    const storeData = [
        {
            name: "FBO",
            initialPrice: '-',
            salesPrice: content?.fbo?.fbo?.toFixed(0) || 0,
            quantity: content?.fbo?.fboAmount || 0,
        },
        {
            name: "FBS",
            initialPrice: '-',
            salesPrice: content?.fbo?.fbs,
            quantity: content?.fbo?.fbsAmount || 0,
        },
        {
            name: "Едет к клиенту",
            initialPrice: '-',
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
            initialPrice: '-',
            salesPrice: content?.notSorted,
            quantity: content?.notSorted,
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
            amount: content?.initialPrice || '0',
            rate: 0,
        },
        {
            name: 'Маржинальная стоимость',
            amount: content?.marginCosts?.currentGrossMargin || '0',
            rate: content?.marginCosts?.marginGrowth?.toFixed(2) || '0',
        },
        {
            name: 'Валовая прибыль',
            amount: content?.grossProfit?.sum?.sum || '0',
            rate: content?.grossProfit?.sum?.sumPercent,
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

    const profitabilityData = [
        {
            name: 'Процент выкупа',
            value: content?.buyoutPercentage
        },
        {
            name: 'ROI',
            value: content?.roi
        },
        {
            name: 'Рентабельность ВП',
            value: content?.vpProfitMargin?.percent
        },
        {
            name: 'Рентабельность ОП',
            value: content?.opProfitMargin?.percent
        },
    ]


    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000);
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

    // console.log(wbData);

    return (
        user && <div className='dashboard-page'>
            <SideNav />
            <div className="dashboard-content pb-3">
                <TopNav title={'Сводка продаж'} />

                <DashboardFilter
                    brandNames={brandNames}
                    changePeriod={changePeriod}
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
                                    value={content?.orderStat?.sum}
                                    quantity={content?.orderStat?.amount || 0}
                                    percent={content?.orderStat?.amountPercent || 0}
                                    percent2={content?.orderStat?.sumPercent || 0}
                                    text={content?.orderStat?.revenueIncrese || 0}
                                    text2={content?.orderStat?.amountIncrese || 0}
                                />
                                <MediumPlate
                                    name={'Продажи'}
                                    value={content?.salesStat?.sum}
                                    quantity={content?.salesStat?.amount || 0}
                                    percent={content?.salesStat?.amountPercent || 0}
                                    percent2={content?.salesStat?.sumPercent || 0}
                                    text={content?.salesStat?.revenueIncrese || 0}
                                    text2={content?.salesStat?.amountIncrese || 0}
                                />
                                <MediumPlate
                                    name={'Возвраты'}
                                    value={content?.returned?.currentReturnsSum}
                                    quantity={content?.returned?.currentReturnsCount || 0}
                                    percent={content?.returned?.returnsSumGrowth || 0}
                                    percent2={content?.returned?.returnsCountGrowth || 0}
                                // text={content?.returned?.currentReturnsCount || 0}
                                // text2={content?.returned?.currentReturnsCount || 0}
                                />
                                <div className="col d-flex flex-column">
                                    <div className='mb-3'>
                                        <SmallPlate
                                            name={'Процент выкупа'}
                                            value={content?.buyout?.purchaseRate || 0}
                                            type={'percent'}
                                            percent={content?.buyout?.percentGrowth || 0}
                                        />
                                    </div>
                                    <SmallPlate
                                        name={'Средний чек'}
                                        value={content?.averageCheck?.averageReceiptLastDays || 0}
                                        type={'price'}
                                        percent={content?.averageCheck?.growthRate || 0}
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
                                        quantity={content?.orderStat?.amount || 0}
                                        value={content?.initialPrice || 0}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Возвраты'} value={content?.returned?.currentReturnsSum} type={'price'} quantity={content?.returned?.currentReturnsCount || '0'} />
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
                                        value={content?.marginRevenue?.currentMarginalProfit * -1 || 0}
                                        percent={content?.marginRevenue?.profitGrowth || 0}
                                        type={'price'}
                                    />
                                </div>
                                <div className="col">
                                    <SmallPlate smallText={true} name={'Упущенные продажи'} value={content?.returned?.currentReturnsSum || 0} type={'price'}
                                        quantity={content?.returned?.currentReturnsCount || '0'}
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
                                    data={wbData && wbData.sales ? abcAnalysis(wbData.sales) : []}
                                />
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default DashboardPage