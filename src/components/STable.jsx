import React, { useState } from 'react';
import styles from './SaleTable.module.css';

const SalesTable = () => {
  const [expandedRows, setExpandedRows] = useState({
    '2024': true,
    'Октябрь': true,
    'Сентябрь': false
  });

  const toggleRow = (key) => {
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableScroll}>
        {/* Fixed Column */}
        <div className={styles.fixedColumn}>
          {/* Fixed Header */}
          <div className={styles.fixedHeader}>
            <div className={styles.weekCellHeader}>Неделя</div>
          </div>
          
          {/* Fixed Content */}
          <div className={styles.fixedContent}>
            <div className={styles.weekCell}>
              <div className={styles.yearToggle} onClick={() => toggleRow('2024')}>
                <span className={`${styles.dropdownArrow} ${expandedRows['2024'] ? styles.dropdownArrowExpanded : ''}`}>
                  ▶
                </span>
                <span>2024</span>
              </div>
            </div>

            {expandedRows['2024'] && (
              <>
                {/* September */}
                <div className={styles.monthSection}>
                  <div 
                    className={`${styles.monthRow} ${styles.clickable}`}
                    onClick={() => toggleRow('Сентябрь')}
                  >
                    <span className={`${styles.dropdownArrow} ${expandedRows['Сентябрь'] ? styles.dropdownArrowExpanded : ''}`}>
                      ▶
                    </span>
                    <span>Сентябрь</span>
                  </div>
                  {expandedRows['Сентябрь'] && (
                    <div className={styles.weekCell}>30.10.24</div>
                  )}
                </div>

                {/* October */}
                <div className={styles.monthSection}>
                  <div 
                    className={`${styles.monthRow} ${styles.clickable}`}
                    onClick={() => toggleRow('Октябрь')}
                  >
                    <span className={`${styles.dropdownArrow} ${expandedRows['Октябрь'] ? styles.dropdownArrowExpanded : ''}`}>
                      ▶
                    </span>
                    <span>Октябрь</span>
                  </div>
                  {expandedRows['Октябрь'] && (
                    ['07.10.24', '14.10.24', '21.10.24'].map((date) => (
                      <div key={date} className={styles.weekCell}>{date}</div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={styles.scrollableSection}>
          {/* Main Header */}
          <div className={styles.mainHeader}>
            {/* Sales Section */}
            <div className={styles.headerSection}>
              <div className={styles.headerText}>Продажи</div>
              <div className={styles.flexContainer}>
                <div className={styles.purchaseCell}>Выкупы</div>
                <div className={styles.returnCell}>Возвраты</div>
                <div className={styles.salesCell}>Продажи</div>
                <div className={styles.revenueCell}>Выручка</div>
                <div className={styles.avgPriceCell}>Ср. цена продажи</div>
                <div className={styles.sppCell}>СПП</div>
                <div className={styles.buyoutCell}>Выкуп</div>
              </div>
            </div>

            {/* Cost Section */}
            <div className={styles.headerSection}>
              <div className={styles.headerText}>Себестоимость</div>
              <div className={styles.flexContainer}>
                <div className={styles.costCell}>Себестоимость</div>
                <div className={styles.costPerUnitCell}>Себестоимость на единицу</div>
              </div>
            </div>

            {/* Commission and Logistics Section */}
            <div className={styles.headerSection}>
              <div className={styles.headerText}>Комиссии и логистика</div>
              <div className={styles.flexContainer}>
                <div className={styles.deliveryCountCell}>Кол-во доставок</div>
                <div className={styles.commissionCell}>Комиссии</div>
                <div className={styles.acquiringCell}>Эквайринг</div>
                <div className={styles.logisticsCell}>Логистика доставок</div>
                <div className={styles.logisticsCell}>Логистика возвратов</div>
                <div className={styles.logisticsCell}>Логистика склад</div>
                <div className={styles.logisticsCell}>Логистика на единицу</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {expandedRows['2024'] && (
              <>
                {/* September Data */}
                <div className={styles.monthSection}>
                  <div className={styles.monthRow}></div>
                  {expandedRows['Сентябрь'] && (
                    <div className={styles.dataRow}>
                      <div className={styles.flexContainer}>
                        <div className={styles.purchaseCell}>
                          <div>500 000 ₽</div>
                          <div className={styles.smallText}>50 шт</div>
                        </div>
                        <div className={styles.returnCell}>
                          <div>10 000 ₽</div>
                          <div className={styles.smallText}>2 шт</div>
                        </div>
                        <div className={styles.salesCell}>50 шт</div>
                        <div className={styles.revenueCell}>100 000 ₽</div>
                        <div className={styles.avgPriceCell}>5 000 ₽</div>
                        <div className={styles.sppCell}>20 %</div>
                        <div className={styles.buyoutCell}>40 %</div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.costCell}>
                          <div>50 000 ₽</div>
                          <div className={styles.smallText}>20 %</div>
                        </div>
                        <div className={styles.costPerUnitCell}>1 000 ₽</div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.deliveryCountCell}>100 шт</div>
                        <div className={styles.commissionCell}>
                          <div>50 000 ₽</div>
                          <div className={styles.smallText}>20 %</div>
                        </div>
                        <div className={styles.acquiringCell}>
                          <div>1 000 ₽</div>
                          <div className={styles.smallText}>0.1 %</div>
                        </div>
                        <div className={styles.logisticsCell}>15 000 ₽</div>
                        <div className={styles.logisticsCell}>2 000 ₽</div>
                        <div className={styles.logisticsCell}>20 000 ₽</div>
                        <div className={styles.logisticsCell}>400 ₽</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* October Data */}
                <div className={styles.monthSection}>
                  <div className={styles.monthRow}></div>
                  {expandedRows['Октябрь'] && (
                    ['07.10.24', '14.10.24', '21.10.24'].map((date) => (
                      <div key={date} className={styles.dataRow}>
                        <div className={styles.flexContainer}>
                          <div className={styles.purchaseCell}>
                            <div>500 000 ₽</div>
                            <div className={styles.smallText}>50 шт</div>
                          </div>
                          <div className={styles.returnCell}>
                            <div>10 000 ₽</div>
                            <div className={styles.smallText}>2 шт</div>
                          </div>
                          <div className={styles.salesCell}>50 шт</div>
                          <div className={styles.revenueCell}>100 000 ₽</div>
                          <div className={styles.avgPriceCell}>5 000 ₽</div>
                          <div className={styles.sppCell}>20 %</div>
                          <div className={styles.buyoutCell}>40 %</div>
                        </div>
                        <div className={styles.flexContainer}>
                          <div className={styles.costCell}>
                            <div>50 000 ₽</div>
                            <div className={styles.smallText}>20 %</div>
                          </div>
                          <div className={styles.costPerUnitCell}>1 000 ₽</div>
                        </div>
                        <div className={styles.flexContainer}>
                          <div className={styles.deliveryCountCell}>100 шт</div>
                          <div className={styles.commissionCell}>
                            <div>50 000 ₽</div>
                            <div className={styles.smallText}>20 %</div>
                          </div>
                          <div className={styles.acquiringCell}>
                            <div>1 000 ₽</div>
                            <div className={styles.smallText}>0.1 %</div>
                          </div>
                          <div className={styles.logisticsCell}>15 000 ₽</div>
                          <div className={styles.logisticsCell}>2 000 ₽</div>
                          <div className={styles.logisticsCell}>20 000 ₽</div>
                          <div className={styles.logisticsCell}>400 ₽</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;