import React, { useEffect, useState, useContext, useRef } from 'react';
import styles from './mainChartModal.module.css';
import { Modal, ConfigProvider } from 'antd';
import { Filters } from '../../sharedComponents/apiServicePagesFiltersComponent';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AuthContext from '../../../service/AuthContext';
import { useAppSelector } from '../../../redux/hooks';
import { chartYaxisMaxScale } from '../../../service/utils';
import { ServiceFunctions } from '../../../service/serviceFunctions';

import { mockGetChartDetailData } from '../../../service/mockServiceFunctions';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const MainChartModal = ({ isModalOpen, setIsModalOpen, loading, chartData }) => {

    const { user, authToken } = useContext(AuthContext);
    const [isDetailChartDataLoading, setIsDetailChartDataLoading] = useState(false);
    const [detailChartLabels, setDetailChartLabels] = useState([]);
    const [detailChartData, setDetailChartData] = useState([]);
    const [detailChartAverages, setDetailChartAverages] = useState([]);
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);

    const absoluteValue = detailChartData?.reduce((i, acc) => {
        return acc += i;
    }, 0);
    const sortedChartData = [...detailChartData]?.sort((a, b) => b - a);
    const maxValue = chartYaxisMaxScale(sortedChartData[0]);
    const step = Math.round(maxValue / 10);
    const chartRef = useRef(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const data = {
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: 'Заказы',
                data: detailChartData,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.5, '#F0AD00');
                    gradient.addColorStop(1, '#F0AD0080');


                    if (clickedIndex !== null && context.dataIndex !== clickedIndex) {
                        return 'rgba(240, 173, 0, 0.3)';
                    }

                    return context.dataIndex === clickedIndex ? '#F0AD00' : gradient;
                },
                borderWidth: 0,
                barPercentage: 0.6,
                borderRadius: 3,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                // const index = elements[0].index;
                // const chart = chartRef.current;
                // const datasetIndex = elements[0].datasetIndex;

                // if (chart) {
                //     const bar = chart.getDatasetMeta(datasetIndex).data[index];
                //     const x = bar.x;
                //     const y = bar.y;

                //     setTooltipPosition({ x, y });
                //     setClickedIndex(index);
                // }
            } else {
                setClickedIndex(null);
            }
        },
        onHover: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const chart = chartRef.current;
                const datasetIndex = elements[0].datasetIndex;

                if (chart && index !== clickedIndex) {
                    const bar = chart.getDatasetMeta(datasetIndex).data[index];
                    const x = bar.x;
                    const y = bar.y;

                    setTooltipPosition({ x, y });
                    setClickedIndex(index);

                }
            } else {
                //setHoveredIndex(null);
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#8C8C8C' } },
            y: { beginAtZero: true, min: 0, max: maxValue ? maxValue : 10, grid: { display: true }, ticks: { color: '#8C8C8C', stepSize: step } },
        },
    };
    const renderCustomTooltip = () => {
        if (clickedIndex === null) return null;
        const total = detailChartData?.[clickedIndex] ?? 0;


        const isLeftSide = clickedIndex > 11;
        const tooltipStyle = {
            position: 'absolute',
            top: `50%`,
            left: isLeftSide
                ? `${tooltipPosition.x - 290}px`
                : `${tooltipPosition.x + 20}px`,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        };
        return (
            <div className="custom-tooltip" style={tooltipStyle}>
                <div className="custom-tooltip-header">
                    <div className="tooltip-color"></div>
                    <div className="tooltip-title-period" style={{ fontSize: 14 }}>
                        {`Заказы с ${clickedIndex}:00 до ${1 + clickedIndex}:00`}
                    </div>
                </div>
                <div className="custom-tooltip-amount-wrapper">
                    <div className="custom-tooltip-amount-title" style={{ fontSize: 14 }}>Всего</div>
                    <div className="custom-tooltip-amount" style={{ fontWeight: '700', fontSize: 14 }}>{total}</div>
                </div>
                <div className="custom-tooltip-period">
                    {detailChartLabels[clickedIndex.toString()]?.map((time, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ marginLeft: '5px', fontSize: 12 }}>{detailChartLabels[clickedIndex.toString()][i]['time']}</span>
                            <span style={{ marginRight: '5px', fontSize: 12 }}>{detailChartLabels[clickedIndex.toString()][i]['count']}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    // получаем данные
    useEffect(() => {
        const updateChartDetailData = async () => {

            setIsDetailChartDataLoading(true);
            let data = null;
            if (user.subscription_status === null) {;
                data = await mockGetChartDetailData(selectedRange);
            } else {
                data = await ServiceFunctions.getChartDetailData(
                    authToken,
                    selectedRange,
                    activeBrand.id,
                );
            }
            const counts = Array(24).fill(0);
            const averages = Array(24).fill(0);

            data.forEach((entry) => {
                for (const [time, value] of Object.entries(entry)) {
                    const hour = parseInt(time.split(':')[0], 10);
                    counts[hour] += value;
                    averages[hour] += value !== 0 ? 1 : 0;
                }
            });

            const transformData = (data) => {
                return data.reduce((acc, item) => {
                    const [time, count] = Object.entries(item)[0];
                    const hour = parseInt(time.split(':')[0], 10);

                    if (!acc[hour]) {
                        acc[hour] = [];
                    }
                    acc[hour].push({ count, time });

                    return acc;
                }, {});
            };

            const result = transformData(data);

            setDetailChartLabels(result);
            setDetailChartData(counts);
            setDetailChartAverages(averages);
            setIsDetailChartDataLoading(false);
        };
        activeBrand && updateChartDetailData();
    }, [selectedRange, activeBrand]);

    return (
        <Modal
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={1100}
            style={{ top: 50, bottom: 50 }}
        >
            <div className={styles.modal__body}>
                <p className={styles.modal__title}>Детализация заказов по времени</p>
                <div>
                    <Filters shopSelect={false} />
                </div>
                {(isDetailChartDataLoading || loading) &&
                    <div className={styles.modal__loaderWrapper}>
                        <span className='loader'></span>
                    </div>
                }
                {!isDetailChartDataLoading && !loading && absoluteValue === 0 &&
                    <div
                        className={styles.modal__noData}
                    >
                        <div className={styles.modal__noDataWrapper}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                                <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                            </svg>
                            Нет продаж за выбранный период
                        </div>
                    </div>
                }
                {!isDetailChartDataLoading && !loading && absoluteValue !== 0 &&
                    <div className={styles.modal__chart}>
                        <Bar ref={chartRef} data={data} options={options} />
                        {renderCustomTooltip()}
                    </div>
                }
            </div>
        </Modal>
    );
};

export default MainChartModal;
