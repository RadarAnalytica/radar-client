import styles from './Schedule.module.css';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useState, useEffect, useContext } from 'react';
import BigChart from '../components/BigChart';
import ScheduleBigChart from '../components/ScheduleBigChart';
import ScheduleProfitabilityBigChart from '../components/ScheduleProfitabilityChart';
import StructureRevenue from '../components/StructureRevenue';
import RevenueStorageChart from '../components/RevenueStorageChart';
import BottomNavigation from '../components/BottomNavigation';
import { ServiceFunctions } from "../service/serviceFunctions";
import AuthContext from "../service/AuthContext";

const Schedule = () => {
  const { user, authToken, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxWarehouse, setMaxWarehouse] = useState(0);
  const [minProfitability, setMinProfitability] = useState(0)
  const [maxProfitability, setMaxProfitability] = useState(0)
  //data for charts
  const [dataRevenueStorage, setDataRevenueStorage] = useState([0, 10000, 20000, 30000, 40000, 50000, 60000, 70000,])

  const [dataStructureRevenue, setDataStructureRevenue] = useState([0, 0, 0, 0, 0])
  const [dataProfitability, setDataProfitability] = useState([])
  const [dataProfitMinus, setDataProfitMinus] = useState([])
  const [dataProfitPlus, setDataProfitPlus] = useState([])
  const [dataRevenue, setDataRevenues] = useState([])
  const [dataNetProfit, setDataNetProfit] = useState([])

  const [bigChartLabels, setBigChartLabels] = useState(['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'])
  const [dataRevenueStorageLabels, setDataRevenueStorageLabels] = useState(
    ["Коледино", 'Тула', 'Казань', 'Санкт-Петербург Уткина Заводь', 'Невинномысск', 'Екатеринбург-Перспективный', 'Астана', 'Атакент', 'СЦ Кузнецк', 'Пушкино', 'Обухово 2', 'Вёшки']
  )


  const [minDataRevenue, setMinDataRevenue] = useState(10000)
  const [maxDataRevenue, setMaxDataRevenue] = useState(50000)
  const [stepSizeRevenue, setStepSizeRevenue] = useState(10000)
  //data for filters
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [allSelectedProducts, setAllSelectedProducts] = useState(false);
  const [allSelectedArticles, setAllSelectedArticles] = useState(false);
  const [allSelectedGroups, setAllSelectedGroups] = useState(false);
  const [allSelectedWeeks, setAllSelectedWeeks] = useState(false);
  const [allSelectedMonths, setAllSelectedMonths] = useState(false);
  const [allSelectedYears, setAllSelectedYears] = useState(false);
  const [allSelectedBrands, setAllSelectedBrands] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState({});
  const [selectedYears, setSelectedYears] = useState({});
  const [selectedMonths, setSelectedMonths] = useState({});
  const [selectedWeeks, setSelectedWeeks] = useState({});
  const [selectedGroups, setSelectedGroups] = useState({});
  const [selectedArticles, setSelectedArticles] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];


  const transformFilters = (data) => {

    return {
      setSelectedBrands: Object.fromEntries(data.brand_name_filter.map((brand) => [brand, false])),
      setSelectedArticles: Object.fromEntries(data.wb_id_filter.map((id) => [id, false])),
      setSelectedGroups: Object.fromEntries(data.groups_filter.map((group) => [group, false])),
      setSelectedYears: Object.fromEntries(data.date_sale_filter.years.map((year) => [year, false])),
      setSelectedMonths: Object.fromEntries(data.date_sale_filter.months.map((month) => [month, false])),
      setSelectedWeeks: Object.fromEntries(data.date_sale_filter.weekdays.map((weekday) => [weekday, false]))
    };
  };


  useEffect(() => {
    updateFilterFields()
  }, [])

  const updateFilterFields = async () => {
    setIsLoading(true);
    try {
      const data = await ServiceFunctions.scheduleFilterFields(authToken);
      const transformedFilters = transformFilters(data);

      setSelectedBrands(transformedFilters.setSelectedBrands);
      setSelectedArticles(transformedFilters.setSelectedArticles);
      setSelectedGroups(transformedFilters.setSelectedGroups);
      setSelectedYears(transformedFilters.setSelectedYears);
      setSelectedMonths(transformedFilters.setSelectedMonths);
      setSelectedWeeks(transformedFilters.setSelectedWeeks);

    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const calculateSize = (min, max) => {
    let range = Math.abs(max - min)
    return Math.ceil(range / 5 / 500) * 500
  }

  const revenueAndProfit = (data, filter) => {
    if (
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1
      )
    ) {
      const dailyRevenueArray = [];
      const dailyProfitArray = [];
      const dayTitlesArray = [];


      const year = Object.keys(data.revenue_and_profit)[0];
      const months = data.revenue_and_profit[year];
      const selectedWeekdayNames = filter.date_sale_filter.weekdays;

      for (const month in months) {
        const weeks = months[month].weeks;
        for (const week in weeks) {
          if (selectedWeekdayNames.includes(week)) {
            const days = weeks[week].days;
            for (const day in days) {
              const dayData = days[day];
              dayTitlesArray.push(day);
              dailyRevenueArray.push(dayData.revenue || 0);
              dailyProfitArray.push(dayData.profit || 0);
            }
          }
        }
      }

      const min = Math.floor(Math.min(Math.min(...dailyRevenueArray), Math.min(...dailyProfitArray)) / 1000) * 1000
      const max = Math.ceil(Math.max(Math.max(...dailyRevenueArray), Math.max(...dailyProfitArray)) / 1000) * 1000
      setMinDataRevenue(min)
      setMaxDataRevenue(max)
      setStepSizeRevenue(calculateSize(min, max))
      setDataRevenues(dailyRevenueArray)
      setDataNetProfit(dailyProfitArray)
      setBigChartLabels(dayTitlesArray)
    }
    else if (
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length > 0
      )
    ) {
      const weekRevenueArray = [];
      const weekProfitArray = [];
      const weekDatesArray = [];


      const year = Object.keys(data.revenue_and_profit)[0];
      const months = data.revenue_and_profit[year];

      for (const month in months) {
        const index = monthNames.indexOf(month);
        const monthIndex = index !== -1 ? index + 1 : null;
        const weeks = months[month]?.weeks;
        if (weeks &&
          (
            filter.date_sale_filter.months.includes(monthIndex.toString()) ||
            filter.date_sale_filter.months.length === 0
          )
        ) {
          for (const week in weeks) {
            if (
              (filter.date_sale_filter.weekdays.includes(week) && filter.date_sale_filter.weekdays.length > 0) ||
              filter.date_sale_filter.weekdays.length === 0
            ) {
              const weekData = weeks[week];
              weekDatesArray.push(week);
              weekRevenueArray.push(weekData.total_week_revenue || 0);
              weekProfitArray.push(weekData.total_week_profit || 0);
            }
          }
        }
      }
      const min = Math.floor(Math.min(Math.min(...weekRevenueArray), Math.min(...weekProfitArray)) / 1000) * 1000
      const max = Math.ceil(Math.max(Math.max(...weekRevenueArray), Math.max(...weekProfitArray)) / 1000) * 1000
      // console.log(min, max, weekProfitArray, weekRevenueArray, weekDatesArray)
      setMinDataRevenue(min)
      setMaxDataRevenue(max)
      setStepSizeRevenue(calculateSize(min, max))
      setDataRevenues(weekRevenueArray)
      setDataNetProfit(weekProfitArray)
      setBigChartLabels(weekDatesArray)
    } else {
      const revenueArray = [];
      const profitArray = [];
      const monthNamesArray = [];

      const monthNameMap = {
        "Январь": "Янв",
        "Февраль": "Фев",
        "Март": "Мар",
        "Апрель": "Апр",
        "Май": "Май",
        "Июнь": "Июн",
        "Июль": "Июл",
        "Август": "Авг",
        "Сентябрь": "Сен",
        "Октябрь": "Окт",
        "Ноябрь": "Ноя",
        "Декабрь": "Дек"
      };
      const rev_profit = data.revenue_and_profit
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
            revenueArray.push(monthData.total_month_revenue || 0);
            profitArray.push(monthData.total_month_profit || 0);
            monthNamesArray.push(monthNameMap[month] || month);
          }
        }

      }
      const min = Math.floor(Math.min(Math.min(...revenueArray), Math.min(...profitArray)) / 1000) * 1000
      const max = Math.ceil(Math.max(Math.max(...revenueArray), Math.max(...profitArray)) / 1000) * 1000
      setMinDataRevenue(min)
      setMaxDataRevenue(max)
      setStepSizeRevenue(calculateSize(min, max))
      setDataRevenues(revenueArray)
      setDataNetProfit(profitArray)
      setBigChartLabels(monthNamesArray)
    }

  }

  const roiAndMarginality = (data, filter) => {

    if (
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 1 &&
        filter.date_sale_filter.weekdays.length === 1
      )
    ) {

      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];
      const dayTitlesArray = [];


      const year = Object.keys(data.roi_and_marginality)[0];
      const months = data.roi_and_marginality[year];
      const selectedWeekdayNames = filter.date_sale_filter.weekdays;

      for (const month in months) {
        const weeks = months[month].weeks;
        for (const week in weeks) {
          if (selectedWeekdayNames.includes(week)) {
            const days = weeks[week].days;
            for (const day in days) {
              const dayData = days[day];
              dayTitlesArray.push(day);
              if (dayData.marginality > 0) {
                marginalityHigh.push(dayData.marginality || 0);
                marginalityLow.push(0);
              } else {
                marginalityHigh.push(0);
                marginalityLow.push(dayData.marginality || 0);
              }
              roiArray.push(dayData.roi || 0);
            }
          }
        }
      }

      // const min = Math.floor(Math.min(Math.min(...dailyRevenueArray), Math.min(...dailyProfitArray)) / 1000) * 1000
      // const max = Math.ceil(Math.max(Math.max(...marginalityHigh), Math.max(...dailyProfitArray)) / 1000) * 1000
      // setMinDataRevenue(min)
      // setMaxDataRevenue(max)
      // setStepSizeRevenue(calculateSize(min, max))
      setDataProfitMinus(marginalityLow)
      setDataProfitPlus(marginalityHigh)
      setDataProfitability(roiArray)
    }
    else if (
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 1
      ) ||
      (
        filter.date_sale_filter.months.length === 1 &&
        filter.date_sale_filter.years.length === 0
      ) ||
      (
        filter.date_sale_filter.months.length === 0 &&
        filter.date_sale_filter.years.length === 0 &&
        filter.date_sale_filter.weekdays.length > 0
      )
    ) {


      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];

      const year = Object.keys(data.roi_and_marginality)[0];
      const months = data.roi_and_marginality[year];

      for (const month in months) {
        const index = monthNames.indexOf(month);
        const monthIndex = index !== -1 ? index + 1 : null;
        const weeks = months[month]?.weeks;
        if (weeks &&
          (
            filter.date_sale_filter.months.includes(monthIndex.toString()) ||
            filter.date_sale_filter.months.length === 0
          )
        ) {
          for (const week in weeks) {
            if (
              (filter.date_sale_filter.weekdays.includes(week) && filter.date_sale_filter.weekdays.length > 0) ||
              filter.date_sale_filter.weekdays.length === 0
            ) {
              const weekData = weeks[week];
              marginalityLow.push(weekData.min_week_marginality || 0);
              marginalityHigh.push(weekData.max_week_marginality || 0);
              roiArray.push(weekData.average_week_roi || 0);
              console.log(weekData.min_week_marginality, "low")
              console.log(weekData.max_week_marginality, "high")
            }
          }
        }
      }



      setDataProfitMinus(marginalityLow)
      setDataProfitPlus(marginalityHigh)
      setDataProfitability(roiArray)
    } else {


      const monthNamesArray = [];
      const roiArray = [];
      const marginalityHigh = [];
      const marginalityLow = [];


      const monthNameMap = {
        "Январь": "Янв",
        "Февраль": "Фев",
        "Март": "Мар",
        "Апрель": "Апр",
        "Май": "Май",
        "Июнь": "Июн",
        "Июль": "Июл",
        "Август": "Авг",
        "Сентябрь": "Сен",
        "Октябрь": "Окт",
        "Ноябрь": "Ноя",
        "Декабрь": "Дек"
      };
      const rev_profit = data.roi_and_marginality
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
            marginalityHigh.push(monthData.max_month_roi || 0);
            roiArray.push(monthData.average_month_roi || 0);
            monthNamesArray.push(monthNameMap[month] || month);
          }
        }
      }
      // const min = Math.floor(Math.min(Math.min(...revenueArray), Math.min(...profitArray)) / 1000) * 1000
      // const max = Math.ceil(Math.max(Math.max(...revenueArray), Math.max(...profitArray)) / 1000) * 1000
      // setMinDataRevenue(min)
      // setMaxDataRevenue(max)
      // setStepSizeRevenue(calculateSize(min, max))
      console.log(marginalityHigh, marginalityLow)
      setDataProfitMinus(marginalityLow)
      setDataProfitPlus(marginalityHigh)
      setDataProfitability(roiArray)
    }
  }

  const updateScheduleChartData = async () => {
    setIsChartsLoading(true);
    setError(null);

    try {
      const filter = {
        "brand_name_filter": Object.keys(selectedBrands).filter(key => selectedBrands[key]),
        "wb_id_filter": Object.keys(selectedArticles).filter(key => selectedArticles[key]),
        "groups_filter": Object.keys(selectedGroups).filter(key => selectedGroups[key]),
        "date_sale_filter": {
          "years": Object.keys(selectedYears).filter(key => selectedYears[key]),
          "months": Object.keys(selectedMonths).filter(key => selectedMonths[key]),
          "weekdays": Object.keys(selectedWeeks).filter(key => selectedWeeks[key])
        }
      };

      const data = await ServiceFunctions.scheduleFilterChartData(authToken, filter);

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
        const filteredKeys = Object.keys(data.revenue_by_warehouse).filter(key => key !== "null");
        setDataRevenueStorageLabels(filteredKeys);
        // setDataRevenueStorageLabels(Object.keys(data.revenue_by_warehouse));

        const revenueValues = Object.values(data.revenue_by_warehouse);
        const maxRevenue = Math.max(...revenueValues);
        const roundedStepSize = Math.ceil(maxRevenue / 1000) * 1000;
        setMaxWarehouse(roundedStepSize);
        console.log(roundedStepSize)


      }

      setIsChartsLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setIsChartsLoading(false);
    }
  };

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
    const newSelectedBrands = {};
    const newAllSelected = !allSelectedBrands;
    Object.keys(selectedBrands).forEach((brand) => {
      newSelectedBrands[brand] = newAllSelected;
    });
    setSelectedBrands(newSelectedBrands);
    setAllSelectedBrands(newAllSelected);
  };

  const handleYear = () => {
    const newSelectedYears = {};
    const newAllSelected = !allSelectedYears;
    Object.keys(selectedYears).forEach((year) => {
      newSelectedYears[year] = newAllSelected;
    });
    setSelectedYears(newSelectedYears);
    setAllSelectedYears(newAllSelected);
  };
  const handleMonth = () => {
    const newSelectedMonths = {};
    const newAllSelected = !allSelectedMonths;
    Object.keys(selectedMonths).forEach((month) => {
      newSelectedMonths[month] = newAllSelected;
    });
    setSelectedMonths(newSelectedMonths);
    setAllSelectedMonths(newAllSelected);
  };
  const handleWeek = () => {
    const newSelectedWeeks = {};
    const newAllSelected = !allSelectedWeeks;
    Object.keys(selectedWeeks).forEach((product) => {
      newSelectedWeeks[product] = newAllSelected;
    });
    setSelectedWeeks(newSelectedWeeks);
    setAllSelectedWeeks(newAllSelected);
  };
  const handleGroup = () => {
    const newSelectedGroups = {};
    const newAllSelected = !allSelectedGroups;
    Object.keys(selectedGroups).forEach((product) => {
      newSelectedGroups[product] = newAllSelected;
    });
    setSelectedGroups(newSelectedGroups);
    setAllSelectedGroups(newAllSelected);
  };
  const handleArticle = () => {
    const newSelectedArticles = {};
    const newAllSelected = !allSelectedArticles;
    Object.keys(selectedArticles).forEach((product) => {
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
        <div className='container dash-container'>
          <div
            className={styles.filteOpenClose}
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            {isOpenFilters ? 'Развернуть фильтры' : 'Свернуть фильтры'}
          </div>
        </div>
        {/* <div className={`${styles.filterCollapse}`} onClick={handleFiltersCollapse}>Свернуть фильтры</div> */}
        {!isOpenFilters && (
          <>
            <div className={`${styles.ScheduleHeader} dash-container container`}>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Бренд</span>
                  <button className={styles.clearButton} onClick={handleBrand}>
                    {allSelectedBrands ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list}>{
                    Object.keys(selectedBrands)
                      .filter((brand) => brand !== 'пусто')
                      .map((brand, index) => (
                        <div className={styles.brandItem} key={index}>
                          <label className={styles.checkboxContainer}>
                            <input
                              type="checkbox"
                              checked={selectedBrands[brand]}
                              onChange={() => toggleCheckboxBrands(brand)}
                              className={styles.checkboxInput}
                            />
                            <span className={styles.customCheckbox}></span>
                          </label>
                          <span className={styles.brandName}>{brand}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>


              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Год</span>
                  <button className={styles.clearButton} onClick={handleYear}>
                    {allSelectedYears ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list}>
                    {Object.keys(selectedYears).map((year, index) => (
                      <div className={styles.brandItem} key={index}>
                        <label className={styles.checkboxContainer}>
                          <input
                            type='checkbox'
                            checked={selectedYears[year]}
                            onChange={() => toggleCheckboxYear(year)}
                            className={styles.checkboxInput}
                          />
                          <span className={styles.customCheckbox}></span>
                        </label>
                        <span className={styles.brandName}>{year}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Месяц</span>
                  <button className={styles.clearButton} onClick={handleMonth}>
                    {allSelectedMonths ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list} style={{ justifyContent: "flex-end", flexDirection: "column-reverse" }}>
                    {Object.keys(selectedMonths).map((monthKey, index) => (
                      <div className={styles.brandItem} key={index}>
                        <label className={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            checked={selectedMonths[monthKey]}
                            onChange={() => toggleCheckboxMonth(monthKey)}
                            className={styles.checkboxInput}
                          />
                          <span className={styles.customCheckbox}></span>
                        </label>
                        {/* Преобразуем ключ месяца в название месяца */}
                        <span className={styles.brandName}>{monthNames[parseInt(monthKey, 10) - 1]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Неделя</span>
                  <button className={styles.clearButton} onClick={handleWeek}>
                    {allSelectedWeeks ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list}>
                    {Object.keys(selectedWeeks).map((brand, index) => (
                      <div className={styles.brandItem} key={index}>
                        <label className={styles.checkboxContainer}>
                          <input
                            type='checkbox'
                            checked={selectedWeeks[brand]}
                            onChange={() => toggleCheckboxWeek(brand)}
                            className={styles.checkboxInput}
                          />
                          <span className={styles.customCheckbox}></span>
                        </label>
                        <span className={styles.brandName}>{brand}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Группа</span>
                  <button className={styles.clearButton} onClick={handleGroup}>
                    {allSelectedGroups ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list}>
                    {Object.keys(selectedGroups)
                      .filter((groupName) => groupName !== "пусто")
                      .map((brand, index) => (
                        <div className={styles.brandItem} key={index}>
                          <label className={styles.checkboxContainer}>
                            <input
                              type="checkbox"
                              checked={selectedGroups[brand]}
                              onChange={() => toggleCheckboxGroup(brand)}
                              className={styles.checkboxInput}
                            />
                            <span className={styles.customCheckbox}></span>
                          </label>
                          <span className={styles.brandName}>{brand}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Артикул</span>
                  <button className={styles.clearButton} onClick={handleArticle}>
                    {allSelectedArticles ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                {isLoading ? (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100px', marginTop: "40px" }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className={styles.list}>
                    {Object.keys(selectedArticles)
                      .filter((article) => article !== 'пусто')
                      .map((article, index) => (
                        <div className={styles.brandItem} key={index}>
                          <label className={styles.checkboxContainer}>
                            <input
                              type="checkbox"
                              checked={selectedArticles[article]}
                              onChange={() => toggleCheckboxArticle(article)}
                              className={styles.checkboxInput}
                            />
                            <span className={styles.customCheckbox}></span>
                          </label>
                          <span className={styles.brandName}>{article}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>
            <div className='container dash-container'>
              <div>
                <button className={styles.applyButton} onClick={updateScheduleChartData}>
                  Применить фильтры
                </button>
              </div>
            </div>
          </>
        )}
        <div className={`${styles.ScheduleBody} dash-container container`}>
          <div className='container dash-container '>
            <ScheduleBigChart
              dataRevenue={dataRevenue}
              dataNetProfit={dataNetProfit}
              labels={bigChartLabels}

              stepSizeRevenue={stepSizeRevenue}
              minDataRevenue={minDataRevenue}
              maxDataRevenue={maxDataRevenue}
              isLoading={isChartsLoading} />

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
          <StructureRevenue dataStructureRevenue={dataStructureRevenue} isLoading={isChartsLoading} />
          <RevenueStorageChart dataRevenueStorage={dataRevenueStorage} labels={dataRevenueStorageLabels} isLoading={isChartsLoading} max={maxWarehouse} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default Schedule;
