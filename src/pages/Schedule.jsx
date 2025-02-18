import styles from './Schedule.module.css';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import BigChart from '../components/BigChart';
import ScheduleBigChart from '../components/ScheduleBigChart';
import ScheduleProfitabilityBigChart from '../components/ScheduleProfitabilityChart';
import StructureRevenue from '../components/StructureRevenue';
import RevenueStorageChart from '../components/RevenueStorageChart';
import BottomNavigation from '../components/BottomNavigation';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/schedule-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup'


const Schedule = () => {
  const { authToken, user } = useContext(AuthContext);

  // const user = {
  //   id: 2,
  //   role: 'admin',
  //   is_confirmed: true,
  //   is_onboarded: true,
  //   is_test_used: false,
  //   email: 'modinsv@yandex.ru',
  //   subscription_status: 'Smart',
  //   is_report_downloaded: !null,
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxWarehouse, setMaxWarehouse] = useState(0);
  const [minProfitability, setMinProfitability] = useState(0);
  const [maxProfitability, setMaxProfitability] = useState(0);
  const [stepProfitability, setStepProfitability] = useState(0);
  //data for charts
  const [dataRevenueStorage, setDataRevenueStorage] = useState([
    0, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
  ]);

  const [dataStructureRevenue, setDataStructureRevenue] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [dataProfitability, setDataProfitability] = useState([]);
  const [dataProfitMinus, setDataProfitMinus] = useState([]);
  const [dataProfitPlus, setDataProfitPlus] = useState([]);
  const [dataRevenue, setDataRevenues] = useState([]);
  const [dataNetProfit, setDataNetProfit] = useState([]);

  const [bigChartLabels, setBigChartLabels] = useState([
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Ноя',
    'Дек',
  ]);
  const [dataRevenueStorageLabels, setDataRevenueStorageLabels] = useState([
    'Коледино',
    'Тула',
    'Казань',
    'Санкт-Петербург Уткина Заводь',
    'Невинномысск',
    'Екатеринбург-Перспективный',
    'Астана',
    'Атакент',
    'СЦ Кузнецк',
    'Пушкино',
    'Обухово 2',
    'Вёшки',
  ]);

  const [minDataRevenue, setMinDataRevenue] = useState(10000);
  const [maxDataRevenue, setMaxDataRevenue] = useState(50000);
  const [stepSizeRevenue, setStepSizeRevenue] = useState(10000);
  //data for filters
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [allSelectedProducts, setAllSelectedProducts] = useState(true);
  const [allSelectedArticles, setAllSelectedArticles] = useState(true);
  const [allSelectedGroups, setAllSelectedGroups] = useState(true);
  const [allSelectedWeeks, setAllSelectedWeeks] = useState(true);
  const [allSelectedMonths, setAllSelectedMonths] = useState(true);
  const [allSelectedYears, setAllSelectedYears] = useState(true);
  const [allSelectedBrands, setAllSelectedBrands] = useState(true);

  const [selectedBrands, setSelectedBrands] = useState({});

  const [selectedYears, setSelectedYears] = useState({});

  const [selectedMonths, setSelectedMonths] = useState({});
  const [selectedWeeks, setSelectedWeeks] = useState({});
  const [selectedGroups, setSelectedGroups] = useState({});
  const [selectedArticles, setSelectedArticles] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const filterKeys = [
    'selectedYears',
    'selectedMonths',
    'selectedArticles',
    'selectedBrands',
    'selectedGroups',
    'selectedWeeks',
  ];

  const transformFilters = (data) => {
    return {
      setSelectedBrands: Object.fromEntries(
        data.brand_name_filter.map((brand) => [brand, true])
      ),
      setSelectedArticles: Object.fromEntries(
        data.wb_id_filter.map((id) => [id, true])
      ),
      setSelectedGroups: Object.fromEntries(
        data.groups_filter.map((group) => [group, true])
      ),
      setSelectedYears: Object.fromEntries(
        data.date_sale_filter.years.map((year) => [year, true])
      ),
      setSelectedMonths: Object.fromEntries(
        data.date_sale_filter.months.map((month) => [month, true])
      ),
      setSelectedWeeks: Object.fromEntries(
        data.date_sale_filter.weekdays.map((weekday) => [weekday, true])
      ),
    };
  };
  const maxRows = useMemo(() => {
    const datasets = [
      selectedBrands,
      selectedYears,
      selectedMonths,
      selectedWeeks,
      selectedGroups,
      selectedArticles,
    ];
    return Math.max(
      ...datasets.map((dataset) =>
        Object.keys(dataset).filter((key) => dataset[key] !== 'пусто' && key !== '0').length
      )
    );
  }, [
    selectedBrands,
    selectedYears,
    selectedMonths,
    selectedWeeks,
    selectedGroups,
    selectedArticles,
  ]);
  const rowHeight = 30;
  const maxVisibleRows = 5;
  const containerHeight = Math.min(maxRows, maxVisibleRows) * rowHeight;


  useEffect(() => {
    const fetchData = async () => {
      await updateFilterFields();
      updateScheduleChartData();
    };
    fetchData();
  }, []);


  const updateFilterFields = async () => {
    setIsLoading(true);
    try {
      const data = await ServiceFunctions.scheduleFilterFields(authToken);
      const transformedFilters = transformFilters(data);

      const setterKeyMap = {
        selectedBrands: 'setSelectedBrands',
        selectedYears: 'setSelectedYears',
        selectedMonths: 'setSelectedMonths',
        selectedArticles: 'setSelectedArticles',
        selectedGroups: 'setSelectedGroups',
        selectedWeeks: 'setSelectedWeeks',
      };

      const setters = {
        selectedYears: setSelectedYears,
        selectedMonths: setSelectedMonths,
        selectedArticles: setSelectedArticles,
        selectedBrands: setSelectedBrands,
        selectedGroups: setSelectedGroups,
        selectedWeeks: setSelectedWeeks,
      };

      filterKeys.forEach((key) => {
        const transformedValue = transformedFilters[setterKeyMap[key]];
        const storedValue = localStorage.getItem(key);
        const parsedStoredValue = storedValue ? JSON.parse(storedValue) : {};

        if (transformedValue) {
          // Filter out keys from parsedStoredValue that are not in transformedValue
          const filteredStoredValue = Object.keys(parsedStoredValue).reduce((acc, k) => {
            if (transformedValue.hasOwnProperty(k)) {
              acc[k] = parsedStoredValue[k];
            }
            return acc;
          }, {});

          // Merge transformedValue and filteredStoredValue
          setters[key]({ ...transformedValue, ...filteredStoredValue });
        } else if (Object.keys(parsedStoredValue).length > 0) {
          setters[key]({});
        }
      });
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const updateFilterFields = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Fetch and transform filter data
  //     const data = await ServiceFunctions.scheduleFilterFields(authToken);
  //     console.log('data', data);
  //     const transformedFilters = transformFilters(data);
  //     console.log('transformedFilters', transformedFilters);

  //     // Mapping of filter keys to their corresponding setters
  //     const setters = {
  //       selectedYears: setSelectedYears,
  //       selectedMonths: setSelectedMonths,
  //       selectedArticles: setSelectedArticles,
  //       selectedBrands: setSelectedBrands,
  //       selectedGroups: setSelectedGroups,
  //       selectedWeeks: setSelectedWeeks,
  //     };

  //     // Automatically update the state for each filter key
  //     filterKeys.forEach((key) => {
  //       const transformedValue = transformedFilters[key];
  //       const storedValue = localStorage.getItem(key);

  //       if (storedValue) {
  //         const parsedStoredValue = JSON.parse(storedValue);

  //         // Merge stored data with transformed data if both exist
  //         if (Object.keys(parsedStoredValue).length > 0) {
  //           // Call the setter function dynamically
  //           setters[key]({
  //             ...transformedValue,
  //             ...parsedStoredValue,
  //           });
  //         } else {
  //           setters[key](transformedValue);
  //         }
  //       } else {
  //         setters[key](transformedValue);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Ошибка при загрузке данных:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const calculateSize = (min, max) => {
    let range = Math.abs(max - min);
    return Math.ceil(range / 5 / 500) * 500;
  };

  // const revenueAndProfit = (data, filter) => {
  //   if (
  //     (filter.date_sale_filter.months.length === 1 &&
  //       filter.date_sale_filter.years.length === 1 &&
  //       filter.date_sale_filter.weekdays.length === 1) ||
  //     (filter.date_sale_filter.months.length === 1 &&
  //       filter.date_sale_filter.years.length === 0 &&
  //       filter.date_sale_filter.weekdays.length === 1) ||
  //     (filter.date_sale_filter.months.length === 0 &&
  //       filter.date_sale_filter.years.length === 0 &&
  //       filter.date_sale_filter.weekdays.length === 1) ||
  //     (filter.date_sale_filter.months.length === 0 &&
  //       filter.date_sale_filter.years.length === 1 &&
  //       filter.date_sale_filter.weekdays.length === 1)
  //   ) {
  //     const dailyRevenueArray = [];
  //     const dailyProfitArray = [];
  //     const dayTitlesArray = [];

  //     const year = Object.keys(data.revenue_and_profit)[0];
  //     const months = data.revenue_and_profit[year];
  //     const selectedWeekdayNames = filter.date_sale_filter.weekdays;

  //     for (const month in months) {
  //       const weeks = months[month].weeks;
  //       for (const week in weeks) {
  //         if (selectedWeekdayNames.includes(week)) {
  //           const days = weeks[week].days;
  //           for (const day in days) {
  //             const dayData = days[day];
  //             dayTitlesArray.push(day);
  //             dailyRevenueArray.push(dayData.revenue || 0);
  //             dailyProfitArray.push(dayData.profit || 0);
  //           }
  //         }
  //       }
  //     }

  //     const min =
  //       Math.floor(
  //         Math.min(
  //           Math.min(...dailyRevenueArray),
  //           Math.min(...dailyProfitArray)
  //         ) / 1000
  //       ) * 1000;
  //     const max =
  //       Math.ceil(
  //         Math.max(
  //           Math.max(...dailyRevenueArray),
  //           Math.max(...dailyProfitArray)
  //         ) / 1000
  //       ) * 1000;
  //     setMinDataRevenue(min);
  //     setMaxDataRevenue(max);
  //     setStepSizeRevenue(calculateSize(min, max));
  //     setDataRevenues(dailyRevenueArray);
  //     setDataNetProfit(dailyProfitArray);
  //     setBigChartLabels(dayTitlesArray);
  //   } else if (
  //     (filter.date_sale_filter.months.length === 1 &&
  //       filter.date_sale_filter.years.length === 1) ||
  //     (filter.date_sale_filter.months.length === 1 &&
  //       filter.date_sale_filter.years.length === 0) ||
  //     (filter.date_sale_filter.months.length === 0 &&
  //       filter.date_sale_filter.years.length === 0 &&
  //       filter.date_sale_filter.weekdays.length > 0)
  //   ) {
  //     const weekRevenueArray = [];
  //     const weekProfitArray = [];
  //     const weekDatesArray = [];

  //     const year = Object.keys(data.revenue_and_profit)[0];
  //     const months = data.revenue_and_profit[year];

  //     for (const month in months) {
  //       const index = monthNames.indexOf(month);
  //       const monthIndex = index !== -1 ? index + 1 : null;
  //       const weeks = months[month]?.weeks;
  //       if (
  //         weeks &&
  //         (filter.date_sale_filter.months.includes(monthIndex.toString()) ||
  //           filter.date_sale_filter.months.length === 0)
  //       ) {
  //         for (const week in weeks) {
  //           if (
  //             (filter.date_sale_filter.weekdays.includes(week) &&
  //               filter.date_sale_filter.weekdays.length > 0) ||
  //             filter.date_sale_filter.weekdays.length === 0
  //           ) {
  //             const weekData = weeks[week];
  //             weekDatesArray.push(week);
  //             weekRevenueArray.push(weekData.total_week_revenue || 0);
  //             weekProfitArray.push(weekData.total_week_profit || 0);
  //           }
  //         }
  //       }
  //     }
  //     const min =
  //       Math.floor(
  //         Math.min(
  //           Math.min(...weekRevenueArray),
  //           Math.min(...weekProfitArray)
  //         ) / 1000
  //       ) * 1000;
  //     const max =
  //       Math.ceil(
  //         Math.max(
  //           Math.max(...weekRevenueArray),
  //           Math.max(...weekProfitArray)
  //         ) / 1000
  //       ) * 1000;
  //     // console.log(min, max, weekProfitArray, weekRevenueArray, weekDatesArray)
  //     setMinDataRevenue(min);
  //     setMaxDataRevenue(max);
  //     setStepSizeRevenue(calculateSize(min, max));
  //     setDataRevenues(weekRevenueArray);
  //     setDataNetProfit(weekProfitArray);
  //     setBigChartLabels(weekDatesArray);
  //   } else {
  //     const revenueArray = [];
  //     const profitArray = [];
  //     const monthNamesArray = [];

  //     const monthNameMap = {
  //       Январь: 'Янв',
  //       Февраль: 'Фев',
  //       Март: 'Мар',
  //       Апрель: 'Апр',
  //       Май: 'Май',
  //       Июнь: 'Июн',
  //       Июль: 'Июл',
  //       Август: 'Авг',
  //       Сентябрь: 'Сен',
  //       Октябрь: 'Окт',
  //       Ноябрь: 'Ноя',
  //       Декабрь: 'Дек',
  //     };
  //     const rev_profit = data.revenue_and_profit;
  //     for (const year in rev_profit) {
  //       const months = rev_profit[year];
  //       for (const month in months) {
  //         const index = monthNames.indexOf(month);
  //         const monthIndex = index !== -1 ? index + 1 : null;
  //         if (
  //           filter.date_sale_filter.months.length === 0 ||
  //           filter.date_sale_filter.months.includes(monthIndex.toString())
  //         ) {
  //           const monthData = months[month];
  //           revenueArray.push(monthData.total_month_revenue || 0);
  //           profitArray.push(monthData.total_month_profit || 0);
  //           monthNamesArray.push(monthNameMap[month] || month);
  //         }
  //       }
  //     }
  //     const min =
  //       Math.floor(
  //         Math.min(Math.min(...revenueArray), Math.min(...profitArray)) / 1000
  //       ) * 1000;
  //     const max =
  //       Math.ceil(
  //         Math.max(Math.max(...revenueArray), Math.max(...profitArray)) / 1000
  //       ) * 1000;
  //     setMinDataRevenue(min);
  //     setMaxDataRevenue(max);
  //     setStepSizeRevenue(calculateSize(min, max));
  //     setDataRevenues(revenueArray);
  //     setDataNetProfit(profitArray);
  //     setBigChartLabels(monthNamesArray);
  //   }
  // };
  const revenueAndProfit = (data, filter) => {
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const monthNameMap = {
      Январь: "Янв",
      Февраль: "Фев",
      Март: "Мар",
      Апрель: "Апр",
      Май: "Май",
      Июнь: "Июн",
      Июль: "Июл",
      Август: "Авг",
      Сентябрь: "Сен",
      Октябрь: "Окт",
      Ноябрь: "Ноя",
      Декабрь: "Дек",
    };

    const { years, months, weekdays } = filter.date_sale_filter;

    let revenueArray = [];
    let profitArray = [];
    let labelsArray = [];

    const rev_profit = data.revenue_and_profit;

    // 1. Если ничего не выбрано, показываем все месяцы
    if (years.length === 0 && months.length === 0 && weekdays.length === 0) {
      for (const year in rev_profit) {
        const monthsData = rev_profit[year];
        for (const month in monthsData) {
          const monthData = monthsData[month];
          revenueArray.push(monthData.total_month_revenue || 0);
          profitArray.push(monthData.total_month_profit || 0);
          labelsArray.push(monthNameMap[month] || month);
        }
      }
    }

    // 2. Если выбран только год, показываем все месяцы этого года
    else if (years.length === 1 && months.length === 0 && weekdays.length === 0) {
      const selectedYear = years[0];
      const monthsData = rev_profit[selectedYear] || {}; // Проверяем наличие данных за выбранный год
      for (const month in monthsData) {
        const monthData = monthsData[month];
        revenueArray.push(monthData.total_month_revenue || 0);
        profitArray.push(monthData.total_month_profit || 0);
        labelsArray.push(monthNameMap[month] || month);
      }
    }

    // 3. Если выбран год и месяц, показываем этот месяц
    else if (years.length === 1 && months.length === 1) {
      const selectedYear = years[0];
      const selectedMonthIndex = parseInt(months[0]) - 1;
      const selectedMonthName = monthNames[selectedMonthIndex];
      const monthData =
        rev_profit[selectedYear]?.[selectedMonthName] || {};

      revenueArray = [monthData.total_month_revenue || 0];
      profitArray = [monthData.total_month_profit || 0];
      labelsArray = [selectedMonthName];
    }

    // 4. Если выбран год и несколько месяцев, показываем эти месяцы
    else if (years.length === 1 && months.length > 1) {
      const selectedYear = years[0];
      const monthsData = rev_profit[selectedYear] || {};
      months.forEach((monthIndex) => {
        const monthName = monthNames[parseInt(monthIndex) - 1];
        const monthData = monthsData[monthName] || {};
        revenueArray.push(monthData.total_month_revenue || 0);
        profitArray.push(monthData.total_month_profit || 0);
        labelsArray.push(monthNameMap[monthName] || monthName);
      });
    }

    // 5. Если год не выбран, но выбраны месяцы
    else if (years.length === 0 && months.length > 0) {
      for (const year in rev_profit) {
        const monthsData = rev_profit[year];
        months.forEach((monthIndex) => {
          const monthName = monthNames[parseInt(monthIndex) - 1];
          const monthData = monthsData[monthName] || {};
          revenueArray.push(monthData.total_month_revenue || 0);
          profitArray.push(monthData.total_month_profit || 0);
          labelsArray.push(monthNameMap[monthName] || monthName);
        });
      }
    }

    // 6. Если выбран год и неделя, показываем месяц этой недели
    else if (years.length === 1 && weekdays.length > 0) {
      const selectedYear = years[0];
      const monthsData = rev_profit[selectedYear] || {};
      const selectedWeeks = weekdays; // Список выбранных недель

      // Ищем месяц для каждой выбранной недели
      selectedWeeks.forEach((week) => {
        for (const month in monthsData) {
          const monthData = monthsData[month];
          const weekData = monthData.weeks[week]; // Данные по неделе
          if (weekData) {
            revenueArray.push(monthData.total_month_revenue || 0);
            profitArray.push(monthData.total_month_profit || 0);
            labelsArray.push(monthNameMap[month] || month);
          }
        }
      });
    }

    // 7. Если выбран только месяц, показываем один месяц
    else if (years.length === 0 && months.length === 1) {
      const selectedMonthIndex = parseInt(months[0]) - 1;
      const selectedMonthName = monthNames[selectedMonthIndex];
      for (const year in rev_profit) {
        const monthsData = rev_profit[year];
        const monthData = monthsData[selectedMonthName] || {};
        revenueArray.push(monthData.total_month_revenue || 0);
        profitArray.push(monthData.total_month_profit || 0);
        labelsArray.push(monthNameMap[selectedMonthName] || selectedMonthName);
      }
    }

    else if (years.length === 0 && months.length === 0 && weekdays.length > 0) {
      console.log("Entering week-only case");
      const selectedWeeks = weekdays; // Список выбранных недель
      const monthNames = selectedWeeks.map(date => {
        const monthIndex = new Date(date).getMonth(); // Get month index (0-11)
        const months = [
          'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
          'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        return months[monthIndex];
      });
      for (const year in rev_profit) {
        const monthsData = rev_profit[year];
        for (const month in monthsData) {
          const monthData = monthsData[month];
          if (monthNames.includes(month)) {
            revenueArray.push(monthData.total_month_revenue || 0);
            profitArray.push(monthData.total_month_profit || 0);
            labelsArray.push(monthNameMap[month] || month);
          }
        }
      }
      console.log("Revenue Array:", revenueArray);
      console.log("Profit Array:", profitArray);
      console.log("Labels Array:", labelsArray);
    }


    // Расчет min, max, и обновление графика
    const min = Math.floor(
      Math.min(...revenueArray, ...profitArray) / 1000
    ) * 1000;
    const max = Math.ceil(
      Math.max(...revenueArray, ...profitArray) / 1000
    ) * 1000;

    setMinDataRevenue(min);
    setMaxDataRevenue(max);
    setStepSizeRevenue(calculateSize(min, max));
    setDataRevenues(revenueArray);
    setDataNetProfit(profitArray);
    setBigChartLabels(labelsArray);
  };


  const roiAndMarginality = (data, filter) => {
    console.log(filter.date_sale_filter, "data");

    if (
      (filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1) ||
      (filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1) ||
      (filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1) ||
      (filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1)
    ) {
      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];
      const monthNamesArray = [];

      const year = Object.keys(data.roi_and_marginality)[0];
      const months = data.roi_and_marginality[year];
      const selectedWeekdayNames = filter.date_sale_filter.weekdays;


      for (const month in months) {
        const monthData = months[month];

        if (
          (filter.date_sale_filter.months.includes(monthNames.indexOf(month) + 1) ||
            filter.date_sale_filter.months.length === 0)
        ) {
          marginalityLow.push(monthData.min_month_marginality || 0);
          marginalityHigh.push(monthData.max_month_marginality || 0);
          roiArray.push(monthData.average_month_roi || 0);
          monthNamesArray.push(month);
        }
      }

      const arr = [...marginalityLow, ...marginalityHigh, ...roiArray];
      const minVal = Math.min(...arr);
      const maxVal = Math.max(...arr);
      const min = Math.floor(minVal / 100) * 100;
      const max = Math.ceil(maxVal / 100) * 100;

      setMinProfitability(min);
      setMaxProfitability(max);
      setStepProfitability(calculateSize(min, max));

      setDataProfitMinus(marginalityLow);
      setDataProfitPlus(marginalityHigh);
      setDataProfitability(roiArray);
    } else if (
      (filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1) ||
      (filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0) ||
      (filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length > 0)
    ) {
      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];
      const monthNamesArray = [];

      const year = Object.keys(data.roi_and_marginality)[0];
      const months = data.roi_and_marginality[year];

      // Loop through months and extract data for selected filters
      for (const month in months) {
        const monthData = months[month];
        const index = monthNames.indexOf(month);
        const monthIndex = index !== -1 ? index + 1 : null;
        if (
          (filter.date_sale_filter.months.includes(monthIndex.toString()) ||
            filter.date_sale_filter.months.length === 0)
        ) {
          marginalityLow.push(monthData.min_month_marginality || 0);
          marginalityHigh.push(monthData.max_month_marginality || 0);
          roiArray.push(monthData.average_month_roi || 0);
          monthNamesArray.push(month);
        }
      }

      const arr = [...marginalityLow, ...marginalityHigh, ...roiArray];
      const minVal = Math.min(...arr);
      const maxVal = Math.max(...arr);
      const min = Math.floor(minVal / 100) * 100;
      const max = Math.ceil(maxVal / 100) * 100;

      setMinProfitability(min);
      setMaxProfitability(max);
      setStepProfitability(calculateSize(min, max));

      setDataProfitMinus(marginalityLow);
      setDataProfitPlus(marginalityHigh);
      setDataProfitability(roiArray);
    } else {
      const monthNamesArray = [];
      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];

      const monthNameMap = {
        Январь: 'Янв',
        Февраль: 'Фев',
        Март: 'Мар',
        Апрель: 'Апр',
        Май: 'Май',
        Июнь: 'Июн',
        Июль: 'Июл',
        Август: 'Авг',
        Сентябрь: 'Сен',
        Октябрь: 'Окт',
        Ноябрь: 'Ноя',
        Декабрь: 'Дек',
      };
      const rev_profit = data.roi_and_marginality;

      // Loop through months and extract data for no filter or selected months
      for (const year in rev_profit) {
        const months = rev_profit[year];
        for (const month in months) {
          const index = monthNames.indexOf(month);
          const monthIndex = index !== -1 ? index + 1 : null;
          if (
            filter.date_sale_filter.months.length === 0 ||
            filter.date_sale_filter.months.includes(monthIndex.toString())
          ) {
            const monthData = months[month];
            marginalityLow.push(monthData.min_month_marginality || 0);
            marginalityHigh.push(monthData.max_month_marginality || 0);
            roiArray.push(monthData.average_month_roi || 0);
            monthNamesArray.push(monthNameMap[month] || month);
          }
        }
      }

      const arr = [...marginalityLow, ...marginalityHigh, ...roiArray];
      const minVal = Math.min(...arr);
      const maxVal = Math.max(...arr);
      const min = Math.floor(minVal / 100) * 100;
      const max = Math.ceil(maxVal / 100) * 100;

      setMinProfitability(min);
      setMaxProfitability(max);
      setStepProfitability(calculateSize(min, max));

      setDataProfitMinus(marginalityLow);
      setDataProfitPlus(marginalityHigh);
      setDataProfitability(roiArray);
    }
  };


  const updateScheduleChartData = useCallback(async () => {
    setIsChartsLoading(true);
    setError(null);

    try {

      const storageItem = localStorage.getItem('charts')
      let currentPageData = JSON.parse(storageItem)
      currentPageData = currentPageData ? currentPageData : {}
      // console.log('currentPageData', currentPageData);

      const filter = {
        brand_name_filter: currentPageData.brand,
        wb_id_filter: currentPageData.wbId,
        groups_filter: currentPageData.group,
        date_sale_filter: {
          years: currentPageData.year,
          months: currentPageData.month,
          weekdays: currentPageData.week,
        },
        // brand_name_filter: Object.keys(selectedBrands).filter(
        //   (key) => selectedBrands[key]
        // ),
        // wb_id_filter: Object.keys(selectedArticles).filter(
        //   (key) => selectedArticles[key]
        // ),
        // groups_filter: Object.keys(selectedGroups).filter(
        //   (key) => selectedGroups[key]
        // ),
        // date_sale_filter: {
        //   years: Object.keys(selectedYears).filter((key) => selectedYears[key]),
        //   months: Object.keys(selectedMonths).filter(
        //     (key) => selectedMonths[key]
        //   ),
        //   weekdays: Object.keys(selectedWeeks).filter(
        //     (key) => selectedWeeks[key]
        //   ),
        // },
      };

      const data = await ServiceFunctions.scheduleFilterChartData(
        authToken,
        filter
      );

      setDataStructureRevenue([
        data?.structure?.all_retentions_percent || 0,
        data?.structure?.external_expenses_percent || 0,
        data?.structure?.tax_percent || 0,
        data?.structure?.profit_percent || 0,
        data?.structure?.cost_percent || 0,
      ]);

      revenueAndProfit(data, filter);
      roiAndMarginality(data, filter);
      if (data?.revenue_by_warehouse) {
        setDataRevenueStorage(Object.values(data.revenue_by_warehouse));
        const filteredKeys = Object.keys(data.revenue_by_warehouse).filter(
          (key) => key !== 'null'
        );
        setDataRevenueStorageLabels(filteredKeys);
        // setDataRevenueStorageLabels(Object.keys(data.revenue_by_warehouse));
        const revenueValues = Object.values(data.revenue_by_warehouse);
        const maxRevenue = Math.max(...revenueValues);
        const roundedStepSize = Math.ceil(maxRevenue / 1000) * 1000;
        setMaxWarehouse(roundedStepSize);
      }

      setIsChartsLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setIsChartsLoading(false);
    }
  }, [authToken]);

  const toggleCheckboxBrands = (brand) => {
    setSelectedBrands((prevState) => ({
      ...prevState,
      [brand]: !prevState[brand],
    }));
  };
  const toggleCheckboxYear = (year) => {
    setSelectedYears((prevState) => ({
      ...prevState,
      [year]: !prevState[year],
    }));
  };
  const toggleCheckboxMonth = (month) => {
    setSelectedMonths((prevState) => ({
      ...prevState,
      [month]: !prevState[month],
    }));
  };
  const toggleCheckboxWeek = (week) => {
    setSelectedWeeks((prevState) => ({
      ...prevState,
      [week]: !prevState[week],
    }));
  };
  const toggleCheckboxGroup = (group) => {
    setSelectedGroups((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
  };
  const toggleCheckboxArticle = (article) => {
    setSelectedArticles((prevState) => ({
      ...prevState,
      [article]: !prevState[article],
    }));
  };
  const toggleCheckboxProduct = (product) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [product]: !prevState[product],
    }));
  };

  const handleBrand = () => {
    const currentBrands = selectedBrands ?? {};
    const newSelectedBrands = {};
    const newAllSelected = !allSelectedBrands;

    Object.keys(currentBrands).forEach((brand) => {
      newSelectedBrands[brand] = newAllSelected;
    });
    setSelectedBrands(newSelectedBrands);
    setAllSelectedBrands(newAllSelected);
  };



  const handleYear = () => {
    const currentYears = selectedYears ?? {};
    const newSelectedYears = {};
    const newAllSelected = !allSelectedYears;

    Object.keys(currentYears).forEach((year) => {
      newSelectedYears[year] = newAllSelected;
    });

    setSelectedYears(newSelectedYears);
    setAllSelectedYears(newAllSelected);
  };


  const handleMonth = () => {
    const currentMonths = selectedMonths ?? {};
    const newSelectedMonths = {};
    const newAllSelected = !allSelectedMonths;

    Object.keys(currentMonths).forEach((month) => {
      newSelectedMonths[month] = newAllSelected;
    });

    setSelectedMonths(newSelectedMonths);
    setAllSelectedMonths(newAllSelected);
  };


  const handleWeek = () => {
    const currentWeeks = selectedWeeks ?? {};
    const newSelectedWeeks = {};
    const newAllSelected = !allSelectedWeeks;

    Object.keys(currentWeeks).forEach((product) => {
      newSelectedWeeks[product] = newAllSelected;
    });

    setSelectedWeeks(newSelectedWeeks);
    setAllSelectedWeeks(newAllSelected);
  };


  const handleGroup = () => {
    const currentGroups = selectedGroups ?? {};
    const newSelectedGroups = {};
    const newAllSelected = !allSelectedGroups;

    Object.keys(currentGroups).forEach((product) => {
      newSelectedGroups[product] = newAllSelected;
    });

    setSelectedGroups(newSelectedGroups);
    setAllSelectedGroups(newAllSelected);
  };

  const handleArticle = () => {
    const currentArticles = selectedArticles ?? {};
    const newSelectedArticles = {};
    const newAllSelected = !allSelectedArticles;

    Object.keys(currentArticles).forEach((product) => {
      newSelectedArticles[product] = newAllSelected;
    });

    setSelectedArticles(newSelectedArticles);
    setAllSelectedArticles(newAllSelected);
  };


  const handleProduct = () => {
    const newSelectedProducts = {};
    const newAllSelected = !allSelectedProducts;

    Object.keys(selectedProducts).forEach((product) => {
      newSelectedProducts[product] = newAllSelected;
    });

    setSelectedProducts(newSelectedProducts);
    setAllSelectedProducts(newAllSelected);
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className={`${styles.scheduleMain} dashboard-content pb-3 `}>
        <TopNav
          title={
            <>
              <span style={{ color: '#1A1A1A4D' }}>Отчет /</span> Графики
            </>
          }
        />
        {user.is_report_downloaded ? (
          <>
            <div className='container dash-container'>
              <NewFilterGroup pageIdent='charts' getData={updateScheduleChartData} />
            </div>

            <div className={`${styles.ScheduleBody} dash-container container`}>
              <div className='container dash-container '>
                <ScheduleBigChart
                  dataRevenue={dataRevenue}
                  dataNetProfit={dataNetProfit}
                  labels={bigChartLabels}
                  stepSizeRevenue={stepSizeRevenue}
                  minDataRevenue={minDataRevenue}
                  maxDataRevenue={maxDataRevenue}
                  isLoading={isChartsLoading}
                />
              </div>
              <div className='container dash-container '>
                <ScheduleProfitabilityBigChart
                  dataProfitability={dataProfitability}
                  dataProfitMinus={dataProfitMinus}
                  isLoading={isChartsLoading}
                  dataProfitPlus={dataProfitPlus}
                  labels={bigChartLabels}
                  minValue={minProfitability}
                  maxValue={maxProfitability}
                  step={stepProfitability}
                />
              </div>
            </div>
            <div
              className={`${styles.ScheduleFooter} schedule-footer dash-container container`}
            >
              <StructureRevenue
                dataStructureRevenue={dataStructureRevenue}
                isLoading={isChartsLoading}
              />
              <RevenueStorageChart
                className={styles.revenueStorageChart}
                dataRevenueStorage={dataRevenueStorage}
                labels={dataRevenueStorageLabels}
                isLoading={isChartsLoading}
                max={maxWarehouse}
              />
            </div>
          </>
        ) : (
          <>
            <div className='container dash-container'>
              <DemonstrationSection />
            </div>
            <span className={styles.responsiveImageWrapper}>
              <img
                src={plFake}
                alt='fakePL'
                className={styles.responsiveImage}
              />
              <span></span>
            </span>
          </>
        )}

        {/* <div className={`${styles.ScheduleBody} dash-container container`}>
          <div className='container dash-container '>
            <ScheduleBigChart
              dataRevenue={dataRevenue}
              dataNetProfit={dataNetProfit}
              labels={bigChartLabels}
              stepSizeRevenue={stepSizeRevenue}
              minDataRevenue={minDataRevenue}
              maxDataRevenue={maxDataRevenue}
              isLoading={isChartsLoading}
            />
          </div>
          <div className='container dash-container '>
            <ScheduleProfitabilityBigChart
              dataProfitability={dataProfitability}
              dataProfitMinus={dataProfitMinus}
              isLoading={isChartsLoading}
              dataProfitPlus={dataProfitPlus}
              labels={bigChartLabels}
              min={minProfitability}
              max={maxProfitability}
            />
          </div>
        </div>
        <div className={`${styles.ScheduleFooter} dash-container container`}>
          <StructureRevenue
            dataStructureRevenue={dataStructureRevenue}
            isLoading={isChartsLoading}
          />
          <RevenueStorageChart
            dataRevenueStorage={dataRevenueStorage}
            labels={dataRevenueStorageLabels}
            isLoading={isChartsLoading}
            max={maxWarehouse}
          />
        </div> */}
        <BottomNavigation />
      </div>
    </div>
  );
};
export default Schedule;
