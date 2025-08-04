import { useEffect, useState } from 'react';
import styles from './stockChartWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { ConfigProvider, Checkbox, Button } from 'antd';
import { formatPrice } from '../../../../service/utils';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import SearchBlock from '../search/searchBlock';
import { CompareChart } from '../../features';


/**
 * 

  {
    "warehouse_name": "string",
    "item": [
      {
        "supplier_id": 0,
        "value": 0
      }
    ]
  }

 */

const StockChartWidget = ({
    title,
    downloadButton,
    customHeader,
    dataType,
    units,
    chartType = 'line',
    dataHandler
}) => {

    const dispatch = useAppDispatch()
    const { mainSupplierData, compareSupplierData } = useAppSelector(store => store.supplierAnalysis)
    const { data: chartData, isLoading, isError, message } = useAppSelector(store => store.supplierAnalysis[dataType])
    const { selectedRange } = useAppSelector(store => store.filters)
    const [isMainSupplierActive, setIsMainSupplierActive] = useState(true)
    const [isCompareSupplierActive, setIsCompareSupplierActive] = useState(true)



    useEffect(() => {
        if (mainSupplierData && compareSupplierData) {
            let datesRange;

            if (selectedRange.period) {
                datesRange = selectedRange
            } else {
                datesRange = {
                    date_from: selectedRange.from,
                    date_to: selectedRange.to
                }
            }
            const requestObject = {
                "main_supplier_id": parseInt(mainSupplierData.supplier_id),
                "compared_supplier_id": parseInt(compareSupplierData.supplier_id),
                ...datesRange,
            }
            dispatch(dataHandler(requestObject))
        }
    }, [mainSupplierData, compareSupplierData, selectedRange])

    if (isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }


    if (isError) {
        return (
            <div className={styles.widget}>
                <div className={styles.loaderWrapper}>
                    <div className={styles.errorWrapper__message}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                            <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                        </svg>
                        {message || 'Не удалось загрузить данные'}
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
                                    if (mainSupplierData && compareSupplierData) {
                                        let datesRange;
                            
                                        if (selectedRange.period) {
                                            datesRange = selectedRange
                                        } else {
                                            datesRange = {
                                                date_from: selectedRange.from,
                                                date_to: selectedRange.to
                                            }
                                        }
                                        const requestObject = {
                                            "main_supplier_id": parseInt(mainSupplierData.supplier_id),
                                            "compared_supplier_id": parseInt(compareSupplierData.supplier_id),
                                            ...datesRange,
                                        }
                                        dispatch(dataHandler(requestObject))
                                    }
                                }}
                            >
                                Обновить
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.widget}>
            <div className={!customHeader && !downloadButton && !title ? `${styles.widget__header} ${styles.widget__header_hidden}` : styles.widget__header}>
                {!customHeader && <p className={styles.widget__title}>{title}</p>}
                {customHeader && customHeader}
                {downloadButton &&
                    <DownloadButton />
                }
            </div>

            <div className={styles.widget__chartWrapper}>
                <SearchBlock supplierType='compare' />
                {mainSupplierData && compareSupplierData && chartData &&
                    <div className={styles.widget__controls}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    controlInteractiveSize: 20,
                                }
                            }}
                        >
                            <Checkbox
                                size='large'
                                defaultChecked
                                checked={isMainSupplierActive}
                                className={styles.widget__checkbox}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setIsMainSupplierActive(true)
                                    } else {
                                        setIsMainSupplierActive(false)
                                    }
                                }
                                }
                            >
                                <label className={styles.widget__checkboxLabel}>
                                    {mainSupplierData?.trademark}
                                    <span>
                                        {formatPrice(chartData[mainSupplierData?.supplier_id?.toString()]?.reduce((acc, a) => {
                                            if (a) {
                                                return acc += a
                                            } else {
                                                return acc
                                            }
                                        }, 0).toString(), units)}
                                    </span>
                                </label>
                            </Checkbox>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#1BC5D1',
                                    controlInteractiveSize: 20,
                                }
                            }}
                        >
                            <Checkbox
                                size='large'
                                defaultChecked
                                checked={isCompareSupplierActive}
                                className={styles.widget__checkbox}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setIsCompareSupplierActive(true)
                                    } else {
                                        setIsCompareSupplierActive(false)
                                    }
                                }}
                            >
                                <label className={styles.widget__checkboxLabel}>
                                    {compareSupplierData?.trademark}
                                    <span>
                                        {formatPrice(chartData[compareSupplierData?.supplier_id?.toString()]?.reduce((acc, a) => {
                                            if (a) {
                                                return acc += a
                                            } else {
                                                return acc
                                            }
                                        }, 0), units)}
                                    </span>
                                </label>
                            </Checkbox>
                        </ConfigProvider>
                    </div>
                }

                {chartData && mainSupplierData && compareSupplierData &&
                    <CompareChart
                        chartType={chartType}
                        data={chartData}
                        mainSupplier={mainSupplierData?.supplier_id}
                        compareSupplier={compareSupplierData?.supplier_id}
                        isMainSupplierActive={isMainSupplierActive}
                        isCompareSupplierActive={isCompareSupplierActive}
                    />
                }
            </div>
        </div>
    )
}

export default StockChartWidget;