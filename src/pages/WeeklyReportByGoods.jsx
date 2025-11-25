import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByGoods } from '@/redux/reportByGoods/reportByGoodsActions';
import { fetchByGoodsFilters } from '@/redux/reportByGoods/byGoodsFiltersAction';
import AuthContext from '../service/AuthContext';
import TableByGoods from '../components/TableByGoods';
import BottomNavigation from '../components/BottomNavigation';
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import DemonstrationSection from '../components/DemonstrationSection';
import { useDemoMode } from "@/app/providers";
import styles from './WeeklyReportByGoods.module.css';
import { Table as RadarTable } from 'radar-ui';
import { formatPrice } from '@/service/utils';
import { RadarLoader } from '@/shared';

const tableConfig = [
  {
    title: 'Продажи',
    key: 'sales_group',
    fixed: true,
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Артикул',
        key: 'vendorCode',
        dataIndex: 'vendorCode',
        fixed: true,
        width: 200,
        style: {
          background: '#F7F6FE',
          borderRadius: '12px 0 0 12px',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Товар',
        key: 'name',
        dataIndex: 'name',
        fixed: true,
        width: 300,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: '',
    key: 'sales_second_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Выкупы',
        key: 'purchases',
        dataIndex: 'purchases',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Возвраты',
        key: 'return',
        dataIndex: 'return',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Продажи и выручка',
        key: 'revenue',
        dataIndex: 'revenue',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      // {
      //   title: 'Выручка',
      //   key: 'revenue',
      //   dataIndex: 'revenue',
      // },
      {
        title: 'Ср. цена продажи',
        key: 'avg_check',
        dataIndex: 'avg_check',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'СПП',
        key: 'avg_spp',
        dataIndex: 'avg_spp',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Выкуп',
        key: 'purchase_percent',
        dataIndex: 'purchase_percent',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Себестоимость',
    key: 'cost_price_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Себестоимость',
        key: 'cost_price',
        dataIndex: 'cost_price',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Себестоимость на единицу',
        key: 'cost_price_per_one',
        dataIndex: 'cost_price_per_one',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Комиссия и логистика',
    key: 'logistics_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Кол-во доставок',
        key: 'deliveries',
        dataIndex: 'deliveries',
        units: 'шт',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Комиссия',
        key: 'wb_commission',
        dataIndex: 'wb_commission',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Эквайринг',
        key: 'acquiring',
        dataIndex: 'acquiring',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Логистика доставок',
        key: 'logistics_straight',
        dataIndex: 'logistics_straight',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Логистика возвратов',
        key: 'logistics_reverse',
        dataIndex: 'logistics_reverse',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Логистика итого',
        key: 'logistics_total',
        dataIndex: 'logistics_total',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Логистика на единицу',
        key: 'logistics_per_product',
        dataIndex: 'logistics_per_product',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Компенсации и штрафы/доплаты',
    key: 'compensation_and_fines_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Компенсации брака и количество',
        key: 'compensation_defects',
        dataIndex: 'compensation_defects',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Компенсации ущерба и количество',
        key: 'compensation_damage',
        dataIndex: 'compensation_damage',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Штрафы',
        key: 'penalties',
        dataIndex: 'penalties',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Доплаты',
        key: 'additional_payments',
        dataIndex: 'additional_payments',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Другие удержания',
    key: 'other_retentions_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Хранение',
        key: 'storage',
        dataIndex: 'storage',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Прочие удержания',
        key: 'other_retentions',
        dataIndex: 'other_retentions',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Платная приёмка',
        key: 'acceptance',
        dataIndex: 'acceptance',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Все удержания WB',
        key: 'compensation_penalties',
        dataIndex: 'compensation_penalties',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Налог',
    key: 'tax_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'СПП + WB реализовал',
        key: 'sold_by_wb',
        dataIndex: 'sold_by_wb',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Налоговая база',
        key: 'tax_base',
        dataIndex: 'tax_base',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Налог',
        key: 'tax',
        dataIndex: 'tax',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
    ],
  },
  {
    title: 'Финансы',
    key: 'finance_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      background: 'white',
    },
    children: [
      {
        title: 'Оплата на Р/С',
        key: 'payment',
        dataIndex: 'payment',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Чистая прибыль',
        key: 'profit',
        dataIndex: 'profit',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Чистая прибыль на единицу',
        key: 'profit_per_one',
        dataIndex: 'profit_per_one',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'Маржинальность по прибыли',
        key: 'marginality',
        dataIndex: 'marginality',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: 'ROI',
        key: 'return_on_investment',
        dataIndex: 'return_on_investment',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRadius: '0 12px 12px 0',
        }
      },
    ],
  }
].map(_ => ({ ..._, colSpan: _.children?.length }));

const getTableData = (data) => {
  if (!data) return [];
  const arr = []
  Object.keys(data).forEach(key => {
    let row = {
      vendorCode: key,
      ...data[key],
    }
    arr.push(row);
  })
  return arr;
}

const customCellRender = (value, record, index, dataIndex) => {
  const rightBorders = ['purchase_percent', 'cost_price_per_one', 'logistics_per_product', 'additional_payments', 'compensation_penalties', 'external_expenses_total', 'tax', 'return_on_investment']
  if (dataIndex === 'vendorCode') {
    return (
      <div
        className={styles.customCell}
        style={{
          fontWeight: '700',
        }}
      >
        {value}
      </div>
    );
  }

  if (typeof value === 'object') {
    return (
      <div
        className={styles.customCell}
        data-border-right={rightBorders.includes(dataIndex)}
      >
        {Object.keys(value).map((key, idx) => {
          const units = key === 'rub' ? '₽' : key === 'percent' ? '%' : key === 'quantity' ? 'шт' : ' ';
          return <span key={key} style={{ fontWeight: idx === 0 ? '700' : '500' }}>{formatPrice(value[key], units)}</span>
        })}
      </div>
    );
  }


  return (
    <div
      className={styles.customCell}
      data-border-right={rightBorders.includes(dataIndex)}
    >
      {formatPrice(value, ' ')}
      </div>
  );
}



const WeeklyReportByGoods = () => {
  const { isDemoMode } = useDemoMode();
  const { authToken, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { weeklyData, loading, error } = useSelector(state => state.reportByGoodsSlice);
  const { byGoodsFilters, isFiltersLoading } = useSelector((state) => state?.byGoodsFiltersSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const tableContainerRef = useRef(null);
  useEffect(() => {
    dispatch(fetchByGoodsFilters(
      authToken
    ));
  }, [authToken, dispatch]);

  const handleFetchReport = useCallback(() => {
    setIsLoading(true);
    dispatch(
      fetchReportByGoods({
        authToken: authToken,
      })
    ).then(() => {
      setIsLoading(false);
    });
  }, [authToken, dispatch, isFiltersLoading]);

  useEffect(() => {
    if (weeklyData) {
      const data = getTableData(weeklyData);
      console.log(data);
      setTableData(data);
    }
  }, [weeklyData]);

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
          <Header title={'По товарам'} titlePrefix={'Отчёт'} hasShadow={false} />
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

        {/* filters */}
        <NewFilterGroup pageIdent='goods' filtersData={byGoodsFilters} isLoading={isFiltersLoading} getData={handleFetchReport} />

        {isLoading &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>
        }

        {/* table */}
        {tableData?.length > 0 && !isLoading &&
          <div className={styles.tableContainerWrapper}>
            <div className={styles.tableContainer}>
              <RadarTable
                resizeable
                config={[...tableConfig]}
                dataSource={tableData}
                preset='radar-table-simple'
                pagination={false}
                style={{ tableLayout: 'fixed', width: 'max-content', minWidth: '100%', marginRight: '16px' }}
                paginationContainerStyle={{ display: 'none' }}
                scrollContainerRef={tableContainerRef}
                stickyHeader
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
                  borderBottom: '1px solid #E8E8E8',
                  height: '50px',
                }}
                bodyRowClassName={styles.bodyRowSpecial}
                customCellRender={{
                  idx: [
                    'purchases',
                    'return',
                    'revenue',
                    'wb_commission',
                    'acquiring',
                    'logistics_total',
                    'compensation_defects',
                    'compensation_damage',
                    'storage',
                    'other_retentions',
                    'acceptance',
                    'compensation_penalties',
                    'vendorCode'
                  ],
                  renderer: customCellRender,
                }}
              />
            </div>
          </div>
        }

        {/* bottom nav */}
        <BottomNavigation />
      </section>
      {/* ---------------------- */}
    </main>
  )
};
export default WeeklyReportByGoods;
