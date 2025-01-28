import React, { useState, useEffect } from 'react';
import styles from './SaleTable.module.css';
import arrowDown from '../assets/arrow-down.svg';
import TableSections from './SaleTableSections';
import TableSectionsEmpty from './SaleTableSectionsEmpty';

const SalesTable = ({ tableData }) => {

  const [expandedRows, setExpandedRows] = useState({});

  const calculateMonthTotals = (weeks) => {
    // For demo purposes, returning structured fake data
    return {
      purchases: {
        rub: 1250000,
        quantity: 500,
      },
      return: {
        rub: 125000,
        quantity: 50,
      },
      revenue: {
        quantity: 450,
        rub: 1125000,
      },
      avg_check: 2500,
      avg_spp: 85,
      purchase_percent: 90,
      cost_price: 562500,
      cost_price_percent: 50,
      deliveries: 475,
      wb_commission: {
        rub: 168750,
        percent: 15,
      },
      acquiring: {
        rub: 22500,
        percent: 2,
      },
      logistics_straight: {
        rub: 71250,
      },
      logistics_reverse: {
        rub: 7125,
      },
      logistics_total: {
        rub: 78375,
        percent: 7,
      },
      logistics_per_product: 174,
      compensation_defects: {
        rub: 11250,
        quantity: 5,
      },
      compensation_damage: {
        rub: 5625,
        quantity: 3,
      },
      compensation_penalties: {
        rub: 11250,
      },
      storage: {
        rub: 33750,
        percent: 3,
      },
      other_retentions: {
        rub: 22500,
        percent: 2,
      },
      acceptance: {
        rub: 11250,
        percent: 1,
      },
      self_purchase_costs: 25000,
      external_expenses: 56250,
      expenses_percent: 5,
      expenses: 81250,
      sold_by_wb: 1125000,
      tax_base: 843750,
      tax: 50625,
      payment: 793125,
      profit: 168750,
      marginality: 15,
      return_on_investment: 30,
    };
  };

  const calculateYearTotals = (yearData) => {
    // Convert yearData object into array of week data
    const allWeeksData = Object.values(yearData).map(weekData => weekData.data);
    
    // Use the same calculation logic as calculateMonthTotals
    return calculateMonthTotals(allWeeksData);
  };
  

  useEffect(() => {
    if (tableData && Object.keys(tableData).length > 0) {
      const newState = {};
      Object.entries(tableData).forEach(([year, yearData]) => {
        newState[year] = true;
        Object.entries(yearData).forEach(([date, weekData]) => {
          const month = weekData.months[0];
          newState[`month-${year}-${month}`] = true;
          newState[`week-${date}`] = true;
        });
      });
      setExpandedRows(newState);
    }
  }, [tableData]);

  const groupWeeksByMonth = (yearData) => {
    const monthGroups = {};

    Object.entries(yearData).forEach(([date, weekData]) => {
      const month = weekData.months[0];
      if (!monthGroups[month]) {
        monthGroups[month] = [];
      }
      monthGroups[month].push({ date, data: weekData.data });
    });

    return monthGroups;
  };

  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  

  const renderWeekRow = (date, data) => {
    if (!data) {
      return null;
    }
    return (
      <div key={date}>
        <div className={styles.row} onClick={() => toggleRow(`week-${date}`)}>
          <div
            className={styles.weekCellDate}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {date}
            <span
              className={`${styles.dropdownArrow} ${
                expandedRows[`week-${date}`] ? styles.dropdownArrowExpanded : ''
              }`}
            >
              <img src={arrowDown} alt='Dropdown Arrow' />
            </span>
          </div>
          {expandedRows[`week-${date}`] && (
            <div key={date} className={styles.row}>
              <TableSections data={data}/>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderYearData = () => {
    return Object.entries(tableData).map(([year, yearData]) => (
      <div key={year}>
        <div className={styles.weekCellYear} style={{ display: 'flex' }}>
          <div
            className={styles.yearToggle}
            onClick={(e) => {
              e.stopPropagation();
              toggleRow(year);
            }}
          >
            <span>{year}</span>
            <span
              className={`${styles.dropdownArrow} ${
                expandedRows[year] ? styles.dropdownArrowExpanded : ''
              }`}
            >
              <img src={arrowDown} alt='Dropdown Arrow' />
            </span>
          </div>
          {!expandedRows[year] && (
          <TableSections data={calculateYearTotals(yearData)} isYearTotal={true}/>
        )}
          <div style={{ display: 'flex' }}>
            <div style={{ width: '808px' }}></div>
            <div
              style={{ width: '272px', background: 'rgba(83, 41, 255, 0.05)' }}
            ></div>
            <div style={{ width: '896px' }}></div>
            <div
              style={{ width: '768px', background: 'rgba(83, 41, 255, 0.05)' }}
            ></div>
            <div style={{ width: '512px' }}></div>
            <div
              style={{ width: '384px', background: 'rgba(83, 41, 255, 0.05)' }}
            ></div>
            <div style={{ width: '384px' }}></div>
            <div
              style={{ width: '660px', background: 'rgba(83, 41, 255, 0.05)' }}
            ></div>
          </div>
        </div>
        {expandedRows[year] && (
          <div>
            {Object.entries(groupWeeksByMonth(yearData)).map(
              ([month, weeks]) => {
                const monthTotals = calculateMonthTotals(weeks);
                return (
                  <div key={`${year}-${month}`}>
                    {/* Month header */}
                    <div key={month} className={styles.row}>
                      <div
                        className={styles.monthHeader}
                        onClick={() => toggleRow(`month-${year}-${month}`)}
                      >
                        <div className={styles.weekCellDateMonth} >
                          <span className={styles.weekCellDateMonthText}>{month}</span>
                          <span className={styles.dropdownArrow}>
                            <img src={arrowDown} alt='Dropdown Arrow' />
                          </span>
                        </div>
                        {!expandedRows[`month-${year}-${month}`] && (
                          <TableSections data={monthTotals} isMonthTotal={true}/>
                        )}
                        {expandedRows[`month-${year}-${month}`] && (
                          <TableSectionsEmpty />
                        )}
                      </div>
                    </div>
                    {/* Weeks for this month */}
                    {expandedRows[`month-${year}-${month}`] && (
                      <div>
                        {weeks.map(({ date, data }) =>
                          renderWeekRow(date, data)
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      {/* Header - Always visible */}
      <div className={styles.header} style={{ width: '334%' }}>
        <div className={styles.weekCellEmptyHeader}>
          <div className={styles.headerWeekText}>Неделя</div>
        </div>

        {/* Sales Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Продажи</div>
          <div className={styles.flexContainer}>
            <div className={`${styles.purchaseCell} ${styles.greyColor}`}>
              Выкупы
            </div>
            <div className={`${styles.returnCell} ${styles.greyColor}`}>
              Возвраты
            </div>
            <div className={`${styles.salesCell} ${styles.greyColor}`}>
              Продажи
            </div>
            <div className={`${styles.revenueCell} ${styles.greyColor}`}>
              Выручка
            </div>
            <div className={`${styles.avgPriceCell} ${styles.greyColor}`}>
              Ср. цена продажи
            </div>
            <div className={`${styles.sppCell} ${styles.greyColor}`}>СПП</div>
            <div className={`${styles.buyoutCell} ${styles.greyColor}`}>
              Выкуп
            </div>
          </div>
        </div>

        {/* Cost Section */}
        <div
          className={` ${styles.headerSection} ${styles.costSection} ${styles.diffBacckground}`}
        >
          <div className={styles.headerText}>Себестоимость</div>
          <div className={`${styles.flexContainer} ${styles.costContainer}`}>
            <div className={`${styles.costCell} ${styles.greyColor}`}>
              Себестоимость
            </div>
            <div className={`${styles.costPerUnitCell} ${styles.greyColor}`}>
              Себестоимость на единицу
            </div>
          </div>
        </div>

        {/* Commission and Logistics Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Комиссии и логистика</div>
          <div className={styles.flexContainer}>
            <div className={`${styles.deliveryCountCell} ${styles.greyColor}`}>
              Кол-во доставок
            </div>
            <div className={`${styles.commissionCell} ${styles.greyColor}`}>
              Комиссии
            </div>
            <div className={`${styles.acquiringCell} ${styles.greyColor}`}>
              Эквайринг
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor}`}>
              Логистика доставок
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor}`}>
              Логистика возвратов
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor}`}>
              Логистика склад
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor}`}>
              Логистика на единицу
            </div>
          </div>
        </div>

        {/* Compensation Section */}
        <div className={`${styles.headerSection} ${styles.diffBacckground}`}>
          <div className={styles.headerText}>Компенсации и штрафы/доплаты</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Компенсации брака
            </div>
            <div className={`${styles.defectQuantityCell} ${styles.greyColor}`}>
              Кол-во брака
            </div>
            <div
              className={`${styles.damageCompensationCell} ${styles.greyColor}`}
            >
              Компенсации ущерба
            </div>
            <div className={`${styles.damageQuantityCell} ${styles.greyColor}`}>
              Кол-во <br />
              ущерба
            </div>
            <div className={`${styles.finesCell} ${styles.greyColor}`}>
              Штрафы
            </div>
            <div className={`${styles.payMoreCell} ${styles.greyColor}`}>
              Доплаты
            </div>
          </div>
        </div>

        {/* Profit Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Другие удержания</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Хранение
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Прочие удержания
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Платная приёмка
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
              style={{ padding: '4px 0 0 0' }}
            >
              Все удержания WB
            </div>
          </div>
        </div>
        {/* outside debit Section */}
        <div className={`${styles.headerSection} ${styles.diffBacckground}`}>
          <div className={styles.headerText}>Внешние расходы</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Затраты на самовыкупы
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Внешние расходы
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
              style={{ padding: '4px 0 0 0' }}
            >
              Всего внешних расходов
            </div>
          </div>
        </div>
        {/* Tax Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Налог</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              СПП + WB реализовал
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Налоговая база
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Налог
            </div>
          </div>
        </div>
        {/* Finance Section */}
        <div className={`${styles.headerSection}  ${styles.diffBacckground}`}>
          <div className={styles.headerText}>Финансы</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
              style={{ padding: '4px 0 0 12px' }}
            >
              Оплата на Р/С
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              Чистая прибыль
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
              style={{ padding: '4px 0 0 0' }}
            >
              Чистая
              <br /> прибыль на ед.
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
              style={{ width: '148px' }}
            >
              Маржинальность по прибыли
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
            >
              ROI
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '334%' }}>{tableData && renderYearData()}</div>
    </div>
  );
};

export default SalesTable;
