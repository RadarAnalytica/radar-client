import React, { useState, useEffect } from 'react';
import styles from './mainChartWidget.module.css'
import { ChartControls } from '../../features';
import { Chart } from 'react-chartjs-2';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { chartCompareConfigObject, mainChartOptionsGenerator } from '../../shared';
import moment from 'moment';
import { verticalDashedLinePlugin } from '../../../../service/utils';
import { ConfigProvider, Button } from 'antd';

ChartJS.register(
    annotationPlugin,
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip],
    verticalDashedLinePlugin
);


const MainChartWidget = ({ id, dataType, dataHandler }) => {
    const dispatch = useAppDispatch()
    const [chartControls, setChartControls] = useState(undefined)
    const [normilizedChartData, setNormilizedChartData] = useState()
    const { selectedRange } = useAppSelector(store => store.filters)
    const widgetData = useAppSelector(store => store.supplierAnalysis[dataType])


    //data fetching
    useEffect(() => {
        if (selectedRange && id) {
            let datesRange;

            if (selectedRange.period) {
                datesRange = selectedRange
            } else {
                datesRange = {
                    date_from: selectedRange.from,
                    date_to: selectedRange.to
                }
            }
            const reqData = {
                "supplier_id": parseInt(id),
                "page": 1,
                "limit": 25,
                ...datesRange
            }
            dispatch(dataHandler(reqData))
        }
    }, [selectedRange, id])

    useEffect(() => {
        const chartControlsFromLocalStorage = JSON.parse(localStorage.getItem('SuppierAnalysysMainChartControls'))
        if (chartControlsFromLocalStorage) {
            setChartControls(chartControlsFromLocalStorage)
        } else {
            setChartControls(chartCompareConfigObject.filter(_ => _.isControl).map(_ => ({ ..._, isActive: _.defaultActive })))
        }
    }, [chartCompareConfigObject])


    useEffect(() => {
        if (widgetData.data && chartControls) {
            const data = {
                labels: widgetData.data.dates.map(i => moment(i).format('DD.MM.YY')),
                datasets: chartControls.map(i => {
                    let yAxis = 'y1';
                    if (i.hasUnits && i.units === '₽') {
                        yAxis = 'y'
                    }
                    if (i.isOnChart && i.isActive) {
                        return {
                            label: i.ruName,
                            type: 'line',
                            data: widgetData.data[i.engName]?.map(i => i.item),
                            borderColor: i.color,
                            yAxisID: yAxis,
                            tension: 0.4,
                            pointBorderColor: 'white',
                            backgroundColor: i.color,
                            pointRadius: 6,
                            hoverRadius: 8,
                            borderWidth: 2
                        }
                    } else {
                        return {}
                    }
                })
            }
            setNormilizedChartData({ ...data })
        }
    }, [widgetData.data, chartControls])

    if (widgetData.isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <span className='loader'></span>
            </div>
        )
    }
    if (widgetData.isError) {
        return (
                <div className={styles.errorWrapper}>
                    <div className={styles.errorWrapper__message}>
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
                                            datesRange = selectedRange
                                        } else {
                                            datesRange = {
                                                date_from: selectedRange.from,
                                                date_to: selectedRange.to
                                            }
                                        }
                                        const reqData = {
                                            "supplier_id": parseInt(id),
                                            "page": 1,
                                            "limit": 25,
                                            ...datesRange
                                        }
                                        dispatch(dataHandler(reqData))
                                    }
                                }}
                            >
                                Обновить
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
        )
    }



    return (
        <div className={styles.widget}>
            <div className={styles.mainChart}>
                <p className={styles.mainChart__title}>Сводные данные по дням</p>
                <ChartControls
                    chartControls={chartControls}
                    setChartControls={setChartControls}
                />
                {normilizedChartData && widgetData?.data && chartControls &&
                    <Chart
                        type='line'
                        data={{ ...normilizedChartData }}
                        width={100}
                        height={40}
                        options={mainChartOptionsGenerator(widgetData.data, chartControls.find(_ => _.isAnnotation), chartControls.find(_ => _.engName === 'seasonality'), normilizedChartData)}
                    />}
            </div>
        </div>
    )
}

export default MainChartWidget;