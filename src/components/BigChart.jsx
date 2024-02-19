import React from 'react'
import Form from 'react-bootstrap/Form';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, BarController, BarElement, Tooltip } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, [Tooltip]);

const BigChart = ({ name, data, orderOn, salesOn, setOrderOn, maxValue, setSalesOn, setChartUnitRub, chartUnitRub }) => {

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
                    plugins: {
                        tooltip: {
                            enabled: false,
                            callbacks: {
                            },
                            external: function (context) {
                                var tooltipModel = context.tooltip;
                                // Tooltip Element
                                var tooltipEl = document.getElementById('chartjs-tooltip');

                                // Create element on first render
                                if (!tooltipEl) {
                                    tooltipEl = document.createElement('div');
                                    tooltipEl.id = 'chartjs-tooltip';
                                    tooltipEl.innerHTML = '<table></table>';
                                    // tooltipEl.classList.add("scrollbar");
                                    document.body.appendChild(tooltipEl);
                                }

                                function getBody(bodyItem) {
                                    return bodyItem.lines;
                                }

                                let bgColor = ''

                                // Set Text
                                if (tooltipModel.body) {
                                    var titleLines = tooltipModel.title || [];
                                    var bodyLines = tooltipModel.body.map(getBody);

                                    var innerHtml = '<thead">';

                                    titleLines.forEach(function (title) {
                                        innerHtml += '<tr><th>' + title + '</th></tr>';
                                    });
                                    innerHtml += '</thead><tbody >';

                                    bodyLines.forEach(function (body, i) {
                                        var colors = tooltipModel.labelColors[i];
                                        bgColor = colors.backgroundColor
                                        var style = 'background: transparent';
                                        style += '; border-color: white' + colors.borderColor;
                                        style += '; border-width: 2px !important';
                                        style += '; width: 10px !important';
                                        style += '; height: 10px !important';
                                        style += '; display: inline-block !important';
                                        style += '; margin-right: 3px !important';
                                        var box = `<span style="${style}"></span>`
                                        innerHtml += `<tr><td>${box}${body + (salesOn ? ' ₽' : ' шт')}</td></tr>`;

                                    });
                                    innerHtml += '</tbody>';

                                    var tableRoot = tooltipEl.querySelector('table');
                                    tableRoot.innerHTML = innerHtml;
                                }

                                // `this` will be the overall tooltip
                                var position = this.chart.canvas.getBoundingClientRect();

                                // Display, position, and set styles for font
                                tooltipEl.style.opacity = 1;
                                tooltipEl.style.position = 'absolute';
                                tooltipEl.style.top = position.top + window.pageYOffset + 'px'; // Позиция от верхнего края графика
                                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - 90 + 'px';
                                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                                // tooltipEl.style.pointerEvents = 'none'; // Use when need to stop mouse events such as Onhover and Scrolling
                                tooltipEl.style.borderColor = 'blue';
                                tooltipEl.style.borderRadius = '4px';
                                tooltipEl.style.backgroundColor = bgColor;
                                tooltipEl.style.color = 'white';
                                tooltipEl.style.padding = '8px 1rem';
                                tooltipEl.style.textAlign = 'center';
                                tooltipEl.style.maxHeight = "100px";
                                tooltipEl.style.overflowY = "auto";
                                tooltipEl.style.scrollBehavior = "smooth";
                                tooltipEl.style.transition = "all 0.25s ease-in-out";
                            }
                        },
                    },
                    scales: {
                        y:
                        {
                            position: 'right',
                        },
                    },
                }}
            />
        </div>
    )
}

export default BigChart