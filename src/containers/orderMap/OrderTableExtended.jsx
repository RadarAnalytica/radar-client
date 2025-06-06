import React from 'react'
import styles from './OrderMapTable.module.css'
import { formatPrice } from '../../service/utils'

const OrderTableExtended = ({ title, data, geoData }) => {
    // const uniqueDistricts = Array.from(new Set(geoData.map(item => item.districtName[0].toUpperCase() + item.districtName.slice(1))));

    // const filteredGeoData = geoData.filter(item => uniqueDistricts.includes(item.districtName));


    // const updatedStockData = data.map((stock, index) => {
    //     return {
    //       ...stock,
    //       districtName: filteredGeoData[index].districtName,
    //       percentRegion: filteredGeoData[index].percent
    //     };
    //   });
    
    data?.forEach((...item) => {
            let sub = item?.district?.split('федеральный округ')?.join('фо')
            item.district = sub
        })
        
        // stok?.forEach(item => {
        //     if (item.stockName && item.stockName.length) {
        //         let name = item.stockName.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        //         item.stockName = name
        //     }
        //     else {
        //         item.stockName = "Регион не определен"
        //     }
        // })
        
        return (
        <div className='order-table-extended'>
            <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>{title}</h5>

            <div className={styles.table_extended}>
            {/* <div className='d-flex justify-content-between'> */}
                <p className="mb-2 clue-text col-5 pe-2">Регион</p>
                <p className="mb-2 clue-text col">Рубли</p>
                <p className="mb-2 clue-text col">Общая доля</p>
                <p className="mb-2 clue-text col text-end">По складу</p>
            {/* </div> */}
           
            {
                data  && data.length ?
                data.map((item, key) =>   (
                        // <div key={key} className='d-flex' >
                            <>
                            <p style={{ fontWeight: 600 }} className={styles.table__rowTitle}>{item.district}</p>
                            <p style={{ fontWeight: 600, textWrap: 'nowrap'}} className="mb-2 col">{formatPrice(item.amount) || '0'} ₽</p>
                            <p style={{ fontWeight: 600 }} className="mb-2 col">{(item.common_percent)?.toFixed(1) || '0'}%</p>
                            <p style={{ fontWeight: 600 }} className="mb-2 col fw-bold text-end">{(item.stock_percent)?.toFixed(1) || '0'}%</p>
                            </>
                        // </div>
                    )) : null
            }
            </div>
        </div>
    )
}

export default OrderTableExtended