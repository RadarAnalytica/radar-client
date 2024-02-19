const moment = require('moment');

export const formatPrice = (price) => {
    if (price) {
        price = price.toString()
        const number = parseFloat(price);
        const formattedPrice = number.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
        return formattedPrice;
    }
}

export const formatDate = (date) => {
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
};

export const generateDateList = (number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < number; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(formatDate(date));
    }
    return dates.reverse();
};

export function calculateProfit(data) {
    let totalProfit = 0;

    // Проходим по каждой записи данных
    data.forEach(entry => {
        // Рассчитываем прибыль для каждой записи
        const profit = entry.retail_price - (entry.commission_percent * entry.retail_price);
        // Добавляем прибыль к общей сумме прибыли
        totalProfit += profit;
    });

    // Рассчитываем среднюю прибыль
    const averageProfit = totalProfit;
    return averageProfit;
}

export function calculateNetProfit(sales) {
    const calculateNetProfit = (sale) => {
        const totalRevenue = sale.retail_price * sale.quantity;
        const netRevenue = totalRevenue;
        return netRevenue - sale.retail_amount;
    };
    const netProfits = sales.map(calculateNetProfit);
    const totalNetProfit = netProfits.reduce((total, profit) => total + profit, 0);
    return totalNetProfit
}


export const calculateInitialCosts = (products) => {

    let quantity = 0
    let totalCost = 0;

    products.forEach(product => {
        totalCost += 1500 * product?.quantityFull;
        quantity += product?.quantityFull
    });

    return { totalCost, quantity }
}

export const calculateTotalProfit = (data) => {
    let totalRevenue = 0;

    // Проходимся по каждой продаже в массиве и суммируем их выручку, учитывая цену и количество
    data.forEach(sale => {
        if (sale.retail_price && sale.quantity) {
            totalRevenue += sale.retail_price * sale.quantity;
        } else {
            totalRevenue += (sale.retail_price || sale.quantity)
        }
    });
    return totalRevenue
}

export const calcTax = (sales) => {
    const taxRate = 0.13
    const calculateNetProfit = (sale) => {
        const revenue = sale.retail_price;
        const commission = sale.commission_percent * revenue;
        const netProfit = revenue - commission;

        return netProfit;
    };
    const calculateTax = (sale) => {
        // Рассчитываем базу налогообложения (чистая прибыль)
        const netProfit = calculateNetProfit(sale);
        // Рассчитываем налог
        const tax = netProfit * taxRate;
        return tax;
    };

    const taxes = sales.map(calculateTax);

    // Суммируем налоги всех продаж
    const totalTax = taxes.reduce((total, tax) => total + tax, 0);
    return totalTax
}

export function calculateMargin(revenue, cost) {
    return revenue - cost;
}

export function calculateGrossProfit(revenue, cost) {
    return (revenue - cost) || 0;
}

export function calculatePurchasePercentage(sales, report) {

    const salesAmount = sales?.length
    const returnAmount = report?.map(item => item.return_amount)?.reduce((a, b) => a + b, 0) || 0

    const diff = salesAmount && returnAmount ? salesAmount - returnAmount : 0

    return (diff / salesAmount) * 100;
}

export function calculateROI(profit, investment) {
    return ((profit / investment) * 100);
}

export function calculateGrossProfitMargin(grossProfit, revenue) {
    return (grossProfit / revenue) * 100;
}

export const abcAnalysis = (products) => {

    const totalSales = products.reduce((total, product) => total + product.finishedPrice, 0);
    const totalQuantity = products.length

    // Ранжирование товаров по убыванию объема продаж
    const sortedProducts = products.sort((a, b) => b.finishedPrice - a.finishedPrice);

    // Рассчитываем долю каждого товара в общем объеме продаж и присваиваем категорию ABC
    const categoryA = sortedProducts.slice(0, Math.ceil(products.length * 0.2));
    const categoryB = sortedProducts.slice(Math.ceil(products.length * 0.2), Math.ceil(products.length * 0.5));
    const categoryC = sortedProducts.slice(Math.ceil(products.length * 0.5));

    [categoryA, categoryB, categoryC].forEach(category => {

        // Рассчитываем долю каждого товара в общем объеме продаж и присваиваем свойства
        category.forEach(product => {
            product.quantityPercentage = (category.length / totalQuantity) * 100;
            product.amount = (product.finishedPrice * product.quantity) || 1;
            product.salesPercentage = (category.map(i => i.finishedPrice).reduce((a, b) => a + b, 0) / totalSales) * 100;
            product.abcTotalAmount = category.length
            product.abcTotalSales = category.map(i => i.finishedPrice).reduce((a, b) => a + b, 0) || 0
            product.prodName = product.subject
            // Добавьте свои дополнительные действия, если необходимо
        });
    });
    return {
        categoryA: { totalAmount: categoryA[0]?.abcTotalAmount, totalSales: categoryA[0]?.abcTotalSales, quantityPercentage: categoryA[0]?.quantityPercentage, salesPercentage: categoryA[0]?.salesPercentage },
        categoryB: { totalAmount: categoryB[0]?.abcTotalAmount, totalSales: categoryB[0]?.abcTotalSales, quantityPercentage: categoryB[0]?.quantityPercentage, salesPercentage: categoryB[0]?.salesPercentage },
        categoryC: { totalAmount: categoryC[0]?.abcTotalAmount, totalSales: categoryC[0]?.abcTotalSales, quantityPercentage: categoryC[0]?.quantityPercentage, salesPercentage: categoryC[0]?.salesPercentage }
    }
}

export const getDifference = (data, key, days) => {
    if (data) {
        data.sort((a, b) => a.date - b.date);

        // Определение временных границ для каждого периода (в данном случае - на две недели)
        const firstPeriodEndDate = new Date(new Date(data[0].date).getTime() + (days * 24 * 60 * 60 * 1000)); // +7 дней
        const secondPeriodStartDate = new Date(firstPeriodEndDate.getTime() + (1 * 24 * 60 * 60 * 1000)); // +1 день

        // Фильтрация данных для каждого периода
        const firstPeriodSales = data.filter(sale => new Date(sale.date).toLocaleDateString() < new Date(firstPeriodEndDate).toLocaleDateString());
        const secondPeriodSales = data.filter(sale => new Date(sale.date).toLocaleDateString() >= new Date(secondPeriodStartDate).toLocaleDateString());

        const oldSalesSum = firstPeriodSales.reduce((total, sale) => total + sale[key], 0);
        const newSalesSum = secondPeriodSales.reduce((total, sale) => total + sale[key], 0);
        const percentChange = ((newSalesSum - oldSalesSum) / oldSalesSum) * 100;
        // console.log(percentChange);

        return {
            firstPeriodSales,
            secondPeriodSales,
            rate: secondPeriodSales - firstPeriodSales > 0 ? 'up' : 'down',
            percent: percentChange
        }
    }
    else {
        return {}
    }

}