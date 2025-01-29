import React, { useState, useEffect } from 'react';
import styles from './SaleTable.module.css';
import arrowDown from '../assets/arrow-down.svg';
import TableSections from './SaleTableSections';
import TableSectionsEmpty from './SaleTableSectionsEmpty';

const SalesTable = ({ tableData }) => {

  const [expandedRows, setExpandedRows] = useState({});

  const calculateYearTotals = (yearData) => {
  
    return yearData.total;
  };
  

  useEffect(() => {
    if (tableData && Object.keys(tableData).length > 0) {
      const newState = {};
      Object.entries(tableData).forEach(([year, yearData]) => {
        newState[year] = true;
        // Handle months data
        if (yearData.months) {
          Object.entries(yearData.months).forEach(([month, monthData]) => {
            newState[`month-${year}-${month}`] = true;
            // Handle weeks data
            if (monthData.weeks) {
              Object.entries(monthData.weeks).forEach(([date, weekData]) => {
                newState[`week-${date}`] = true;
              });
            }
          });
        }
      });
      setExpandedRows(newState);
    }
  }, [tableData]);

  const groupWeeksByMonth = (yearData) => {

    return yearData.months;
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

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      
      // Check for invalid date
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
    
      // Extract UTC components to avoid timezone issues
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
    
      return `${day}.${month}.${year}`;
    };
    return (
      <div key={date}>
        <div className={styles.row} onClick={() => toggleRow(`week-${date}`)}>
          <div
            className={styles.weekCellDate}
          >
            {formatDate(date)}
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
              ([month, monthData]) => {
               
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
                          <TableSections data={monthData.total} isMonthTotal={true}/>
                        )}
                        {expandedRows[`month-${year}-${month}`] && (
                          <TableSectionsEmpty />
                        )}
                      </div>
                    </div>
                    {/* Weeks for this month */}
                    {expandedRows[`month-${year}-${month}`] && (
                      <div>
                        {Object.entries(monthData.weeks).map(([date, weekData]) =>
                      renderWeekRow(date, weekData.data)
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