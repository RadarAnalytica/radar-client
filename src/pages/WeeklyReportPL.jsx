import { useState, useContext, useEffect, useCallback, useRef } from 'react';
import AuthContext from '@/service/AuthContext';
import TablePL from '@/components/TablePL';
import BottomNavigation from '@/components/BottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPLReport } from '@/redux/reportPL/plReportActions';
import { fetchPLFilters } from '@/redux/reportPL/plFiltersAction';
import styles from './WeeklyReportPL.module.css';
import DemonstrationSection from '@/components/DemonstrationSection';
import plFake from '@/pages/images/goods-fake.png';
import NewFilterGroup from '@/components/finReport/FilterGroup';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Header from '@/components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '@/service/utils';
import { RadarLoader } from '@/shared';

const tableConfig = [{
  title: 'Значение',
  dataIndex: 'value',
  key: 'value',
  width: 200,
  fixed: true,
}]

const getTableConfig = (plData) => {
  const newTableConfig = [...tableConfig]; // Создаем копию массива, а не ссылку

  plData.forEach(item => {
    const isInList = newTableConfig.some(config => config.dataIndex === item.date);
    if (!isInList) {
      newTableConfig.push({
        title: item.date,
        dataIndex: item.date,
        key: item.date,
        width: 130,
      });
    }
  });
  return newTableConfig;

}

const metricOrder = {
  profit: { title: 'Выручка', hasPercentage: false, units: '₽', isBold: true },
  avg_check: { title: 'Средний чек', hasPercentage: false, units: '₽' },
  spp: { title: 'СПП', hasPercentage: false, units: '%' },
  purchased_percent: { title: 'Выкуп', hasPercentage: false, units: '%' },
  self_cost: { title: 'Себестоимость', hasPercentage: true, units: '₽' },
  wb_retentions: { title: 'Все удержания WB', hasPercentage: true, units: '₽', isBold: true },
  commission: { title: 'Комиссия', hasPercentage: true, units: '₽', isBold: true },
  acquiring: { title: 'Эквайринг', hasPercentage: true, units: '₽', isBold: true },
  logistic: { title: 'Логистика', hasPercentage: true, units: '₽', isBold: true },
  storage: { title: 'Хранение', hasPercentage: true, units: '₽', isBold: true },
  other_retentions: { title: 'Прочие удержания', hasPercentage: true, units: '₽', isBold: true },
  paid_acceptance: { title: 'Платная приемка', hasPercentage: true, units: '₽', isBold: true },
  payment_to_seller: { title: 'Оплата на Р/С', hasPercentage: false, units: '₽', isBold: true, hasBg: true },
  tax: { title: 'Налог', hasPercentage: false, units: '₽' },
  external_expenses_amount: { title: 'Всего внешних расходов', hasPercentage: false, units: '₽' },
  external_expenses_percent: { title: 'Внешние расходы', hasPercentage: false, units: '%' },
  net_profit: { title: 'Чистая прибыль', hasPercentage: false, units: '₽', isBold: true, hasBg: true },
  profit_margin: { title: 'Маржинальность прибыли', hasPercentage: false, units: '%', isBold: true, hasBg: true },
  roi: { title: 'ROI', hasPercentage: false, units: '%', isBold: true, hasBg: true },
}


const getTableData = (plData) => {
  const currConfig = getTableConfig(plData, tableConfig);
  const newTableData = []
  Object.keys(plData[0]).forEach(key => {
    if (!metricOrder[key]) return;
    const currentMetric = metricOrder[key]
    let row = {
      value: currentMetric.title,
      ...currentMetric
    }
    plData.forEach(item => {
      row[item.date] = currentMetric.hasPercentage ? { value: item[key], percentage: item[key + '_percent'] } : item[key];
    });
    newTableData.push(row);
  });
  return newTableData;
}


const customCellRender = (value, record, index, dataIndex) => {
  if (dataIndex === 'value') {
    return <div className={styles.customCell}
      style={{ fontWeight: record.isBold ? '700' : '500', backgroundColor: record.hasBg ? '#F6F4FF' : 'transparent' }}
      data-has-bg={record.hasBg}
    >{value}</div>;
  }
  if (typeof value !== 'object') {
    return <div className={styles.customCell}
      style={{ fontWeight: record.isBold ? '700' : '500', backgroundColor: record.hasBg ? '#F6F4FF' : 'transparent' }}
      data-has-bg={record.hasBg}
    >{formatPrice(value, record.units)}</div>;
  }
  if (typeof value === 'object') {
    return <div className={styles.customCell} style={{ fontWeight: record.isBold ? '700' : '500', backgroundColor: record.hasBg ? '#F6F4FF' : 'transparent' }}>
      <span>{formatPrice(value.value, record.units)}</span>
      <span style={{ fontWeight: '500' }}>{formatPrice(value.percentage, '%')}</span>
    </div>;
  }

}

const WeeklyReportPL = () => {
  const { authToken, user } = useContext(AuthContext);
  const { isDemoMode } = useDemoMode();
  const dispatch = useDispatch();
  const { plData } = useSelector((state) => state?.plReportSlice);
  const [tableData, setTableData] = useState([]);
  const [tableConfig, setTableConfig] = useState([]);
  const { plFilters, isFiltersLoading } = useSelector((state) => state?.plFiltersSlice);
  const [isLoading, setIsLoading] = useState(false);
  const tableContainerRef = useRef(null);
  useEffect(() => {
    dispatch(fetchPLFilters(
      authToken
    ));

  }, [authToken, dispatch]);

  useEffect(() => {
    if (plData && plData.length > 0) {
      setTableConfig(() => getTableConfig(plData));
      setTableData(() => getTableData(plData));
    }
  }, [plData]);

  const handleApplyFilters = useCallback(() => {
    setIsLoading(true);

    dispatch(fetchPLReport({ token: authToken })).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch, isFiltersLoading]);

  return (
    <main className={styles.page}>
      <MobilePlug />
      {/* ------ SIDE BAR ------ */}
      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>
      {/* ------ CONTENT ------ */}
      <section className={styles.page__content}>
        {/* header */}
        <div className={styles.page__headerWrapper}>
          <Header title={'P&L'} titlePrefix={'Отчёт'} hasShadow={false} />
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

        <NewFilterGroup pageIdent='pl' filtersData={plFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />

        {isLoading &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>
        }

        {tableData && tableData.length > 0 && !isLoading &&
          <div className={styles.tableContainerWrapper}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
              <RadarTable
                key={tableData.length}
                config={[...tableConfig]}
                dataSource={tableData}
                preset='radar-table-default'
                pagination={false}
                // resizeable
                style={{ tableLayout: 'fixed',}}
                paginationContainerStyle={{ display: 'none' }}
                scrollContainerRef={tableContainerRef}
                stickyHeader={-8}
                bodyCellWrapperClassName={styles.bodyCell}
                customCellRender={{
                  idx: [],
                  renderer: customCellRender,
                }}
              />
            </div>
          </div>
        }

        <BottomNavigation />
      </section>
      {/* ---------------------- */}
    </main>
  )
};

export default WeeklyReportPL;
