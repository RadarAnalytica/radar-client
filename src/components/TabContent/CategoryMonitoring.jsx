import React from 'react'
import sortArrow from '../../assets/sortarrow.svg'
import SearchButton from '../../assets/searchstock.svg'
import DownloadFile from '../../assets/downloadxlfile.svg'


const CategoryMonitoring = () => {
  const dataTable = [
       
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
  return (
    <div class="scrollable-table table-content">
      <div className='search'>
                    <input type='text' placeholder='Поиск по категории' className='search-input' style={{marginLeft: '20px', marginTop: '20px'}} />
                    <div style={{marginLeft: '10px', marginTop: '20px'}}>
                        <img  src={SearchButton} alt="" />
                    </div>
                    <div style={{marginLeft: '10px', marginTop: '20px'}}>
                        <img src={DownloadFile} alt="" />
                    </div>
                </div>
    <table className='table table-glit-product'>
    <tr className='table-header'>
      <th  style={{borderTopLeftRadius:'8px', borderBottomLeftRadius:'8px'}}>
        Категория
        <img  src={sortArrow} alt="" />
      </th>
      <th>
        17.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      18.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      19.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      20.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      21.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      22.12
        <img   src={sortArrow} alt="" />
      </th>
      <th>
      23.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      24.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      25.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      26.12
      <img  src={sortArrow} alt="" />
      </th>
      <th>
      27.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      28.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      29.12
      <img  src={sortArrow} alt="" />
      </th>
      <th>
      30.12
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      31.12
      <img  src={sortArrow} alt="" />
      </th>
      <th>
      01.01
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      02.01
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      03.01
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      04.01
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      05.01
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      06.01
        <img  src={sortArrow} alt="" />
      </th>
      
    </tr>
    
      {dataTable.map((item, i) => (
        <tr>
        <td style={{color: '#5329FF'}}>{item.productName}</td>
        <td>{item.brandName}</td>
        <td>{item.vendorСode}</td>
        <td>{item.barCode}</td>
        <td>{item.sku}</td>
        <td>{item.size}</td>
        <td>{item.category}</td>
        <td>{item.saleSum} р</td>
        <td>{item.quantity}</td>
        <td>{item.lessReturns}</td>
        <td>{item.costGoodsSold}</td>
        <td>{item.returnsSum}</td>
        <td>{item.returnsQuantity}</td>
        <td>{item.returnsCostSold}р</td>
        <td>{item.costPriceOne}</td>
        <td>{item.costOfProductStockToday}р</td>
        <td>{item.toClient}р</td>
        <td>{item.fromClient}р</td>
        <td>{item.commissionWB}р</td>
        <td>{item.fines}р</td>
        <td>{item.additionalpayment}р</td>
        <td>{item.serviceExpenses}р</td>
        
    </tr>
      ))}
        
    
    
  </table>

    </div>
  )
}

export default CategoryMonitoring