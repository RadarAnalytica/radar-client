import React, { useState } from 'react';
import styles from './SaleTable.module.css';
import arrowDown from '../assets/arrow-down.svg';

const SalesTable = () => {
  const [expandedRows, setExpandedRows] = useState({
    2024: true,
    Октябрь: true,
    Сентябрь: false,
  });

  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={styles.container}>
      {/* Header - Always visible */}
      <div className={styles.header} style={{ width: '333%' }}>
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
        <div className={styles.headerSection}>
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
        <div className={styles.headerSection}>
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
        <div className={styles.headerSection}>
          <div className={styles.headerText}>Финансы</div>
          <div className={styles.flexContainer}>
            <div
              className={`${styles.defectCompnesaitionCell} ${styles.greyColor}`}
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
            >
              Чистая прибыль на ед.
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

      {/* Months Section - Controlled by year dropdown */}
      <div style={{ width: '333%' }}>
        <div className={styles.weekCellYear}>
          <div className={styles.yearToggle} onClick={() => toggleRow('2024')}>
            <span>2024</span>
            <span
              className={`${styles.dropdownArrow} ${
                expandedRows['2024'] ? styles.dropdownArrowExpanded : ''
              }`}
            >
              <img src={arrowDown} alt='Dropdown Arrow' />
            </span>
          </div>
        </div>
        {expandedRows['2024'] && (
          <div className={`${styles.fontSize14} ${styles.monthsContainer}`}>
            {/* September Section */}
            <div className={styles.borderBottom}>
              <div
                className={`${styles.row} ${styles.clickable} ${styles.headerOfMonth}`}
                onClick={() => toggleRow('Сентябрь')}
              >
                <span className={styles.headerTextMonth}>Сентябрь</span>
                <span
                  className={`${styles.dropdownArrow} ${
                    expandedRows['Сентябрь'] ? styles.dropdownArrowExpanded : ''
                  }`}
                >
                  <img src={arrowDown} alt='Dropdown Arrow' />
                </span>
              </div>

              {expandedRows['Сентябрь'] && (
                <div className={styles.row}>
                  <div className={styles.weekCellDate}>30.10.24</div>
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
                    <div className={styles.logisticsCell}>
                      <div>20 000 ₽</div>
                      <div className={styles.smallText}>9 %</div>
                    </div>
                    <div className={styles.logisticsCell}>400 ₽</div>
                  </div>
                  <div className={styles.flexContainer}>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>100 ₽</div>
                    </div>
                  </div>
                  <div className={styles.flexContainer}>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>1000 ₽</div>
                      <div className={styles.smallText}>0.1 %</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>1000 ₽</div>
                      <div className={styles.smallText}>0.1 %</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>1000 ₽</div>
                      <div className={styles.smallText}>0.1 %</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>1000 ₽</div>
                      <div className={styles.smallText}>0.1 %</div>
                    </div>
                  </div>
                  <div className={styles.flexContainer}>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>0 ₽</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>25 000 ₽</div>
                      <div className={styles.smallText}>10 %</div>
                    </div>
                    <div className={styles.defectCompnesaitionCell}>
                      <div>25 000 ₽</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* October Section */}
            <div className={styles.borderBottom}>
              <div
                className={`${styles.row} ${styles.clickable} ${styles.headerOfMonth}`}
                onClick={() => toggleRow('Октябрь')}
              >
                <span className={styles.headerTextMonth}>Октябрь</span>
                <span
                  className={`${styles.dropdownArrow} ${
                    expandedRows['Октябрь'] ? styles.dropdownArrowExpanded : ''
                  }`}
                >
                  <img src={arrowDown} alt='Dropdown Arrow' />
                </span>
              </div>

              {expandedRows['Октябрь'] && (
                <>
                  {['07.10.24', '14.10.24', '21.10.24'].map((date) => (
                    <div key={date} className={styles.row}>
                      <div className={styles.weekCellDate}>{date}</div>
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
                        <div className={styles.logisticsCell}>
                          <div>20 000 ₽</div>
                          <div className={styles.smallText}>9 %</div>
                        </div>
                        <div className={styles.logisticsCell}>400 ₽</div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>100 ₽</div>
                        </div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>1000 ₽</div>
                          <div className={styles.smallText}>0.1 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>1000 ₽</div>
                          <div className={styles.smallText}>0.1 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>1000 ₽</div>
                          <div className={styles.smallText}>0.1 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>1000 ₽</div>
                          <div className={styles.smallText}>0.1 %</div>
                        </div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>0 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>25 000 ₽</div>
                          <div className={styles.smallText}>10 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>25 000 ₽</div>
                        </div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>0 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>200 000 ₽</div>
                          <div className={styles.smallText}>10 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>10 000 ₽</div>
                        </div>
                      </div>
                      <div className={styles.flexContainer}>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>200 000 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>70 000 ₽</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>1 000 ₽</div>
                        </div>
                        <div
                          className={styles.defectCompnesaitionCell}
                          style={{ width: '148px' }}
                        >
                          <div>30 %</div>
                        </div>
                        <div className={styles.defectCompnesaitionCell}>
                          <div>80 %</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTable;
