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

  //data for charts
  const [dataRevenueStorage, setDataRevenueStorage] = useState([2000000, 1400000, 2000000, 2000000, 3000000, 2000000, 5000000, 6000000, 2000000, 2000000, 6500000, 6000000],)
  const [dataStructureRevenue, setDataStructureRevenue] = useState()
  const [dataProfitability, setDataProfitability] = useState([10, 20, -30, 10, -40, -20, -10, -40, -60, 20, -80, -140])
  const [dataProfitMinus, setDataProfitMinus] = useState([-50, -40, -30, -10, -80, -20, -10, -40, -60, -20, -80, -140])
  const [dataProfitPlus, setDataProfitPlus] = useState([50, 30, 50, 80, 70, 60, 40, 20, 10, 40, 30, 20])
  const [dataRevenue, setDataRevenues] = useState([2000000, 4500000, 5000000, 2500000, 3200000, 1000000, 2700000, 2400000, 1500000, 0, 1500000, 2500000])
  const [dataNetProfit, setDataNetProfit] = useState([2100000, 2100000, 2500000, 1800000, 1300000, 500000, 2300000, 1600000, 5000000, -500000, 1000000, 1500000])

  const [bigChartLabels, setBigChartLabels] = useState(['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'])

  //data for filters
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [allSelectedProducts, setAllSelectedProducts] = useState(false);
  const [allSelectedArticles, setAllSelectedArticles] = useState(false);
  const [allSelectedGroups, setAllSelectedGroups] = useState(false);
  const [allSelectedWeeks, setAllSelectedWeeks] = useState(false);
  const [allSelectedMonths, setAllSelectedMonths] = useState(false);
  const [allSelectedYears, setAllSelectedYears] = useState(false);
  const [allSelectedBrands, setAllSelectedBrands] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState({
    'Бренда 1': true,
    'Бренда 2': false,
  });
  const [selectedYears, setSelectedYears] = useState({
    2024: true,
    2023: false,
    2022: false,
  });
  const [selectedMonths, setSelectedMonths] = useState({
    Январь: true,
    Февраль: false,
    Март: false,
    Апрель: false,
    Май: false,
    Июнь: false,
    Август: false,
  });
  const [selectedWeeks, setSelectedWeeks] = useState({
    '09.09.2024': true,
    '16.09.2024': false,
    '23.09.2024': false,
    '30.09.2024': false,
  });
  const [selectedGroups, setSelectedGroups] = useState({
    124356664: true,
    124356634: false,
    124356645: false,
    124353664: false,
  });
  const [selectedArticles, setSelectedArticles] = useState({
    1243564: true,
    1253664: false,
    1243664: false,
    1243536: false,
    1243546: false,
    1243539: false,
    1243531: false,
  });
  const [selectedProducts, setSelectedProducts] = useState({
    'Куртка демисезонная с капюшоном осень 2024': true,
    'Куртка демисезонная с капюшоном осень 2023': false,
    'Куртка демисезонная с капюшоном осень 2022': false,
    'Куртка демисезонная с капюшоном осень 2024 длинное название 1': false,
    'Куртка демисезонная с капюшоном осень 2024 длинное название 2': false,
    'Куртка демисезонная с капюшоном осень 2024 длинное название 3': false,
    'Куртка демисезонная с капюшоном осень 2024 длинное название 4': false,
  });


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
    updateScheduleChartData()
  }, [])

  const updateFilterFields = async () => {
    const data = await ServiceFunctions.scheduleFilterFields(authToken);
    const transformedFilters = transformFilters(data);

    // Assuming these are setters
    setSelectedBrands(transformedFilters.setSelectedBrands);
    setSelectedArticles(transformedFilters.setSelectedArticles);
    setSelectedGroups(transformedFilters.setSelectedGroups);
    setSelectedYears(transformedFilters.setSelectedYears);
    setSelectedMonths(transformedFilters.setSelectedMonths);
    setSelectedWeeks(transformedFilters.setSelectedWeeks);

  }

  const updateScheduleChartData = async () => {

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
    if (filter.date_sale_filter.months.length === 1 && filter.date_sale_filter.years.length === 1 && filter.date_sale_filter.weekdays.length === 1) {
      const weekDays = [];

      const start = new Date(filter.date_sale_filter.weekdays[0]);

      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        weekDays.push(nextDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      }
      setBigChartLabels(weekDays)
    }
    else if (filter.date_sale_filter.months.length === 1 && filter.date_sale_filter.years.length === 1 && filter.date_sale_filter.weekdays.length !== 1) {
      const weekRevenueArray = [];
      const weekProfitArray = [];
      const weekDatesArray = [];

      // Assuming only one year and one month is selected
      const year = Object.keys(data)[0]; // Get the single year
      const months = data[year];
      const month = Object.keys(months)[0]; // Get the single month
      const weeks = months[month]?.weeks; // Access weeks within the month

      if (weeks) {
        for (const week in weeks) {
          const weekData = weeks[week]; // Get the week data
          weekDatesArray.push(week); // Add week key (date) to the array
          weekRevenueArray.push(weekData.total_week_revenue || 0); // Add weekly revenue
          weekProfitArray.push(weekData.total_week_profit || 0); // Add weekly profit
        }
      }
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
          const monthData = months[month];
          revenueArray.push(monthData.total_month_revenue || 0);
          profitArray.push(monthData.total_month_profit || 0);
          monthNamesArray.push(monthNameMap[month] || month); // Map to short version
        }

      }
      setDataRevenues(revenueArray)
      setDataNetProfit(profitArray)
      setBigChartLabels(monthNamesArray)
    }


    setDataStructureRevenue([
      data.structure.all_retentions_percent,
      data.structure.external_expenses_percent,
      data.structure.tax_percent
    ])
  }



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
                <div className={styles.list}>
                  {Object.keys(selectedBrands).map((brand, index) => (
                    <div className={styles.brandItem} key={index}>
                      <label className={styles.checkboxContainer}>
                        <input
                          type='checkbox'
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
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Год</span>
                  <button className={styles.clearButton} onClick={handleYear}>
                    {allSelectedYears ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
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
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Месяц</span>
                  <button className={styles.clearButton} onClick={handleMonth}>
                    {allSelectedMonths ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                <div className={styles.list}>
                  {Object.keys(selectedMonths).map((brand, index) => (
                    <div className={styles.brandItem} key={index}>
                      <label className={styles.checkboxContainer}>
                        <input
                          type='checkbox'
                          checked={selectedMonths[brand]}
                          onChange={() => toggleCheckboxMonth(brand)}
                          className={styles.checkboxInput}
                        />
                        <span className={styles.customCheckbox}></span>
                      </label>
                      <span className={styles.brandName}>{brand}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Неделя</span>
                  <button className={styles.clearButton} onClick={handleWeek}>
                    {allSelectedWeeks ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
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
              </div>
              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Группа</span>
                  <button className={styles.clearButton} onClick={handleGroup}>
                    {allSelectedGroups ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                <div className={styles.list}>
                  {Object.keys(selectedGroups).map((brand, index) => (
                    <div className={styles.brandItem} key={index}>
                      <label className={styles.checkboxContainer}>
                        <input
                          type='checkbox'
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
              </div>

              <div className={styles.container}>
                <div className={styles.header}>
                  <span className={styles.title}>Артикул</span>
                  <button className={styles.clearButton} onClick={handleArticle}>
                    {allSelectedArticles ? 'Снять все' : 'Выбрать все'}
                  </button>
                </div>
                <div className={styles.list}>
                  {Object.keys(selectedArticles).map((brand, index) => (
                    <div className={styles.brandItem} key={index}>
                      <label className={styles.checkboxContainer}>
                        <input
                          type='checkbox'
                          checked={selectedArticles[brand]}
                          onChange={() => toggleCheckboxArticle(brand)}
                          className={styles.checkboxInput}
                        />
                        <span className={styles.customCheckbox}></span>
                      </label>
                      <span className={styles.brandName}>{brand}</span>
                    </div>
                  ))}
                </div>
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
            <ScheduleBigChart dataRevenue={dataRevenue} dataNetProfit={dataNetProfit} labels={bigChartLabels} />
          </div>
          <div className='container dash-container '>
            <ScheduleProfitabilityBigChart dataProfitability={dataProfitability} dataProfitMinus={dataProfitMinus} dataProfitPlus={dataProfitPlus} />
          </div>
        </div>
        <div className={`${styles.ScheduleFooter} dash-container container`}>
          <StructureRevenue dataStructureRevenue={dataStructureRevenue} />
          <RevenueStorageChart dataRevenueStorage={dataRevenueStorage} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default Schedule;
