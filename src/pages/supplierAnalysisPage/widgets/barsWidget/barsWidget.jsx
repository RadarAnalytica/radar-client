import React, { useEffect, useState } from 'react';
import styles from './barsWidget.module.css';
import DownloadButton from '../../../../components/DownloadButton';
import { ConfigProvider, Checkbox, Button } from 'antd';
import { formatPrice } from '../../../../service/utils';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectSupplierAnalysisDataByType } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';
import { Bar } from '../../features';
import { RadarBar } from '@/shared';


/**
 *
  "brands": 0,
  "goods": 0,
  "avg_daily_revenue": 0,
  "rating": 5


  {
    "revenue": 103517301251.0,
    "orders": 39019772,
    "lost_revenue": 8031201221.0,
    "avg_check": 2653.0,
    "avg_revenue": 59885.0,
    "goods_with_sales_percent": 0.0,
    "buyout_percent": 84.0,
    "buyout_quantity": 3933,
    "buyout_amount": 86954533051.0
}

 */

const BARS_CONFIG = [
    // brand meta
    { index: 'brands', title: 'Актуальное количество брендов на сегодня', hasColoredTitle: true, hasRateStar: false, units: '' },
    { index: 'goods', title: 'Артикулов за 30 дней', hasColoredTitle: false, hasRateStar: false, units: 'шт' },
    { index: 'avg_daily_revenue', title: 'Среднедневная выручка за 30 дней', hasColoredTitle: false, hasRateStar: false, units: '₽' },
    { index: 'rating', title: 'Рейтинг', hasColoredTitle: false, hasRateStar: true, units: null },
    // indicators
    { index: 'revenue', title: 'Выручка', hasColoredTitle: false, hasRateStar: false, units: '₽' },
    { index: 'orders', title: 'Заказов', hasColoredTitle: false, hasRateStar: false, units: 'шт' },
    { index: 'lost_revenue', title: 'Упущенная выручка', hasColoredTitle: false, hasRateStar: false, units: '₽' },
    { index: 'avg_check', title: 'Средний чек', hasColoredTitle: false, hasRateStar: false, units: '₽' },
    { index: 'avg_revenue', title: 'Среднедневная выручка на артикул с продажами', hasColoredTitle: false, hasRateStar: false, units: '₽' },
    { index: 'goods_with_sales_percent', title: 'Среднедневной % артикулов с продажами', hasColoredTitle: false, hasRateStar: false, units: '%' },
    { index: 'buyout_percent', title: 'Процент выкупа поставщика', hasColoredTitle: false, hasRateStar: false, units: '%', hasTooltip: true, tooltipText: '' },
    {
        index: 'buyout_amount', title: 'Выкупы', hasColoredTitle: false, hasRateStar: false, units: '₽', hasAdditionalData: true, additionalData: {
            index: 'buyout_quantity', units: 'шт'
        }
    },
];


const BarsWidget = ({ dataHandler, dataType, id }) => {
    const dispatch = useAppDispatch();
    const widgetData = useAppSelector(state => selectSupplierAnalysisDataByType(state, dataType));
    const { isSidebarHidden } = useAppSelector(store => store.utils);
    const { selectedRange, isFiltersLoaded } = useAppSelector(store => store.filters);


    useEffect(() => {
        if (selectedRange && id && isFiltersLoaded) {
            let datesRange;

            if (selectedRange.period) {
                datesRange = selectedRange;
            } else {
                datesRange = {
                    date_from: selectedRange.from,
                    date_to: selectedRange.to
                };
            }
            const reqData = {
                "supplier_id": parseInt(id),
                "page": 1,
                "limit": 25,
                ...datesRange
            };
            dispatch(dataHandler(reqData));
        }
    }, [id, selectedRange, isFiltersLoaded]);

    if (widgetData.isLoading || !isFiltersLoaded) {
        return (
            <div className={styles.loaderWrapper} style={{ height: 102}}>
                <span className='loader'></span>
            </div>
        );
    }
    if (widgetData.isError) {
        return (
            <div className={styles.errorWrapper}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                    <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                </svg>
                {widgetData.message || 'Не удалось загрузить данные'}
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF'
                        }
                    }}
                >
                    <Button
                        size='large'
                        style={{ marginLeft: 24 }}
                        onClick={() => {
                            if (selectedRange && id) {
                                let datesRange;

                                if (selectedRange.period) {
                                    datesRange = selectedRange;
                                } else {
                                    datesRange = {
                                        date_from: selectedRange.from,
                                        date_to: selectedRange.to
                                    };
                                }
                                const reqData = {
                                    "supplier_id": parseInt(id),
                                    "page": 1,
                                    "limit": 25,
                                    ...datesRange
                                };
                                dispatch(dataHandler(reqData));
                            }
                        }}
                    >
                        Обновить
                    </Button>
                </ConfigProvider>
            </div>
        );
    }

    return (
        <div className={isSidebarHidden ? styles.widget : `${styles.widget} ${styles.widget_2cols}`}>
            {widgetData?.data && Object.keys(widgetData.data).map((_, id) => {
                const CONFIG = BARS_CONFIG.find(i => i.index === _);
                return CONFIG && (
                    <>
                        <RadarBar
                            key={id}
                            title={CONFIG?.title}
                            mainValue={widgetData?.data[_]}
                            mainValueUnits={CONFIG?.units}
                            midValue={widgetData?.data[CONFIG.additionalData?.index]}
                            midValueUnits={CONFIG?.additionalData?.units}
                            elementsStyles={{ title: CONFIG?.index === 'brands' ? {color: '#5329FF'} : {}}}
                        />
                    </>
                );
            })}
        </div>
    );
};

export default BarsWidget;

