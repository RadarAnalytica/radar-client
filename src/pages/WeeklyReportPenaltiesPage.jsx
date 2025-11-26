import { useEffect, useContext, useCallback, useRef, useState } from 'react';
import styles from './WeeklyReportPenaltiesPage.module.css';
import LogisticsTable from '../components/LogisticsTable';
import BottomNavigation from '../components/BottomNavigation';
import AuthContext from '../service/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPenaltiesData } from '../redux/reportPrnalties/penaltiesActions';
import { fetchPenaltyFilters } from '../redux/reportPrnalties/penaltyFiltersActions';
import DemonstrationSection from '../components/DemonstrationSection';
import plFake from '../pages/images/penalties-fake.png';
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '../service/utils';
import { RadarLoader } from '@/shared';
import { useTableColumnResize } from '@/service/hooks/useTableColumnResize';

const TABLE_CONFIG_VERSION = '1';

const initTableConfig = [
  {
    title: 'Виды лоистики, штрафов и доплат и Srid',
    dataIndex: 'firstColumn',
    key: 'firstColumn',
    width: 300,
  },
  {
    title: 'Артикул',
    dataIndex: 'wb_id',
    key: 'wb_id',
    width: 200,
  },
  {
    title: 'Товар',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: 'Размер',
    dataIndex: 'size',
    key: 'size',
    width: 200,
  },
  {
    title: 'Итог',
    dataIndex: 'penalty_total',
    key: 'penalty_total',
    units: '₽',
    width: 200,
  }
].map(item => ({
  ...item,
  minWidth: item.width / 2,
  maxWidth: item.width * 2,
}));

const getTableData = (data) => {
  if (!data) return [];
  const arr = []
  Object.keys(data).forEach(key => {
    const row = {
      rowKey: key,
      firstColumn: key,
      isParent: true,
      children: Array.isArray(data[key]) ? data[key].map(item => ({
        rowKey: item.srid,
        firstColumn: item.srid,
        wb_id: item.wb_id,
        title: item.title,
        size: item.size,
        penalty_total: item.penalty_total,
      })) : [],
    };
    arr.push(row);
  });
  return arr;
};

const customCellRender = (value, record, index, dataIndex, tableConfig) => {
  if (dataIndex === 'firstColumn' && record.isParent) {
    return <div className={styles.customCell} style={{ fontWeight: '700' }}>{value}</div>;
  }
  if (dataIndex === 'firstColumn' && !record.isParent) {
    return <div className={styles.customCell} style={{ paddingLeft: '30px' }}>{value}</div>;
  }

  if (dataIndex !== 'firstColumn' && record.isParent) {
    return <div className={styles.customCell}></div>;
  }

  if (dataIndex === 'size') {
    return <div className={`${styles.customCell} rightBorder`}>{value}</div>;
  }
  const currElem = tableConfig.find(item => item.dataIndex === dataIndex);
  return <div className={styles.customCell}>{currElem.units ? formatPrice(value, currElem.units) : value}</div>;
};

const WeeklyReportPenaltiesPage = () => {
  const { isDemoMode } = useDemoMode();
  const dispatch = useDispatch();
  const { penaltiesData, loading } = useSelector(
    (state) => state.penaltiesSlice
  );
  const tableContainerRef = useRef(null);
  const { penaltyFilters, isFiltersLoading } = useSelector((state) => state?.penaltyFiltersSlice);
  const { authToken, user } = useContext(AuthContext);
  const [tableData, setTableData] = useState(null);
  const { config: tableConfig, onResize: onResizeColumn } = useTableColumnResize(
    initTableConfig, 
    'weeklyReportPenaltiesTableConfig',
    TABLE_CONFIG_VERSION
  );

  useEffect(() => {
    if (penaltiesData) {
      setTableData([...getTableData(penaltiesData)]);
    }
  }, [penaltiesData]);

  useEffect(() => {
    dispatch(fetchPenaltyFilters(
      authToken
    ));
  }, [authToken, dispatch]);

  const handleApplyFilters = useCallback(() => {
    dispatch(
      fetchPenaltiesData({
        token: authToken,
      })
    );
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
          <Header title={'Штрафы'} titlePrefix={'Отчёт'} hasShadow={false} />
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

        <NewFilterGroup pageIdent='penalty' filtersData={penaltyFilters} isLoading={isFiltersLoading} getData={handleApplyFilters} />

        {loading &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>
        }

        {tableData?.length > 0 && !loading &&
          <div className={styles.tableContainerWrapper}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
              <RadarTable
                onResize={onResizeColumn}
                resizeable
                rowKey={(record) => record.rowKey}
                config={tableConfig}
                dataSource={tableData}
                defaultExpandedRowKeys={tableData.map(item => item.rowKey)}
                treeMode
                preset='radar-table-default'
                pagination={false}
                stickyHeader
                style={{ tableLayout: 'fixed', width: 'max-content' }}
                paginationContainerStyle={{ display: 'none' }}
                indentSize={45}
                scrollContainerRef={tableContainerRef}
                customCellRender={{
                  idx: [],
                  renderer: (value, record, index, dataIndex) => customCellRender(value,record, index, dataIndex, tableConfig),
                }}
                headerCellWrapperStyle={{
                  fontSize: 'inherit',
                  padding: '12px 25px 12px 10px'
                }}
                bodyCellWrapperStyle={{
                  padding: '5px 10px',
                  border: 'none',
                }}
                bodyCellWrapperClassName={styles.bodyCellWrapperCustomClassName}
                bodyCellStyle={{
                  //borderBottom: '1px solid #E8E8E8',
                  height: '35px',
                }}
                bodyRowClassName={styles.bodyRowSpecial}
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

export default WeeklyReportPenaltiesPage;
