import { useEffect, useContext, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportByMonth } from '../redux/reportByMonth/reportByMonthActions';
import { fetchByMonthFilters } from '../redux/reportByMonth/byMonthFiltersAction';
import AuthContext from '../service/AuthContext';
import styles from './WeeklyReportByMonth.module.css';
import SalesTable from '../components/SaleTable';
import BottomNavigation from '../components/BottomNavigation';
import plFake from '../pages/images/month-fake.png';
import DemonstrationSection from '../components/DemonstrationSection';
import NewFilterGroup from '../components/finReport/FilterGroup';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import NoSubscriptionWarningBlock from '../components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { Table as RadarTable } from 'radar-ui';
import { useDemoMode } from "@/app/providers";
import moment from 'moment';
import { formatPrice } from '@/service/utils';
import { RadarLoader } from '@/shared';

const tableConfig = [
  {
    title: 'Продажи',
    dataIndex: 'sales',
    key: 'sales',
    fixed: true,
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
    },
    children: [
      {
        title: 'Неделя',
        dataIndex: 'period',
        key: 'period',
        fixed: true,
        width: 250,
        style: {
          background: '#F7F6FE',
          borderRadius: '12px 0 0 12px',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      }
    ]
  },
  {
    title: '',
    dataIndex: 'sales_group',
    key: 'sales_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Выкупы",
        dataIndex: 'purchases',
        key: 'purchases',
        units: '₽',
        compareUnits: 'шт',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Возвраты",
        dataIndex: 'return',
        key: 'return',
        units: '₽',
        compareUnits: 'шт',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Продажи и выручка",
        dataIndex: 'revenue',
        key: 'revenue',
        units: '₽',
        compareUnits: 'шт',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Средняя цена продажи",
        dataIndex: 'avg_check',
        key: 'avg_check',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "СПП",
        dataIndex: 'avg_spp',
        key: 'avg_spp',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Выкуп",
        dataIndex: 'purchase_percent',
        key: 'purchase_percent',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      }
    ]
  },
  {
    title: 'Себестоимость',
    dataIndex: 'cost_price',
    key: 'cost_price_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Себестоимость",
        dataIndex: 'cost_price',
        key: 'cost_price',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Себестоимость на единицу",
        dataIndex: 'cost_price_per_one',
        key: 'cost_price_per_one',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      }
    ]
  },
  {
    title: 'Комиссии и Логистика',
    dataIndex: 'commission_and_logistics',
    key: 'commission_and_logistics',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Кол-во доставок",
        dataIndex: 'deliveries',
        key: 'deliveries',
        units: 'шт',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Комиссии",
        dataIndex: 'wb_commission',
        key: 'wb_commission',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Эквайринг",
        dataIndex: 'acquiring',
        key: 'acquiring',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Логистика доставок",
        dataIndex: 'logistics_straight',
        key: 'logistics_straight',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Логистика возвратов",
        dataIndex: 'logistics_reverse',
        key: 'logistics_reverse',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Логистика итого",
        dataIndex: 'logistics_total',
        key: 'logistics_total',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Логистика на единицу",
        dataIndex: 'logistics_per_product',
        key: 'logistics_per_product',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      },
    ]
  },
  {
    title: 'Компенсации и штрафы/доплаты',
    dataIndex: 'compensation_and_fines_group',
    key: 'compensation_and_fines_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Компенсации брака",
        dataIndex: 'compensation_defects',
        key: 'compensation_defects',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      // {
      //   title: "Кол-во брака",
      //   dataIndex: 'compensation_defects_quantity',
      //   key: 'compensation_defects_quantity',
      //   units: 'шт',
      //   style: {
      //     background: '#F7F6FE',
      //     verticalAlign: 'middle',
      //     fontSize: '14px',
      //   }
      // },
      {
        title: "Компенсации ущерба",
        dataIndex: 'compensation_damage',
        key: 'compensation_damage',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      // {
      //   title: "Кол-во ущерба",
      //   dataIndex: 'compensation_damage_quantity',
      //   key: 'compensation_damage_quantity',
      //   units: 'шт',
      //   style: {
      //     background: '#F7F6FE',
      //     verticalAlign: 'middle',
      //     fontSize: '14px',
      //   }
      // },
      {
        title: "Штрафы",
        dataIndex: 'penalties',
        key: 'penalties',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Доплаты",
        dataIndex: 'additional_payments',
        key: 'additional_payments',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      }
    ]
  },
  {
    title: 'Другие удержания',
    dataIndex: 'other_retentions_group',
    key: 'other_retentions_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Хранение",
        dataIndex: 'storage',
        key: 'storage',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Прочие удержания",
        dataIndex: 'other_retentions',
        key: 'other_retentions',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Платная приёмка",
        dataIndex: 'acceptance',
        key: 'acceptance',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Все удержания WB",
        dataIndex: 'compensation_penalties',
        key: 'compensation_penalties',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      }
    ]
  },
  {
    title: 'Внешние расходы',
    dataIndex: 'exp_group',
    key: 'exp_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "Затраты на самовыкупы",
        dataIndex: 'self_purchase_costs',
        key: 'self_purchase_costs',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Внешние расходы",
        dataIndex: 'expenses_percent',
        key: 'expenses_percent',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Всего внешних расходов",
        dataIndex: 'external_expenses',
        key: 'external_expenses',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      },
    ]
  },
  {
    title: 'Налог',
    dataIndex: 'tax_group',
    key: 'tax_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',
      borderRight: '1px solid #E8E8E8',
    },
    children: [
      {
        title: "СПП + WB реализовал",
        dataIndex: 'sold_by_wb',
        key: 'sold_by_wb',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Налоговая база",
        dataIndex: 'tax_base',
        key: 'tax_base',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Налог",
        dataIndex: 'tax',
        key: 'tax',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRight: '1px solid #E8E8E8',
        }
      },
    ]
  },
  {
    title: 'Финансы',
    dataIndex: 'finance_group',
    key: 'finance_group',
    style: {
      zIndex: 3,
      color: 'black',
      fontSize: '18px',

    },
    children: [
      {
        title: "Оплата на Р/С",
        dataIndex: 'payment',
        key: 'payment',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Чистая прибыль",
        dataIndex: 'profit',
        key: 'profit',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Чистая прибыль на единицу",
        dataIndex: 'profit_per_one',
        key: 'profit_per_one',
        units: '₽',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "Маржинальность по прибыли",
        dataIndex: 'marginality',
        key: 'marginality',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
        }
      },
      {
        title: "ROI",
        dataIndex: 'return_on_investment',
        key: 'return_on_investment',
        units: '%',
        width: 150,
        style: {
          background: '#F7F6FE',
          verticalAlign: 'middle',
          fontSize: '14px',
          borderRadius: '0 12px 12px 0',
        }
      },
    ]
  }
].map(_ => ({ ..._, colSpan: _.children?.length }));

const getTableData = (data) => {
  if (!data) return [];

  const arr = []

  Object.keys(data).forEach(key => {
    let children;
    let total;
    let indentSize = 90;
    if (data[key]?.months && !Array.isArray(data[key].months)) {
      children = getTableData(data[key].months);
      indentSize = 0;
    }
    if (data[key]?.weeks) {
      children = getTableData(data[key].weeks);
      indentSize = 45;
    }

    if (data[key]?.total) {
      total = data[key]?.total;
    }

    if (data[key]?.data) {
      total = data[key]?.data;
    }

    const row = {
      rowKey: key,
      period: key,
      ...total,
      indentSize: indentSize,
    }
    if (children) {
      row.children = children;
      row.isParent = true
    }

    if (!children) {
      row.isLastChild = key === Object.keys(data)[Object.keys(data).length - 1];
    }
    arr.push(row);

  });

  return arr;
};

const customCellRender = (value, record, index, dataIndex, expandedRowKeys, tableConfig) => {
  const rightBorders = ['purchase_percent', 'cost_price_per_one', 'logistics_per_product', 'additional_payments', 'compensation_penalties', 'external_expenses_total', 'tax', 'return_on_investment']
  const isExpanded = expandedRowKeys.includes(record.rowKey);
  if (dataIndex === 'period') {
    return (
      <div
        className={styles.customCell}
        data-ident-size={record.indentSize}
        style={{
          fontWeight: record.isParent ? '700' : '500',
        }}
        data-is-month-last-child={record.isLastChild}
      >
        {record.isParent && value}
        {!record.isParent && moment(value).format('DD.MM.YYYY')}
      </div>
    );
  }

  if (typeof value === 'object') {
    return (
      <div
        className={styles.customCell}
        data-border-right={rightBorders.includes(dataIndex)}
      >
        {!isExpanded && Object.keys(value).map((key, idx) => {
          const units = key === 'rub' ? '₽' : key === 'percent' ? '%' : key === 'quantity' ? 'шт' : ' ';
          return <span key={key} style={{ fontWeight: idx === 0 ? '700' : '500' }}>{formatPrice(value[key], units)}</span>
        })}
      </div>
    );
  }

  const configChildren = tableConfig.map(item => item.children).flat();
  const currElem = configChildren.find(item => item.dataIndex === dataIndex);

  return (
    <div
      className={styles.customCell}
      data-border-right={rightBorders.includes(dataIndex)}
    >
      {!isExpanded && formatPrice(value, currElem.units)}
    </div>
  );
}

const WeeklyReportByMonth = () => {
  const { isDemoMode } = useDemoMode();
  const { authToken, user } = useContext(AuthContext);
  const tableContainerRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { weeklyData } = useSelector(
    (state) => state.reportByMonthSlice
  );
  const { byMonthFilters, isFiltersLoading } = useSelector((state) => state?.byMonthFiltersSlice);

  useEffect(() => {
    dispatch(fetchByMonthFilters(
      authToken
    ));
  }, [authToken, dispatch]);

  useEffect(() => {
    if (weeklyData) {
      const data = getTableData(weeklyData);
      const defaultExpandedRowKeys = [data[0]?.rowKey, data[0]?.children[0]?.rowKey];
      setExpandedRowKeys(defaultExpandedRowKeys);
      setTableData(data);
    }
  }, [weeklyData]);

  const handleExpandedRowsChange = (keys) => {
    setExpandedRowKeys(keys);
  };

  const handleFetchReport = useCallback(() => {
    setLoading(true);
    dispatch(
      fetchReportByMonth({
        authToken: authToken,
      })
    ).then(() => {
      setLoading(false);
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
          <Header title={'По месяцам'} titlePrefix={'Отчёт'} hasShadow={false} />
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

        <NewFilterGroup
          pageIdent='month'
          filtersData={byMonthFilters}
          isLoading={isFiltersLoading}
          getData={handleFetchReport}
        />
        {loading &&
          <div className={styles.tableWrapper}>
            <RadarLoader loaderStyle={{ height: '50vh', backgroundColor: 'white' }} />
          </div>
        }

        {tableData?.length > 0 && !loading &&
          <div className={styles.tableContainerWrapper}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
              <RadarTable
                resizeable
                rowKey={(record) => record.rowKey}
                config={tableConfig}
                dataSource={tableData}
                treeMode
                preset='radar-table-simple'
                pagination={false}
                stickyHeader
                style={{ tableLayout: 'fixed', width: 'max-content', minWidth: '100%', marginRight: '16px' }}
                paginationContainerStyle={{ display: 'none' }}
                indentSize={45}
                expandedRowKeys={expandedRowKeys}
                scrollContainerRef={tableContainerRef}
                onExpandedRowsChange={handleExpandedRowsChange}
                customCellRender={{
                  idx: [],
                  renderer: (value, record, index, dataIndex) => customCellRender(value, record, index, dataIndex, expandedRowKeys, tableConfig),
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
                  height: '50px',
                }}
                bodyRowClassName={styles.bodyRowSpecial}
              />
            </div>
          </div>
        }

        <BottomNavigation />
      </section>
      {/* ---------------------- */}
    </main >
  )
};

export default WeeklyReportByMonth;

