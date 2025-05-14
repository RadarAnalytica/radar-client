export const sortTableDataFunc = (sortType, sortedValue, dataToSort) => {
    let sortedData = dataToSort;

    if (sortType === 'ASC') {
        sortedData = [...dataToSort].sort((a, b) => {
            if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                return a[sortedValue] - b[sortedValue]
            } else {
                return a[sortedValue].localeCompare(b[sortedValue])
            }
        })
    }

    if (sortType === 'DESC') {
        sortedData = [...dataToSort].sort((a, b) => {
            if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                return b[sortedValue] - a[sortedValue]
            } else {
                return b[sortedValue].localeCompare(a[sortedValue])
            }
        })
    }
    return sortedData;
}

export const formatRateValue = (value) => {
    let result = {
        value: Math.abs(value).toString(),
        color: '#8C8C8C',
        icon: (
            <div
                style={{
                    width: '12px',
                    marginRight: '10px',
                    height: '2px',
                    background: '#8C8C8C'
                }}
            ></div>
        )
    }
    if (value > 0) {
        result = {
            value: '+ ' + result.value + ' %',
            color: '#00B69B',
            icon: (
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 0.544067L16.29 2.83407L11.41 7.71407L7.41 3.71407L0 11.1341L1.41 12.5441L7.41 6.54407L11.41 10.5441L17.71 4.25407L20 6.54407V0.544067H14Z" fill="#00B69B" />
                </svg>
            )
        }
    }
    if (value < 0) {
        result = {
            value: '- ' + result.value + ' %',
            color: '#F93C65',
            icon: (
                <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9375 12.5441L17.2275 10.2541L12.3475 5.37407L8.3475 9.37407L0.9375 1.95407L2.3475 0.544067L8.3475 6.54407L12.3475 2.54407L18.6475 8.83407L20.9375 6.54407V12.5441H14.9375Z" fill="#F93C65" />
                </svg>

            )
        }
    }
    if (value === 0) {
        result = {
            ...result,
            value: result.value + ' %',
        }
    }

    return result;
}