import styles from './bars.module.css'
import { formatPrice } from '../../../../../service/utils'
import { getRateIcon } from '../../../../../components/dashboardPageComponents/shared/barUtils'
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
//import { verticalDashedLinePlugin } from '../../../../service/utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    BarController,
    PointElement,
    BarElement,
    LineController,
    LineElement,
    [Tooltip],
    //verticalDashedLinePlugin
);

const getRateColor = (rate) => {
    let color = '#8C8C8C'
    if (rate > 0) {
        color = '#00B69B'
    }
    if (rate < 0) {
        color = '#F93C65'
    }
    return color
}


const MainBar = ({ title, icon, data, footer }) => {
    return (
        <div className={`${styles.bar} ${styles.mainBar}`}>
            <div className={styles.mainBar__iconWrapper}>
                {icon === 'blue' &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" width="60" height="60" rx="10" fill="#5329FF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M15 24.3164L27.9005 31.7645C28.0394 31.8447 28.1851 31.9026 28.3333 31.9394V46.3846L15.9201 39.0385C15.3498 38.701 15 38.0875 15 37.4248V24.3164ZM44.9993 24.1184V37.4248C44.9993 38.0875 44.6496 38.701 44.0793 39.0385L31.666 46.3846V31.8129C31.6963 31.7978 31.7262 31.7816 31.7559 31.7645L44.9993 24.1184Z" fill="#5329FF" />
                        <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M15.4043 20.7014C15.5619 20.5024 15.7608 20.3343 15.9926 20.2108L29.1176 13.2201C29.6686 12.9266 30.3295 12.9266 30.8805 13.2201L44.0055 20.2108C44.1843 20.306 44.3434 20.4277 44.4791 20.5697L30.089 28.8778C29.9943 28.9325 29.9071 28.995 29.8276 29.064C29.7481 28.995 29.6609 28.9325 29.5662 28.8778L15.4043 20.7014Z" fill="#5329FF" />
                    </svg>
                }
                {icon === 'green' &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.21" width="60" height="60" rx="10" fill="#4AD991" />
                        <path d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z" fill="#4AD991" />
                        <path opacity="0.5" d="M24.9131 34.175C24.3255 34.8017 23.3411 34.8335 22.7143 34.2459C22.0876 33.6583 22.0558 32.6739 22.6434 32.0472L28.4767 25.8249C29.045 25.2188 29.9893 25.1662 30.6213 25.7056L35.2253 29.6343L41.224 22.0361C41.7563 21.3618 42.7345 21.2467 43.4088 21.779C44.0831 22.3114 44.1982 23.2895 43.6658 23.9638L36.6658 32.8305C36.1191 33.5231 35.1063 33.6227 34.4351 33.0499L29.7311 29.0358L24.9131 34.175Z" fill="#4AD991" />
                    </svg>

                }
                {icon === 'red' &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.21" width="60" height="60" rx="10" fill="#FF9066" />
                        <path opacity="0.901274" fillRule="evenodd" clipRule="evenodd" d="M22.7204 15.1789C22.4563 14.8642 21.9464 14.9846 21.851 15.3843L20.2176 22.2324C20.1399 22.5581 20.398 22.8666 20.7322 22.8477L27.777 22.4484C28.1879 22.4252 28.3963 21.9431 28.1317 21.6278L26.3307 19.4815C27.4958 19.0832 28.7313 18.8752 30 18.8752C36.2592 18.8752 41.3333 23.9493 41.3333 30.2085C41.3333 36.4678 36.2592 41.5419 30 41.5419C23.7408 41.5419 18.6667 36.4678 18.6667 30.2085C18.6667 29.1578 18.809 28.1286 19.0864 27.1395L16.5188 26.4193C16.1808 27.6244 16 28.8954 16 30.2085C16 37.9405 22.268 44.2085 30 44.2085C37.732 44.2085 44 37.9405 44 30.2085C44 22.4765 37.732 16.2085 30 16.2085C28.0548 16.2085 26.2022 16.6053 24.5188 17.3222L22.7204 15.1789Z" fill="#FF9066" />
                    </svg>

                }
            </div>
            <p className={styles.bar__title}>{title}</p>
            <div className={styles.mainBar__data}>
                {data && data.map((_, id) => (
                    <div className={styles.mainBar__dataItem} key={id}>
                        <p className={styles.bar__amount}>{formatPrice(_.amount, _.amountUnits)}</p>
                        <div className={styles.bar__rateWrapper}>
                            {getRateIcon(_.rate)}
                            <p className={styles.bar__rate} style={{ color: getRateColor(_.rate) }}>{formatPrice(_.rate, _.rateUnits)}</p>
                        </div>

                    </div>
                ))}
            </div>
            {footer &&
                <div className={styles.bar__footer}>
                    {footer}
                </div>
            }
        </div>
    )
}

const SimpleBar = ({ title, amount, units }) => {
    return (
        <div className={`${styles.bar} ${styles.simpleBar}`}>
            <p className={styles.bar__title}>{title}</p>
            <p className={styles.simpleBar__amount}>{formatPrice(amount, units)}</p>
        </div>
    )
}

const RateBar = ({ title, amount, amountUnits, rate, rateUnits }) => {
    return (
        <div className={`${styles.bar} ${styles.rateBar}`}>
            <p className={styles.bar__title}>{title}</p>
            <div className={styles.rateBar__dataWrapper}>
                <p className={styles.bar__amount}>{formatPrice(amount, amountUnits)}</p>
                <div className={styles.bar__rateWrapper}>
                    {getRateIcon(rate)}
                    <p className={styles.bar__rate} style={{ color: getRateColor(rate) }}>{formatPrice(rate, rateUnits)}</p>
                </div>
            </div>
        </div>
    )
}

const TableBar = ({ title, data }) => {
    return (
        <div className={`${styles.bar} ${styles.tableBar}`}>
            <p className={styles.tableBar__title}>{title}</p>
            <div className={styles.tableBar__table}>
                {data && data.map((_, id) => (
                    <div className={styles.tableBar__tableRow} key={id}>
                        <p className={styles.tableBar__rowTitle}>{_.title}</p>
                        <div className={styles.tableBar__rowDataWrapper}>
                            <p className={styles.simpleBar__amount}>{formatPrice(_.amount, _.amountUnits)}</p>
                            {!_.isRate &&
                                <p className={styles.tableBar__summary}>{formatPrice(_.summary, _.summaryUnits)}</p>
                            }
                            {_.isRate &&
                                <div className={styles.bar__rateWrapper}>
                                    {getRateIcon(_.summary)}
                                    <p className={styles.bar__rate} style={{ color: getRateColor(_.summary) }}>{formatPrice(_.summary, _.summaryUnits)}</p>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ChartBar = ({ title, rate, amount, amountUnits, rateUnits, isRate, hasChart, chartData }) => {
    const data = {
        //labels: labels ? labels : [],
        datasets: [
            {
                label: title,
                data: chartData,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.5, '#F0AD00');
                    gradient.addColorStop(1, '#F0AD0080');
                    return gradient;
                },

                borderWidth: 0,
                barPercentage: 0.9,
                borderRadius: 3,

            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        onHover: (event) => {
            event.native.target.style.cursor = 'pointer';
        },
        plugins: {
            legend: {
                display: false
            },
            verticalDashedLine: { enabled: true },
            tooltip: {
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderRadius: 8,
                padding: 16,
                titleColor: '#8C8C8C',
                bodyColor: "#1A1A1A",
                callbacks: {
                    title: function (tooltipItems) {

                        const index = tooltipItems[0].dataIndex;
                        // const fullMonthNames = ['Январь 2024', 'Февраль 2024', 'Март 2024', 'Апрель 2024', 'Май 2024', 'Июнь 2024', 'Июль 2024', 'Август 2024', 'Сентябрь 2024', 'Октябрь 2024', 'Ноябрь 2024', 'Декабрь 2024'];
                        return labels[index];
                    },
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${" "} ${tooltipItem.raw.toLocaleString()}₽`;
                    },
                    labelColor: function (tooltipItem) {
                        if (tooltipItem.dataset.label === 'Выручка') {
                            return {
                                backgroundColor: '#F0AD00',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        } else if (tooltipItem.dataset.label === 'Чистая прибыль') {
                            return {
                                backgroundColor: '#5329FF',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 3
                            };
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawOnChartArea: false,
                },
                ticks: {
                    color: '#8C8C8C',
                }
            },
            y: {
                //beginAtZero: true,
                //min: minDataRevenue,
                //max: maxDataRevenue,
                grid: {
                    display: false,
                    drawOnChartArea: false,
                },
                ticks: {
                    // stepSize: stepSizeRevenue,
                    color: '#8C8C8C',
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        barPercentage: 1,
        categoryPercentage: 0.7,
        hover: {
            mode: null,
        }
    };
    return (
        <div className={`${styles.bar} ${styles.chartBar}`}>
            <div className={styles.chartBar__header}>
                <p className={styles.bar__title}>{title}</p>
                <div className={styles.rateBar__dataWrapper}>
                    <p className={styles.bar__amount}>{formatPrice(amount, amountUnits)}</p>
                    {rate && isRate && <div className={styles.bar__rateWrapper}>
                        {getRateIcon(rate)}
                        <p className={styles.bar__rate} style={{ color: getRateColor(rate) }}>{formatPrice(rate, rateUnits)}</p>
                    </div>}
                    {rate && !isRate && <div className={styles.bar__rateWrapper}>
                        <p className={styles.bar__rate}>{formatPrice(rate, rateUnits)}</p>
                    </div>}
                </div>
            </div>

            {hasChart &&
                <div className={styles.chartBar__chartWrapper}>
                    <Chart type='line' data={data} options={options} />
                </div>
            }
        </div>
    )
}



const Bars = {
    MainBar,
    SimpleBar,
    RateBar,
    TableBar,
    ChartBar
}

export default Bars;