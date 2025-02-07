import React, { useState, useEffect } from 'react';
import styles from './SaleTable.module.css';
import arrowDown from '../assets/arrow-down.svg';
import TableSections from './SaleTableSections';
import TableSectionsEmpty from './SaleTableSectionsEmpty';
import { useCalculateMaxCellWidths } from '../service/useCalculateMaxCellWidths';

const SalesTable = ({ tableData }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const calculateMaxCellWidths = useCalculateMaxCellWidths(tableData);

  const getMinWidth = (width, minWidth = 128) => {
    return `${width <= minWidth ? minWidth : width}px`;
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
          </div>
            <div key={date} className={styles.row}>
              <TableSections data={data} cellWidths={calculateMaxCellWidths}/>
            </div>
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
            {!expandedRows[year] ? (
          <TableSections data={yearData.total} isYearTotal={true} cellWidths={calculateMaxCellWidths}/>
        ) : (
           <TableSectionsEmpty cellWidths={calculateMaxCellWidths}/>
        )}
       
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
                          <span
                            className={`${styles.dropdownArrow} ${
                              expandedRows[`month-${year}-${month}`] ? styles.dropdownArrowExpanded : ''
                            }`}
                          >
                            <img src={arrowDown} alt='Dropdown Arrow' />
                          </span>
                        </div>
                        {!expandedRows[`month-${year}-${month}`] && (
                          <TableSections data={monthData.total} isMonthTotal={true} cellWidths={calculateMaxCellWidths}/>
                        )}
                        {expandedRows[`month-${year}-${month}`] && (
                          <TableSectionsEmpty cellWidths={calculateMaxCellWidths}/>
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
      <div className={styles.header} style={{ width: 'fit-content' }}>
        <div className={styles.weekCellEmptyHeader}>
          <div className={styles.headerWeekText}>Неделя</div>
        </div>

        {/* Sales Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Продажи</div>
          <div className={styles.flexContainer}>
            <div className={`${styles.purchaseCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.purchaseCell)}}>
              Выкупы
            </div>
            <div className={`${styles.returnCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.returnCell)}}>
              Возвраты
            </div>
            <div className={`${styles.salesCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.salesCell)}}>
              Продажи
            </div>
            <div className={`${styles.revenueCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.revenueCell)}}>
              Выручка
            </div>
            <div className={`${styles.avgPriceCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.avgPriceCell)}}>
              Ср. цена продажи
            </div>
            <div className={`${styles.sppCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.sppCell)}}>СПП</div>
            <div className={`${styles.buyoutCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.buyoutCell)}}>
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
            <div className={`${styles.costCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.costCell)}}>
              Себестоимость
            </div>
            <div className={`${styles.costPerUnitCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.costPerUnitCell)}}>
              Себестоимость на единицу
            </div>
          </div>
        </div>

        {/* Commission and Logistics Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Комиссии и логистика</div>
          <div className={styles.flexContainer}>
            <div className={`${styles.deliveryCountCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.deliveryCountCell)}}>
              Кол-во доставок
            </div>
            <div className={`${styles.commissionCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.commissionCell)}}>
              Комиссии
            </div>
            <div className={`${styles.acquiringCell} ${styles.greyColor}`} style={{width: getMinWidth(calculateMaxCellWidths.acquiringCell)}}>
              Эквайринг
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor} ${styles.logisticDeliveryCell}`} style={{width: getMinWidth(calculateMaxCellWidths.logisticDeliveryCell)}}>
              Логистика доставок
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor} ${styles.logisticReturnCell}`} style={{width: getMinWidth(calculateMaxCellWidths.logisticReturnCell)}}>
              Логистика возвратов
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor} ${styles.logisticStorageCell}`} style={{width: getMinWidth(calculateMaxCellWidths.logisticStorageCell)}}>
              Логистика склад
            </div>
            <div className={`${styles.logisticsCell} ${styles.greyColor} ${styles.logisticUnitCell}`} style={{width: getMinWidth(calculateMaxCellWidths.logisticUnitCell)}}>
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
              style={{width: getMinWidth(calculateMaxCellWidths.defectCompnesaitionCell)}}
            >
              Компенсации брака
            </div>
            <div 
              className={`${styles.defectQuantityCell} ${styles.greyColor}`}
              style={{width: getMinWidth(calculateMaxCellWidths.defectQuantityCell)}}
            >
              Кол-во брака
            </div>
            <div
              className={`${styles.damageCompensationCell} ${styles.greyColor}`}
              style={{width: getMinWidth(calculateMaxCellWidths.damageCompensationCell)}}
            >
              Компенсации ущерба
            </div>
            <div 
              className={`${styles.damageQuantityCell} ${styles.greyColor}`}
              style={{width: getMinWidth(calculateMaxCellWidths.damageQuantityCell)}}
            >
              Кол-во <br />
              ущерба
            </div>
            <div 
              className={`${styles.finesCell} ${styles.greyColor}`}
              style={{width: getMinWidth(calculateMaxCellWidths.finesCell)}}
            >
                Штрафы
            </div>
            <div 
              className={`${styles.payMoreCell} ${styles.greyColor}`}
              style={{width: getMinWidth(calculateMaxCellWidths.payMoreCell)}}
            >
                Доплаты
            </div>
          </div>
        </div>

        {/* Profit Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Другие удержания</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.keepCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.keepCell) }}
            >
              Хранение
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.keepOtherCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.keepOtherCell) }}
            >
              Прочие удержания
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.payForTakeCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.payForTakeCell) }}
            >
              Платная приёмка
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.payWbCell}`}
              style={{ padding: '4px 0 0 0', width: getMinWidth(calculateMaxCellWidths.payWbCell) }}
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
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.selfPurchaseCostCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.selfPurchaseCostCell) }}
            >
              Затраты на самовыкупы
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.externalCostCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.externalCostCell) }}
            >
              Внешние расходы
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.externalCostAllCell}`}
              style={{ padding: '4px 0 0 0', width: getMinWidth(calculateMaxCellWidths.externalCostAllCell) }}
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
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.soldByWbCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.soldByWbCell) }}
            >
              СПП + WB реализовал
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.taxBaseCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.taxBaseCell) }}
            >
              Налоговая база
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.taxCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.taxCell) }}
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
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.payToRsCell}`}
              style={{ padding: '4px 0 0 12px', width: getMinWidth(calculateMaxCellWidths.payToRsCell) }}
            >
              Оплата на Р/С
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.pureProfitCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.pureProfitCell) }}
            >
              Чистая прибыль
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.pureProfitPerUnitCell}`}
              style={{ padding: '4px 0 0 0', width: getMinWidth(calculateMaxCellWidths.pureProfitPerUnitCell) }}
            >
              Чистая
              <br /> прибыль на ед.
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.marginProfitCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.marginProfitCell) }}
            >
              Маржинальность по прибыли
            </div>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor} ${styles.roiCell}`}
              style={{ width: getMinWidth(calculateMaxCellWidths.roiCell) }}
            >
              ROI
            </div>
          </div>
        </div>
      </div>
      {!tableData || Object.keys(tableData).length === 0 ? (
        <div className={styles.loaderContainer}>
          <div className='loader'></div>
        </div>
      ) : (
        <div style={{ width: 'fit-content' }}>{tableData && renderYearData()}</div>
      )}
    </div>
  );
};

export default SalesTable;