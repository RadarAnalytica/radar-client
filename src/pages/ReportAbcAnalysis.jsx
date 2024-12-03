import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useState, useContext, useEffect } from 'react';
import styles from './ReportAbcAnalysis.module.css';
import upArrow from '../assets/up.svg';
import downArrow from '../assets/down.svg';
import BottomNavigation from '../components/BottomNavigation';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '../service/serviceFunctions';
import SelectField from '../components/SelectField';
import abcFake from '../pages/images/abc_fake.png';
import DemonstrationSection from '../components/DemonstrationSection';

const ReportAbcAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);

  const [error, setError] = useState(null);
  const { authToken, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('revenue');
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [dataRevenue, setDataRevenue] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const colorMap = {
    A: '#4AD99133',
    B: '#F0AD0033',
    C: '#FB450033',
  };

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const filterKeys = [
    'selectedYears',
    'selectedMonths',
    'selectedArticles',
    'selectedBrands',
    'selectedGroups',
    'selectedWeeks',
  ];

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

  const [filtersInitialized, setFiltersInitialized] = useState();

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

  const transformFilters = (data) => {
    return {
      setSelectedBrands: Object.fromEntries(
        data.brand_filter.map((brand) => [brand, true])
      ),
      setSelectedArticles: Object.fromEntries(
        data.article_filter.map((id) => [id.toString(), true])
      ),
      setSelectedGroups: Object.fromEntries(
        data.group_filter.map((group) => [group, true])
      ),
      setSelectedYears: Object.fromEntries(
        data.year_filter.map((year) => [year.toString(), true])
      ),
      setSelectedMonths: Object.fromEntries(
        data.month_filter.map((month) => [month.toString(), true])
      ),
      setSelectedWeeks: Object.fromEntries(
        data.week_filter.map((weekday) => [weekday, true])
      ),
      setSelectedProducts: Object.fromEntries(
        data.product_filter.map((product) => [product, true])
      ),
    };
  };

  useEffect(() => {
    const initializeFiltersAndData = async () => {
      try {
        await updateFilterFields();
        setFiltersInitialized(true);
      } catch (error) {
        console.error('Ошибка при инициализации фильтров:', error);
      }
    };

    initializeFiltersAndData();

    // console.log(localStorage.getItem("selectedYears"), JSON.parse(localStorage.getItem("selectedYears")))

    // setSelectedYears(JSON.parse(localStorage.getItem("selectedYears")))
  }, []);

  useEffect(() => {
    if (filtersInitialized) {
      updateData();
    }
  }, [filtersInitialized]);
  const updateFilterFields = async () => {
    setIsLoading(true);
    try {
      const data = await ServiceFunctions.getAbcReportsFilters(authToken);
      const transformedFilters = transformFilters(data);


      const filterMapping = {
        setSelectedBrands: {
          setter: setSelectedBrands,
          storageKey: 'selectedBrandsABC',
          value: transformedFilters.setSelectedBrands,
        },
        setSelectedArticles: {
          setter: setSelectedArticles,
          storageKey: 'selectedArticlesABC',
          value: transformedFilters.setSelectedArticles,
        },
        setSelectedGroups: {
          setter: setSelectedGroups,
          storageKey: 'selectedGroupsABC',
          value: transformedFilters.setSelectedGroups,
        },
        setSelectedYears: {
          setter: setSelectedYears,
          storageKey: 'selectedYearsABC',
          value: transformedFilters.setSelectedYears,
        },
        setSelectedMonths: {
          setter: setSelectedMonths,
          storageKey: 'selectedMonthsABC',
          value: transformedFilters.setSelectedMonths,
        },
        setSelectedWeeks: {
          setter: setSelectedWeeks,
          storageKey: 'selectedWeeksABC',
          value: transformedFilters.setSelectedWeeks,
        },
        setSelectedProducts: {
          setter: setSelectedProducts,
          storageKey: 'selectedProductsABC',
          value: transformedFilters.setSelectedProducts,
        },
      };

      Object.values(filterMapping).forEach(({ setter, storageKey, value }) => {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) {
          const parsedStoredValue = JSON.parse(storedValue);
          setter(
            Object.keys(parsedStoredValue).length > 0
              ? { ...value, ...parsedStoredValue }
              : value
          );
        } else {
          setter(value);
        }
      });
    } catch (error) {
      console.error('Ошибка при загрузке фильтров:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const updateFilterFields = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await ServiceFunctions.getAbcReportsFilters(authToken);
  //     console.log('API Response:', data);
  //     const transformedFilters = transformFilters(data);
  //     console.log('transformedFilters', transformedFilters);

  //     // Mapping of filter keys to their corresponding setters
  //     const setters = {
  //       selectedYearsABC: setSelectedYears,
  //       selectedMonthsABC: setSelectedMonths,
  //       selectedArticlesABC: setSelectedArticles,
  //       selectedBrandsABC: setSelectedBrands,
  //       selectedGroupsABC: setSelectedGroups,
  //       selectedWeeksABC: setSelectedWeeks,
  //       selectedProductsABC: setSelectedProducts,
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
  //     console.error('Ошибка при загрузке фильтров:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const updateData = async () => {
    setIsRevenueLoading(true);
    setError(null);

    try {
      const filter = {
        article_filter_list: Object.keys(selectedArticles).filter(
          (key) => selectedArticles[key]
        ),
        brand_filter_list: Object.keys(selectedBrands).filter(
          (key) => selectedBrands[key]
        ),
        group_filter_list: Object.keys(selectedGroups).filter(
          (key) => selectedGroups[key]
        ),
        month_filter_list: Object.keys(selectedMonths).filter(
          (key) => selectedMonths[key]
        ),
        year_filter_list: Object.keys(selectedYears).filter(
          (key) => selectedYears[key]
        ),
        week_filter_list: Object.keys(selectedWeeks).filter(
          (key) => selectedWeeks[key]
        ),
        product_filter_list: Object.keys(selectedProducts).filter(
          (key) => selectedProducts[key]
        ),
      };

      const data = await ServiceFunctions.postAbcReportsData(authToken, filter);
      setDataRevenue(data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsRevenueLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedYears).length > 0) {
      localStorage.setItem('selectedYearsABC', JSON.stringify(selectedYears));
    }
    if (Object.keys(selectedArticles).length > 0) {
      localStorage.setItem(
        'selectedArticlesABC',
        JSON.stringify(selectedArticles)
      );
    }
    if (Object.keys(selectedBrands).length > 0) {
      localStorage.setItem('selectedBrandsABC', JSON.stringify(selectedBrands));
    }
    if (Object.keys(selectedGroups).length > 0) {
      localStorage.setItem('selectedGroupsABC', JSON.stringify(selectedGroups));
    }
    if (Object.keys(selectedMonths).length > 0) {
      localStorage.setItem('selectedMonthsABC', JSON.stringify(selectedMonths));
    }
    if (Object.keys(selectedWeeks).length > 0) {
      localStorage.setItem('selectedWeeksABC', JSON.stringify(selectedWeeks));
    }
  }, [
    selectedYears,
    selectedMonths,
    selectedArticles,
    selectedBrands,
    selectedGroups,
    selectedWeeks,
  ]);

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
  const handleCheckProduct = () => {
    const newSelectedProducts = {};
    const newAllSelected = !allSelectedProducts;

    Object.keys(selectedProducts).forEach((product) => {
      newSelectedProducts[product] = newAllSelected;
    });

    setSelectedProducts(newSelectedProducts);
    setAllSelectedProducts(newAllSelected);
  };
  const handleFiltersCollapse = () => {
    const clearedBrands = Object.keys(selectedBrands).reduce((acc, brand) => {
      acc[brand] = false;
      return acc;
    }, {});
    setSelectedBrands(clearedBrands);
    const clearedYears = Object.keys(selectedYears).reduce((acc, brand) => {
      acc[brand] = false;
      return acc;
    }, {});
    setSelectedYears(clearedYears);
    const clearedMonths = Object.keys(selectedMonths).reduce((acc, brand) => {
      acc[brand] = false;
      return acc;
    }, {});
    setSelectedMonths(clearedMonths);
    const clearedWeeks = Object.keys(selectedWeeks).reduce((acc, brand) => {
      acc[brand] = false;
      return acc;
    }, {});
    setSelectedWeeks(clearedWeeks);
    const clearedGroups = Object.keys(selectedGroups).reduce((acc, brand) => {
      acc[brand] = false;
      return acc;
    }, {});
    setSelectedGroups(clearedGroups);
    const clearedArticles = Object.keys(selectedArticles).reduce(
      (acc, brand) => {
        acc[brand] = false;
        return acc;
      },
      {}
    );
    setSelectedArticles(clearedArticles);
  };

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className={`${styles.scheduleMain} dashboard-content pb-3 `}>
        <TopNav
          title={
            <>
              <span style={{ color: '#1A1A1A4D' }}>Отчет /</span> ABC-анализ
            </>
          }
        />
        {user.is_report_downloaded ? (
          <>
            {' '}
            <div className='container dash-container'>
              <div
                className={styles.filteOpenClose}
                onClick={() => setIsOpenFilters(!isOpenFilters)}
              >
                {isOpenFilters ? 'Развернуть фильтры' : 'Свернуть фильтры'}
              </div>
            </div>
            {!isOpenFilters && (
              <>
                <div
                  className={`${styles.ScheduleHeader} dash-container container`}
                >
                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Бренд</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleBrand}
                      >
                        {allSelectedBrands ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedBrands)
                          .filter((brand) => brand !== 'пусто')
                          .map((brand, index) => (
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
                              <span className={styles.brandName} title={brand}>
                                {brand}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Год</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleYear}
                      >
                        {allSelectedYears ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
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
                            <span className={styles.brandName} title={year}>
                              {year}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Месяц</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleMonth}
                      >
                        {allSelectedMonths ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedMonths).map((month, index) => (
                          <div className={styles.brandItem} key={index}>
                            <label className={styles.checkboxContainer}>
                              <input
                                type='checkbox'
                                checked={selectedMonths[month]}
                                onChange={() => toggleCheckboxMonth(month)}
                                className={styles.checkboxInput}
                              />
                              <span className={styles.customCheckbox}></span>
                            </label>
                            <span
                              className={styles.brandName}
                              title={monthNames[parseInt(month, 10) - 1]}
                            >
                              {monthNames[parseInt(month, 10) - 1]}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Неделя</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleWeek}
                      >
                        {allSelectedWeeks ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedWeeks).map((week, index) => (
                          <div className={styles.brandItem} key={index}>
                            <label className={styles.checkboxContainer}>
                              <input
                                type='checkbox'
                                checked={selectedWeeks[week]}
                                onChange={() => toggleCheckboxWeek(week)}
                                className={styles.checkboxInput}
                              />
                              <span className={styles.customCheckbox}></span>
                            </label>
                            <span className={styles.brandName} title={week}>
                              {week}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Группа</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleGroup}
                      >
                        {allSelectedGroups ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedGroups)
                          .filter((group) => group !== 'пусто')
                          .map((group, index) => (
                            <div className={styles.brandItem} key={index}>
                              <label className={styles.checkboxContainer}>
                                <input
                                  type='checkbox'
                                  checked={selectedGroups[group]}
                                  onChange={() => toggleCheckboxGroup(group)}
                                  className={styles.checkboxInput}
                                />
                                <span className={styles.customCheckbox}></span>
                              </label>
                              <span className={styles.brandName} title={group}>
                                {group}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.container}>
                    <div className={styles.header}>
                      <span className={styles.title}>Артикул</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleArticle}
                      >
                        {allSelectedArticles ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedArticles)
                          .filter((article) => article !== '0')
                          .map((article, index) => (
                            <div className={styles.brandItem} key={index}>
                              <label className={styles.checkboxContainer}>
                                <input
                                  type='checkbox'
                                  checked={selectedArticles[article]}
                                  onChange={() =>
                                    toggleCheckboxArticle(article)
                                  }
                                  className={styles.checkboxInput}
                                />
                                <span className={styles.customCheckbox}></span>
                              </label>
                              <span
                                className={styles.brandName}
                                title={article}
                              >
                                {article}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.ScheduleBody} dash-container container`}
                  style={{ marginTop: '20px' }}
                >
                  <div className={styles.containerProduct}>
                    <div className={styles.header}>
                      <span className={styles.title}>Товар</span>
                      <button
                        className={styles.clearButton}
                        onClick={handleCheckProduct}
                      >
                        {allSelectedProducts ? 'Снять все' : 'Выбрать все'}
                      </button>
                    </div>
                    {isLoading ? (
                      <div
                        className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100px', marginTop: '40px' }}
                      >
                        <span className='loader'></span>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        {Object.keys(selectedProducts)
                          .filter((product) => product !== 'пусто')
                          .map((product, index) => (
                            <div className={styles.brandItem} key={index}>
                              <label className={styles.checkboxContainer}>
                                <input
                                  type='checkbox'
                                  checked={selectedProducts[product]}
                                  onChange={() =>
                                    toggleCheckboxProduct(product)
                                  }
                                  className={styles.checkboxInput}
                                />
                                <span className={styles.customCheckbox}></span>
                              </label>
                              <span
                                className={styles.brandName}
                                title={product}
                              >
                                {product}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className='container dash-container'>
                  <div>
                    <button className={styles.applyButton} onClick={updateData}>
                      Применить фильтры
                    </button>
                  </div>
                </div>
              </>
            )}
            <div
              className={`${styles.ScheduleFooter} dash-container container`}
            >
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'revenue' ? styles.active : ''
                    }`}
                  onClick={() => handleTabClick('revenue')}
                >
                  По выручке
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'profit' ? styles.active : ''
                    }`}
                  onClick={() => handleTabClick('profit')}
                >
                  По прибыли
                </button>
              </div>
              {activeTab === 'revenue' && (
                <div
                  className={`${styles.containerRevenue} ${isOpenFilters ? styles.expanded : ''
                    }`}
                >
                  <div className={styles.rowHeader}>
                    <div
                      className={styles.article}
                      style={{ color: '#8C8C8C' }}
                    >
                      Артикул
                    </div>
                    <div
                      className={styles.product}
                      style={{ color: '#8C8C8C' }}
                    >
                      Товар
                    </div>
                    <div className={styles.profit} style={{ color: '#8C8C8C' }}>
                      Выручка
                    </div>
                    <div
                      className={styles.profitAmount}
                      style={{ color: '#8C8C8C' }}
                    >
                      Доля выручки
                    </div>
                    <div
                      className={styles.category}
                      style={{ color: '#8C8C8C' }}
                    >
                      Категория по выручке
                    </div>
                    <div
                      className={styles.generalCategory}
                      style={{ color: '#8C8C8C' }}
                    >
                      Общая категория
                    </div>
                  </div>
                  {isRevenueLoading ? (
                    <div
                      className='d-flex flex-column align-items-center justify-content-center'
                      style={{ height: '100px', marginTop: '40px' }}
                    >
                      <span className='loader'></span>
                    </div>
                  ) : (
                    <div
                      className={`${styles.rowsWrapper} ${isOpenFilters ? styles.expanded : ''
                        }`}
                    >
                      {dataRevenue.map((item, index) => (
                        <div key={index} className={styles.row}>
                          <div className={styles.article}>
                            <span
                              onClick={() => toggleRow(item.wb_id)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 0',
                                fontWeight: '700',
                              }}
                            >
                              {item.wb_id}
                              <img
                                src={
                                  expandedRows[item.wb_id] ? upArrow : downArrow
                                }
                                alt={
                                  expandedRows[item.wb_id]
                                    ? 'Collapse'
                                    : 'Expand'
                                }
                                style={{
                                  marginLeft: '8px',
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </span>


                            {expandedRows[item.wb_id] &&
                              item.items.map((product, i) => (
                                <div key={i} style={{ padding: '8px 0 ' }}>
                                  {product.barcode}
                                </div>
                              ))}
                          </div>

                          <div className={styles.product}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div
                                  className={styles.productName}
                                  title={item.title}
                                >
                                  {item.title}
                                </div>{' '}


                                {item.items.map((product, i) => (
                                  <div
                                    key={i}
                                    className={styles.productName}
                                    title={product.title}
                                  >
                                    {product.title}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div
                                className={styles.productName}
                                title={item.title}
                              >
                                {item.title}
                              </div>
                            )}
                          </div>

                          <div className={styles.profit}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.proceeds.toLocaleString()} ₽</div>{' '}


                                {item.items.map((product, i) => (
                                  <div key={i}>
                                    {product.proceeds.toLocaleString()} ₽
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div>{item.proceeds.toLocaleString()} ₽</div>
                            )}
                          </div>

                          <div className={styles.profitAmount}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.proceeds_percent}%</div>{' '}


                                {item.items.map((product, i) => (
                                  <div key={i}>{product.proceeds_percent}%</div>
                                ))}
                              </>
                            ) : (
                              <div>{item.proceeds_percent}%</div>
                            )}
                          </div>

                          <div className={styles.category}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div
                                  style={{
                                    backgroundColor:
                                      colorMap[item.proceed_abc] ||
                                      'transparent',
                                    padding: '4px 16px',
                                    borderRadius: '8px',
                                    marginRight: '75%',
                                  }}
                                >
                                  {item.proceed_abc}
                                </div>{' '}


                                {item.items.map((product, i) => (
                                  <div key={i} style={{ padding: '6px 0' }}>
                                    <div
                                      style={{
                                        backgroundColor:
                                          colorMap[product.proceed_abc] ||
                                          'transparent',
                                        padding: '4px 16px',
                                        borderRadius: '8px',
                                        marginRight: '75%',
                                      }}
                                    >
                                      {product.proceed_abc}
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div
                                style={{
                                  backgroundColor:
                                    colorMap[item.proceed_abc] || 'transparent',
                                  padding: '4px 16px',
                                  borderRadius: '8px',
                                  marginRight: '75%',
                                }}
                              >
                                {item.proceed_abc}
                              </div>
                            )}
                          </div>

                          <div className={styles.generalCategory}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.common_abc}</div>{' '}


                                {item.items.map((product, i) => (
                                  <div key={i}>{product.common_abc}</div>
                                ))}
                              </>
                            ) : (
                              <div>{item.common_abc}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'profit' && (
                <div
                  className={`${styles.containerProfit} ${isOpenFilters ? styles.expanded : ''
                    }`}
                >
                  <div className={styles.rowHeader}>
                    <div
                      className={styles.article}
                      style={{ color: '#8C8C8C' }}
                    >
                      Артикул
                    </div>
                    <div
                      className={styles.product}
                      style={{ color: '#8C8C8C' }}
                    >
                      Товар
                    </div>
                    <div className={styles.profit} style={{ color: '#8C8C8C' }}>
                      Прибыль
                    </div>
                    <div
                      className={styles.profitAmount}
                      style={{ color: '#8C8C8C' }}
                    >
                      Доля прибыли
                    </div>
                    <div
                      className={styles.category}
                      style={{ color: '#8C8C8C' }}
                    >
                      Категория по выручке
                    </div>
                    <div
                      className={styles.generalCategory}
                      style={{ color: '#8C8C8C' }}
                    >
                      Общая категория
                    </div>
                  </div>
                  {isRevenueLoading ? (
                    <div
                      className='d-flex flex-column align-items-center justify-content-center'
                      style={{ height: '100px', marginTop: '40px' }}
                    >
                      <span className='loader'></span>
                    </div>
                  ) : (
                    <div
                      className={`${styles.rowsWrapper} ${isOpenFilters ? styles.expanded : ''
                        }`}
                    >
                      {dataRevenue.map((item, index) => (
                        <div key={index} className={styles.row}>


                          <div className={styles.article}>
                            <span
                              onClick={() => toggleRow(item.wb_id)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 0',
                                fontWeight: '700',
                              }}
                            >
                              {item.wb_id}
                              <img
                                src={
                                  expandedRows[item.wb_id] ? upArrow : downArrow
                                }
                                alt={
                                  expandedRows[item.wb_id]
                                    ? 'Collapse'
                                    : 'Expand'
                                }
                                style={{
                                  marginLeft: '8px',
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </span>
                            {expandedRows[item.wb_id] &&
                              item.items.map((product, i) => (
                                <div key={i} style={{ padding: '8px 0 ' }}>
                                  {product.barcode}
                                </div>
                              ))}
                          </div>

                          <div className={styles.product}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div
                                  className={styles.productName}
                                  title={item.title}
                                >
                                  {item.title}
                                </div>
                                {item.items.map((product, i) => (
                                  <div
                                    key={i}
                                    className={styles.productName}
                                    title={product.title}
                                  >
                                    {product.title}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div
                                className={styles.productName}
                                title={item.title}
                              >
                                {item.title}
                              </div>
                            )}
                          </div>

                          <div className={styles.profit}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.profit.toLocaleString()} ₽</div>

                                {item.items.map((product, i) => (
                                  <div key={i}>
                                    {product.profit.toLocaleString()} ₽
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div>{item.profit.toLocaleString()} ₽</div>
                            )}
                          </div>

                          <div className={styles.profitAmount}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.profit_percent}%</div>
                                {item.items.map((product, i) => (
                                  <div key={i}>{product.profit_percent}%</div>
                                ))}
                              </>
                            ) : (
                              <div>{item.profit_percent}%</div>
                            )}
                          </div>

                          <div className={styles.category}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div
                                  style={{
                                    backgroundColor:
                                      colorMap[item.profit_abc] ||
                                      'transparent',
                                    padding: '4px 16px',
                                    borderRadius: '8px',
                                    marginRight: '75%',
                                  }}
                                >
                                  {item.profit_abc}
                                </div>{' '}

                                {item.items.map((product, i) => (
                                  <div key={i} style={{ padding: '6px 0' }}>
                                    <div
                                      style={{
                                        backgroundColor:
                                          colorMap[product.proceed_abc] ||
                                          'transparent',
                                        padding: '4px 16px',
                                        borderRadius: '8px',
                                        marginRight: '75%',
                                      }}
                                    >
                                      {product.profit_abc}
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div
                                style={{
                                  backgroundColor:
                                    colorMap[item.proceed_abc] || 'transparent',
                                  padding: '4px 16px',
                                  borderRadius: '8px',
                                  marginRight: '75%',
                                }}
                              >
                                {item.profit_abc}
                              </div>
                            )}
                          </div>

                          <div className={styles.generalCategory}>
                            {expandedRows[item.wb_id] ? (
                              <>
                                <div>{item.common_abc}</div>

                                {item.items.map((product, i) => (
                                  <div key={i}>{product.common_abc}</div>
                                ))}
                              </>
                            ) : (
                              <div>{item.common_abc}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='container dash-container'>
              <DemonstrationSection />
            </div>
            <span className={styles.responsiveImageWrapper}>
              <img
                src={abcFake}
                alt='fakePL'
                className={styles.responsiveImage}
              />
            </span>
          </>
        )}

        {/* <div className={`${styles.ScheduleFooter} dash-container container`}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === 'revenue' ? styles.active : ''
              }`}
              onClick={() => handleTabClick('revenue')}
            >
              По выручке
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === 'profit' ? styles.active : ''
              }`}
              onClick={() => handleTabClick('profit')}
            >
              По прибыли
            </button>
          </div>
          {activeTab === 'revenue' && (
            <div
              className={`${styles.containerRevenue} ${
                isOpenFilters ? styles.expanded : ''
              }`}
            >
              <div className={styles.rowHeader}>
                <div className={styles.article} style={{ color: '#8C8C8C' }}>
                  Артикул
                </div>
                <div className={styles.product} style={{ color: '#8C8C8C' }}>
                  Товар
                </div>
                <div className={styles.profit} style={{ color: '#8C8C8C' }}>
                  Выручка
                </div>
                <div
                  className={styles.profitAmount}
                  style={{ color: '#8C8C8C' }}
                >
                  Доля выручки
                </div>
                <div className={styles.category} style={{ color: '#8C8C8C' }}>
                  Категория по выручке
                </div>
                <div
                  className={styles.generalCategory}
                  style={{ color: '#8C8C8C' }}
                >
                  Общая категория
                </div>
              </div>
              {isRevenueLoading ? (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '100px', marginTop: '40px' }}
                >
                  <span className='loader'></span>
                </div>
              ) : (
                <div
                  className={`${styles.rowsWrapper} ${
                    isOpenFilters ? styles.expanded : ''
                  }`}
                >
                  {dataRevenue.map((item, index) => (
                    <div key={index} className={styles.row}>
                  
                      <div className={styles.article}>
                        <span
                          onClick={() => toggleRow(item.wb_id)}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 0',
                            fontWeight: '700',
                          }}
                        >
                          {item.wb_id}
                          <img
                            src={expandedRows[item.wb_id] ? upArrow : downArrow}
                            alt={
                              expandedRows[item.wb_id] ? 'Collapse' : 'Expand'
                            }
                            style={{
                              marginLeft: '8px',
                              width: '16px',
                              height: '16px',
                            }}
                          />
                        </span>
                       
                        {expandedRows[item.wb_id] &&
                          item.items.map((product, i) => (
                            <div key={i} style={{ padding: '8px 0 ' }}>
                              {product.barcode}
                            </div>
                          ))}
                      </div>

                      <div className={styles.product}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.productName}
                              title={item.title}
                            >
                              {item.title}
                            </div>{' '}
                            
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.productName}
                                title={product.title}
                              >
                                {product.title}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.productName}
                            title={item.title}
                          >
                            {item.title}
                          </div>
                        )}
                      </div>

                      <div className={styles.profit}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.proceeds.toLocaleString()} ₽</div>{' '}
                           
                            {item.items.map((product, i) => (
                              <div key={i}>
                                {product.proceeds.toLocaleString()} ₽
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>{item.proceeds.toLocaleString()} ₽</div> 
                        )}
                      </div>

                      <div className={styles.profitAmount}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.proceeds_percent}%</div>
                            {item.items.map((product, i) => (
                              <div key={i}>{product.proceeds_percent}%</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.proceeds_percent}%</div> 
                        )}
                      </div>

                      <div className={styles.category}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              style={{
                                backgroundColor:
                                  colorMap[item.proceed_abc] || 'transparent',
                                padding: '4px 16px',
                                borderRadius: '8px',
                                marginRight: '75%',
                              }}
                            >
                              {item.proceed_abc}
                            </div>{' '}
                            {item.items.map((product, i) => (
                              <div key={i} style={{ padding: '6px 0' }}>
                                <div
                                  style={{
                                    backgroundColor:
                                      colorMap[product.proceed_abc] ||
                                      'transparent',
                                    padding: '4px 16px',
                                    borderRadius: '8px',
                                    marginRight: '75%',
                                  }}
                                >
                                  {product.proceed_abc}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            style={{
                              backgroundColor:
                                colorMap[item.proceed_abc] || 'transparent',
                              padding: '4px 16px',
                              borderRadius: '8px',
                              marginRight: '75%',
                            }}
                          >
                            {item.proceed_abc}
                          </div>
                        )}
                      </div>

                      <div className={styles.generalCategory}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.common_abc}</div>{' '}
                           
                            {item.items.map((product, i) => (
                              <div key={i}>{product.common_abc}</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.common_abc}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'profit' && (
            <div
              className={`${styles.containerProfit} ${
                isOpenFilters ? styles.expanded : ''
              }`}
            >
              <div className={styles.rowHeader}>
                <div className={styles.article} style={{ color: '#8C8C8C' }}>
                  Артикул
                </div>
                <div className={styles.product} style={{ color: '#8C8C8C' }}>
                  Товар
                </div>
                <div className={styles.profit} style={{ color: '#8C8C8C' }}>
                  Прибыль
                </div>
                <div
                  className={styles.profitAmount}
                  style={{ color: '#8C8C8C' }}
                >
                  Доля прибыли
                </div>
                <div className={styles.category} style={{ color: '#8C8C8C' }}>
                  Категория по выручке
                </div>
                <div
                  className={styles.generalCategory}
                  style={{ color: '#8C8C8C' }}
                >
                  Общая категория
                </div>
              </div>
              {isRevenueLoading ? (
                <div
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{ height: '100px', marginTop: '40px' }}
                >
                  <span className='loader'></span>
                </div>
              ) : (
                <div
                  className={`${styles.rowsWrapper} ${
                    isOpenFilters ? styles.expanded : ''
                  }`}
                >
                  {dataRevenue.map((item, index) => (
                    <div key={index} className={styles.row}>
                      
                      <div className={styles.article}>
                        <span
                          onClick={() => toggleRow(item.wb_id)}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 0',
                            fontWeight: '700',
                          }}
                        >
                          {item.wb_id}
                          <img
                            src={expandedRows[item.wb_id] ? upArrow : downArrow}
                            alt={
                              expandedRows[item.wb_id] ? 'Collapse' : 'Expand'
                            }
                            style={{
                              marginLeft: '8px',
                              width: '16px',
                              height: '16px',
                            }}
                          />
                        </span>
                      
                        {expandedRows[item.wb_id] &&
                          item.items.map((product, i) => (
                            <div key={i} style={{ padding: '8px 0 ' }}>
                              {product.barcode}
                            </div>
                          ))}
                      </div>

                      <div className={styles.product}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              className={styles.productName}
                              title={item.title}
                            >
                              {item.title}
                            </div>{' '}
                            
                            {item.items.map((product, i) => (
                              <div
                                key={i}
                                className={styles.productName}
                                title={product.title}
                              >
                                {product.title}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            className={styles.productName}
                            title={item.title}
                          >
                            {item.title}
                          </div>
                        )}
                      </div>

                      <div className={styles.profit}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.profit.toLocaleString()} ₽</div>{' '}
                           
                            {item.items.map((product, i) => (
                              <div key={i}>
                                {product.profit.toLocaleString()} ₽
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>{item.profit.toLocaleString()} ₽</div> 
                        )}
                      </div>

                      <div className={styles.profitAmount}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.profit_percent}%</div>{' '}
                           
                            {item.items.map((product, i) => (
                              <div key={i}>{product.profit_percent}%</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.profit_percent}%</div> 
                        )}
                      </div>

                      <div className={styles.category}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div
                              style={{
                                backgroundColor:
                                  colorMap[item.profit_abc] || 'transparent',
                                padding: '4px 16px',
                                borderRadius: '8px',
                                marginRight: '75%',
                              }}
                            >
                              {item.profit_abc}
                            </div>{' '}
                            
                            {item.items.map((product, i) => (
                              <div key={i} style={{ padding: '6px 0' }}>
                                <div
                                  style={{
                                    backgroundColor:
                                      colorMap[product.proceed_abc] ||
                                      'transparent',
                                    padding: '4px 16px',
                                    borderRadius: '8px',
                                    marginRight: '75%',
                                  }}
                                >
                                  {product.profit_abc}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div
                            style={{
                              backgroundColor:
                                colorMap[item.proceed_abc] || 'transparent',
                              padding: '4px 16px',
                              borderRadius: '8px',
                              marginRight: '75%',
                            }}
                          >
                            {item.profit_abc}
                          </div>
                        )}
                      </div>

                      <div className={styles.generalCategory}>
                        {expandedRows[item.wb_id] ? (
                          <>
                            <div>{item.common_abc}</div>{' '}
                           
                            {item.items.map((product, i) => (
                              <div key={i}>{product.common_abc}</div>
                            ))}
                          </>
                        ) : (
                          <div>{item.common_abc}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div> */}
        <BottomNavigation />
      </div>
    </div>
  );
};
export default ReportAbcAnalysis;
