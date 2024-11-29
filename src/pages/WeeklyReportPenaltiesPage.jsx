import { useState, useEffect, useContext } from 'react';
import FilterGroup from '../components/FilterGroup';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import styles from './WeeklyReportPenaltiesPage.module.css';
import LogisticsTable from '../components/LogisticsTable';
import BottomNavigation from '../components/BottomNavigation';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPenaltiesData } from '../redux/reportPrnalties/penaltiesActions';

const WeeklyReportPenaltiesPage = () => {
  const dispatch = useDispatch();
  const { penaltiesData, loading } = useSelector(
    (state) => state.penaltiesSlice
  );
  console.log('penaltiesData => WeeklyReportPenaltiesPage:', penaltiesData);
  const { authToken } = useContext(AuthContext);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [filterDataSet, setFilterDataSet] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    year: [],
    month: [],
    week: [],
    article: [],
    size: [],
    srid: [],
    kindsOfLogistics: [],
    goods: [],
  });

  const handleApplyFilters = () => {
    dispatch(
      fetchPenaltiesData({
        filters: selectedFilters,
        token: authToken,
      })
    );
  };

  const handleSelect = (category, id) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter((item) => item !== id)
        : [...prev[category], id],
    }));
  };

  const handleClearAll = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const data = await ServiceFunctions.getPenaltiesFilters(authToken);
        setFilterDataSet(data);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'Штрафы'} subTitle={'Отчёт /'} />
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
            <div className='container dash-container'>
              <div className={styles.filterContainer}>
                <FilterGroup
                  title='Год'
                  options={
                    filterDataSet.date_sale_filter?.years.map((year) => ({
                      id: year,
                      label: year,
                    })) || []
                  }
                  selected={selectedFilters.year}
                  onSelect={(id) => handleSelect('year', id)}
                  onClearAll={() => handleClearAll('year')}
                />
                <FilterGroup
                  title='Месяц'
                  options={
                    filterDataSet.date_sale_filter?.months.map((month) => ({
                      id: month,
                      label: month,
                    })) || []
                  }
                  selected={selectedFilters.month}
                  onSelect={(id) => handleSelect('month', id)}
                  onClearAll={() => handleClearAll('month')}
                />
                <FilterGroup
                  title='Неделя'
                  options={
                    filterDataSet.date_sale_filter?.weekdays.map((week) => ({
                      id: week,
                      label: week,
                    })) || []
                  }
                  selected={selectedFilters.week}
                  onSelect={(id) => handleSelect('week', id)}
                  onClearAll={() => handleClearAll('week')}
                />
                <FilterGroup
                  title='Артикул'
                  options={
                    filterDataSet.wb_id_filter?.map((id) => ({
                      id: id,
                      label: id,
                    })) || []
                  }
                  selected={selectedFilters.article}
                  onSelect={(id) => handleSelect('article', id)}
                  onClearAll={() => handleClearAll('article')}
                />
                <FilterGroup
                  title='Размер'
                  options={
                    filterDataSet.size_name_filter?.map((size) => ({
                      id: size,
                      label: size,
                    })) || []
                  }
                  selected={selectedFilters.size}
                  onSelect={(id) => handleSelect('size', id)}
                  onClearAll={() => handleClearAll('size')}
                />
                <FilterGroup
                  title='Srid'
                  options={
                    filterDataSet.srid_filter?.map((srid) => ({
                      id: srid,
                      label: srid,
                    })) || []
                  }
                  selected={selectedFilters.srid}
                  onSelect={(id) => handleSelect('srid', id)}
                  onClearAll={() => handleClearAll('srid')}
                />
              </div>
              <div className={styles.filterContainer}>
                <FilterGroup
                  title='Виды логистики, штрафов и доплат'
                  options={
                    filterDataSet.action_type_filter?.map((type) => ({
                      id: type,
                      label: type,
                    })) || []
                  }
                  selected={selectedFilters.kindsOfLogistics}
                  onSelect={(id) => handleSelect('kindsOfLogistics', id)}
                  onClearAll={() => handleClearAll('kindsOfLogistics')}
                  size='big'
                />
                <FilterGroup
                  title='Товар'
                  options={
                    filterDataSet.title_filter?.map((title) => ({
                      id: title,
                      label: title,
                    })) || []
                  }
                  selected={selectedFilters.goods}
                  onSelect={(id) => handleSelect('goods', id)}
                  onClearAll={() => handleClearAll('goods')}
                  size='big'
                />
              </div>
            </div>
            <div className='container dash-container'>
              <div>
                <button
                  className={styles.applyButton}
                  onClick={handleApplyFilters}
                >
                  Применить фильтры
                </button>
              </div>
            </div>
          </>
        )}
        <div className='container dash-container'>
          <LogisticsTable data={penaltiesData} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPenaltiesPage;
