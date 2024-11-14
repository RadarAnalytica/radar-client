import { useState } from 'react';
import FilterDropdownReportPages from '../components/FilterDropdownReportPages';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import TablePL from '../components/TablePL';
import BottomNavigation from '../components/BottomNavigation';
import styles from './WeeklyReportPL.module.css';

const WeeklyReportPL = () => {
  const data = {
    dates: [
      '15.07.2024',
      '22.07.2024',
      '29.07.2024',
      '05.08.2024',
      '12.08.2024',
      '19.08.2024',
      '26.08.2024',
      '02.09.2024',
      '09.09.2024',
    ],
    rows: [
      {
        label: 'Выручка',
        values: {
          '15.07.2024': { value: 34000, percentage: null },
          '22.07.2024': { value: 34000, percentage: null },
          // ... add other dates
        },
      },
      {
        label: 'Средний чек',
        values: {
          '15.07.2024': { value: 4000, percentage: null },
          '22.07.2024': { value: 4000, percentage: null },
          // ... add other dates
        },
      },
      {
        label: 'СПП',
        values: {
          '15.07.2024': { percentage: 50 },
          '22.07.2024': { percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Выкуп',
        values: {
          '15.07.2024': { percentage: 20 },
          '22.07.2024': { percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Себестоимость',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Все удержания WB',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Комиссия',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Эквайринг',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Логистика',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Хранение',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Прочие удержания',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Платная приемка',
        values: {
          '15.07.2024': { value: 300, percentage: 20 },
          '22.07.2024': { value: 300, percentage: 20 },
          // ... add other dates
        },
      },
      {
        label: 'Оплата на Р/С',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Налог',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Всего внешних расходов',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Внешние расходы',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Чистая прибыль',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'Маржинальность прибыли',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      {
        label: 'ROI',
        values: {
          '15.07.2024': { value: 300 },
          '22.07.2024': { value: 300 },
          // ... add other dates
        },
      },
      // ... add other rows
    ],
  };
  const shops = [];
  const filterOptions = [
    {
      id: 'brand',
      label: 'Бренд',
      options: [
        { value: '7', label: '7 дней' },
        { value: '14', label: '14 дней' },
        { value: '30', label: '30 дней' },
        { value: '90', label: '90 дней' },
      ],
    },
    {
      id: 'group',
      label: 'Группа',
      options: [
        { value: '0', label: 'Все' },
        ...shops.map((brand) => ({
          value: brand.id,
          label: brand.brand_name,
        })),
      ],
    },
  ];

  const [activeFilters, setActiveFilters] = useState({
    period: '30',
    store: '0',
  });

  const handleFilterChange = (filterId, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: value,
    }));
  };
  return (
    <div className='dashboard-page'>
      <SideNav />
      <div className='dashboard-content pb-3'>
        <TopNav title={'P&L'} subTitle={'Отчёт /'} />
        <FilterDropdownReportPages
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
        <div className='container dash-container'>
          <div>
            <button className={styles.applyButton}>Применить фильтры</button>
          </div>
        </div>
        <div className='container dash-container'>
          <TablePL data={data} />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WeeklyReportPL;
