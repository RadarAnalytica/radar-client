import React from 'react';
import styles from './OrderTableExtended.module.css';
import { formatPrice } from '../../service/utils';

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
        let sub = item?.district?.split('федеральный округ')?.join('фо');
        item.district = sub;
    });

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
        <>
            <h5 className={styles.block__title}>{title}</h5>

            <div className={styles.table}>
                <p className={styles.table__title}>Регион</p>
                <p className={styles.table__title}>Рубли</p>
                <p className={styles.table__title}>Общая доля</p>
                <p className={styles.table__title}>По складу</p>
                <div className={styles.table__border}></div>
                {data && data.length > 0 &&
                    data.map((item, key) => (
                        <React.Fragment key={key}>
                            <p className={styles.table__item}>{item.district.replace('федеральный округ', 'ФО')}</p>
                            <p className={styles.table__item}>{formatPrice(item.amount, '₽') || '0'}</p>
                            <p className={styles.table__item}>{formatPrice(item.common_percent, '%') || '0'}</p>
                            <p className={`${styles.table__item} ${styles.table__item_bolder}`}>{formatPrice(item.stock_percent, '%') || '0'}</p>
                            {key !== data.length - 1 && <div className={styles.table__border}></div>}
                        </React.Fragment>
                    ))
                }
                {data && data.length === 0 &&
                     <p className={styles.table__item}>Нет данных</p>
                }
            </div>
        </>
    );
};

export default OrderTableExtended;
