import { useDispatch, useSelector } from 'react-redux';
import { fetchChartsFilters } from '../redux/reportCharts/chartsFiltersActions';
import styles from './Schedule.module.css';
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
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";

const Schedule = () => {
  const {isDemoMode} = useDemoMode();
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { chartsFilters, isFiltersLoading } = useSelector((state) => state?.chartsFiltersSlice);

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
  const [marginChartLabels, setMarginChartLabels] = useState([
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

  useEffect(() => {
    dispatch(fetchChartsFilters(
      authToken
    ));

  }, [authToken, dispatch]);

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
      // await updateFilterFields();
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

  const calculateSize = (min, max) => {
    let range = Math.abs(max - min);
    return Math.ceil(range / 5 / 500) * 500;
  };

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

    const rawData = data.revenue_and_profit;

    // обходим дату по годам
    for (const year in rawData) {
      // Если у нас включен фильтр по годам и текущий год не выбран, то переходим к следующему году
      if (years.length !== 0 && !years.some(_ => _ === year)) { continue; };
      // Если прошлое условие прошло, то переходим к месяцам
      const currentYearData = rawData[year];
      // обходим месяца
      for (const month in currentYearData) {

        // Также как и года проверяем статус фильтров месяцев. Если он включен и текущий месяц выбран, то работаем с ним.
        if (months.length !== 0 && !months.some(_ => monthNames[parseInt(_) - 1] === month)) continue;
        const currentMonthData = currentYearData[month];
        // Подготавливаем массивы данных для графика
        revenueArray.push(currentMonthData.total_month_revenue || 0);
        profitArray.push(currentMonthData.total_month_profit || 0);
        // Обязательно добавляем год к лейблу месяца
        const monthLabel = monthNameMap[month] ? `${monthNameMap[month]} ${year}` : `${month} ${year}`;
        labelsArray.push(monthLabel);
        // if (currentMonthData.total_month_revenue > 0 || currentMonthData.total_month_profit > 0) {
        //   // Подготавливаем массивы данных для графика
        //   revenueArray.push(currentMonthData.total_month_revenue || 0);
        //   profitArray.push(currentMonthData.total_month_profit || 0);
        //   // Обязательно добавляем год к лейблу месяца
        //   const monthLabel = monthNameMap[month] ? `${monthNameMap[month]} ${year}` : `${month} ${year}`
        //   labelsArray.push(monthLabel);
        // }

        // ЗДЕСЬ БУДЕТ ЧТО-ТО С НЕДЕЛЯМИ
      }
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
    const roiArray = [];
    const marginalityHigh = [];
    const marginalityLow = [];
    const marginChartLabels = [];

    const rawData = data.roi_and_marginality;

    // обходим дату по годам
    for (const year in rawData) {
      // Если у нас включен фильтр по годам и текущий год не выбран, то переходим к следующему году
      if (years.length !== 0 && !years.some(_ => _ === year)) continue;
      // Если прошлое условие прошло, то переходим к месяцам
      const currentYearData = rawData[year];
      // обходим месяца
      for (const month in currentYearData) {
        // Также как и года проверяем статус фильтров месяцев. Если он включен и текущий месяц выбран, то работаем с ним. Если нет, то переходим к следующему месяцу
        //console.log(months)
        const isInMonthsList = months.some(_ => {
          const index = parseInt(_);
          return monthNames[index - 1] === month;
        });
        if (months.length !== 0 && !isInMonthsList) continue;
        const currentMonthData = currentYearData[month];
        // Подготавливаем массивы данных для графика
        roiArray.push(currentMonthData.average_month_roi || 0);
        marginalityHigh.push(currentMonthData.max_month_marginality || 0);
        marginalityLow.push(currentMonthData.min_month_marginality || 0);
        const monthLabel = monthNameMap[month] ? `${monthNameMap[month]} ${year}` : `${month} ${year}`;
        marginChartLabels.push(monthLabel);
        // if (currentMonthData.average_month_roi > 0 || currentMonthData.max_month_marginality > 0 || currentMonthData.min_month_marginality > 0) {
        //   // Подготавливаем массивы данных для графика
        //   roiArray.push(currentMonthData.average_month_roi || 0);
        //   marginalityHigh.push(currentMonthData.max_month_marginality || 0);
        //   marginalityLow.push(currentMonthData.min_month_marginality || 0);
        //   const monthLabel = monthNameMap[month] ? `${monthNameMap[month]} ${year}` : `${month} ${year}`
        //   marginChartLabels.push(monthLabel);
        // }


        // ЗДЕСЬ БУДЕТ ЧТО-ТО С НЕДЕЛЯМИ
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
    setMarginChartLabels(marginChartLabels);

  };


  const updateScheduleChartData = useCallback(async () => {
    setIsChartsLoading(true);
    setError(null);

    try {
      const { data, filter } = await ServiceFunctions.scheduleFilterChartData(
        authToken,
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
  }, [authToken, isFiltersLoading]);

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
      <MobilePlug />

      <div style={{ height: '100vh', zIndex: 999 }}>
        <Sidebar />
      </div>

      <div className={`${styles.scheduleMain} dashboard-content pb-3 `} style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '20px 0' }} className="container dash-container">
          <Header title={'Графики'} titlePrefix={'Отчёт'} />
        </div>

        {isDemoMode &&
          <div className='mb-3'>
            <NoSubscriptionWarningBlock />
          </div>
        }

        {!user.is_report_downloaded &&
          <div className='mb-3'>
            <DemonstrationSection />
          </div>
        }

        <div className='container dash-container'>
          <NewFilterGroup pageIdent='charts' filtersData={chartsFilters} isLoading={isFiltersLoading} getData={updateScheduleChartData} />
        </div>
        <div className={styles.ScheduleBody}>
          <ScheduleBigChart
            dataRevenue={dataRevenue}
            dataNetProfit={dataNetProfit}
            labels={bigChartLabels}
            stepSizeRevenue={stepSizeRevenue}
            minDataRevenue={minDataRevenue}
            maxDataRevenue={maxDataRevenue}
            isLoading={isChartsLoading}
          />
          {dataProfitability && dataProfitMinus && dataProfitPlus && bigChartLabels &&
            <ScheduleProfitabilityBigChart
              dataProfitability={dataProfitability}
              dataProfitMinus={dataProfitMinus}
              isLoading={isChartsLoading}
              dataProfitPlus={dataProfitPlus}
              //labels={bigChartLabels}
              labels={marginChartLabels}
              minValue={minProfitability}
              maxValue={maxProfitability}
              step={stepProfitability}
            />}
        </div>
        <div
          className={`${styles.ScheduleFooter}`}
        >
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
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};
export default Schedule;
