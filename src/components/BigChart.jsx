import React from 'react'
import Form from 'react-bootstrap/Form';
import { Chart } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart as ChartJS, Filler, BarController, PointElement, BarElement, LineElement, LineController, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, Filler, BarController, PointElement, BarElement, LineController, LineElement, [Tooltip]);

const BigChart = ({ name, data, orderOn, salesOn, setOrderOn, salesLineOn, orderLineOn, maxValue, maxAmount, setSalesOn, setByMoney, byMoney, byAmount, setOrderLineOn, setSalesLineOn }) => {

    const activeIcon = require('../assets/tick-active.png')
    const inactiveIcon = require('../assets/tick.png')

    return (
        <div className='big-chart'>
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold fs-4">{name}</p>
                <div className='d-flex align-items-center'>
                    <div className='d-flex me-3'>
                        <input type="checkbox" id='order' defaultChecked={orderOn} onClick={() => setOrderOn(!orderOn)} className='me-2 hidden-checkbox' name="" />
                        <label htmlFor="order">Заказы, шт</label>
                    </div>
                    <div className='d-flex me-3'>
                        <input type="checkbox" id='sales' defaultChecked={salesOn} onClick={() => setSalesOn(!salesOn)} className='me-2 hidden-checkbox' name="" />
                        <label htmlFor="sales">Продажи, шт</label>
                    </div>

                    <div className="
                    d-flex 
                    gap-3
                    "
                    // toggle-block
                    >

                        <div className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}
                            onClick={() => setOrderLineOn(!orderLineOn)}
                        >
                            <img src={orderLineOn ? activeIcon : inactiveIcon} style={{ width: '1.5vw' }} alt="" />
                            <span>Заказы, руб</span>
                        </div>
                        <div className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}
                            onClick={() => setSalesLineOn(!salesLineOn)}
                        >
                            <img src={salesLineOn ? activeIcon : inactiveIcon} style={{ width: '1.5vw' }} alt="" />
                            <span>Продажи, руб</span>
                        </div>

                        {/* <span onClick={() => setByMoney(!chartUnitRub)} className={chartUnitRub ? 'toggler toggler-active' : 'toggler'}>₽</span>
                        <span onClick={() => setByMoney(!chartUnitRub)} className={!chartUnitRub ? 'toggler toggler-active' : 'toggler'}>Шт.</span> */}
                    </div>


                    {/* <Form className='d-flex ms-4'>
                        <label htmlFor="" className='fw-bold me-2'>₽</label>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="ШТ."
                            className='fw-bold'
                            style={{ fontWeight: 'bold' }}
                            onChange={() => setByMoney(!chartUnitRub)}
                        />
                    </Form> */}
                </div>
            </div>
            <div className='bar-div'>
                <Chart
                    type='bar'
                    data={data}
                    width={100}
                    height={40}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: true,
                                callbacks: {
                                },
                            },
                        },
                        scales: {
                            A: {
                                id: 'A',
                                type: 'linear',
                                position: 'right',
                                suggestedMax: maxAmount * 1.5,
                                grid: {
                                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                                },
                            },
                            B: {
                                id: 'B',
                                type: 'linear',
                                position: 'left',
                                suggestedMax: maxValue,
                                grid: {
                                    drawOnChartArea: true, // only want the grid lines for one axis to show up
                                },
                            },
                            x: {
                                grid: {
                                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                                },
                            },
                        },
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default BigChart