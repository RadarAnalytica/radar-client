export const getColor = (value) => {
  if (value >= 45) {
    return 'rgba(0, 182, 155, 1)';
  }
  if (value <= 25) {
    return 'rgba(249, 60, 101, 1)';
  }
  return 'rgba(240, 173, 0, 1)';
};

export const getFinanceData = (dataDashBoard) => {
  let financeData;

  if (dataDashBoard) {
    financeData = [
      {
        name: 'Выручка',
        amount: dataDashBoard?.proceeds || '0',
        rate: dataDashBoard?.proceedsCompare || '0',
      },
      {
        name: 'Валовая прибыль',
        amount: dataDashBoard?.grossProfit || '0',
        rate: dataDashBoard?.grossProfitCompare || '0',
      },
      {
        name: 'EBITDA',
        amount: dataDashBoard?.ebitda || '0',
        rate: dataDashBoard?.ebitda_compare || '0',
      },
      {
        name: 'Маржа EBITDA',
        amount: dataDashBoard?.ebitda_margin || '0',
        rate: dataDashBoard?.ebitda_margin_compare || '0',
      },
      {
        name: 'Чистая прибыль',
        amount: dataDashBoard?.netProfit || '0',
        rate: dataDashBoard?.netProfitCompare || '0',
      },
      // {
      //   name: 'Себестоимость продаж',
      //   amount: dataDashBoard?.costPriceAmount || '0',
      //   rate: dataDashBoard?.costPriceAmountCompare,
      // },
      // {
      //   name: 'Маржинальная стоимость',
      //   amount: dataDashBoard?.marginalProfit || '0',
      //   rate: dataDashBoard?.marginalProfitCompare || '0',
      // },
      // {
      //   name: "Налог",
      //   amount: dataDashBoard?.tax || "0",
      //   rate: dataDashBoard?.taxCompare || "0",
      // },
      // {
      //   name: "Средняя прибыль",
      //   amount: dataDashBoard?.averageProfit || "0",
      //   rate: dataDashBoard?.averageProfitCompare || "0",
      // },
    ];
  }


  return financeData;
};

export const getProfitData = (dataDashBoard) => {
  let profitData;

  if (dataDashBoard) {
    profitData = [
      {
        name: 'Процент выкупа',
        value: dataDashBoard?.buyoutPercent || '0',
      },
      {
        name: 'ROI',
        value: dataDashBoard?.roi || '0',
      },
      {
        name: 'Рентабельность ВП',
        value: dataDashBoard?.grossProfitAbility || '0',
      },
      {
        name: 'Рентабельность ОП',
        value: dataDashBoard?.operatingProfitAbility || '0',
      },
    ];
  }

  return profitData;
};

export const getCostsData = (dataDashBoard) => {
  let costsData;

  if (dataDashBoard) {
    costsData = [
      {
        name: 'Реклама (ДРР (общий))',
        amount: dataDashBoard?.advertAmount || '0',
        percent: dataDashBoard?.advertAmountCompare || '0',
        percentRate: dataDashBoard?.advertPercent || '0',
        percentRate2: dataDashBoard?.advertPercentCompare || '0',
      },
      {
        name: 'Комиссия (от выручки)',
        amount: dataDashBoard?.commissionWB || '0',
        percent:dataDashBoard?.commissionWBCompare || '0',
        percentRate2:dataDashBoard?.commissionWBPercentCompare || '0',
        percentRate: dataDashBoard?.commissionWBPercent || '0',
      },
      {
        name: 'Логистика (от выручки)',
        amount: dataDashBoard?.logistics || '0',
        percent: dataDashBoard?.logisticsCompare || '0',
        percentRate2: dataDashBoard?.logisticsPercentCompare || '0',
        percentRate:  dataDashBoard?.logisticsPercent || '0',
      },
    ];
  }

  return costsData;
};

export const getStorageData = (dataDashBoard) => {
  let storageData;

  if (dataDashBoard) {
    storageData = [
      {
        name: 'FBO',
        initialPrice: dataDashBoard?.fbo ? dataDashBoard?.fbo?.cost_amount : '0',
        salesPrice: dataDashBoard?.fbo ? dataDashBoard.fbo?.retail_amount : '0',
        quantity: dataDashBoard?.fbo ? dataDashBoard.fbo?.count : '0',
      },
      {
        name: 'FBS',
        initialPrice: dataDashBoard?.fbs?.cost_amount,
        salesPrice: dataDashBoard?.fbs?.retail_amount,
        quantity: dataDashBoard?.fbs?.count || 0,
      },
      {
        name: 'Едет к клиенту',
        initialPrice: dataDashBoard?.toClient?.cost_amount,
        salesPrice: dataDashBoard?.toClient?.retail_amount,
        quantity: dataDashBoard?.toClient?.count || 0,
      },
      {
        name: 'Едет от клиента',
        initialPrice: dataDashBoard?.fromClient?.cost_amount,
        salesPrice: dataDashBoard?.fromClient?.retail_amount,
        quantity: dataDashBoard?.fromClient?.count || 0,
      },
      // {
      //   name: "Не распределено",
      //   initialPrice: wbData?.stocks?.data?.reduce(
      //     (acc, el) =>
      //       acc +
      //       el.quantity *
      //         stockAndCostsMatch?.find((item) => item.nmID === el.nmId)
      //           ?.initialCosts,
      //     0
      //   ),
      //   salesPrice: content?.notSorted?.sum,
      //   quantity: content?.notSorted?.amount,
      // },
    ];
  }

  return storageData;
};

export const processSalesAndProfit = (salesAndProfit) => {
  if (!salesAndProfit || !salesAndProfit.length) return {
    labels: undefined,
    dataRevenue: undefined,
    dataNetProfit: undefined,
    minDataRevenueL: undefined,
    maxDataRevenue: undefined,
    stepSizeRevenue: undefined
  };

  const labels = salesAndProfit.map(item =>
    new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  );
  const dataRevenue = salesAndProfit.map(item => item.sales);
  const dataNetProfit = salesAndProfit.map(item => item.profit);

  const minDataRevenue = Math.floor(Math.min(...dataRevenue) / 1000) * 1000;
  const maxDataRevenue = Math.ceil(Math.max(...dataRevenue) / 1000) * 1000;
  const stepSizeRevenue = Math.ceil((maxDataRevenue - minDataRevenue) / 10);

  return {
    labels,
    dataRevenue,
    dataNetProfit,
    minDataRevenue,
    maxDataRevenue,
    stepSizeRevenue
  };
};


export const processMarginalityRoiChart = (marginalityRoiChart) => {
  if (!marginalityRoiChart || marginalityRoiChart.length === 0) {
    return {
      dataProfitability: [],
      dataProfitPlus: [],
      dataProfitMinus: [],
      isLoading: false,
      labels: [],
      step: 10,
      minValue: 0,
      maxValue: 50
    };
  }

  const roiValues = marginalityRoiChart.map(item => item.roi);
  const marginalityValues = marginalityRoiChart.map(item => item.marginality);

  const minValue = Math.floor(Math.min(...roiValues, ...marginalityValues) / 10) * 10;
  const maxValue = Math.ceil(Math.max(...roiValues, ...marginalityValues) / 10) * 10;

  // Динамический шаг
  const step = Math.ceil((maxValue - minValue) / 5);

  // Форматирование дат
  const labels = marginalityRoiChart.map(item =>
    new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  );

  return {
    dataProfitability: roiValues,
    dataProfitPlus: marginalityValues,
    dataProfitMinus: marginalityValues.map(() => 0),
    isLoading: false,
    labels,
    step,
    minValue,
    maxValue
  };
};


export const processRevenueData = (revenueByWarehouse) => {
  if (!revenueByWarehouse || !revenueByWarehouse.length) return {
    labels: undefined,
    dataRevenueStorage: undefined,
    isLoading: false,
    max: undefined,
  };

  // Собираем метки и округляем выручку
  const labels = revenueByWarehouse.map(item => item.name);
  // console.log(labels.length, "labelsWarehouse")
  const dataRevenueStorage = revenueByWarehouse.map(item => item.revenue); // Округляем выручку

  // Находим минимальное и максимальное значение выручки, округляя их

  const max = Math.ceil(Math.max(...dataRevenueStorage) / 1000) * 1000; // Округляем максимальное значение до 1000

  // Вычисляем шаг для оси Y
  // const stepSizeRevenue = Math.ceil((maxRevenue ) / 10);

  return {
    labels,
    dataRevenueStorage,
    isLoading: false,
    max,
    // stepSizeRevenue,
  };
};

export const processStructureData = (structure) => {
  if (!structure) return null;
  const structureValues = Object.values(structure);
  return structureValues;
};
