import React, { useEffect, useState } from 'react'
import glitIconBlue from '../../pages/images/glittericonblue.svg';
import glitCostPrise from '../../pages/images/glitsotprice.svg';
import glitIconGreen from '../../pages/images/gliticongreen.svg';
import glitIconReturn from '../../pages/images/gliticonreturn.svg';
import glitVectorGreen from '../../pages/images/glitvectorgreen.svg';
import BigChartGlitter from '../BigChartGlitter';
import TableStockSalesByDay from '../TableStockSalesByDay';
import StockCostPrice from '../../assets/stockcostprice.svg';
const Summary = ({ days, productBySku, isInitialLoading }) => {

  const dataDash =  {
    orderAmountList: [4534, 7234, 5896, 3468, 1259, 7925, 6548, 4534, 7234, 5896, 3468, 1259, 7925, 6548, 8566, 4534, 7234, 5896, 3468, 1259, 7925, 6548, 4534, 7234, 5896, 3468, 1259, 7925, 6548, 8566 ],
    saleAmountList: [5896, 3468, 7925, 1259, 4534, 7234, 6548, 5896, 3468, 7925, 1259, 4534, 7234, 6548, 1456, 5896, 3468, 7925, 1259, 4534, 7234, 6548, 5896, 3468, 7925, 1259, 4534, 7234, 6548, 1456],
    returnAmountList: [4875, 3468, 7925, 1259, 4534, 7234, 6548, 4875, 3468, 7925, 1259, 4534, 7234, 6548, 1456, 4875, 3468, 7925, 1259, 4534, 7234, 6548, 4875, 3468, 7925, 1259, 4534, 7234, 6548, 1456],
    orderCountList: [55, 23, 64, 58, 79, 23, 54, 55, 23, 64, 58, 79, 23, 54, 17, 55, 23, 64, 58, 79, 23, 54, 55, 23, 64, 58, 79, 23, 54, 17],
    saleCountList: [45, 32, 64, 45, 81, 33, 14, 45, 32, 64, 45, 81, 33, 14, 60, 45, 32, 64, 45, 81, 33, 14, 45, 32, 64, 45, 81, 33, 14, 60],
    returnCountList: [45, 32, 64, 45, 81, 33, 14, 45, 32, 64, 45, 81, 33, 14, 60, 45, 32, 64, 45, 81, 33, 14, 45, 32, 64, 45, 81, 33, 14, 60],
}
const [activeTabDay, setActiveTabDay] = useState('saleDay');


  const [orderOn, setOrderOn] = useState(true);
  const [orderLineOn, setOrderLineOn] = useState(true);
  const [salesOn, setSalesOn] = useState(true);
  const [salesLineOn, setSalesLineOn] = useState(true);
  const [returnLineOn, setReturnLineOn] = useState(true);
  const [returnOn, setReturnOn] = useState(true);
  const [productBySku1, setProductBySku1] = useState(productBySku);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
     if (productBySku) {
      setProductBySku1(productBySku);
     }
  }, [productBySku]);

  function getPastDays(number) {
    const today = new Date();
    const pastDays = [];

    for (let i = 1; i <= number; i++) {
      const pastDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const day = pastDate.getDate().toString().padStart(2, "0");
      const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      const month = monthNames[pastDate.getMonth()];

      pastDays.push(`${day} ${month}`);
    }

    return pastDays;
  }
  const arrayDay = getPastDays(days);

  const data = {
    labels: arrayDay.reverse() || [],
    datasets: [
      orderLineOn
        ? {
            label: "Заказы",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(255, 219, 126, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(255, 219, 126, 1)",
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "A",
            data: dataDash?.orderAmountList || [],
            xAxisID: 'x-1'
          }
        : {
            label: "Заказы",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(255, 219, 126, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(255, 219, 126, 1)",
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "A",
            data: [],
          },
      salesLineOn
        ? {
            label: "Продажи",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(154, 129, 255, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(154, 129, 255, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: dataDash?.saleAmountList || [],
            
          }
        : {
            label: "Продажи",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(154, 129, 255, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(154, 129, 255, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: [],
          },
          returnLineOn
        ? {
            label: "Возвраты",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(249, 60, 101, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(249, 60, 101, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: dataDash?.returnAmountList || [],
            xAxisID: 'x-1'
            
          }
        : {
            label: "Возвраты",
            borderRadius: 8,
            type: "line",
            backgroundColor: "rgba(249, 60, 101, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBorderColor: "rgba(230, 230, 230, 0.8)",
            borderColor: "rgba(249, 60, 101, 1)",
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "A",
            data: [],
          },
      orderOn
        ? {
            label: "Заказы",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(240, 173, 0, 1)");
              gradient.addColorStop(0.5, "rgba(240, 173, 0, 0.9)");
              gradient.addColorStop(1, "rgba(240, 173, 0, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "B",
            data: dataDash?.orderCountList || [],
          }
        : {
            label: "Заказы",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(240, 173, 0, 1)");
              gradient.addColorStop(0.5, "rgba(240, 173, 0, 0.9)");
              gradient.addColorStop(1, "rgba(240, 173, 0, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(240, 173, 0, 7)",
            yAxisID: "B",
            data: [],
          },
      salesOn
        ? {
            label: "Продажи",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 500);
              gradient.addColorStop(0, "rgba(83, 41, 255, 1)");
              gradient.addColorStop(0.5, "rgba(83, 41, 255, 0.9)");
              gradient.addColorStop(1, "rgba(83, 41, 255, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "B",
            data: dataDash?.saleCountList || [],
          }
        : {
            label: "Продажи",
            borderRadius: 8,
            type: "bar",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 500);
              gradient.addColorStop(0, "rgba(83, 41, 255, 1)");
              gradient.addColorStop(0.5, "rgba(83, 41, 255, 0.9)");
              gradient.addColorStop(1, "rgba(83, 41, 255, 0.5)");
              return gradient;
            },
            borderWidth: 1,
            hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
            yAxisID: "B",
            data: [],
          },
          returnOn
          ? {
              label: "Возвраты",
              borderRadius: 8,
              type: "bar",
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                gradient.addColorStop(0, "rgba(249, 60, 101, 1)");
                gradient.addColorStop(0.5, "rgba(249, 60, 101, 0.9)");
                gradient.addColorStop(1, "rgba(249, 60, 101, 0.5)");
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: "rgba(249, 60, 101, 0.7",
              yAxisID: "B",
              data: dataDash?.returnCountList || [],
            }
          : {
              label: "Возвраты",
              borderRadius: 8,
              type: "bar",
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                gradient.addColorStop(0, "rgba(83, 41, 255, 1)");
                gradient.addColorStop(0.5, "rgba(83, 41, 255, 0.9)");
                gradient.addColorStop(1, "rgba(83, 41, 255, 0.5)");
                return gradient;
              },
              borderWidth: 1,
              hoverBackgroundColor: "rgba(83, 41, 255, 0.7)",
              yAxisID: "B",
              data: [],
            },
    ],
    };

    const dataTableSaleDay = [
       
      {
        productName: 'Шампунь',
        brandName: 'Бренд 2',
        vendorСode: 12345,
        barCode: 52648,
        sku: 12345,
        size: 'XL',
        category: 'Разное',
        saleSum: 55428,
        quantity: 231,
        lessReturns: 56842,
        costGoodsSold: 56984,
        returnsSum: 56842,
        returnsQuantity: 25,
        returnsCostSold: 56842,
        costPriceOne: 120,
        costOfProductStockToday: 2562,
        toClient: 5568,
        fromClient: 2562,
        commissionWB: 5743,
        fines: 2562,
        additionalpayment: 4562,
        serviceExpenses: 322,
        toPayoff: 25365,
        marginalProfit: 9322,
        averageProfit: 9322,
        profitabilityOfProductsSold: 9322,
        marginal: 29,
        annualReturnOnInventory: 152,
        lostRevenue: 254,
        byRevenue: 152,
        byProfit: 152,
        basic: 505,
        maxDiscount: 58,
        minDiscountPrice: 25,
        orderQuantity: 25,
        orderSum: 25,
        purchased: 45,
        notPurchased: 46,
        purchasedPrecent: 25,
        completed: 78,
        orderCountDay: 2,
        slaeCountDay: 6,
        dataRadar: 57,
        dataWB: 6
      },
      {
          productName: 'Крем для рук',
          brandName: 'Бренд 1',
          vendorСode: 1235,
          barCode: 62648,
          sku: 12375,
          size: 'XL',
          category: 'Разное',
          saleSum: 25428,
          quantity: 231,
          lessReturns: 77684,
          costGoodsSold: 569,
          returnsSum: 16842,
          returnsQuantity: 32,
          returnsCostSold: 56848,
          costPriceOne: 120,
          costOfProductStockToday: 4562,
          toClient: 1458,
          fromClient: 3244,
          commissionWB: 7896,
          fines: 6658,
          additionalpayment: 4562,
          serviceExpenses: 322,
          toPayoff: 25365,
          marginalProfit: 7322,
          averageProfit: 5687,
          profitabilityOfProductsSold: 9322,
          marginal: 29,
          annualReturnOnInventory: 152,
          lostRevenue: 254,
          byRevenue: 452,
          byProfit: 1252,
          basic: 536,
          maxDiscount: 60,
          minDiscountPrice: 23,
          orderQuantity: 12,
          orderSum: 45,
          purchased: 75,
          notPurchased: 12,
          purchasedPrecent: 25,
          completed: 102,
          orderCountDay: 2,
          slaeCountDay: 7,
          dataRadar: 55,
          dataWB: 8
        },
        {
          productName: 'Вентилятор',
          brandName: 'Бренд 3',
          vendorСode: 523,
          barCode: 7896,
          sku: 3345,
          size: 'M',
          category: 'Бытовая',
          saleSum: 54428,
          quantity: 231,
          lessReturns: 56842,
          costGoodsSold: 56984,
          returnsSum: 56842,
          returnsQuantity: 25,
          returnsCostSold: 56842,
          costPriceOne: 120,
          costOfProductStockToday: 2562,
          toClient: 5568,
          fromClient: 2862,
          commissionWB: 7743,
          fines: 3562,
          additionalpayment: 4562,
          serviceExpenses: 322,
          toPayoff: 25865,
          marginalProfit: 9342,
          averageProfit: 9322,
          profitabilityOfProductsSold: 9322,
          marginal: 29,
          annualReturnOnInventory: 152,
          lostRevenue: 254,
          byRevenue: 152,
          byProfit: 152,
          basic: 505,
          maxDiscount: 58,
          minDiscountPrice: 15,
          orderQuantity: 27,
          orderSum: 23,
          purchased: 44,
          notPurchased: 46,
          purchasedPrecent: 25,
          completed: 78,
          orderCountDay: 2,
          slaeCountDay: 6,
          dataRadar: 57,
          dataWB: 6
        }
    ]
    const dataTableOrderDay = [
     
      {
        productName: 'Пенал',
        brandName: 'Бренд 2',
        vendorСode: 12345,
        barCode: 52648,
        sku: 12345,
        size: 'XL',
        category: 'Разное',
        saleSum: 55428,
        quantity: 231,
        lessReturns: 56842,
        costGoodsSold: 56984,
        returnsSum: 56842,
        returnsQuantity: 25,
        returnsCostSold: 56842,
        costPriceOne: 120,
        costOfProductStockToday: 2562,
        toClient: 5568,
        fromClient: 2562,
        commissionWB: 5743,
        fines: 2562,
        additionalpayment: 4562,
        serviceExpenses: 322,
        toPayoff: 25365,
        marginalProfit: 9322,
        averageProfit: 9322,
        profitabilityOfProductsSold: 9322,
        marginal: 29,
        annualReturnOnInventory: 152,
        lostRevenue: 254,
        byRevenue: 152,
        byProfit: 152,
        basic: 505,
        maxDiscount: 58,
        minDiscountPrice: 25,
        orderQuantity: 25,
        orderSum: 25,
        purchased: 45,
        notPurchased: 46,
        purchasedPrecent: 25,
        completed: 78,
        orderCountDay: 2,
        slaeCountDay: 6,
        dataRadar: 57,
        dataWB: 6
      },
      {
          productName: 'Крем для рук',
          brandName: 'Бренд 1',
          vendorСode: 1235,
          barCode: 62648,
          sku: 12375,
          size: 'XL',
          category: 'Разное',
          saleSum: 25428,
          quantity: 231,
          lessReturns: 77684,
          costGoodsSold: 569,
          returnsSum: 16842,
          returnsQuantity: 32,
          returnsCostSold: 56848,
          costPriceOne: 120,
          costOfProductStockToday: 4562,
          toClient: 1458,
          fromClient: 3244,
          commissionWB: 7896,
          fines: 6658,
          additionalpayment: 4562,
          serviceExpenses: 322,
          toPayoff: 25365,
          marginalProfit: 7322,
          averageProfit: 5687,
          profitabilityOfProductsSold: 9322,
          marginal: 29,
          annualReturnOnInventory: 152,
          lostRevenue: 254,
          byRevenue: 452,
          byProfit: 1252,
          basic: 536,
          maxDiscount: 60,
          minDiscountPrice: 23,
          orderQuantity: 12,
          orderSum: 45,
          purchased: 75,
          notPurchased: 12,
          purchasedPrecent: 25,
          completed: 102,
          orderCountDay: 2,
          slaeCountDay: 7,
          dataRadar: 55,
          dataWB: 8
        },
        {
          productName: 'Вентилятор',
          brandName: 'Бренд 3',
          vendorСode: 523,
          barCode: 7896,
          sku: 3345,
          size: 'M',
          category: 'Бытовая',
          saleSum: 54428,
          quantity: 231,
          lessReturns: 56842,
          costGoodsSold: 56984,
          returnsSum: 56842,
          returnsQuantity: 25,
          returnsCostSold: 56842,
          costPriceOne: 120,
          costOfProductStockToday: 2562,
          toClient: 5568,
          fromClient: 2862,
          commissionWB: 7743,
          fines: 3562,
          additionalpayment: 4562,
          serviceExpenses: 322,
          toPayoff: 25865,
          marginalProfit: 9342,
          averageProfit: 9322,
          profitabilityOfProductsSold: 9322,
          marginal: 29,
          annualReturnOnInventory: 152,
          lostRevenue: 254,
          byRevenue: 152,
          byProfit: 152,
          basic: 505,
          maxDiscount: 58,
          minDiscountPrice: 15,
          orderQuantity: 27,
          orderSum: 23,
          purchased: 44,
          notPurchased: 46,
          purchasedPrecent: 25,
          completed: 78,
          orderCountDay: 2,
          slaeCountDay: 6,
          dataRadar: 57,
          dataWB: 6
        }
    ]
    const [dataSaleDay, setDataSaleDay] = useState(dataTableSaleDay);
    const [dataOrderDay, setDataOrderDay] = useState(dataTableOrderDay);

  return (
    <>
      <div
        className='container dash-container pt-0 d-flex justify-content-between'
        style={{ gap: '20px' }}
      >
        <div className='sales-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '5%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='sales-box-with-image'>
                <div>
                  <div className='sales-box-title'>Продажи</div>
                  <div className='sales-box-price'>
                    {productBySku?.saleSum} ₽
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#00B69B',
                    }}
                  >
                    {productBySku?.saleAmountCompare} ₽{/* + 23 678.00 p */}
                  </div>
                </div>
                <div className='sales-box-image'>
                  <img src={glitIconBlue} alt='sales' />
                </div>
              </div>
              <div className='sales-box-quantity sales-box-price'>
                {productBySku?.quantity} шт
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#00B69B',
                  marginLeft: '16px',
                }}
              >
                +117 шт
              </div>
            </>
          )}
        </div>
        <div className='sebestoimost-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '5%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='sebestoimost-box-row'>
                <div>
                  <div className='sales-box-title'>
                    Себестоимость проданных товаров
                  </div>
                  <div className='sales-box-price'>
                    {productBySku?.costGoodsSold === "-" ? "-" : productBySku?.costGoodsSold}
                    {productBySku?.costGoodsSold === "-" ? "" : " ₽"}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#00B69B',
                    }}
                  >
                    + 14 678.00 p
                  </div>
                </div>
                <div className='sebestoimost-box-image'>
                  <img src={glitIconGreen} alt='selfcost image' />
                </div>
              </div>
              <div className='sebestoimost-box-button'>
                <img
                  style={{ cursor: 'pointer' }}
                  src={StockCostPrice}
                  alt=''
                />
              </div>
            </>
          )}
        </div>
        <div className='returns-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '5%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='returns-box-row'>
                <div>
                  <div className='sales-box-title'>Возвраты</div>
                  <div className='sales-box-price'>
                    {productBySku?.returnsSum} ₽
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#F93C65',
                    }}
                  >
                    + 1 678.00 p
                  </div>
                </div>
                <div className='returns-box-image'>
                  <img src={glitIconReturn} alt='' />
                </div>
              </div>
              <div className='returns-qantity'>
                <div className='sales-box-price'>
                  {productBySku?.returnsQuantity || '0'} шт
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#F93C65',
                  }}
                >
                  +5 шт
                </div>
              </div>
            </>
          )}
        </div>
        <div className='penalty-wb-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '5%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='penalty-wb-box'>
                <div className='penalty-wb-box-title'>Штрафы WB</div>
                <div style={{ fontWeight: '700', marginRight: '10px' }}>
                  {productBySku?.penalty || '0'} ₽
                </div>
              </div>
              <div className='penalty-wb-box'>
                <div className='penalty-wb-box-title'>Доплаты WB</div>
                <div style={{ fontWeight: '700', marginRight: '10px' }}>
                  {productBySku?.additionalPayment || '0'} ₽
                </div>
              </div>
              <div className='penalty-wb-box'>
                <div className='penalty-wb-box-title'>Комиссия WB</div>
                <div style={{ fontWeight: '700', marginRight: '10px' }}>
                  {productBySku?.commissionWB || '0'} ₽
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className='container dash-container d-flex justify-content-between'
        style={{
          marginTop: '20px',
          gap: '20px',
        }}
      >
        <div className='expenses-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '2%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='expenses-box-title'>
                Расходы на логистику к клиенту
              </div>
              <div className='expenses-box-price'>
                <div className='expenses-box-price-title'>
                  {productBySku?.toClient || '0'} ₽
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    fontSize: '14px',
                    color: '#00B69B',
                  }}
                >
                  -1 558,20 р
                </div>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            width: '422px',
            height: '90px',
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
        >
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '2%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='expenses-box-title'>
                Расходы на логистику от клиента
              </div>
              <div className='expenses-box-price'>
                <div className='expenses-box-price-title'>
                  {productBySku?.fromClient || '0'} ₽
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    fontSize: '14px',
                    color: '#F93C65',
                  }}
                >
                  +370,00 ₽
                </div>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            width: '422px',
            height: '90px',
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
        >
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '2%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='expenses-box-title'>Маржинальная прибыль</div>
              <div className='expenses-box-price'>
                <div className='expenses-box-price-title'>
                  {productBySku?.marginalProfit || '0'} ₽
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    fontSize: '14px',
                    color: '#00B69B',
                  }}
                >
                  +14 383,00 ₽
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className='container dash-container d-flex justify-content-between'
        style={{
          marginTop: '20px',
          gap: '20px',
        }}
      >
        <div className='orders-ostatok-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '3%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='orders-ostatok-box-title'>Товарный остаток</div>
              <div className='orders-ostatok-row'>
                <div className='orders-ostatok-row-text'>
                  На складе продавца
                </div>
                <div style={{ display: 'flex' }}>
                  <div className='orders-ostatok-row-digit'>
                    {productBySku?.dataRadar - productBySku?.dataWB} шт
                  </div>
                  <div
                    style={{
                      marginRight: '10px',
                      marginTop: '3px',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#8C8C8C',
                    }}
                  >
                    120 000,00 ₽
                  </div>
                </div>
              </div>
              <hr style={{ margin: '8px 16px 8px 16px' }}></hr>
              <div className='orders-ostatok-row-second'>
                <div className='orders-ostatok-row-text'>На складе WB</div>
                <div style={{ display: 'flex' }}>
                  <div className='orders-ostatok-row-digit'>
                    {productBySku?.dataWB} шт
                  </div>
                  <div
                    style={{
                      marginRight: '10px',
                      marginTop: '3px',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#8C8C8C',
                    }}
                  >
                    120 000,00 ₽
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='orders-ostatok-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '3%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='orders-ostatok-box-title'>Заказы</div>
              <div className='orders-ostatok-row'>
                <div className='orders-ostatok-row-text'>Сумма</div>
                <div style={{ display: 'flex' }}>
                  <div className='orders-ostatok-row-digit'>
                    {productBySku?.orderSum || '0'} ₽
                  </div>
                  <div
                    style={{
                      marginRight: '10px',
                      marginTop: '3px',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#00B69B',
                    }}
                  >
                    +14 383,00 ₽
                  </div>
                </div>
              </div>
              <hr style={{ margin: '8px 16px 8px 16px' }}></hr>
              <div className='orders-ostatok-row-second'>
                <div className='orders-ostatok-row-text'>На складе WB</div>
                <div style={{ display: 'flex' }}>
                  <div className='orders-ostatok-row-digit'>
                    {productBySku?.dataWB} шт
                  </div>
                  <div
                    style={{
                      marginRight: '10px',
                      marginTop: '3px',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#F93C65',
                    }}
                  >
                    -2 шт
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className='container dash-container d-flex justify-content-between'
        style={{
          marginTop: '20px',
          gap: '20px',
        }}
      >
        <div className='sellout-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '3%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='sellout-box-title'>Процент выкупа</div>
              <div>
                <div className='sellout-box-digit'>
                  {productBySku?.purchasedPrecent} %
                </div>
              </div>
            </>
          )}
        </div>
        <div className='sellout-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '3%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='sellout-box-title'>Маржинальность</div>
              <div>
                <div className='sellout-box-digit'>
                  {productBySku?.marginal || '0'} %
                </div>
              </div>
            </>
          )}
        </div>
        <div className='sellout-box-wrapper'>
          {isInitialLoading && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{ height: '100%', paddingTop: '3%', width: '100%' }}
            >
              <span className='loader'></span>
            </div>
          )}
          {!isInitialLoading && (
            <>
              <div className='sellout-box-title'>Упущенные продажи</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div className='sellout-box-digit'>
                  {productBySku?.lostRevenue || '0'} ₽
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  5 шт
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ width: '93%', marginLeft: '50px', marginTop: '20px' }}>
        <BigChartGlitter
          data={data}
          orderOn={orderOn}
          salesOn={salesOn}
          returnOn={returnOn}
          setOrderOn={setOrderOn}
          setSalesOn={setSalesOn}
          setReturnOn={setReturnOn}
          setOrderLineOn={setOrderLineOn}
          setSalesLineOn={setSalesLineOn}
          setReturnLineOn={setReturnLineOn}
          orderLineOn={orderLineOn}
          salesLineOn={salesLineOn}
          returnLineOn={returnLineOn}
          loading={loading}
          days={days}
        />
      </div>
      <div
        style={{
          width: '93%',
          marginLeft: '3.5vw',
          marginTop: '20px',
          display: 'flex',
        }}
      >
        <div
          onClick={() => setActiveTabDay('saleDay')}
          style={{
            width: '184px',
            height: '43px',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '8px 12px px 8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              activeTabDay === 'saleDay' ? '#5329FF1A' : 'transparent',
            fontSize: '18px',
            fontWeight: 
              activeTabDay === 'saleDay' ? '600' : '500',
            color: activeTabDay === 'saleDay' ? 'rgb(26, 26, 26, 1)' : 'rgb(26, 26, 26, 0.5)',
          }}
        >
          <p
            style={{ margin: '0' }}
          >
            Продажи по дням
          </p>
        </div>
        <div
          onClick={() => setActiveTabDay('orderDay')}
          style={{
            width: '184px',
            height: '43px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor:
              activeTabDay === 'orderDay' ? '#5329FF1A' : 'transparent',
              padding: '8px 12px px 8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                activeTabDay === 'orderDay' ? '#5329FF1A' : 'transparent',
              fontSize: '18px',
              fontWeight: 
                activeTabDay === 'orderDay' ? '600' : '500',
              color: activeTabDay === 'orderDay' ? 'rgb(26, 26, 26, 1)' : 'rgb(26, 26, 26, 0.5)',
          }}
        >
          <p
            style={{ margin: '0' }}
          >
            Заказы по дням
          </p>
        </div>
      </div>
     { activeTabDay === 'saleDay' && 
      <TableStockSalesByDay
        dataSaleDay={dataSaleDay}
        setDataSaleDay={setDataSaleDay}
        dataOrderDay={dataOrderDay}
        setDataOrderDay={setDataOrderDay}
        activeTabDay={activeTabDay}
      />
      }
       { activeTabDay === 'orderDay' && <TableStockSalesByDay
        dataSaleDay={dataSaleDay}
        setDataSaleDay={setDataSaleDay}
        dataOrderDay={dataOrderDay}
        setDataOrderDay={setDataOrderDay}
        activeTabDay={activeTabDay}
      />}
    </>
  );
}

export default Summary