import React from 'react'
import Form from 'react-bootstrap/Form';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, BarController, BarElement, Tooltip } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, [Tooltip]);

const BigChart = ({ name, data, orderOn, salesOn, setOrderOn, setSalesOn, setChartUnitRub, chartUnitRub }) => {

    return (
        <div className='big-chart'>
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold fs-4">{name}</p>
                <div className='d-flex align-items-center'>
                    <div className='d-flex me-3'>
                        <input type="checkbox" id='order' defaultChecked={orderOn} onClick={() => setOrderOn(!orderOn)} className='me-2 hidden-checkbox' name="" />
                        <label htmlFor="order">Заказы</label>
                    </div>
                    <div className='d-flex'>
                        <input type="checkbox" id='sales' defaultChecked={salesOn} onClick={() => setSalesOn(!salesOn)} className='me-2 hidden-checkbox' name="" />
                        <label htmlFor="sales">Продажи</label>
                    </div>

                    <div className="d-flex toggle-block">
                        <span onClick={() => setChartUnitRub(!chartUnitRub)} className={chartUnitRub ? 'toggler toggler-active' : 'toggler'}>₽</span>
                        <span onClick={() => setChartUnitRub(!chartUnitRub)} className={!chartUnitRub ? 'toggler toggler-active' : 'toggler'}>Шт.</span>
                    </div>


                    {/* <Form className='d-flex ms-4'>
                        <label htmlFor="" className='fw-bold me-2'>₽</label>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="ШТ."
                            className='fw-bold'
                            style={{ fontWeight: 'bold' }}
                            onChange={() => setChartUnitRub(!chartUnitRub)}
                        />
                    </Form> */}
                </div>
            </div>
            <Bar
                data={data}
                width={100}
                height={40}
                options={{
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return "$" + Number(tooltipItem.yLabel) + " and so worth it !";
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Ice Cream Truck',
                        position: 'bottom'
                    },
                    scales: {
                        // x: {
                        //     type: 'category',
                        // },
                        // xAxes: [{ stacked: true }],
                        // yAxes: [{ stacked: true }],
                    },
                }}
            />
        </div>
    )
}

export default BigChart