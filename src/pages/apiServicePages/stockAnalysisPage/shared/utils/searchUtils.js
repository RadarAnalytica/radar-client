import { log } from '@/service/utils';

export const getFilteredData = (query, data) => {
    log('SA query', query);
    log('SA data', data);
    let filteredData = data;

    if (data && query) {
        const queryLower = query.toLowerCase();
        filteredData = [...data].map((item) => {
            // Получаем vendorCode и productName из родительского элемента
            const vendorCode = item?.article?.toLowerCase() || '';
            const productName = item?.article_data?.productName?.toLowerCase() || '';
            
            const newSizes = item?.sizes?.filter((size) => {
                const sizeSku = size?.sku?.toLowerCase() || '';
                // Проверяем поля size и данные из родителя
                return (
                    sizeSku.includes(queryLower) ||
                    vendorCode.includes(queryLower) ||
                    productName.includes(queryLower)
                );
            });

            return {
                ...item,
                sizes: newSizes || [],
                showSizes: true,
                originalSizesLength: item?.sizes?.length || 0,
            };
        }).filter((item) => item.sizes && item.sizes.length > 0);
    }

    log('SA filteredData', filteredData);
    return filteredData;
};
