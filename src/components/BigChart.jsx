import React from 'react'
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, BarController, BarElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const BigChart = ({ name, data, orderOn, salesOn, setOrderOn, setSalesOn }) => {

    return (
        <div className='big-chart'>
            <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold fs-4">{name}</p>
                <div className='d-flex'>
                    <div className='d-flex me-3'>
                        <input type="checkbox" defaultChecked={orderOn} onClick={() => setOrderOn(!orderOn)} className='me-2' name="" id="" />
                        <label htmlFor="">Заказы</label>
                    </div>
                    <div className='d-flex'>
                        <input type="checkbox" defaultChecked={salesOn} onClick={() => setSalesOn(!salesOn)} className='me-2' name="" id="" />
                        <label htmlFor="">Продажи</label>
                    </div>
                </div>
            </div>
            <Bar
                data={data}
                width={100}
                height={40}
                options={{
                    // maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                        },
                        xAxes: [{ stacked: true }],
                        yAxes: [{ stacked: true }],
                    },
                }}
            />
        </div>
    )
}

export default BigChart