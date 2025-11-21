import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { useState, useCallback, useEffect } from 'react';
import { eachWeekOfInterval, format, formatISO, endOfWeek, getISOWeek, } from 'date-fns';
import { URL } from "./config";
import dayjs from 'dayjs';

export function filterArrays(obj, days) {
  for (let key in obj) {
    if (
      obj[key] &&
      obj[key].data &&
      Array.isArray(obj[key].data) &&
      key !== 'warehouses' &&
      key !== 'info'
    ) {
      if (typeof obj[key].data === 'object' && obj[key].data.length) {
        obj[key].data = obj[key].data.filter((item) => {
          const date = item.date
            ? new Date(item.date)
            : item.lastChangeDate
              ? new Date(item.lastChangeDate)
              : item.sale_dt
                ? new Date(item.sale_dt)
                : new Date(item.create_dt);
          const weekAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
          return date >= weekAgo;
        });
      }
    } else if (
      obj[key] &&
      Array.isArray(obj[key]) &&
      key !== 'warehouses' &&
      key !== 'info'
    ) {
      if (typeof obj[key] === 'object' && obj[key].length) {
        obj[key] = obj[key].filter((item) => {
          const date = item.date
            ? new Date(item.date)
            : item.lastChangeDate
              ? new Date(item.lastChangeDate)
              : item.sale_dt
                ? new Date(item.sale_dt)
                : new Date(item.create_dt);
          const weekAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
          return date >= weekAgo;
        });
      }
    }
  }
  return obj;
}

export function filterArraysNoData(obj, days) {
  for (let key in obj) {
    if (
      obj[key] &&
      Array.isArray(obj[key]) &&
      key !== 'warehouses' &&
      key !== 'info'
    ) {
      if (typeof obj[key] === 'object' && obj[key].length) {
        obj[key] = obj[key].filter((item) => {
          const date = item.date
            ? new Date(item.date)
            : item.lastChangeDate
              ? new Date(item.lastChangeDate)
              : item.sale_dt
                ? new Date(item.sale_dt)
                : new Date(item.create_dt);
          const weekAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
          return date >= weekAgo;
        });
      }
    }
  }
  return obj;
}


// func that format any value to display (e.g, prices, percents...)
export const formatPrice = (value, literal, hasPlusSymbol = false) => {
  // define a value to return
  let formattedPriceString = '0';
  // checking if value exists
  if (value !== undefined && value !== null) {
    //in case if value is a string
    const number = parseFloat(value);
    // checking that number is number
    if (Number.isNaN(number)) {
      if (literal) {
        formattedPriceString += ` ${literal}`;
      }
      return formattedPriceString;
    }
    // formatting the value
    formattedPriceString = number.toLocaleString('ru-RU', {
      maximumFractionDigits: 2,
    });
    // adding a literal (like "шт" or "₽") to the string
    if (literal) {
      formattedPriceString += ` ${literal}`;
    }

    if (hasPlusSymbol && number > 0) {
      formattedPriceString = `+${formattedPriceString}`;
    }
  }
  return formattedPriceString.replace(/\s/g, '\u00A0');
};



//Функция для склонения слова 'день' в зависимости от количества
export const getDayDeclension = (quantity) => {
  const num = parseInt(quantity);

  // Получаем последние две цифры для правильного склонения
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;

  // Специальные случаи для 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${quantity} дней`;
  }

  // Склонение по последней цифре
  switch (lastDigit) {
    case 1:
      return `${quantity} день`;
    case 2:
    case 3:
    case 4:
      return `${quantity} дня`;
    default:
      return `${quantity} дней`;
  }
};

export const formatDate = (date) => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
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
  data.forEach((entry) => {
    // Рассчитываем прибыль для каждой записи
    const profit =
      entry.retail_price - entry.commission_percent * entry.retail_price;
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
  const totalNetProfit = netProfits.reduce(
    (total, profit) => total + profit,
    0
  );
  return totalNetProfit;
}

export const calculateInitialCosts = (products) => {
  let quantity = 0;
  let totalCost = 0;

  products.forEach((product) => {
    totalCost += 1500 * product?.quantityFull;
    quantity += product?.quantityFull;
  });

  return { totalCost, quantity };
};

export const calculateTotalProfit = (data) => {
  let totalRevenue = 0;
  // Проходимся по каждой продаже в массиве и суммируем их выручку, учитывая цену и количество
  data.forEach((sale) => {
    if (sale.retail_price && sale.quantity) {
      totalRevenue += sale.retail_price * sale.quantity;
    } else {
      totalRevenue += sale.retail_price || sale.quantity;
    }
  });
  return totalRevenue;
};

export const calcTax = (sales) => {
  const taxRate = 0.13;
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
  return totalTax;
};

export function calculateMargin(revenue, cost) {
  return revenue - cost;
}

export function calculateGrossProfit(revenue, cost) {
  return revenue - cost || 0;
}

export function calculatePurchasePercentage(sales, report) {
  const salesAmount = sales?.length;
  const returnAmount =
    report?.map((item) => item.return_amount)?.reduce((a, b) => a + b, 0) || 0;

  const diff = salesAmount && returnAmount ? salesAmount - returnAmount : 0;

  return (diff / salesAmount) * 100;
}

export function calculateROI(profit, investment) {
  return (profit / investment) * 100;
}

export function calculateGrossProfitMargin(grossProfit, revenue) {
  return (grossProfit / revenue) * 100;
}

export const abcAnalysis = (products) => {
  const totalSales = products.reduce(
    (total, product) => total + product.finishedPrice,
    0
  );
  const totalQuantity = products.length;

  // Ранжирование товаров по убыванию объема продаж
  const sortedProducts = products.sort(
    (a, b) => b.finishedPrice - a.finishedPrice
  );

  // Рассчитываем долю каждого товара в общем объеме продаж и присваиваем категорию ABC
  const categoryA = sortedProducts.slice(0, Math.ceil(products.length * 0.2));
  const categoryB = sortedProducts.slice(
    Math.ceil(products.length * 0.2),
    Math.ceil(products.length * 0.5)
  );
  const categoryC = sortedProducts.slice(Math.ceil(products.length * 0.5));

  [categoryA, categoryB, categoryC].forEach((category) => {
    // Рассчитываем долю каждого товара в общем объеме продаж и присваиваем свойства
    category.forEach((product) => {
      product.quantityPercentage = (category.length / totalQuantity) * 100;
      product.amount = product.finishedPrice * product.quantity || 1;
      product.salesPercentage =
        (category.map((i) => i.finishedPrice).reduce((a, b) => a + b, 0) /
          totalSales) *
        100;
      product.abcTotalAmount = category.length;
      product.abcTotalSales =
        category.map((i) => i.finishedPrice).reduce((a, b) => a + b, 0) || 0;
      product.prodName = product.subject;
      // Добавьте свои дополнительные действия, если необходимо
    });
  });
  return {
    categoryA: {
      totalAmount: categoryA[0]?.abcTotalAmount,
      totalSales: categoryA[0]?.abcTotalSales,
      quantityPercentage: categoryA[0]?.quantityPercentage,
      salesPercentage: categoryA[0]?.salesPercentage,
    },
    categoryB: {
      totalAmount: categoryB[0]?.abcTotalAmount,
      totalSales: categoryB[0]?.abcTotalSales,
      quantityPercentage: categoryB[0]?.quantityPercentage,
      salesPercentage: categoryB[0]?.salesPercentage,
    },
    categoryC: {
      totalAmount: categoryC[0]?.abcTotalAmount,
      totalSales: categoryC[0]?.abcTotalSales,
      quantityPercentage: categoryC[0]?.quantityPercentage,
      salesPercentage: categoryC[0]?.salesPercentage,
    },
  };
};

export const getDifference = (data, key, days) => {
  if (data) {
    data.sort((a, b) => a.date - b.date);

    // Определение временных границ для каждого периода (в данном случае - на две недели)
    const firstPeriodEndDate = new Date(
      new Date(data[0].date).getTime() + days * 24 * 60 * 60 * 1000
    ); // +7 дней
    const secondPeriodStartDate = new Date(
      firstPeriodEndDate.getTime() + 1 * 24 * 60 * 60 * 1000
    ); // +1 день

    // Фильтрация данных для каждого периода
    const firstPeriodSales = data.filter(
      (sale) =>
        new Date(sale.date).toLocaleDateString() <
        new Date(firstPeriodEndDate).toLocaleDateString()
    );
    const secondPeriodSales = data.filter(
      (sale) =>
        new Date(sale.date).toLocaleDateString() >=
        new Date(secondPeriodStartDate).toLocaleDateString()
    );

    const oldSalesSum = firstPeriodSales.reduce(
      (total, sale) => total + sale[key],
      0
    );
    const newSalesSum = secondPeriodSales.reduce(
      (total, sale) => total + sale[key],
      0
    );
    const percentChange = ((newSalesSum - oldSalesSum) / oldSalesSum) * 100;
    // console.log(percentChange);

    return {
      firstPeriodSales,
      secondPeriodSales,
      rate: secondPeriodSales - firstPeriodSales > 0 ? 'up' : 'down',
      percent: percentChange,
    };
  } else {
    return {};
  }
};

export const formatFromIsoDate = (dateString) => {
  const dateCurrent = new Date(dateString);
  function addLeadZero(val) {
    if (+val < 10) return '0' + val;
    return val;
  };
  return [
    addLeadZero(dateCurrent.getDate()),
    addLeadZero(dateCurrent.getMonth() + 1),
    dateCurrent.getFullYear()
  ].join('.');
};

export const calculateReturns = (data, days) => {
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(previousDate.getDate() - days);

  // Фильтруем данные по текущему и предыдущему периодам
  const currentPeriodData = data.filter(
    (item) =>
      new Date(item.date) >= previousDate && new Date(item.date) <= currentDate
  );
  const previousPeriodData = data.filter(
    (item) => new Date(item.date) < previousDate
  );

  // Подсчет суммы возвратов и их количества для текущего периода
  const currentReturnsSum = currentPeriodData.reduce(
    (total, item) => total + (item.isCancel ? item.finishedPrice : 0),
    0
  );
  const currentReturnsCount = currentPeriodData.filter(
    (item) => item.isCancel
  ).length;

  // Подсчет суммы возвратов и их количества для предыдущего периода
  const previousReturnsSum = previousPeriodData.reduce(
    (total, item) => total + (item.isCancel ? item.finishedPrice : 0),
    0
  );
  const previousReturnsCount = previousPeriodData.filter(
    (item) => item.isCancel
  ).length;

  // Подсчет доли роста суммы возвратов и количества возвратов
  const returnsSumGrowth =
    ((currentReturnsSum - previousReturnsSum) / previousReturnsSum) * 100;
  const returnsCountGrowth =
    ((currentReturnsCount - previousReturnsCount) / previousReturnsCount) * 100;

  // Возвращаем результаты
  return {
    currentReturnsSum,
    currentReturnsCount,
    returnsSumGrowth,
    returnsCountGrowth,
  };
};

function getDatesInInterval(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function dateMatches(date1, date2) {
  return (
    date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0]
  );
}

export function calculateAverageReceipt(data, days) {
  const currentDate = new Date();
  const lastDaysDate = new Date(currentDate);
  lastDaysDate.setDate(lastDaysDate.getDate() - days);
  const previousDaysDate = new Date(lastDaysDate);
  previousDaysDate.setDate(previousDaysDate.getDate() - days);

  const lastDays = getDatesInInterval(lastDaysDate, currentDate);
  const previousDays = getDatesInInterval(previousDaysDate, lastDaysDate);

  const dataInLastDays = data.filter((item) => {
    const itemDate = new Date(item.date);
    return lastDays.some((date) => dateMatches(itemDate, date));
  });

  const dataInPreviousDays = data.filter((item) => {
    const itemDate = new Date(item.date);
    return previousDays.some((date) => dateMatches(itemDate, date));
  });

  const sumLastDays = dataInLastDays.reduce(
    (sum, item) => sum + item.forPay,
    0
  );
  const sumPreviousDays = dataInPreviousDays.reduce(
    (sum, item) => sum + item.forPay,
    0
  );
  const averageReceiptLastDays = sumLastDays / dataInLastDays.length;
  const averageReceiptPreviousDays =
    sumPreviousDays / dataInPreviousDays.length;

  const growthRate =
    ((averageReceiptLastDays - averageReceiptPreviousDays) /
      averageReceiptPreviousDays) *
    100;

  return {
    averageReceiptLastDays,
    growthRate,
  };
}

export function calculateGrowthPercentageGeo(data, days) {
  // Получаем текущую дату
  const currentDate = new Date();

  // Вычисляем дату days дней назад
  const pastDate = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);

  // Вычисляем сумму товаров за текущий период и предыдущий период
  let currentPeriodSum = 0;
  let pastPeriodSum = 0;

  data.forEach((item) => {
    // Преобразуем дату из строки в объект Date
    const itemDate = new Date(item.date);

    // Если дата товара попадает в текущий период
    if (itemDate >= pastDate && itemDate <= currentDate) {
      currentPeriodSum += item.finishedPrice;
    }

    // Если дата товара попадает в прошлый период
    if (itemDate < pastDate) {
      pastPeriodSum += item.finishedPrice;
    }
  });

  // Вычисляем процентный рост
  const growthPercentage =
    ((currentPeriodSum - pastPeriodSum) / pastPeriodSum) * 100;

  return growthPercentage;
}

export const areAllFieldsFilled = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
        return false;
      }
    }
  }
  return true;
};
export function useCookie(name) {
  const [value, setValue] = useState(() => {
    return Cookies.get(name) || null;
  });

  const deleteCookie = useCallback(() => {
    console.log(name);
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  useEffect(() => {
    const checkCookie = () => {
      const newValue = Cookies.get(name);
      if (newValue !== value) {
        setValue(newValue || null);
      }
    };

    // Check cookie value periodically
    const intervalId = setInterval(checkCookie, 1000);

    // Also check when the window regains focus
    window.addEventListener('focus', checkCookie);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', checkCookie);
    };
  }, [name, value]);

  return [value, deleteCookie];
}

export const formatFullDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const monthNames = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
};

export const getMonthNumbers = (monthArray) => {
  const monthNamesReverse = {};
  for (const [num, name] of Object.entries(monthNames)) {
    monthNamesReverse[name] = num;
  }

  return monthArray.map(monthName => monthNamesReverse[monthName]);
};

export const periodStringFormat = (period) => {
  /* TODO подумать про склонения или использовать date-fns */

  if (!period) {
    return '3 дня';
  }

  if (period >= 6) {
    return `${period} дней`;
  } else {
    return `${period} дня`;
  }

};

export const rangeApiFormat = (range) => {
  let params = '';
  if (range.period) {
    params += 'period=' + range.period;
  } else {
    params += `date_from=${range.from}`;
    params += `&date_to=${range.to}`;
  }
  return params;
};

export const fileDownload = (blob, title, setLoading) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', title);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  if (setLoading) {
    setLoading(false);
  }
};


export const chartYaxisMaxScale = (maxChartValue) => {
  let maxValue = Math.ceil(maxChartValue / 10) * 10;

  if (maxChartValue < 100) {
    maxValue = Math.ceil(maxChartValue / 10) * 10;
  }
  if (maxChartValue >= 100 && maxChartValue < 1000) {
    maxValue = Math.ceil(maxChartValue / 100) * 100;
  }
  if (maxChartValue >= 1000) {
    maxValue = Math.ceil(maxChartValue / 1000) * 1000;
  }

  return maxValue;
};


export function detectBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('firefox') > -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('chrome') > -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('safari') > -1) {
    return 'Safari';
  } else if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
    return 'Opera';
  } else if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1) {
    return 'Internet Explorer';
  } else {
    return 'Unknown';
  }
}

export const verticalDashedLinePlugin = {
  id: 'verticalDashedLine',
  beforeDraw: function (chart) {
    const enabled = chart?.config?._config?.options?.plugins?.verticalDashedLine?.enabled;
    if (chart.tooltip?._active && chart.tooltip._active.length && enabled) {
      const ctx = chart.ctx;
      ctx.save();
      const activePoint = chart.tooltip._active[0];
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.moveTo(activePoint.element.x, chart.chartArea.top);
      ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#8B8B8B';
      ctx.stroke();
      ctx.restore();
    }
  }
};

export function weeksList() {

    // Выборка дат с 2024-01-29
    const weeks = eachWeekOfInterval(
        {
            start: new Date(2024, 0, 29),
            end: Date.now(),
        },
        {
            weekStartsOn: 1,
        }
    );

    // удаляем последнюю неделю
    weeks.pop();

    const optionTemplate = (date) => {
        const weekValue = formatISO(date, { representation: 'date' });
        const weekStart = format(date, 'dd.MM.yyyy');
        const weekEnd = format(
            endOfWeek(date, { weekStartsOn: 1 }),
            'dd.MM.yyyy'
        );
        const weekNumber = getISOWeek(date);
        return {
            // key: weekNumber,
            value: weekValue,
            label: `${weekNumber} неделя (${weekStart} - ${weekEnd})`,
        };
    };
    return weeks.map((el, i) => optionTemplate(el)).reverse();
}

export function getSavedActiveWeeks(id) {
  const weeksListData = weeksList();
  let savedActiveWeeks = localStorage.getItem(`SAVED_ACTIVE_WEEKS_${id}`);
  if (savedActiveWeeks) {
    return JSON.parse(savedActiveWeeks);
  } else {
    return weeksListData.slice(0, 12);
  }
}

export const initialMonths = {
    month_to: dayjs().format('YYYY-MM'),
    month_from: dayjs().startOf('year').format('YYYY-MM')
};

export function getSavedActiveMonths(id) {
  let savedActiveMonths = localStorage.getItem('activeMonths');
  if (savedActiveMonths) {
    const data = JSON.parse(savedActiveMonths);
    if (id in data) {
      return data[id];
    }
    savedActiveMonths = initialMonths;
  } else {
    savedActiveMonths = initialMonths;
  }
  return savedActiveMonths;
}

export function log(...args) {
  if (location.hostname === 'localhost') {
    console.log(...args);
  }
}

/**
 * Сортирует массив результатов поиска по релевантности к поисковому запросу
 * @param {Array} items - Массив объектов для сортировки
 * @param {string} searchTerm - Поисковый запрос
 * @param {string} fieldName - Название поля объекта, по которому производится сортировка (по умолчанию 'name')
 * @returns {Array} - Отсортированный массив
 */
export function sortByRelevance(items, searchTerm, fieldName = 'name') {
  if (!searchTerm || !items || items.length === 0) {
    return items;
  }

  const searchLower = searchTerm.trim().toLowerCase();

  return [...items].sort((a, b) => {
    const nameA = (a[fieldName] || '').toLowerCase();
    const nameB = (b[fieldName] || '').toLowerCase();

    // 1. Точное совпадение - наивысший приоритет
    if (nameA === searchLower) return -1;
    if (nameB === searchLower) return 1;

    // 2. Начинается с искомой строки
    const startsWithA = nameA.startsWith(searchLower);
    const startsWithB = nameB.startsWith(searchLower);
    if (startsWithA && !startsWithB) return -1;
    if (startsWithB && !startsWithA) return 1;

    // 3. Совпадает с началом слова (после пробела)
    const wordStartA = nameA.includes(` ${searchLower}`);
    const wordStartB = nameB.includes(` ${searchLower}`);
    if (wordStartA && !wordStartB) return -1;
    if (wordStartB && !wordStartA) return 1;

    // 4. Позиция первого вхождения (чем раньше, тем лучше)
    const indexA = nameA.indexOf(searchLower);
    const indexB = nameB.indexOf(searchLower);
    if (indexA !== indexB) return indexA - indexB;

    // 5. По длине строки (короче = более релевантно)
    return nameA.length - nameB.length;
  });
};

/**
 * Склоняет слово в зависимости от числа
 * @param {Object|string} word - Объект с формами слова или просто слово
 * @param {number} count - Число для определения формы
 * @returns {string} - Слово в правильной форме с числом, например: "1 бренд", "2 бренда", "5 брендов"
 * 
 * @example
 * getWordDeclension({one: 'бренд', few: 'бренда', many: 'брендов'}, 1) // "1 бренд"
 * getWordDeclension({one: 'бренд', few: 'бренда', many: 'брендов'}, 2) // "2 бренда"
 * getWordDeclension({one: 'бренд', few: 'бренда', many: 'брендов'}, 5) // "5 брендов"
 */
export function getWordDeclension(word, count) {
  const wordObject = typeof word === 'object' ? word : {
    one: word,
    few: `${word}а`,
    many: `${word}ов`,
  };

  const num = Math.abs(count);
  const lastDigit = num % 10;

  // Склонение по последней цифре
  if (lastDigit === 1) {
    return wordObject.one;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return wordObject.few;
  } else {
    return wordObject.many;
  }
}