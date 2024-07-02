import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, Doughnut } from 'react-chartjs-2';
import { formatPrice } from '../../service/utils';
import GreenArrow from '../../assets/greenarrow.svg'
import RedArrow from '../../assets/redarrow.svg'

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderMapPieChart = ({ title, geoData, info, sub, totalAmount, totalCount, count, amount, titleTooltipAmount, titleTooltipCount, getColor, tooltipData, getColorStok }) => {
    const getColorTooltip = (name) => {
        switch (name) {
            case 'Сибирский фо':
                return 'rgba(254, 197, 61, 1)'
            case 'Уральский фо':
                return 'grey'
            case 'Южный фо':
                return 'rgba(74, 217, 145, 1)'
            case 'Северо-Кавказский фо':
                return 'orangered'
            case 'Центральный фо':
                return 'rgba(129, 172, 255, 1)'
            case 'Приволжский фо':
                return 'rgba(255, 153, 114, 1)'
            case 'Северо-Западный фо':
                return 'yellow'
            case 'Дальневосточный фо':
                return 'brown'
            default: return 'transparent'
        }
    }
    
   
    const getColorStockTooltip = (name) => {
        switch (name) {
            case 'Тула':
                return "rgba(254, 197, 61, 1)"
            case 'Казань':
                return "grey"
            case 'Подольск':
                return "rgba(74, 217, 145, 1)"
            case 'Краснодар':
                return "orangered"
            case 'Электросталь':
                return "rgba(129, 172, 255, 1)"
            case 'Коледино':
                return "rgba(255, 153, 114, 1)"
            case 'Екатеринбург':
                return "yellow"
            default: return ''
        }
    }
    
    const backgroundColor = [
        'rgba(129, 172, 255, 1)',
        'rgba(255, 153, 114, 1)',
        'rgba(154, 129, 255, 1)',
        'rgba(74, 217, 145, 1)',
        'rgba(254, 197, 61, 1)',
    ]
    
    const firstFive = [...info].filter(o => o.districtName ? o.districtName : o.stockName)?.slice(0, 5)
    info.forEach(item => {
        let sub = item.districtName?.split('федеральный округ')?.join('фо')
        item.districtName = sub
    })
    const colorCons = firstFive.map((el, i) => el.districtName ? getColorTooltip(el.districtName) : getColorStockTooltip(el.stockName));
   

    // const totalAmount =  info.reduce((acc, item) => acc + item.saleAmount, 0) 
    // const totalSum =  info.reduce((acc, item) => acc + Number(item.saleCount), 0)

    const otherRegion = info.reduce((acc, item) => acc + item.percent, 0)
    const green = require('../../assets/greenarrow.png')
    const red = require('../../assets/redarrow.png')

 


    const data = {
        labels: firstFive?.map(item => item.districtName ? item.districtName : item.stockName),
        datasets: [
            {
                label: 'Общая доля',
                data: firstFive?.map(item => item.percent),
                backgroundColor: colorCons,
                borderColor: 'white',
                borderWidth: 0
            }
            
            // {
            //     label: titleTooltipAmount,
            //     data: amount,
            //     backgroundColor: colorCons,
            //     borderColor: 'white',
            //     borderWidth: 0
            // },
            // {   
            //     label: titleTooltipCount,
            //     data: count,
            //     backgroundColor: colorCons,
            //     borderColor: 'white',
            //     borderWidth: 0
            // },
            
            
        ],
    }
   

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
                                        enabled: false,
                                        intersect: false,
                                        external: function (context) {
                                            // Tooltip Element
                                            let tooltipEl = document.getElementById('chartjs-tooltip');

                                            // Create element on first render
                                            if (!tooltipEl) {
                                                tooltipEl = document.createElement('div');
                                                tooltipEl.id = 'chartjs-tooltip';
                                                tooltipEl.innerHTML = '<table></table>';
                                                document.body.appendChild(tooltipEl);
                                            }

                                            // Hide if no tooltip
                                            const tooltipModel = context.tooltip;
                                            if (tooltipModel.opacity === 0) {
                                                tooltipEl.style.opacity = 0;
                                                return;
                                            }

                                            // Set caret Position
                                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                                            if (tooltipModel.yAlign) {
                                                tooltipEl.classList.add(tooltipModel.yAlign);
                                            } else {
                                                tooltipEl.classList.add('no-transform');
                                            }

                                            function getBody(bodyItem) {
                                                return bodyItem.lines;
                                            }
                                            // Set Text
                                            if (tooltipModel.body) {
                                                let datasets = data?.datasets?.filter(obj => obj.data?.length > 0)
                                                // datasets = datasets?.slice(2, 4)?.concat(datasets?s.slice(0, 2))
                                                // const datalabels = data?.labels?.map(item => item[0].concat(',' + item[1]))
                                                const datalabels = data?.labels
                                                
                                                const targetInex = datalabels?.indexOf(tooltipModel.title[0])
                                                const color =tooltipModel.labelColors[0].backgroundColor;
                                                const titleLines = tooltipModel.title || [];
                                                const bodyLines = tooltipModel.body.map(getBody);
                                               const amount = tooltipData[targetInex]?.amount?.toFixed(2) ;
                                               const count = tooltipData[targetInex]?.count?.toFixed(2)

                                                let innerHtml = '<thead>';
                                                

                                                titleLines.forEach(function (title) {
                                                    innerHtml += '<tr><th style="color: black; font-weight: 400;"><span style="width: 10px; height: 10px; background-color: ' + color + '; display: inline-block; margin-right: 5px; border-radius: 50%;" ></span>' + title + '</th></tr>';
                                                });
                                                innerHtml += '</thead><tbody>';
                                                datasets?.forEach(function (set, i) {
                                                    const colors = set.backgroundColor[i]
                                                    // const targetColor = set.label === 'Заказы' ? colors[0] : colors[1]
                                                    // const targetDescr = set.type === 'bar' ? ' шт' : " руб"
                                                    let value = set?.data[targetInex] || '0';
                                                    let style = ''
                                                    // style += '; border-color:' + colors.borderColor;
                                                    style += '; border-width: 2px';
                                                    const span = '<span style="font-size: 12px; margin-left: -18px; line-height: 0.5vw; border-radius: 2px;">&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>' + set?.label + '  <span style="font-weight: bold;  margin-left: 50px; ">' + value + '%' + '</span><span ><p>' + titleTooltipAmount + '<span style="font-weight: bold; margin-left: 40px;">'+'&nbsp;&nbsp;' + amount  + '</span></p><p style="margin-top: -15px;" >' + titleTooltipCount + '<span style="font-weight: bold; margin-left: 50px;">' + count  + '</span></p></span>';
                                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                                });
                                                innerHtml += '</tbody>';

                                                let tableRoot = tooltipEl.querySelector('table');
                                                tableRoot.innerHTML = innerHtml;
                                            }

                                            const position = context.chart.canvas.getBoundingClientRect();
                                            const bodyFont = Chart?.helpers?.toFont(tooltipModel.options.bodyFont);

                                            // Display, position, and set styles for font
                                            tooltipEl.style.transition = 'all 0.25s ease-in-out';
                                            tooltipEl.style.backgroundColor = 'white';
                                            tooltipEl.style.borderRadius = '8px';
                                            tooltipEl.style.boxShadow = '0 0 20px rgba(19,19, 19, 0.7)';
                                            tooltipEl.style.padding = '1rem';
                                            tooltipEl.style.opacity = 1;
                                            tooltipEl.style.position = 'absolute';
                                            tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
                                            tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
                                            tooltipEl.style.font = bodyFont?.string;
                                            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                                            tooltipEl.style.pointerEvents = 'none';
                                        }
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
                            top: '30%',
                            left: '23%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 0
                        }}
                    >
                        <p className="clue-text mb-1" style={{ fontSize: '1.75vh' }}>{sub}</p>
                        <p className="mb-1 fw-bold" style={{ fontSize: '2vh' }}>{formatPrice(totalAmount)} ₽</p>
                        <p className="mb-1" style={{ fontSize: '1.75vh', fontWeight: 600 }}>{formatPrice(totalCount)} шт</p>
                    </div>
                </div>
                <div className='col pt-4' style={{ marginLeft: '0' }}>
                    {
                        firstFive ?
                        firstFive.map((obj, key) => (
                                <div className="mb-2 d-flex" key={key}>
                                    <div className='d-flex align-items-start'>
                                        <span
                                            className='pb-2'
                                            style={{
                                                width: '0.75vw',
                                                height: '0.75vw',
                                                borderRadius: '100%',
                                                
                                                marginLeft: '-0.5vw',
                                                marginRight: '0.5vw',
                                                // marginTop: '0.75vh'
                                            }}>{obj.districtName ? getColor(obj.districtName) : getColorStok[key]}</span>
                                        <p className="mb-0  pe-2" style={{ fontSize: '1.75vh' }}>
                                            {obj.districtName ? obj.districtName : obj.stockName}
                                        </p>
                                    </div>
                                    <p className="mb-0 col text-end fw-bold" style={{ fontSize: '1.85vh' }}>{obj.percent.toFixed(1)}&nbsp;%</p>
                                    <div
                                        className="mb-0 ms-1 col-2 text-end d-flex justify-content-around align-items-start"
                                        style={{ fontSize: '1.85vh', paddingLeft: '1vw' }}
                                    >
                                        <span className='pb-1'>
                                            <img src={obj.comparePercent > 0 ? GreenArrow : RedArrow} alt="" style={{ width: '1.25vw', marginRight: '4px' }} />
                                        </span>
                                        <span className='pt-1' style={obj.comparePercent > 0 ?
                                            { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(0, 182, 155, 1)' } :
                                            { fontSize: '1.5vh', whiteSpace: 'nowrap', fontWeight: 600, color: 'rgba(249, 60, 101, 1)' }}
                                        >
                                            {Number(obj.comparePercent).toFixed(0)} %
                                        </span>
                                    </div>
                                </div>
                            )) : null
                    }
                </div>
            </div>
            {/* <div className="text-end">
                <p className='mb-0 prime-text'>{link}</p>
            </div> */}
        </div>
    )
}

export default OrderMapPieChart