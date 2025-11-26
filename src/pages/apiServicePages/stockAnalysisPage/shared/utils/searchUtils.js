export const getFilteredData = (query, data) => {
    console.log('SA query', query);
    console.log('SA data', data);
    let filteredData = data;

    if (data && query) {
        console.log('SA data', data);
        console.log('SA query', query);
        if (!query || !data) return [];
        filteredData = [...data].map((item) => {
            const newSizes = item?.sizes?.filter((size) => (
                size?.sku?.toLowerCase().includes(query.toLowerCase()) ||
                size?.vendorСode?.toLowerCase().includes(query.toLowerCase()) ||
                size?.productName?.toLowerCase().includes(query.toLowerCase()))
            )

            return {
                ...item,
                sizes: newSizes || [],
            }
        }).filter((item) => item.sizes && item.sizes.length > 0)
    }

    return filteredData;
};
