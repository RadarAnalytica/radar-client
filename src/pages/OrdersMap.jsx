import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import OrdersMapFilter from '../components/OrdersMapFilter'
import './styles.css'
import Map from '../components/Map'
import OrderMapPieChart from '../containers/orderMap/OrderMapPieChart'
import OrderMapTable from '../containers/orderMap/OrderMapTable'
import OrderTableExtended from '../containers/orderMap/OrderTableExtended'
import AuthContext from '../service/AuthContext'
import { ServiceFunctions } from '../service/serviceFunctions'
import { calculateGrowthPercentageGeo, filterArrays, filterArraysNoData, formatPrice } from '../service/utils'

const OrdersMap = () => {

    const { user } = useContext(AuthContext)

    const [byRegions, setByRegions] = useState(true)

    const [days, setDays] = useState(31)
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

    const [state, setState] = useState()

    const [data, setData] = useState()
    useEffect(() => {
        if (user && activeBrand) {
            ServiceFunctions.getGeoData(user.id, activeBrand, days).then(data => setData(data))
            // ServiceFunctions.getGeoData(user.id, activeBrand).then(data => setState(data))
        }
    }, [user && activeBrand])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    }, [loading])


    const changePeriod = () => {
        setLoading(true)
        if (user && activeBrand) {
            ServiceFunctions.getGeoData(user.id, activeBrand, days).then(data => setData(data))
        }
    }

    useEffect(() => {
        changePeriod()
    }, [days, activeBrand])

    const orders = data && data.orders && data.orders.data ? data.orders.data : []
    const sales = data && data.sales && data.sales.data ? data.sales.data : []

    const ordersByWarehouses = data ? data.ordersByWarehouse : []
    const salesByWarehouses = data ? data.salesByWarehouse : []


    let totalPriceOrders = 0
    ordersByWarehouses ? ordersByWarehouses.forEach(item => {
        let warehouseSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0) || 0
        totalPriceOrders = totalPriceOrders + warehouseSum
    }) : console.log();

    let totalPriceSales = 0
    salesByWarehouses ? salesByWarehouses.forEach(item => {
        let warehouseSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0) || 0
        totalPriceSales = totalPriceSales + warehouseSum
    }) : console.log();

    const whNames = ordersByWarehouses && ordersByWarehouses.length ? ordersByWarehouses.map(item => item.warehouse) : []

    // console.log(whNames);

    const modifiedOrders = ordersByWarehouses ? ordersByWarehouses.map(item => {
        const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
        const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
        const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
        const el = {
            name: item.warehouse,
            amount: totalSum,
            data: byFos && byFos.length ? byFos.map(el => {
                let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
                let name = el[0]?.oblastOkrugName
                return {
                    name: name,
                    sum: sum,
                    percent: ((sum / totalSum) * 100) || 0,
                    percentTotal: sum && totalPriceOrders ? ((sum / totalPriceOrders) * 100) : 0
                }
            }) : [],
        }
        return el
    }) : []

    const modifiedSales = salesByWarehouses ? salesByWarehouses.map(item => {
        const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
        const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
        const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
        const el = {
            name: item.warehouse,
            amount: totalSum,
            data: byFos && byFos.length ? byFos.map(el => {
                let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
                let name = el[0]?.oblastOkrugName
                return {
                    name: name,
                    sum: sum,
                    percent: ((sum / totalSum) * 100) || 0,
                    percentTotal: sum && totalPriceSales ? ((sum / totalPriceSales) * 100) : 0
                }
            }) : [],
        }
        return el
    }) : []


    const [foName, setFoName] = useState()
    const [foFirst, setFoFirst] = useState()

    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });



    const showTooltip = (event) => {
        setTooltipPosition({ x: event.pageX, y: event.pageY });
    };

    // Функция для скрытия тултипа


    function findGTagName(evt) {
        // Получаем элемент, на который было наведение курсора
        const target = evt.target.closest('g');
        const pathName = evt.target.closest('path')

        // Если элемент найден
        if (target) {
            // Получаем значение атрибута name и выводим его в консоль
            const nameAttribute = target.getAttribute('name');
            setFoName(nameAttribute);
            setFoFirst(nameAttribute?.split(' ')[0]?.toLowerCase())
        }
        if (pathName) {
            const nameAttribute = pathName.getAttribute('name');
            setFoName(nameAttribute);
            setFoFirst(nameAttribute?.split(' ')[0]?.toLowerCase())
        }
    }

    let map = document.getElementById('order-map')
    map ? map.addEventListener('mouseover', findGTagName) : console.log();

    const [tooltipData, setTooltipData] = useState()
    useEffect(() => {
        if (foFirst && data) {
            const info = {
                ordersSum: data.orders?.filter(el => el.oblastOkrugName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.reduce((acc, item) => acc + item.finishedPrice, 0),
                salesSum: data.sales?.filter(el => el.oblastOkrugName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.reduce((acc, item) => acc + item.finishedPrice, 0),
                ordersAmount: data.orders?.filter(el => el.oblastOkrugName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.length,
                salesAmount: data.sales?.filter(el => el.oblastOkrugName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.length,
            }
            setTooltipData(info)
        }
    }, [foFirst, data])

    const hideTooltip = () => {
        setTooltipData();
    };

    return (
        <div className='orders-map'>
            <SideNav />
            <div className="orders-map-content pb-3">
                <TopNav title={'География заказов и продаж'} />
                <OrdersMapFilter
                    brandNames={brandNames}
                    defaultValue={days}
                    setDays={setDays}
                    changeBrand={setActiveBrand}
                />

                <div className="map-container dash-container container">
                    <div className="map-radio mb-3">
                        <div className="radio-item">
                            <input
                                type="radio"
                                name="radio"
                                id="region-radio"
                                style={{ cursor: 'pointer' }}
                                defaultChecked
                                onClick={() => { setByRegions(true); setLoading(true) }}
                            />
                            <label htmlFor="region-radio" style={{ cursor: 'pointer', fontSize: '2vh' }}>По регионам</label>
                        </div>
                        <div className="radio-item">
                            <input
                                type="radio"
                                name="radio"
                                id="store-radio"
                                style={{ cursor: 'pointer' }}
                                onClick={() => { setByRegions(false); setLoading(true) }}
                            />
                            <label htmlFor="store-radio" style={{ cursor: 'pointer', fontSize: '2vh' }}>По складам</label>
                        </div>
                    </div>

                    {
                        byRegions ?
                            <div id="map">
                                <Map
                                    onMouseMove={showTooltip}
                                    onMouseOut={hideTooltip}
                                />
                                {tooltipData && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: tooltipPosition.x + 'px',
                                            top: tooltipPosition.y + 'px',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 0 40px rgba(19, 19, 19, 0.3)',
                                            padding: '16px',
                                            borderRadius: 16,
                                            width: '22vw'
                                        }}
                                    >
                                        <div>
                                            <h6 className='fw-bold'>{foName}</h6>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Продажи, руб</p>
                                                <p className='mb-1 fw-bold  col'>{formatPrice(tooltipData.salesSum)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Продажи, шт</p>
                                                <p className='mb-1 fw-bold  col'>{formatPrice(tooltipData.salesAmount)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Заказы, руб</p>
                                                <p className='mb-1 fw-bold col'>{formatPrice(tooltipData.ordersSum)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Заказы, шт</p>
                                                <p className='mb-1 fw-bold col'>{formatPrice(tooltipData.ordersAmount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div> : null
                    }
                    {
                        byRegions && !loading && data ?
                            <div className="map-data-content">
                                <div className=" pl-3 d-flex">
                                    <div className="col">
                                        <OrderMapPieChart
                                            sub={'Всего заказов'}
                                            info={data?.ordersTableData}
                                            title={'Топ 5 по заказам'}
                                            data={data?.ordersData}
                                            link={'Смотреть все регионы*'}
                                        />
                                    </div>
                                    <div className="col">
                                        <OrderMapPieChart
                                            sub={'Всего продаж'}
                                            info={data?.salesTableData}
                                            title={'Топ 5 по продажам'}
                                            data={data?.salesData}
                                            link={'Место для кнопки-ссылки'}
                                        />
                                    </div>
                                </div>
                                <div className=" pl-3">
                                    <div className="col">
                                        <OrderMapTable title={'Заказы в других регионах'} data={data?.ordersTableData} />
                                    </div>
                                    <div className="col">
                                        <OrderMapTable title={'Продажи в других регионах'} data={data?.salesTableData} />
                                    </div>
                                </div>
                            </div>
                            :
                            !byRegions && !loading && data ?
                                <div className="map-data-content">
                                    <div className=" pl-3 d-flex">
                                        <div className="col">
                                            <OrderMapPieChart
                                                info={data?.ordersWarehouseTable}
                                                title={'Топ 5 по заказам'}
                                                data={data?.ordersDataWarehouse}
                                                sub={'Всего заказов'}
                                            />
                                        </div>
                                        <div className="col">
                                            <OrderMapPieChart
                                                info={data?.salesWarehouseTable}
                                                title={'Топ 5 по продажам'}
                                                data={data?.salesDataWarehouse}
                                                sub={'Всего продаж'}
                                            />
                                        </div>
                                    </div>
                                    <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>Детализайия по заказам</h5>
                                    {
                                        whNames && whNames.length ?
                                            whNames.map((w, i) => {
                                                let orders = modifiedOrders?.find(el => el.name === w)
                                                let sales = modifiedSales?.find(el => el.name === w)
                                                return (
                                                    <div className=" pl-3" key={i}>
                                                        <div className="col">
                                                            <OrderTableExtended title={`Заказы из ${orders?.name}`} data={orders} />
                                                        </div>
                                                        <div className="col">
                                                            <OrderTableExtended title={`Продажи из ${sales?.name}`} data={sales} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : null
                                    }
                                </div>
                                : loading ?
                                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
                                        <span className="loader"></span>
                                    </div>
                                    : null
                    }
                </div>
            </div>
        </div>
    )
}

export default OrdersMap