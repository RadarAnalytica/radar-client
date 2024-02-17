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