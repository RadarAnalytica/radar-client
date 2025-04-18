import { useState, useEffect } from 'react';
import styles from './mainChart.module.css'
import MainChartControls from './mainChartControls/mainChartControls';
import { getChartData, getChartOptions } from '../../shared/mainChartUtils';
import { differenceInDays } from 'date-fns';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
import MainChartModal from '../../mainChartModal/mainChartModal';


ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip]
);

const MainChart = ({ title, loading, dataDashBoard, selectedRange }) => {

    const [chartData, setChartData] = useState()
    const [days, setDays] = useState()
    const [controlsState, setControlsState] = useState({
        isOrderQuantityActive: true,
        isSalesQuantityActive: true,
        isOrderAmountActive: true,
        isSalesAmountActive: true,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)


    //Трансформируем данные для графика
    useEffect(() => {
        if (dataDashBoard && selectedRange) {
            setChartData(getChartData(dataDashBoard, selectedRange, controlsState))
        }
    }, [dataDashBoard, selectedRange, controlsState])

    //Преобразуем период
    useEffect(() => {
        setDays(selectedRange.from && selectedRange.to ? differenceInDays(selectedRange.to, selectedRange.from, { unit: 'days' }) : selectedRange.period)
    }, [selectedRange])


    return (
        <>
            {/* Loader */}
            {loading &&
                (<div className={styles.chart}>
                    <div className={styles.chart__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                </div>)
            }
            {/* Main */}
            {!loading &&
                <div className={styles.chart}>
                    <div className={styles.chart__header}>
                        <div className={styles.chart__titleWrapper}>
                            <p className={styles.chart__title}>{title}</p>
                            <button className={styles.chart__detailsButton} onClick={() => setIsModalOpen(true)}>
                                <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 18 18'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M9.5625 5.25012C9.5625 4.93946 9.31066 4.68762 9 4.68762C8.68934 4.68762 8.4375 4.93946 8.4375 5.25012V9.75012C8.4375 10.0608 8.68934 10.3126 9 10.3126H12C12.3107 10.3126 12.5625 10.0608 12.5625 9.75012C12.5625 9.43946 12.3107 9.18762 12 9.18762H9.5625V5.25012Z'
                                        fill='#F0AD00'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M16.5 9.00012C16.5 13.1423 13.1421 16.5001 9 16.5001C4.85786 16.5001 1.5 13.1423 1.5 9.00012C1.5 4.85799 4.85786 1.50012 9 1.50012C13.1421 1.50012 16.5 4.85799 16.5 9.00012ZM15.375 9.00012C15.375 12.5209 12.5208 15.3751 9 15.3751C5.47918 15.3751 2.625 12.5209 2.625 9.00012C2.625 5.47931 5.47918 2.62512 9 2.62512C12.5208 2.62512 15.375 5.47931 15.375 9.00012Z'
                                        fill='#F0AD00'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M1.25 9.00012C1.25 4.71991 4.71979 1.25012 9 1.25012C13.2802 1.25012 16.75 4.71991 16.75 9.00012C16.75 13.2803 13.2802 16.7501 9 16.7501C4.71979 16.7501 1.25 13.2803 1.25 9.00012ZM9 1.75012C4.99593 1.75012 1.75 4.99606 1.75 9.00012C1.75 13.0042 4.99593 16.2501 9 16.2501C13.0041 16.2501 16.25 13.0042 16.25 9.00012C16.25 4.99606 13.0041 1.75012 9 1.75012ZM2.375 9.00012C2.375 5.34124 5.34111 2.37512 9 2.37512C12.6589 2.37512 15.625 5.34124 15.625 9.00012C15.625 12.659 12.6589 15.6251 9 15.6251C5.34111 15.6251 2.375 12.659 2.375 9.00012ZM9 2.87512C5.61726 2.87512 2.875 5.61738 2.875 9.00012C2.875 12.3829 5.61726 15.1251 9 15.1251C12.3827 15.1251 15.125 12.3829 15.125 9.00012C15.125 5.61738 12.3827 2.87512 9 2.87512ZM9 4.93762C8.82741 4.93762 8.6875 5.07753 8.6875 5.25012V9.75012C8.6875 9.92271 8.82741 10.0626 9 10.0626H12C12.1726 10.0626 12.3125 9.92271 12.3125 9.75012C12.3125 9.57753 12.1726 9.43762 12 9.43762H9.5625C9.42443 9.43762 9.3125 9.32569 9.3125 9.18762V5.25012C9.3125 5.07753 9.17259 4.93762 9 4.93762ZM8.1875 5.25012C8.1875 4.80139 8.55127 4.43762 9 4.43762C9.44873 4.43762 9.8125 4.80139 9.8125 5.25012V8.93762H12C12.4487 8.93762 12.8125 9.30139 12.8125 9.75012C12.8125 10.1989 12.4487 10.5626 12 10.5626H9C8.55127 10.5626 8.1875 10.1989 8.1875 9.75012V5.25012Z'
                                        fill='#F0AD00'
                                    />
                                </svg>
                                Детализировать заказы по времени
                            </button>
                        </div>
                        <MainChartControls
                            constrolsState={controlsState}
                            setControlsState={setControlsState}
                        />
                    </div>

                    <div className={styles.chart__content}>
                        {chartData && chartData.labels.length > 0 &&
                            <Chart
                                type='bar'
                                data={chartData}
                                width={100}
                                height={40}
                                options={getChartOptions(chartData, days)}
                            />}
                    </div>
                </div>
            }

            {isModalOpen && 
                <MainChartModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    loading={loading}
                />
            }

            {/* {isModalOpen &&
                (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <div className={styles.modalHeaderTitle}>
                                    Детализация заказов по времени
                                </div>
                                <div
                                    className={styles.closeBtnModal}
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        width='20'
                                        height='21'
                                        viewBox='0 0 20 21'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M10 8.27813L17.7781 0.5L20 2.72187L12.2219 10.5L20 18.2781L17.7781 20.5L10 12.7219L2.22187 20.5L0 18.2781L7.77813 10.5L0 2.72187L2.22187 0.5L10 8.27813Z'
                                            fill='#1A1A1A'
                                            fill-opacity='0.5'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.underHeader}>
                                <div
                                    className={styles.period}
                                    style={{ position: 'relative' }}
                                >
                                    <Period
                                        selectedRange={selectedRangeDetail}
                                        setSelectedRange={setSelectedRangeDetail}
                                    />
                                </div>
                            </div>
                            <div className={styles.modalBody}>
                                <DetailChart
                                    labels={detailChartLabels}
                                    chartData={detailChartData}
                                    averages={detailChartAverages}
                                    isLoading={isDetailChartDataLoading}
                                />
                            </div>
                        </div>
                    </div>
                )
            } */}
        </>
    )
}

export default MainChart;