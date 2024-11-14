import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useState } from 'react';
import styles from './ReportAbcAnalysis.module.css';
import upArrow from '../assets/up.svg';
import downArrow from '../assets/down.svg';
import BottomNavigation from '../components/BottomNavigation';

const ReportAbcAnalysis = () => {
  const [activeTab, setActiveTab] = useState('revenue'); // default active tab
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const colorMap = {
    A: '#4AD99133',
    B: '#F0AD0033',
    C: '#FB450033',
  };
  const dataRevenue = [
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      revenue: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      revenueShare: ['20%', '10%', '30%'],
      revenueCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      revenue: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      revenueShare: ['20%', '10%', '30%'],
      revenueCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      revenue: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      revenueShare: ['20%', '10%', '30%'],
      revenueCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      revenue: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      revenueShare: ['20%', '10%', '30%'],
      revenueCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
  ];
  const dataProfit = [
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      profit: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      profitShare: ['20%', '10%', '30%'],
      profitCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      profit: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      profitShare: ['20%', '10%', '30%'],
      profitCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      profit: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      profitShare: ['20%', '10%', '30%'],
      profitCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
    {
      id: '325678909',
      name: [
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
        'Куртка демисезонная с капюшоном осень 2024',
      ],
      profit: ['200 000 ₽', '200 000 ₽', '200 000 ₽'],
      profitShare: ['20%', '10%', '30%'],
      profitCategory: ['A', 'B', 'C'],
      mainCategory: ['AC', 'AB', 'AC'],
    },
  ];
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    Object.keys(selectedMonths).forEach((brand) => {
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
            <div
              className={`${styles.ScheduleHeader} dash-container container`}
            >
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
                  <button
                    className={styles.clearButton}
                    onClick={handleArticle}
                  >
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
                <div className={styles.list}>
                  {Object.keys(selectedProducts).map((brand, index) => (
                    <div className={styles.brandItem} key={index}>
                      <label className={styles.checkboxContainer}>
                        <input
                          type='checkbox'
                          checked={selectedProducts[brand]}
                          onChange={() => toggleCheckboxProduct(brand)}
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
                <button className={styles.applyButton}>
                  Применить фильтры
                </button>
              </div>
            </div>
          </>
        )}

        <div className={`${styles.ScheduleFooter} dash-container container`}>
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
            <div className={styles.containerRevenue}>
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

              {dataRevenue.map((item, index) => (
                <div key={index} className={styles.row}>
                  <div className={styles.article}>
                    <span
                      onClick={() => toggleRow(item.id)}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 0',
                      }}
                    >
                      {item.id}
                      <img
                        src={expandedRows[item.id] ? upArrow : downArrow}
                        alt={expandedRows[item.id] ? 'Collapse' : 'Expand'}
                        style={{
                          marginLeft: '8px',
                          width: '16px',
                          height: '16px',
                        }}
                      />
                    </span>
                  </div>

                  <div className={styles.product}>
                    {expandedRows[item.id] ? (
                      item.name.map((productName, i) => (
                        <div key={i}>{productName}</div>
                      ))
                    ) : (
                      <div>{item.name[0]}</div>
                    )}
                  </div>

                  <div className={styles.profit}>
                    {expandedRows[item.id] ? (
                      item.revenue.map((revenueValue, i) => (
                        <div key={i}>{revenueValue}</div>
                      ))
                    ) : (
                      <div>{item.revenue[0]}</div>
                    )}
                  </div>

                  <div className={styles.profitAmount}>
                    {expandedRows[item.id] ? (
                      item.revenueShare.map((shareValue, i) => (
                        <div key={i}>{shareValue}</div>
                      ))
                    ) : (
                      <div>{item.revenueShare[0]}</div>
                    )}
                  </div>

                  <div className={styles.category}>
                    {expandedRows[item.id] ? (
                      item.revenueCategory.map((categoryValue, i) => (
                        <div key={i} style={{ width: '23%', padding: '4px 0' }}>
                          <div
                            style={{
                              backgroundColor:
                                colorMap[categoryValue] || 'transparent',
                              padding: '4px 16px',
                              borderRadius: '8px',
                            }}
                          >
                            {categoryValue}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ width: '23%', padding: '4px 0' }}>
                        <div
                          style={{
                            backgroundColor:
                              colorMap[item.revenueCategory[0]] ||
                              'transparent',
                            padding: '4px 16px',
                            borderRadius: '8px',
                          }}
                        >
                          {item.revenueCategory[0]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.generalCategory}>
                    {expandedRows[item.id] ? (
                      item.mainCategory.map((mainCategoryValue, i) => (
                        <div key={i}>{mainCategoryValue}</div>
                      ))
                    ) : (
                      <div>{item.mainCategory[0]}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'profit' && (
            <div className={styles.containerProfit}>
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

              {dataProfit.map((item, index) => (
                <div key={index} className={styles.row}>
                  <div className={styles.article}>
                    <span
                      onClick={() => toggleRow(item.id)}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 0',
                      }}
                    >
                      {item.id}
                      <img
                        src={expandedRows[item.id] ? upArrow : downArrow}
                        alt={expandedRows[item.id] ? 'Collapse' : 'Expand'}
                        style={{
                          marginLeft: '8px',
                          width: '16px',
                          height: '16px',
                        }}
                      />
                    </span>
                  </div>

                  <div className={styles.product}>
                    {expandedRows[item.id] ? (
                      item.name.map((productName, i) => (
                        <div key={i}>{productName}</div>
                      ))
                    ) : (
                      <div>{item.name[0]}</div>
                    )}
                  </div>

                  <div className={styles.profit}>
                    {expandedRows[item.id] ? (
                      item.profit.map((profitValue, i) => (
                        <div key={i}>{profitValue}</div>
                      ))
                    ) : (
                      <div>{item.profit[0]}</div>
                    )}
                  </div>

                  <div className={styles.profitAmount}>
                    {expandedRows[item.id] ? (
                      item.profitShare.map((shareValue, i) => (
                        <div key={i}>{shareValue}</div>
                      ))
                    ) : (
                      <div>{item.profitShare[0]}</div>
                    )}
                  </div>

                  <div className={styles.category}>
                    {expandedRows[item.id] ? (
                      item.profitCategory.map((categoryValue, i) => (
                        <div key={i} style={{ width: '23%', padding: '4px 0' }}>
                          <div
                            style={{
                              backgroundColor:
                                colorMap[categoryValue] || 'transparent',
                              padding: '4px 16px',
                              borderRadius: '8px',
                            }}
                          >
                            {categoryValue}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ width: '23%', padding: '4px 0' }}>
                        <div
                          style={{
                            backgroundColor:
                              colorMap[item.profitCategory[0]] || 'transparent',
                            padding: '4px 16px',
                            borderRadius: '8px',
                          }}
                        >
                          {item.profitCategory[0]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.generalCategory}>
                    {expandedRows[item.id] ? (
                      item.mainCategory.map((mainCategoryValue, i) => (
                        <div key={i}>{mainCategoryValue}</div>
                      ))
                    ) : (
                      <div>{item.mainCategory[0]}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* <div className={styles.containerRevenue}>
                        <div className={styles.article}>
                            <div>Артикул</div>
                        </div>
                        <div className={styles.product}>Товар</div>
                        <div className={styles.profit}>Прибыль</div>
                        <div className={styles.profitAmount}>Доля прибыли</div>
                        <div className={styles.category}>Категория по выручке</div>
                        <div className={styles.generalCategory}>Общая категория</div>

                    </div> */}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default ReportAbcAnalysis;
