import React from 'react';
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

const BigChart = ({
  name,
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
  children
}) => {
  // const activeIcon = require('../assets/tick-active.png');
  // const activeIconYellow = require('../assets/tick-active-yellow.png');
  // const inactiveIcon = require('../assets/tick.png');

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
      <div className='d-flex justify-content-between' style={{ alignItems: "flex-start" }}>
        <div className='d-flex flex-column'>
          <div className='fw-bold fs-4' style={{ marginBottom: "5px", marginLeft: "5px", display: "flex", alignItems: "flex-start" }}>{name}</div>
          <div style={{ marginBottom: "5px" }}>{children}</div>
        </div>
        <div
          className='d-flex align-items-center'
          style={{ cursor: 'pointer', paddingTop: "10px" }}
        >
          <div
            className='d-flex me-3 aligin-items-center'
            onClick={() => setOrderOn(!orderOn)}
          >
            {orderOn ? (
              <svg
                style={{ width: '2.5vh', marginRight: '0.5vh' }}
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
                style={{ width: '2.5vh', marginRight: '0.5vh' }}
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
            className='d-flex me-3 aligin-items-center'
            onClick={() => setSalesOn(!salesOn)}
          >
            {salesOn ? (
              <svg
                style={{ width: '2.5vh', marginRight: '0.5vh' }}
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
                style={{ width: '2.5vh', marginRight: '0.5vh' }}
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

          <div className='d-flex gap-3 '>
            <div
              className='d-flex align-items-center gap-2'
              style={{ cursor: 'pointer' }}
              onClick={() => setOrderLineOn(!orderLineOn)}
            >
              {orderLineOn ? (
                <svg
                  style={{ width: '2.75vh' }}
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
                  style={{ width: '2.75vh' }}
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
              className='d-flex align-items-center gap-2'
              style={{ cursor: 'pointer' }}
              onClick={() => setSalesLineOn(!salesLineOn)}
            >
              {salesLineOn ? (
                <svg
                  style={{ width: '2.75vh' }}
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
                  style={{ width: '2.75vh' }}
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
          </div>
        </div>
      </div>
      <div className='bar-div' style={{ position: 'relative' }}>
        {((data && data.labels.length === 0) || loading) && (
          <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: '#fff',
            }}
          >
            <span className='loader'></span>
          </div>
        )}
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
                mode: 'index',
                axis: 'x',
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
                      ];
                      const targetColor =
                        set.label === 'Заказы' ? colors[0] : colors[1];
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

                  const position = context.chart.canvas.getBoundingClientRect();
                  const bodyFont = Chart?.helpers?.toFont(
                    tooltipModel.options.bodyFont
                  );

                  // Calculate tooltip position
                  let tooltipLeft =
                    position.left + window.scrollX + tooltipModel.caretX;
                  let tooltipTop =
                    position.top + window.scrollY + tooltipModel.caretY;
                  // Adjust position to stay within chart area
                  const tooltipWidth = tooltipEl.offsetWidth;
                  const tooltipHeight = tooltipEl.offsetHeight / 2;

                  if (tooltipLeft + tooltipWidth > position.right) {
                    tooltipLeft = position.right - tooltipWidth;
                  }

                  if (tooltipTop + tooltipHeight > position.bottom) {
                    tooltipTop = position.bottom - tooltipHeight;
                  }

                  // Display, position, and set styles for font
                  tooltipEl.style.transition = 'all 0.25s ease-in-out';
                  tooltipEl.style.backgroundColor = 'white';
                  tooltipEl.style.borderRadius = '8px';
                  tooltipEl.style.boxShadow = '0 0 20px rgba(19,19, 19, 0.7)';
                  tooltipEl.style.padding = '1rem';
                  tooltipEl.style.opacity = 1;
                  tooltipEl.style.display = 'block';
                  tooltipEl.style.position = 'absolute';
                  tooltipEl.style.left = tooltipLeft + 'px';
                  tooltipEl.style.top = tooltipTop + 'px';
                  tooltipEl.style.padding =
                    tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                  tooltipEl.style.pointerEvents = 'none';
                },
              },
            },
            scales: {
              A: {
                id: 'A',
                type: 'linear',
                position: 'right',
                suggestedMax: maxValue,
                min: 0,
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
                min: 0,
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
      </div>
    </div>
  );
};

export default BigChart;
