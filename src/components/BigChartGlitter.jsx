import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  Filler,
  BarController,
  PointElement,
  BarElement,
  LineElement,
  LineController,
  Tooltip,
} from 'chart.js';
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

const BigChartGlitter = ({
  loading,
  data,
  days,
  orderOn,
  salesOn,
  setOrderOn,
  salesLineOn,
  orderLineOn,
  maxValue,
  maxAmount,
  setSalesOn,
  setByMoney,
  byMoney,
  byAmount,
  setOrderLineOn,
  setSalesLineOn,
  dataDashBoard,
  returnOn,
  setReturnOn,
  setReturnLineOn,
  returnLineOn,
}) => {
  // const activeIcon = require('../assets/tick-active.png');
  // const activeIconYellow = require('../assets/tick-active-yellow.png');
  // const inactiveIcon = require('../assets/tick.png');

  const [show, setShow] = useState(false);
  const [labels, setLabels] = useState(data?.labels);

  useEffect(() => {
    if (loading === true) {
      setLabels([]);
    } else {
      setLabels(data?.labels);
    }
  }, [data, loading]);
  const getArrayStep = (max) => {
    let expectStep = Math.ceil(max / 6);
    let range = 0;

    while (expectStep > 20) {
      expectStep = Math.ceil(expectStep / 10);
      range++;
    }

    if (expectStep > 15 && 20 >= expectStep) {
      return 20 * 10 ** range;
    } else if (15 >= expectStep && expectStep > 10) {
      return 15 * 10 ** range;
    } else if (expectStep > 0) {
      return Math.ceil(expectStep) * 10 ** range;
    } else {
      return 1;
    }
  };
  const maxSale = getArrayStep(maxValue);

  return (
    <div className='big-chart'>
      <div
        className='d-flex align-items-center'
        style={{ marginBottom: '30px' }}
      >
        <div
          className='d-flex align-items-center'
          style={{ cursor: 'pointer', gap: '12px' }}
        >
          <div
            className='d-flex aligin-items-center'
            onClick={() => setOrderOn(!orderOn)}
          >
            {orderOn ? (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='20' height='20' rx='3' fill='#F0AD00' />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            ) : (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='0.5'
                  y='0.5'
                  width='19'
                  height='19'
                  rx='2.5'
                  stroke='#8C8C8C'
                />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            )}
            <label style={{ cursor: 'pointer' }} htmlFor='order'>
              Заказы, шт
            </label>
          </div>
          <div
            className='d-flex aligin-items-center'
            onClick={() => setSalesOn(!salesOn)}
          >
            {salesOn ? (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='20' height='20' rx='3' fill='#5329FF' />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            ) : (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='0.5'
                  y='0.5'
                  width='19'
                  height='19'
                  rx='2.5'
                  stroke='#8C8C8C'
                />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            )}
            <label style={{ cursor: 'pointer' }} htmlFor='sales'>
              Продажи, шт
            </label>
          </div>
          <div
            className='d-flex aligin-items-center'
            onClick={() => setReturnOn(!returnOn)}
          >
            {returnOn ? (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='20' height='20' rx='3' fill='#F93C65' />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            ) : (
              <svg
                style={{ width: '20px', marginRight: '8px' }}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='0.5'
                  y='0.5'
                  width='19'
                  height='19'
                  rx='2.5'
                  stroke='#8C8C8C'
                />
                <path
                  d='M4 9.21459L9.07692 14L16 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            )}
            <label style={{ cursor: 'pointer' }} htmlFor='sales'>
              Возвраты, шт
            </label>
          </div>

          <div className='d-flex' style={{ gap: '12px' }}>
            <div
              className='d-flex align-items-center'
              style={{ cursor: 'pointer' }}
              onClick={() => setOrderLineOn(!orderLineOn)}
            >
              {orderLineOn ? (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='20' height='20' rx='10' fill='#FFDB7E' />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              ) : (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.5'
                    y='0.5'
                    width='19'
                    height='19'
                    rx='9.5'
                    stroke='#8C8C8C'
                  />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              )}
              <span>Заказы, руб</span>
            </div>
            <div
              className='d-flex align-items-center'
              style={{ cursor: 'pointer' }}
              onClick={() => setSalesLineOn(!salesLineOn)}
            >
              {salesLineOn ? (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='20' height='20' rx='10' fill='#9A81FF' />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              ) : (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.5'
                    y='0.5'
                    width='19'
                    height='19'
                    rx='9.5'
                    stroke='#8C8C8C'
                  />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              )}
              <span>Продажи, руб </span>
            </div>
            <div
              className='d-flex align-items-center'
              style={{ cursor: 'pointer' }}
              onClick={() => setReturnLineOn(!returnLineOn)}
            >
              {returnLineOn ? (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='20' height='20' rx='10' fill='#F6809A' />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              ) : (
                <svg
                  style={{ width: '20px', marginRight: '8px' }}
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.5'
                    y='0.5'
                    width='19'
                    height='19'
                    rx='9.5'
                    stroke='#8C8C8C'
                  />
                  <path
                    d='M4 9.21459L9.07692 14L16 6'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              )}
              <span>Возвраты, руб </span>
            </div>
          </div>
        </div>
      </div>
      <div className='bar-div'>
        {dataDashBoard?.length ? (
          <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ height: '100%', paddingTop: '15%' }}
          >
            <span className='loader'></span>
          </div>
        ) : (
          <Chart
            type='bar'
            data={data}
            width={100}
            height={40}
            options={{
              animation: {
                duration: 0,
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                  intersect: false,
                  callbacks: {},
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
                      tooltipEl.style.display = 'none';
                      return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove(
                      'above',
                      'below',
                      'no-transform'
                    );
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
                      let datasets = data?.datasets
                        ?.filter((obj) => obj.data?.length > 0)
                        ?.reverse();
                      // datasets = datasets?.slice(2, 4)?.concat(datasets?s.slice(0, 2))
                      // const datalabels = data?.labels?.map(item => item[0].concat(',' + item[1]))
                      const datalabels = data?.labels;

                      const targetInex = datalabels?.indexOf(
                        tooltipModel.title[0]
                      );

                      const titleLines = tooltipModel.title || [];
                      const bodyLines = tooltipModel.body.map(getBody);

                      let innerHtml = '<thead>';

                      titleLines.forEach(function (title) {
                        innerHtml +=
                          '<tr><th style="color: silver; font-weight: 400;">' +
                          title?.split(',').join(' ') +
                          '</th></tr>';
                      });
                      innerHtml += '</thead><tbody>';
                      datasets?.forEach(function (set, i) {
                        const colors = [
                          'rgba(240, 173, 0, 1)',
                          'rgba(83, 41, 255, 1)',
                          'rgba(249, 60, 101, 1)',
                        ];
                        const targetColor =
                          set.label === 'Заказы'
                            ? colors[0]
                            : set.label === 'Возвраты'
                            ? colors[2]
                            : set.label === 'Продажи'
                            ? colors[1]
                            : '';
                        const targetDescr = set.type === 'bar' ? ' шт' : ' руб';
                        let value = set?.data[targetInex] || '0';
                        let style = '';
                        // style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        const span =
                          '<span style="font-size: 12px; line-height: 0.5vw; border-radius: 2px; background-color: ' +
                          targetColor +
                          ';">&nbsp;&nbsp;&nbsp;&nbsp;</span> <span style="' +
                          style +
                          '">' +
                          set?.label +
                          ', ' +
                          targetDescr +
                          ':  <span style="font-weight: bold;">' +
                          value +
                          '</span></span>';
                        innerHtml += '<tr><td>' + span + '</td></tr>';
                      });
                      innerHtml += '</tbody>';

                      let tableRoot = tooltipEl.querySelector('table');
                      tableRoot.innerHTML = innerHtml;
                    }

                    const position =
                      context.chart.canvas.getBoundingClientRect();
                    const bodyFont = Chart?.helpers?.toFont(
                      tooltipModel.options.bodyFont
                    );

                    // Display, position, and set styles for font
                    tooltipEl.style.transition = 'all 0.25s ease-in-out';
                    tooltipEl.style.backgroundColor = 'white';
                    tooltipEl.style.borderRadius = '8px';
                    tooltipEl.style.boxShadow = '0 0 20px rgba(19,19, 19, 0.7)';
                    tooltipEl.style.padding = '1rem';
                    tooltipEl.style.opacity = 0;
                    tooltipEl.style.display = 'block';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = '-1000px';
                    tooltipEl.style.top =
                      position.top +
                      window.scrollY +
                      tooltipModel.caretY +
                      'px';
                    tooltipEl.style.font = bodyFont?.string;
                    tooltipEl.style.padding =
                      tooltipModel.padding +
                      'px ' +
                      tooltipModel.padding +
                      'px';
                    tooltipEl.style.pointerEvents = 'none';

                    // Reflow and calculate dimensions
                    const tooltipWidth = tooltipEl.offsetWidth;
                    const tooltipHeight = tooltipEl.offsetHeight;

                    // Reposition to the left
                    tooltipEl.style.left =
                      position.left +
                      window.scrollX +
                      tooltipModel.caretX -
                      tooltipWidth -
                      10 + // 10px offset from cursor
                      'px';

                    tooltipEl.style.opacity = 1; // Show the tooltip

                    // Adjust vertical position if tooltip goes off the top or bottom of the screen
                    const viewportHeight = window.innerHeight;
                    const tooltipTop = parseInt(tooltipEl.style.top);

                    if (tooltipTop + tooltipHeight > viewportHeight) {
                      tooltipEl.style.top =
                        viewportHeight - tooltipHeight - 10 + 'px'; // 10px padding from bottom
                    } else if (tooltipTop < 0) {
                      tooltipEl.style.top = '10px'; // 10px padding from top
                    }

                    tooltipEl.style.opacity = 1; // Show the tooltip
                  },
                },
              },
              scales: {
                A: {
                  id: 'A',
                  type: 'linear',
                  position: 'right',
                  suggestedMax: maxValue,
                  grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                  },
                  ticks: {
                    stepSize: maxSale,
                  },
                },
                B: {
                  id: 'B',
                  type: 'linear',
                  position: 'left',
                  suggestedMax: maxAmount,
                  grid: {
                    drawOnChartArea: true,
                  },
                  ticks: {
                    stepSize: getArrayStep(maxAmount),
                  },
                },
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                  ticks: {
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: days === 90 ? Math.ceil(92 / 13) : 30,
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
        )}
      </div>
    </div>
  );
};

export default BigChartGlitter;
