export const getFilteredData = (query, data) => {
    let filteredData = data;

    if (data && query) {
        filteredData = data.filter((item) =>
            item?.sku?.toLowerCase().includes(query.toLowerCase()) ||
            item?.vendorСode?.toLowerCase().includes(query.toLowerCase()) ||
            item?.productName?.toLowerCase().includes(query.toLowerCase())
        );
    }

    return filteredData;
};
