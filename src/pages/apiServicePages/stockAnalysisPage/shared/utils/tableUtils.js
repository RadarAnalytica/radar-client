export const sortTableDataFunc = (sortType, sortedValue, dataToSort) => {
    let sortedData = dataToSort;
    if (sortedValue === 'byRevenue' || sortedValue === 'byProfit') {
        if (sortType === 'ASC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof b[sortedValue] === 'number' && typeof a[sortedValue] === 'number') {
                    return b[sortedValue] - a[sortedValue];
                } else {
                    return b[sortedValue].localeCompare(a[sortedValue]);
                }
            });
        }

        if (sortType === 'DESC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof b[sortedValue] === 'number' && typeof a[sortedValue] === 'number') {
                    return a[sortedValue] - b[sortedValue];
                } else {
                    return a[sortedValue].localeCompare(b[sortedValue]);
                }
            });
        }
    } else {
        if (sortType === 'ASC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                    return a[sortedValue] - b[sortedValue];
                } else {
                    return a[sortedValue].localeCompare(b[sortedValue]);
                }
            });
        }

        if (sortType === 'DESC') {
            sortedData = [...dataToSort].sort((a, b) => {
                if (typeof a[sortedValue] === 'number' && typeof b[sortedValue] === 'number') {
                    return b[sortedValue] - a[sortedValue];
                } else {
                    return b[sortedValue].localeCompare(a[sortedValue]);
                }
            });
        }
    }

    return sortedData;
};
