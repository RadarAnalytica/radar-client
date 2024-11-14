import styles from './Schedule.module.css';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useState } from 'react';
import BigChart from '../components/BigChart';
import ScheduleBigChart from '../components/ScheduleBigChart';
import ScheduleProfitabilityBigChart from '../components/ScheduleProfitabilityChart';
import StructureRevenue from '../components/StructureRevenue';
import RevenueStorageChart from '../components/RevenueStorageChart';
import BottomNavigation from '../components/BottomNavigation';
const Schedule = () => {
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
             <button className={styles.applyButton}>
               Применить фильтры
             </button>
           </div>
         </div>
          </>
        )}
        <div className={`${styles.ScheduleBody} dash-container container`}>
          <div className='container dash-container '>
            <ScheduleBigChart />
          </div>
          <div className='container dash-container '>
            <ScheduleProfitabilityBigChart />
          </div>
        </div>
        <div className={`${styles.ScheduleFooter} dash-container container`}>
          <StructureRevenue />
          <RevenueStorageChart />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};
export default Schedule;
