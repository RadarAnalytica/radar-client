export const chartDataNormalizer = (rawData, period) => {
    let keys = rawData.map(obj => Object.keys(obj)[0]);
    const values = rawData.map(obj => Object.values(obj)[0]);

    if (period && period === 'month') {
        keys = keys.map(_ => {
            const splitted = _.split(' ');
            const normilized = [...splitted].reverse();
            return normilized[0] + ' ' + normilized[1];
        })
    }   


    const normalizedData = {
        labels: keys,
        datasets: [
            {
                label: '',
                type: 'line',
                fill: true,
                data: values,
                borderColor: '#9A81FF',
                //yAxisID: yAxis,
                tension: 0.4,
                pointBorderColor: '#F7F6FE',
                pointBackgroundColor: '#9A81FF',
                backgroundColor: '#9A81FF30',
                pointRadius: 6,
                hoverRadius: 8,
                borderWidth: 2
            }
        ],
    }


    return normalizedData;
}