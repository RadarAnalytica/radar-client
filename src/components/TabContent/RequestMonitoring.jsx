import React from 'react'
import sortArrow from '../../assets/sortarrow.svg'
import SearchButton from '../../assets/searchstock.svg'
import DownloadFile from '../../assets/downloadxlfile.svg'
const RequestMonitoring = () => {
  const dataTable = [
       
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    }
  ]
  return (
    <div class="scrollable-table-request table-content">
      <div className='search'>
          <input type='text' placeholder='Поиск по категории' className='search-input' style={{marginLeft: '20px', marginTop: '20px'}} />
          <div style={{marginLeft: '10px', marginTop: '20px'}}>
              <img  src={SearchButton} alt="" />
          </div>
          <div style={{marginLeft: '10px', marginTop: '20px'}}>
              <img src={DownloadFile} alt="" />
          </div>
      </div>
    <table className='table table-glit-request'>
    <tr className='table-header' style={{position: 'sticky', top: '0'}}>
      <th  style={{borderTopLeftRadius:'8px', borderBottomLeftRadius:'8px'}}>
        Запрос
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      Частота WB запросов в месяц
        <img  src={sortArrow} alt="" />
      </th>
      <th>
      Средняя позиция карточки
        <img  src={sortArrow} alt="" />
      </th>
      
      
    </tr>
    
      {dataTable.map((item, i) => (
        <tr>
        <td style={{color: '#5329FF'}}>{item.productName}</td>
        <td>{item.brandName}</td>
        <td>{item.vendorСode}</td>
       
        
    </tr>
      ))}
        
    
    
  </table>

    </div>
  )
}

export default RequestMonitoring