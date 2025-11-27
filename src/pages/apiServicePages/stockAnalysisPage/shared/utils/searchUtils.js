import { log } from '@/service/utils';

export const getFilteredData = (query, data) => {
    log('SA query', query);
    log('SA data', data);
    let filteredData = data;

    if (data && query) {
        filteredData = [...data].map((item) => {
            const newSizes = item?.sizes?.filter((size) => (
                size?.sku?.toLowerCase().includes(query.toLowerCase()) ||
                size?.vendorСode?.toLowerCase().includes(query.toLowerCase()) ||
                size?.productName?.toLowerCase().includes(query.toLowerCase()))
            );

            return {
                ...item,
                sizes: newSizes || [],
                showSizes: true,
            };
        }).filter((item) => item.sizes && item.sizes.length > 0);
    }

    log('SA filteredData', filteredData);
    return filteredData;
};
