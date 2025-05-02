import moment from "moment";

export const chartCompareConfigObject = [
    { engName: 'revenue', ruName: 'Выручка', color: '#5329FF', isControlTooltip: false, hasUnits: true, units: '₽', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'orders', ruName: 'Заказы', color: '#F0AD00', isControlTooltip: false, hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'quantity', ruName: 'Товарные остатки', color: '#F93C94', isControlTooltip: false, hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'avg_price', ruName: 'Средняя цена', color: '#1BC5D1', isControlTooltip: false, hasUnits: true, units: '₽', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'requests_count', ruName: 'Всего запросов', color: '#FFDC89', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'avg_place', ruName: 'Средняя позиция', color: '#C7D61E', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'total_shows', ruName: 'Всего показов', color: '#F9813C', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'avg_frequency', ruName: 'Среднедневная частотность', color: '#00AF4F', isControlTooltip: false, controlTooltipText: 'text', hasUnits: true, units: 'шт', isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'ad_booster', ruName: 'Реклама бустер', color: '#D54AFF', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'ad_search', ruName: 'Реклама в поиске', color: '#F93C65', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'wb_id_frequency', ruName: 'Частотность артикула', color: '#F9A43C', isControlTooltip: false, hasUnits: false, isOnChart: true, isAnnotation: false, isControl: true, },
    { engName: 'promotions', ruName: 'Акции', color: '#FF0000', isControlTooltip: false, controlTooltipText: 'text', hasUnits: false, isOnChart: false, isAnnotation: true, isControl: true, },
    { engName: 'seasonality', ruName: 'Сезоны продаж', color: '#88E473', isControlTooltip: false, hasUnits: false, isOnChart: false, isAnnotation: false, isControl: true, },
]

export const annotationColorsConfig = [
    { bgColor: '#FEEBF4', lableColor: '#F93C94' },
    { bgColor: '#E8F9FA', lableColor: '#1BC5D1' },
    { bgColor: '#FEF6EB', lableColor: '#F9A43C' },
    { bgColor: '#FEEBF0', lableColor: '#F93C65' },
    { bgColor: '#FBEDFF', lableColor: '#D54AFF' },
    { bgColor: '#E5F7ED', lableColor: '#00AF4F' },
]

const getAnnotations = (initData) => {
    // отфильтровываем даты без распродажи
    const filteredData = initData.filter(_ => _.item !== '')
    const normilizedData = []
    // нормализуем отфиьтрованные данные в формат [{name: 'action_name', dates: []}, ...]
    filteredData.forEach(i => {
        const index = normilizedData.findIndex(_ => _.name === i.item);
        if (index === -1) {
            normilizedData.push({
                name: i.item,
                dates: [i.date]
            })
        } else {
            normilizedData[index].dates.push(i.date)
        }
    })

    // сортируем даты для каждого элемента нормализованного массива и создаем обьект аннотаций
    let annotations = {}
    normilizedData.forEach((i, id) => {
        i.dates.sort((a, b) => moment(a) > moment(b) ? 1 : -1)
        const color = id < annotationColorsConfig.length - 1 ? annotationColorsConfig[id] : annotationColorsConfig[id - (Math.floor(id / annotationColorsConfig.length - 1) * (annotationColorsConfig.length - 1))]
        annotations[`annotation_${id}`] = {
            drawTime: 'beforeDatasetsDraw',
            type: 'box',
            xMin: moment(i.dates[0]).format('DD.MM.YY'),
            xMax: moment(i.dates[i.dates.length - 1]).format('DD.MM.YY'),
            backgroundColor: `${color.bgColor || annotationColorsConfig[0].bgColor}95`,
            borderWidth: 0,
            label: {
                content: `${i.name.substring(0,1)}${i.name.substring(1).toLowerCase()}`,
                display: true,  // Убедитесь, что display установлен в true
                position: 'start',
                yAdjust: 15,
                xAdjust: 5,
                color: color.lableColor || annotationColorsConfig[0].lableColor,  // Цвет текста
                font: {
                    size: 14,
                    weight: 'normal',
                    family: 'Mulish'
                },
                padding: 4
            }
        }
    })

    return annotations;
}

const getSeason = (seasonsData) => {
    let normilizedArr = [];
    seasonsData.forEach((i, id) => {
        if (id === 0 && i.item === 0) return
        if (id !== 0 && i.item === 0) return
        if (id === 0 && i.item === 1) {
            normilizedArr.push([i.date])
            return
        }
        if (id !== 0 && i.item === 1) {
            if (i.item === seasonsData[id - 1].item && normilizedArr.length > 0) {
                normilizedArr[normilizedArr.length - 1].push(i.date);
                return
            }
            if (i.item === seasonsData[id - 1].item && normilizedArr.length === 0) {
                normilizedArr.push([i.date]);
                return
            }
            if (i.item !== seasonsData[id - 1]) {
                normilizedArr.push([i.date]);
                return
            }
        }
        
    })
    if (normilizedArr.length === 0) return {}
    normilizedArr.forEach(i => i.sort((a,b) =>  moment(a) > moment(b) ? 1 : -1))
    let seasonObject = {}
    normilizedArr.forEach((i, id) => {
        seasonObject[`season_${id}`] = {
            drawTime: 'beforeDraw',
            type: 'box',
            xMin: moment(i[0]).format('DD.MM.YY'),
            xMax: moment(i[i.length - 1]).format('DD.MM.YY'),
            backgroundColor: '#88E47350',
            borderWidth: 0,
        }
    })


    return seasonObject
}



export const mainChartOptionsGenerator = (chartData, anotationField, seasonsField ) => {

    const annotationData = chartData[anotationField.engName]
    const seasonsData = chartData[seasonsField.engName]
    let annotationObject = anotationField.isActive && getAnnotations(annotationData);
    if (anotationField.isActive) {
        annotationObject = {
            ...annotationObject,
            ...getAnnotations(annotationData)
        }
    }
    if (seasonsField.isActive) {
        annotationObject = {
            ...annotationObject,
            ...getSeason(seasonsData)
        }
    }


    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            // tooltip: {
            //     enabled: false,
            //     intersect: false,
            //     mode: 'index',
            //     axis: 'x',
            //     callbacks: {},
            //     //external: (context) => {getChartTooltip(context, chartData)}
            // },
            annotation: {
                annotations: {...annotationObject}
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'right',
                // ticks: {
                //     callback: function(value, index, values) {
                //         const max = Math.max(...values);
                //         return (value / max * 100).toFixed(0) + '%';
                //     }
                // },
                //min: 0,
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'left',

                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                // ticks: {
                //     callback: function(value, index, values) {
                //         const max = Math.max(...values);
                //         return (value / max * 100).toFixed(0) + '%';
                //     }
                // },
                //min: 0,
            },
        },
    }

    return chartOptions;
}