import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, Doughnut } from 'react-chartjs-2';
import { formatPrice } from '../../service/utils';
import GreenArrow from '../../assets/greenarrow.svg';
import RedArrow from '../../assets/redarrow.svg';
import styles from './OrderMapPieChart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderMapPieChart = ({
  title,
  info,
  sub,
  totalAmount,
  totalCount,
  titleTooltipAmount,
  titleTooltipCount,
  getColor,
  tooltipData,
}) => {
  const isOrders = title == 'Топ 5 по заказам';
  const getColorTooltip = (name) => {
    switch (name) {
      case 'Сибирский фо':
        return 'rgba(254, 197, 61, 1)';
      case 'Уральский фо':
        return 'grey';
      case 'Южный фо':
        return 'rgba(74, 217, 145, 1)';
      case 'Северо-Кавказский фо':
        return 'orangered';
      case 'Центральный фо':
        return 'rgba(129, 172, 255, 1)';
      case 'Приволжский фо':
        return 'rgb(255, 153, 114)';
      case 'Северо-Западный фо':
        return 'yellow';
      case 'Дальневосточный фо':
        return 'brown';
      case 'Другой округ':
        return 'rgba(196, 196, 196, 1)';
      default:
        return 'transparent';
    }
  };

  const cityColors = [
    'rgba(129, 172, 255, 1)',
    'rgba(255, 153, 114, 1)',
    'rgba(154, 129, 255, 1)',
    'rgba(74, 217, 145, 1)',
    'rgba(254, 197, 61, 1)',
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let cityColorMap = {}; //Do not delete! Needed for getColorStockTooltip to work
  const getColorStockTooltip = (city) => {
    // If the city already exists in cityColorMap, return its color
    if (cityColorMap[city]) {
      return cityColorMap[city];
    }
    // If the number of cities in cityColorMap is less than 5, assign a color from the colors array
    const colorIndex = Object.keys(cityColorMap).length;
    if (colorIndex < 5) {
      cityColorMap[city] = cityColors[colorIndex];
    } else {
      // Otherwise, we assign a random color
      cityColorMap[city] = getRandomColor();
    }

    return cityColorMap[city];
  };

  const getCityCircle = (color) => {
    return (
      <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='8' cy='8' r='10' fill={color} />
      </svg>
    );
  };

  const updatedInfo = info.map((item) => {
    let sub = item.districtName?.split('федеральный округ')?.join('фо');
    return { ...item, districtName: sub };
  });

  const firstFive = updatedInfo
    .filter((o) => (o.districtName ? o.districtName : o.stockName))
    ?.slice(0, 5);

  const colorCons = firstFive.map((systemItem) =>
    systemItem.districtName
      ? getColorTooltip(systemItem.districtName)
      : getColorStockTooltip(systemItem.stockName)
  );

  // const totalAmount =  info.reduce((acc, item) => acc + item.saleAmount, 0)
  // const totalSum =  info.reduce((acc, item) => acc + Number(item.saleCount), 0)

  const otherRegion = info.reduce((acc, item) => acc + item.percent, 0);
  // const green = require('../../assets/greenarrow.png');
  // const red = require('../../assets/redarrow.png');

  const data = {
    labels: firstFive?.map((item) =>
      item.districtName ? item.districtName : item.stockName
    ),
    datasets: [
      {
        label: 'Общая доля',
        data: firstFive?.map((item) => item.percent),
        backgroundColor: colorCons,
        borderColor: 'white',
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className='order-map-doughnut'>
      <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>
        {title}
      </h5>
      <div className='doughnut-content'>
        <div
          className={styles.chartContainer}
        >
        {/* <div
          className='col-5 me-2'
          style={{ position: 'relative', marginLeft: '-1vw' }}
        > */}
          <Doughnut
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
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
                      let datasets = data?.datasets?.filter(
                        (obj) => obj.data?.length > 0
                      );
                      // datasets = datasets?.slice(2, 4)?.concat(datasets?s.slice(0, 2))
                      // const datalabels = data?.labels?.map(item => item[0].concat(',' + item[1]))
                      const datalabels = data?.labels;

                      const targetInex = datalabels?.indexOf(
                        tooltipModel.title[0]
                      );
                      const color = tooltipModel.labelColors[0].backgroundColor;
                      const titleLines = tooltipModel.title || [];
                      const bodyLines = tooltipModel.body.map(getBody);
                      const amount = tooltipData[targetInex]?.amount ? tooltipData[targetInex]?.amount?.toFixed(0) : '-';
                      const count = tooltipData[targetInex]?.count ? tooltipData[targetInex]?.count?.toFixed(0) : '-';

                      let innerHtml = '<thead>';

                      titleLines.forEach(function (title) {
                        innerHtml +=
                          '<tr><th style="color: black; font-weight: 400;"><span style="width: 10px; height: 10px; background-color: ' +
                          color +
                          '; display: inline-block; margin-right: 5px; border-radius: 50%;" ></span>' +
                          title +
                          '</th></tr>';
                      });
                      innerHtml += '</thead><tbody>';
                      datasets?.forEach(function (set, i) {
                        const colors = set.backgroundColor[i];
                        // const targetColor = set.label === 'Заказы' ? colors[0] : colors[1]
                        // const targetDescr = set.type === 'bar' ? ' шт' : " руб"
                        let value = set?.data[targetInex] || '0';
                        let style = '';
                        // style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        const span = `<div style="display: flex; justify-content: space-between; align-items: flex-start; width: 210px;">
                                                    <div>
                                                      <span>${set?.label}</span>
                                                      <p style="margin: 0">${titleTooltipAmount}</p>
                                                      <p>${titleTooltipCount}</p>
                                                    </div>
                                                    <div style="text-align: left;">
                                                      <span style="font-weight: bold;">${value}%</span>
                                                      <p style="margin: 0" ><span style="font-weight: bold;">${amount}</span></p>
                                                      <p><span style="font-weight: bold;">${count}</span></p>
                                                    </div>
                                                  </div>`;
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
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.display = 'block';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left =
                      position.left +
                      window.scrollX +
                      tooltipModel.caretX +
                      'px';
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
                  },
                },
              },
              animation: {
                onComplete: (chart) => {
                  const ctx = chart?.ctx;
                  const width = chart?.width;
                  const height = chart?.height;

                  ctx?.restore();
                  const fontSize = (height / 150).toFixed(2);
                  if (ctx) {
                    ctx.font = fontSize + 'em Arial';
                    ctx.textBaseline = 'middle';

                    const text = 'Ваш текст в центре';

                    const textX = Math.round(
                      (width - ctx.measureText(text).width) / 2
                    );
                    const textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                  }
                },
              },
              layout: {
                padding: {
                  right: 20,
                },
              },
              spacing: 10,
              cutout: '85%',
            }}
          />
          <div className='in-circle'>
            <p className='clue-text mb-1' style={{ fontSize: '1.75vh' }}>
              {sub}
            </p>
            <p className='mb-1 fw-bold' style={{ fontSize: '2vh' }}>
              {formatPrice(totalAmount)} ₽
            </p>
            <p className='mb-1' style={{ fontSize: '1.75vh', fontWeight: 600 }}>
              {totalCount} шт
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
          }}
        >
          {firstFive
            ? firstFive.map((obj, key) => {
              const compare = isOrders
                ? obj.comparePercentOrder
                : obj.comparePercent;
              const percent = isOrders ? obj.percentOrder : obj.percent;
              return (
                <div
                  className='mb-2'
                  style={{ maxWidth: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '4fr 1fr 1.5fr', alignItems: 'center' }}
                  key={key}
                >
                  {/* circle & title */}
                  <div className='d-flex align-items-center w-auto'
                    style={{ overflow: 'hidden' }}
                  >
                    <span
                      className='d-flex align-items-center'
                      style={{
                        //width: '0.75vw',
                        //height: '0.75vw',
                        borderRadius: '100%',

                        //marginLeft: '-0.5vw',
                        marginRight: '6px',

                        //marginTop: '-0.75vh',
                      }}
                    >
                      {obj.districtName
                        ? getColor(obj.districtName)
                        : getCityCircle(getColorStockTooltip(obj.stockName))}
                    </span>
                    <p className='m-0 p-0' style={{ fontSize: '1.75vh', textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%' }}>
                      {obj.districtName ? obj.districtName : obj.stockName}
                    </p>
                  </div>
                  {/* data */}
                  <p
                    className='fw-bold m-0'
                    style={{ fontSize: '1.85vh', width: 'auto', paddingLeft: '10px'}}
                  >
                    {percent ? percent.toFixed(percent < 10 ? 1 : 0) : 0}
                    &nbsp;%
                  </p>
                  <div
                    className='d-flex justify-content-end align-items-center'
                    style={{
                      fontSize: '1.85vh',
                    }}
                  >
                    <span className='pb-1'>
                      <img
                        src={compare > 0 ? GreenArrow : RedArrow}
                        alt=''
                        style={{ width: '1.25vw', marginRight: '4px' }}
                      />
                    </span>
                    <span
                      className=''
                      style={
                        compare > 0
                          ? {
                            fontSize: '1.5vh',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                            color: 'rgba(0, 182, 155, 1)',
                          }
                          : {
                            fontSize: '1.5vh',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                            color: 'rgba(249, 60, 101, 1)',
                          }
                      }
                    >
                      {compare ? Number(compare).toFixed(0) : 0} %
                    </span>
                  </div>



                </div>
              );
            })
            : null}
        </div>
      </div>
      {/* <div className="text-end">
                <p className='mb-0 prime-text'>{link}</p>
            </div> */}
    </div>
  );
};

export default OrderMapPieChart;
