import { useState, useContext, useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ReportAbcAnalysis.module.css';
import upArrow from '../assets/up.svg';
import downArrow from '../assets/down.svg';
import BottomNavigation from '../components/BottomNavigation';
import AuthContext from '../service/AuthContext';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { fetchABCFilters } from '@/redux/reportABC/abcFiltersActions';
import abcFake from '../pages/images/abc_fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup';
import { formatPrice } from '@/service/utils';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { useDemoMode } from "@/app/providers";
import { Table as RadarTable } from 'radar-ui';
import { ConfigProvider, Segmented } from 'antd';
import { RadarLoader } from '@/shared';

const proceedTableConfig = [
  {
    title: 'Артикул и товары',
    dataIndex: 'wb_id',
    key: 'wb_id',
  },
  {
    title: 'Выручка',
    dataIndex: 'proceeds',
    key: 'proceeds',
    units: '₽',
  },
  {
    title: 'Доля выручки',
    dataIndex: 'proceeds_percent',
    key: 'proceeds_percent',
    units: '%',
  },
  {
    title: 'Категория по выручке',
    dataIndex: 'proceed_abc',
    key: 'proceed_abc',
  },
  {
    title: 'Общая категория',
    dataIndex: 'common_abc',
    key: 'common_abc',
  }
];
const profitTableConfig = [
  {
    title: 'Артикул и товары',
    dataIndex: 'wb_id',
    key: 'wb_id',
  },
  {
    title: 'Прибыль',
    dataIndex: 'profit',
    key: 'profit',
    units: '₽',
  },
  {
    title: 'Доля прибыли',
    dataIndex: 'profit_percent',
    key: 'profit_percent',
    units: '%',
  },
  {
    title: 'Категория по выручке',
    dataIndex: 'profit_abc',
    key: 'profit_abc',
  },
  {
    title: 'Общая категория',
    dataIndex: 'common_abc',
    key: 'common_abc',
  }
];




const getTableData = (data) => {
  if (!data) return [];
  const arr = data.map((item) => ({
    isParent: true,
    wb_id: item.wb_id,
    rowKey: item.wb_id,
    children: item.items.map((child) => ({
      ...item,
      wb_id: child.title,
      isChild: true,
      rowKey: child.barcode,
    }))
  }));
  return arr;
};

const customCellRender = (value, record, index, dataIndex, tableConfig) => {
  const colorMap = {
    A: '#4AD99133',
    B: '#F0AD0033',
    C: '#FB450033',
  };

  if (dataIndex === 'wb_id' && record.isParent) {
    return <div className={styles.customCell} style={{ fontWeight: '700' }}>{value}</div>;
  }
  if (dataIndex === 'wb_id' && !record.isParent) {
    return <div className={styles.customCell} style={{ paddingLeft: '30px' }}>{value}</div>;
  }
  if (dataIndex === 'proceed_abc' || dataIndex === 'profit_abc' || dataIndex === 'common_abc') {
    return <div className={`${styles.customCell}`}>
      <div
        className={`${styles.categoryColoredItem} ${styles.abcBar}`}
        style={{
          backgroundColor:
            colorMap[value] || 'transparent',
          height: '30px',
          width: '30px',
          borderRadius: '6px',
        }}
      >
        {value}
      </div>
    </div>;
  }
  const currElem = tableConfig.find(item => item.dataIndex === dataIndex);
  if (!record.isParent) {
    return <div className={styles.customCell}>{currElem.units ? formatPrice(value, currElem.units) : value}</div>;
  }
};

const ReportAbcAnalysis = () => {
  const { isDemoMode } = useDemoMode();
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  const dispatch = useDispatch();
  const { abcFilters, isFiltersLoading } = useSelector((state) => state?.abcFiltersSlice);
  const [error, setError] = useState(null);
  const { authToken, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('По выручке');
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [dataRevenue, setDataRevenue] = useState([]);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchABCFilters(authToken));
  }, [authToken, dispatch]);

  const applyFilters = useCallback(async () => {
    setIsRevenueLoading(true);
    setError(null);

    try {
      const data = await ServiceFunctions.postAbcReportsData(authToken);
      setDataRevenue(getTableData(data));
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsRevenueLoading(false);
    }
  }, [authToken, isFiltersLoading]);


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
          <Header title={'ABC-анализ'} titlePrefix={'Отчёт'} hasShadow={false} />
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

        <NewFilterGroup pageIdent='abc' filtersData={abcFilters} isLoading={isFiltersLoading} getData={applyFilters} setActiveTab={setActiveTab} activeTab={activeTab} />


        {(isRevenueLoading || isFiltersLoading) &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>
        }
        
        {dataRevenue.length > 0 && !isRevenueLoading && !isFiltersLoading &&
          <div className={styles.tableContainerWrapper}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
              <RadarTable
                rowKey={(record) => record.rowKey}
                defaultExpandedRowKeys={[dataRevenue[0].rowKey]}
                config={activeTab === 'По выручке' ? proceedTableConfig : profitTableConfig}
                dataSource={dataRevenue}
                treeMode
                preset='radar-table-default'
                pagination={false}
                stickyHeader
                style={{ tableLayout: 'fixed', width: 'max-content', minWidth: '100%' }}
                paginationContainerStyle={{ display: 'none' }}
                indentSize={45}
                scrollContainerRef={tableContainerRef}
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
                  // borderBottom: '1px solid #E8E8E8',
                  height: '50px',
                }}
                bodyRowClassName={styles.bodyRowSpecial}
                customCellRender={{
                  idx: [],
                  renderer: (value, record, index, dataIndex) => customCellRender(value, record, index, dataIndex, activeTab === 'По выручке' ? proceedTableConfig : profitTableConfig),
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
export default ReportAbcAnalysis;
