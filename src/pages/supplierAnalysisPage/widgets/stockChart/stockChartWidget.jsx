import { useEffect, useState } from 'react';
import styles from './stockChartWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { Input, ConfigProvider, Checkbox } from 'antd';
import { formatPrice } from '../../../../service/utils';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
    fetchSupplierAnalysisByWharehousesComparsionData
} from '../../../../redux/supplierAnalysis/supplierAnalysisActions'
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
    const chartData = useAppSelector(store => store.supplierAnalysis[dataType])
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
                {mainSupplierData && compareSupplierData && chartData.data &&
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
                                        {formatPrice(chartData?.data[mainSupplierData?.supplier_id?.toString()]?.reduce((acc, a) => {
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
                                        {formatPrice(chartData?.data[compareSupplierData?.supplier_id?.toString()]?.reduce((acc, a) => {
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

                {chartData?.data && mainSupplierData && compareSupplierData &&
                    <CompareChart
                        chartType={chartType}
                        data={chartData?.data}
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