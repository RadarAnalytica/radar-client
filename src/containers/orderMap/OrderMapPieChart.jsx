import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatPrice } from '../../service/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderMapPieChart = ({ title, data, info, sub, link }) => {

    const backgroundColor = [
        'rgba(129, 172, 255, 1)',
        'rgba(255, 153, 114, 1)',
        'rgba(154, 129, 255, 1)',
        'rgba(74, 217, 145, 1)',
        'rgba(254, 197, 61, 1)',
    ]

    info = info ? info?.filter(o => o.fo)?.slice(0, 5) : []
    info.forEach(item => {
        let sub = item.fo?.split('Федеральный Округ')?.join('ФО')
        item.fo = sub
    })

    const totalAmount = info ? info.reduce((acc, item) => acc + item.amount, 0) : 0
    const totalSum = info ? info.reduce((acc, item) => acc + Number(item.sum), 0) : 0

    const green = require('../../assets/greenarrow.png')
    const red = require('../../assets/redarrow.png')

    return (
        <div className='order-map-doughnut'>
            <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>{title}</h5>
            <div className="doughnut-content">
                <div className="col-5 me-2" style={{ position: 'relative', marginLeft: '-1vw' }}>
                    <Doughnut data={data}
                        options={
                            {
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    title: {
                                        display: false
                                    },
                                    tooltip: {
                                        callbacks: {
                                            // label: (tooltipItem) => {
                                            //     return ``
                                            // },
                                            // footer: (tooltipItem) => {

                                            //     return `aksd`
                                            // }
                                        },
                                        borderRadius: 16,
                                        padding: 16,
                                        displayColors: false,
                                    }
                                },
                                animation: {
                                    onComplete: (chart) => {
                                        const ctx = chart?.ctx;
                                        const width = chart?.width;
                                        const height = chart?.height;

                                        ctx?.restore();
                                        const fontSize = (height / 150).toFixed(2);
                                        if (ctx) {
                                            ctx.font = fontSize + "em Arial";
                                            ctx.textBaseline = "middle";

                                            const text = "Ваш текст в центре";

                                            const textX = Math.round((width - ctx.measureText(text).width) / 2);
                                            const textY = height / 2;

                                            ctx.fillText(text, textX, textY);
                                            ctx.save();
                                        }
                                    }
                                },
                                layout: {
                                    padding: {
                                        right: 20
                                    },
                                },
                                spacing: 10,
                                cutout: '85%',
                            }
                        }
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '33%',
                            left: '21%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 0
                        }}
                    >
                        <p className="clue-text mb-1" style={{ fontSize: '1.75vh' }}>{sub}</p>
                        <p className="mb-1 fw-bold" style={{ fontSize: '2vh' }}>{formatPrice(Number(totalSum))} ₽</p>
                        <p className="mb-1" style={{ fontSize: '1.75vh', fontWeight: 600 }}>{formatPrice(Number(totalAmount))} шт</p>
                    </div>
                </div>
                <div className='col pt-4' style={{ marginLeft: '0' }}>
                    {
                        info ?
                            info.map((obj, key) => (
                                <div className="mb-2 d-flex" key={key}>
                                    <div className='d-flex align-items-start'>
                                        <span
                                            className='pb-2'
                                            style={{
                                                width: '0.75vw',
                                                height: '0.75vw',
                                                borderRadius: '100%',
                                                backgroundColor: backgroundColor[key],
                                                marginLeft: '-0.5vw',
                                                marginRight: '0.5vw',
                                                marginTop: '0.75vh'
                                            }}>&nbsp;</span>
                                        <p className="mb-0 col-6 pe-2" style={{ fontSize: '1.75vh' }}>
                                            {obj.fo}
                                        </p>
                                    </div>
                                    <p className="mb-0 col text-end fw-bold" style={{ fontSize: '1.85vh' }}>{obj.percent}&nbsp;%</p>
                                    <div
                                        className="mb-0 ms-1 col-2 text-end d-flex justify-content-around align-items-start"
                                        style={{ fontSize: '1.85vh', paddingLeft: '1vw' }}
                                    >
                                        <span className='pb-1'>
                                            <img src={obj.growth > 0 ? green : red} alt="" style={{ width: '1.25vw', marginRight: '4px' }} />
                                        </span>
                                        <span className='pt-1' style={obj.growth > 0 ?
                                            { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(0, 182, 155, 1)' } :
                                            { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(249, 60, 101, 1)' }}
                                        >
                                            {Number(obj.growth).toFixed(0)} %
                                        </span>
                                    </div>
                                </div>
                            )) : null
                    }
                </div>
            </div>
            <div className="text-end">
                <p className='mb-0 prime-text'>{link}</p>
            </div>
        </div>
    )
}

export default OrderMapPieChart