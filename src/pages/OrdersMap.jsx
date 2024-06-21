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


  


    const { user, authToken } = useContext(AuthContext)

    const [byRegions, setByRegions] = useState(true)

    const [days, setDays] = useState(14)
    const [brandNames, setBrandNames] = useState()
    const [activeBrand, setActiveBrand] = useState(0)
    // useEffect(() => {
    //     if (user) {
    //         ServiceFunctions.getBrandNames(user.id).then(data => setBrandNames(data))
    //     }
    // }, [user])
    useEffect(() => {
        if (brandNames && brandNames.length) {
            setActiveBrand(brandNames[0])
        }
    }, [brandNames])

    const [shop, setShop] = useState()
    const [geoData, setGeoData] = useState({})
    console.log(geoData, 'GEO DATA')

    useEffect(() => {
        ServiceFunctions.getAllShops(authToken).then(data => setShop(data));
    }, [])

    useEffect(() => {
        ServiceFunctions.getGeographyData(authToken, days, activeBrand).then(data => setGeoData(data))
    }, [days, activeBrand])


    const [data, setData] = useState()


    // useEffect(() => {
    //     if (user && activeBrand) {
    //         ServiceFunctions.getGeoData(user.id, activeBrand, days).then(data => setData(data))
    //         // ServiceFunctions.getGeoData(user.id, activeBrand).then(data => setState(data))
    //     }
    // }, [user && activeBrand])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [loading])


    // const changePeriod = () => {
    //     setLoading(true)
    //     if (user && activeBrand) {
    //         ServiceFunctions.getGeoData(user.id, activeBrand, days).then(data => setData(data))
    //     }
    // }

    // useEffect(() => {
    //     changePeriod()
    // }, [days, activeBrand])

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

    // console.log(geoData?.geo_data?.filter((item) => item.districtName === 'Центральный фо')?.[0]?.percent, "Фильтрация");
    const commonAndCompareOnMap = {
        centr: {
            
            common: geoData?.geo_data?.find((item) => item.districtName === 'Центральный федеральный округ' || item.districtName === 'Центральный фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Центральный федеральный округ' || item.districtName === 'Центральный фо')?.comparePercent.toFixed(0) || 0,
        },
        siberian: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Сибирский федеральный округ' || item.districtName === 'Сибирский фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Сибирский федеральный округ' || item.districtName === 'Сибирский фо')?.comparePercent.toFixed(0) || 0,
        },
        ural: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Уральский федеральный округ' || item.districtName === 'Уральский фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Уральский федеральный округ' || item.districtName === 'Уральский фо')?.comparePercent.toFixed(0) || 0,
        },
        southern: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Южный федеральный округ' || item.districtName === 'Южный фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Южный федеральный округ' || item.districtName === 'Южный фо')?.comparePercent.toFixed(0) || 0,
        },
        northCaucasian: {
            common:  geoData?.geo_data?.find((item) => item.districtName === 'Северо-Кавказский федеральный округ' || item.districtName === 'Северо-Кавказский фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Северо-Кавказский федеральный округ' || item.districtName === 'Северо-Кавказский фо')?.comparePercent.toFixed(0) || 0,
        },
        farEastern: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Дальневосточный федеральный округ' || item.districtName === 'Дальневосточный фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Дальневосточный федеральный округ' || item.districtName === 'Дальневосточный фо')?.comparePercent.toFixed(0) || 0,
        },
        privolzhsky: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Приволжский федеральный округ' || item.districtName === 'Приволжский фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Приволжский федеральный округ' || item.districtName === 'Приволжский фо')?.comparePercent.toFixed(0) || 0,
        },
        northWestern: {
            common: geoData?.geo_data?.find((item) => item.districtName === 'Северо-Западный федеральный округ' || item.districtName === 'Северо-Западный фо')?.percent.toFixed(0) || 0,
            compare: geoData?.geo_data?.find((item) => item.districtName === 'Северо-Западный федеральный округ' || item.districtName === 'Северо-Западный фо')?.comparePercent.toFixed(0) || 0,
        },

    }       

    console.log(commonAndCompareOnMap.farEastern, 'commonAndCompareOnMap')

    // const modifiedOrders = ordersByWarehouses ? ordersByWarehouses.map(item => {
    //     const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
    //     const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
    //     const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
    //     const el = {
    //         name: item.warehouse,
    //         amount: totalSum,
    //         data: byFos && byFos.length ? byFos.map(el => {
    //             let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
    //             let name = el[0]?.oblastOkrugName
    //             return {
    //                 name: name,
    //                 sum: sum,
    //                 percent: ((sum / totalSum) * 100) || 0,
    //                 percentTotal: sum && totalPriceOrders ? ((sum / totalPriceOrders) * 100) : 0
    //             }
    //         }) : [],
    //     }
    //     return el
    // }) : []

    // const modifiedSales = salesByWarehouses ? salesByWarehouses.map(item => {
    //     const totalSum = item.data?.reduce((acc, el) => acc + el.finishedPrice, 0)
    //     const wNames = [...new Set(item.data?.map(el => el.oblastOkrugName))]
    //     const byFos = wNames ? wNames.map(obj => item.data?.filter(i => i.oblastOkrugName === obj)) : []
    //     const el = {
    //         name: item.warehouse,
    //         amount: totalSum,
    //         data: byFos && byFos.length ? byFos.map(el => {
    //             let sum = el.reduce((acc, o) => acc + o.finishedPrice, 0) || 0
    //             let name = el[0]?.oblastOkrugName
    //             return {
    //                 name: name,
    //                 sum: sum,
    //                 percent: ((sum / totalSum) * 100) || 0,
    //                 percentTotal: sum && totalPriceSales ? ((sum / totalPriceSales) * 100) : 0
    //             }
    //         }) : [],
    //     }
    //     return el
    // }) : []


    const [foName, setFoName] = useState()
    const [foFirst, setFoFirst] = useState()
    console.log(foFirst, 'foFirst');

    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });



    const showTooltip = (event) => {
        setTooltipPosition({ x: event.pageX, y: event.pageY });
    };

    function findGTagName(evt) {
        // Получаем элемент, на который было наведение курсора
        const target = evt.target.closest('g');

        // Если элемент найден
        if (target) {
            // Получаем значение атрибута name и выводим его в консоль
            const nameAttribute = target.getAttribute('name');
            setFoName(nameAttribute);
            setFoFirst(nameAttribute?.split(' ')[0]?.toLowerCase())
        }
    }

    let map = document.getElementById('order-map')
    map ? map.addEventListener('mouseover', findGTagName) : console.log();

    const [tooltipData, setTooltipData] = useState()
    useEffect(() => {
        if (foFirst && geoData) {
            const info = {
                ordersCount:  [...geoData?.geo_data]?.filter(el => el.districtName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.orderCount || '0',
                salesAmount: [...geoData?.geo_data]?.filter(el => el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.saleAmount || '0',
                ordersAmount: [...geoData?.geo_data]?.filter(el => el.districtName.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.orderAmount || '0',
                salesCount: [...geoData?.geo_data]?.filter(el => el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.saleCount || '0',
                percent: [...geoData?.geo_data]?.filter(el => el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.percent || '0',
                comparePercent: [...geoData?.geo_data]?.filter(el => el.districtName?.toLowerCase()?.indexOf(foFirst?.toLowerCase()) >= 0)?.[0]?.comparePercent || '0'
            }
            setTooltipData(info)
        }
    }, [foFirst, geoData, tooltipPosition.x])

    const hideTooltip = () => {
        setTooltipData();
    };

    const backgroundColor = [
        'rgba(129, 172, 255, 1)',
        'rgba(255, 153, 114, 1)',
        'rgba(154, 129, 255, 1)',
        'rgba(74, 217, 145, 1)',
        'rgba(254, 197, 61, 1)',
    ]

    const getColor = (name) => {
        switch (name) {
            case 'Сибирский ФО':
                return 'rgba(254, 197, 61, 1)'
            case 'Уральский ФО':
                return 'grey'
            case 'Южный ФО':
                return 'rgba(74, 217, 145, 1)'
            case 'Северо-Кавказский ФО':
                return 'orangered'
            case 'Центральный ФО':
                return 'rgba(129, 172, 255, 1)'
            case 'Приволжский ФО':
                return 'rgba(255, 153, 114, 1)'
            case 'Северо-Западный ФО':
                return 'yellow'
            case 'Дальневосточный ФО':
                return 'brown'
            default: return 'transparent'
        }
    }

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')


    const totalOrderAmount =  geoData?.geo_data?.reduce((acc, item) => acc + item.orderAmount, 0) || '0' 
    const totalOrderSum =  geoData?.geo_data?.reduce((acc, item) => acc + item.orderCount, 0) || '0'
    const totalOrderAmountStock =  geoData?.stock_data?.reduce((acc, item) => acc + item.orderAmount, 0) || '0'
    const totalOrderSumStock =  geoData?.stock_data?.reduce((acc, item) => acc + item.orderCount, 0)|| '0'

    const totalSaleAmount =  geoData?.geo_data?.reduce((acc, item) => acc + item.saleAmount, 0) || '0'
    const totalSaleSum =  geoData?.geo_data?.reduce((acc, item) => acc + item.saleCount, 0)|| '0'
    const totalSaleAmountStock =  geoData?.stock_data?.reduce((acc, item) => acc + item.saleAmount, 0) || '0'
    const totalSaleSumStock =  geoData?.stock_data?.reduce((acc, item) => acc + item.saleCount, 0)|| '0'


    const totalOrdersOther =  geoData?.geo_data?.map(el => {
       
        return { 
        districtName: el?.districtName,
        percent: el?.percent,
        amount: el?.orderAmount,
        count: el?.orderCount
        }
    })
    const totalSalesOther =  geoData?.geo_data?.map(el => {
       
        return { 
         districtName: el.districtName,
         percent: el.percent,
         amount: el.saleAmount,
         count: el.saleCount
     }
    })
    console.log(totalOrdersOther, 'totalOrdersOther')
    console.log(totalSalesOther, 'totalSalesOther')
    // let totalOrdersSum = data && data.ordersTableData ? data.ordersTableData.reduce((acc, item) => acc + Number(item.sum), 0) : 0
    // let totalSalesSum = data && data.ordersTableData ? data.salesTableData.reduce((acc, item) => acc + Number(item.sum), 0) : 0
    

  const [isHovered, setIsHovered] = useState(false);
  console.log(geoData.stock_data, 'stockData')

  const orderSaleStock = [
    {
        amount: 0,
        common_percent: 0,
        district: "Другой округ",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Центральный фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Южный фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Приволжский фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Северо-Западный фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Сибирский фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Северо-Кавказский фо",
        stock_percent: 0
    },
    {
        amount: 0,
        common_percent: 0,
        district: "Уральский фо",
        stock_percent: 0
    },
    // {
    //     amount: 0,
    //     common_percent: 0,
    //     district: "Дальневосточный фо",
    //     stock_percent: 0
    // },
  ]

  
   
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
                    shop={shop}
                />

                <div className="map-container dash-container container p-3">
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
                            <div 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                             id="map">
                                <Map
                                    onMouseMove={showTooltip}
                                    onMouseOut={hideTooltip}
                                    data={ commonAndCompareOnMap }
                                />
                                {geoData && isHovered && (
                                    <div
                                    
                                        style={{
                                            position: 'absolute',
                                            left: tooltipPosition.x + 'px',
                                            top: tooltipPosition.y + 'px',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 0 40px rgba(19, 19, 19, 0.3)',
                                            padding: '16px',
                                            borderRadius: 16,
                                            width: '22vw',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <div>
                                            <h6 className='fw-bold d-flex align-items-center'>
                                                <div style={{ width: '1vw', height: '1vw', marginRight: '8px', borderRadius: '100%', backgroundColor: getColor(foName) }}></div>
                                                {foName}
                                            </h6>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Общая доля</p>
                                                <p className='mb-1 fw-bold  col'>{formatPrice(tooltipData?.percent)} %
                                                <img src={tooltipData?.comparePercent > 0 ? green : red} alt="" style={{ width: '1.25vw', marginLeft: '8px' }} />
                                                <span className='pt-1' style={tooltipData?.comparePercent > 0 ?
                                                { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(0, 182, 155, 1)', marginLeft: '2px' } :
                                                { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(249, 60, 101, 1)', marginLeft: '2px' }}
                                                 >
                                                    {Number(tooltipData?.comparePercent).toFixed(0)} %
                                                 </span>
                                                </p>
                                                
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Продажи, руб</p>
                                                <p className='mb-1 fw-bold  col'>{formatPrice(tooltipData?.salesAmount)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Продажи, шт</p>
                                                <p className='mb-1 fw-bold  col'>{formatPrice(tooltipData?.salesCount)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Заказы, руб</p>
                                                <p className='mb-1 fw-bold col'>{formatPrice(tooltipData?.ordersAmount)}</p>
                                            </div>
                                            <div className='d-flex'>
                                                <p className='mb-1 col'>Заказы, шт</p>
                                                <p className='mb-1 fw-bold col'>{formatPrice(tooltipData?.ordersCount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div> : null
                    }
                    {
                        byRegions && !loading && geoData.geo_data ?
                            <div className="map-data-content">
                                <div className=" pl-3 d-flex map-data-row">
                                    <div className="col">
                                        <OrderMapPieChart
                                            sub={'Всего заказов'}
                                            info={geoData.geo_data}
                                            title={'Топ 5 по заказам'}
                                            geoData={geoData.geo_data}
                                            totalAmount={totalOrderAmount}
                                            totalCount={totalOrderSum}
                                            // link={'Смотреть все регионы*'}
                                        />
                                    </div>
                                    <div className="col">
                                        <OrderMapPieChart
                                            sub={'Всего продаж'}
                                            info={geoData.geo_data}
                                            title={'Топ 5 по продажам'}
                                            geoData={geoData.geo_data}
                                            totalAmount={totalSaleAmount}
                                            totalCount={totalSaleSum}
                                            // link={'Место для кнопки-ссылки'}
                                        />
                                    </div>
                                </div>
                                <div className=" pl-3 map-data-row">
                                    <div className="col" style={geoData?.geo_data?.length <= 5 ? {visibility: 'hidden'} : {}}>
                                        <OrderMapTable 
                                        title={'Заказы в других регионах'}
                                        data={totalOrdersOther} 
                                         />
                                    </div>
                                    <div className="col" style={geoData?.geo_data?.length <=5 ? {visibility: 'hidden'} : {}}>
                                    <OrderMapTable 
                                    title={'Продажи в других регионах'} 
                                    data={totalSalesOther} 
                                    />
                                    </div>
                                </div>
                            </div>
                            :
                            !byRegions && !loading && geoData.stock_data ?
                                <div className="map-data-content">
                                    <div className=" pl-3 d-flex map-data-row">
                                        <div className="col" >
                                            <OrderMapPieChart
                                                info={geoData.stock_data}
                                                title={'Топ 5 по заказам'}
                                                geoData={geoData.stock_data}
                                                sub={'Всего заказов'}
                                                totalAmount={totalOrderAmountStock}
                                                totalCount={totalOrderSumStock}
                                            />
                                        </div>
                                        <div className="col">
                                            <OrderMapPieChart
                                                info={geoData.stock_data}
                                                title={'Топ 5 по продажам'}
                                                geoData={geoData.stock_data}
                                                sub={'Всего продаж'}
                                                totalAmount={totalSaleAmountStock}
                                                totalCount={totalSaleSumStock}
                                            />
                                        </div>
                                    </div>
                                    <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>Детализация по заказам</h5>
                                    {
                                        geoData.stock_data && geoData.stock_data.length ?
                                        geoData.stock_data.map((w, i) => {
                                                
                                                return (
                                                    <div className=" pl-3 map-data-row" key={i}>
                                                        <div className="col"  >
                                                            <OrderTableExtended title={`Заказы из ${w.stockName}`} data={ geoData?.stock_data[i]?.orderDetails.length !== 0 ? geoData?.stock_data[i]?.orderDetails : orderSaleStock } />
                                                        </div>
                                                        {/* style={geoData?.stock_data[i]?.saleDetails?.length === 0 ? { visibility: 'hidden' } : {}} */}
                                                        <div className="col"   >
                                                            <OrderTableExtended title={`Продажи из ${w.stockName}`} data={ geoData?.stock_data[i]?.saleDetails.length !== 0 ? geoData?.stock_data[i]?.saleDetails : orderSaleStock} />
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