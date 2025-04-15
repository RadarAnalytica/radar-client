export const getColor = (value) => {
    if (value >= 45) {
        return 'rgba(0, 182, 155, 1)'
    }
    if (value <= 25) {
        return 'rgba(249, 60, 101, 1)'
    }
    return 'rgba(240, 173, 0, 1)'
}

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
                name: 'Себестоимость продаж',
                amount: dataDashBoard?.costPriceAmount || '0',
                rate: dataDashBoard?.costPriceAmountCompare,
            },
            {
                name: 'Маржинальная стоимость',
                amount: dataDashBoard?.marginalProfit || '0',
                rate: dataDashBoard?.marginalProfitCompare || '0',
            },
            {
                name: 'Валовая прибыль',
                amount: dataDashBoard?.grossProfit || '0',
                rate: dataDashBoard?.grossProfitCompare || '0',
            },
            // {
            //   name: "Налог",
            //   amount: dataDashBoard?.tax || "0",
            //   rate: dataDashBoard?.taxCompare || "0",
            // },
            {
                name: 'Чистая прибыль',
                amount: dataDashBoard?.netProfit || '0',
                rate: dataDashBoard?.netProfitCompare || '0',
            },
            // {
            //   name: "Средняя прибыль",
            //   amount: dataDashBoard?.averageProfit || "0",
            //   rate: dataDashBoard?.averageProfitCompare || "0",
            // },
        ];
    }


    return financeData
}

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

    return profitData
}

export const processSalesAndProfit = (salesAndProfit) => {
    if (!salesAndProfit || !salesAndProfit.length) return null;

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
