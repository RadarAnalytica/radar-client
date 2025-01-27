import React, { useState, useEffect } from 'react';
import styles from './SaleTable.module.css';
import arrowDown from '../assets/arrow-down.svg';
import { formatPrice } from '../service/utils';

const SalesTable = ({ tableData }) => {
  let firstRender = false
  const [expandedRows, setExpandedRows] = useState(() => {
    const initialState = {};
    // Dynamically set all years and their weeks to expanded
    Object.entries(tableData).forEach(([year, yearData]) => {
      initialState[year] = true; // Set year to expanded
      Object.entries(yearData).forEach(([date]) => {
        initialState[`week-${date}`] = true;
      });
    });
    return initialState;
  });

  useEffect(() => {
    if (!firstRender && tableData) {
      Object.entries(tableData).forEach(([year, yearData]) => {
        setExpandedRows((prev) => ({
          ...prev,
          [year]: true
        }))
        Object.entries(yearData).forEach(([date]) => {
          setExpandedRows((prev) => ({
            ...prev,
            [`week-${date}`]: true
          }))
        });
      });
      firstRender = true
    }
  }, [tableData])

  console.log('expandedRows', expandedRows);

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
              {/* Sales Section */}
              <div className={styles.flexContainer}>
                <div className={styles.purchaseCell}>
                  <div>{formatPrice(data?.purchases.rub) || '0'} ₽</div>
                  <div className={styles.smallText}>
                    {data?.purchases.quantity || '0'} шт
                  </div>
                </div>
                <div className={styles.returnCell}>
                  <div>{formatPrice(data.return.rub) || '0'} ₽</div>
                  <div className={styles.smallText}>
                    {data.return.quantity || '0'} шт
                  </div>
                </div>
                <div className={styles.salesCell}>
                  {data.revenue.quantity || '0'} шт
                </div>
                <div className={styles.revenueCell}>
                  {formatPrice(data.revenue.rub) || '0'} ₽
                </div>
                <div className={styles.avgPriceCell}>
                  {formatPrice(data.avg_check) || '0'} ₽
                </div>
                <div className={styles.sppCell}>
                  <span>{data.avg_spp}</span>
                  <span style={{ marginLeft: '4px' }}>%</span>
                </div>
                {/* <div className={styles.sppCell}>{data.avg_spp} %</div> */}
                <div className={styles.buyoutCell}>
                  {data.purchase_percent || '0'} %
                </div>
              </div>
              {/* Self Cost Section */}
              <div
                className={styles.flexContainer}
                style={{ background: 'rgba(83, 41, 255, 0.05)' }}
              >
                <div className={styles.costCell}>
                  <div>
                    {!!data.cost_price && data.cost_price !== '-'
                      ? formatPrice(data.cost_price) + ' ₽'
                      : '-'}
                  </div>
                  <div className={styles.smallText}>
                    {!!data.cost_price_percent && data.cost_price_percent !== '-'
                      ? data.cost_price_percent + ' %'
                      : '-'}
                  </div>
                </div>
                <div className={styles.costPerUnitCell}>
                  {!!data.cost_price && data.cost_price !== '-'
                    ? formatPrice(data.cost_price / data.revenue.quantity) +
                      ' ₽'
                    : '-'}
                </div>
              </div>
              {/* Commision & Logisitc Section */}
              <div className={styles.flexContainer}>
                <div className={styles.deliveryCountCell}>
                  {data.deliveries} шт
                </div>
                <div className={styles.commissionCell}>
                  <div>{formatPrice(data.wb_commission.rub) || '0'} ₽</div>
                  <div className={styles.smallText}>
                    {formatPrice(data.wb_commission.percent)} %
                  </div>
                </div>
                <div className={styles.acquiringCell}>
                  <div>{formatPrice(data.acquiring.rub) || '0'} ₽</div>
                  <div className={styles.smallText}>
                    {data.acquiring.percent.toFixed(1)} %
                  </div>
                </div>
                <div className={styles.logisticsCell}>
                  {formatPrice(data.logistics_straight.rub) || '0'} ₽
                </div>
                <div className={styles.logisticsCell}>
                  {formatPrice(data.logistics_reverse.rub) || '0'} ₽
                </div>
                <div className={styles.logisticsCell}>
                  <div>{formatPrice(data.logistics_total.rub) || '0'} ₽</div>
                  <div className={styles.smallText}>
                    {data.logistics_total.percent.toFixed(1)} %
                  </div>
                </div>
                <div className={styles.logisticsCell}>
                  {formatPrice(data.logistics_per_product) || '0'} ₽
                </div>
              </div>
              {/* Compensation and Penalties Section */}
              <div
                className={styles.flexContainer}
                style={{ background: 'rgba(83, 41, 255, 0.05)' }}
              >
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.compensation_defects.rub) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.compensation_defects.quantity) || '0'} шт
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.compensation_damage.rub) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.compensation_damage.quantity) || '0'} шт
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.penalties) || '0'} ₽
                </div>
                {/* ?????? */}
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.additional_payments) || '0'} ₽
                </div>
              </div>
              {/* Another Keep Section */}
              <div className={styles.flexContainer}>
                <div className={styles.defectCompnesaitionCell}>
                  <div>{formatPrice(data.storage.rub) || '0'} ₽</div>
                  <div>{data.storage.percent || '0'} %</div>
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  <div>{formatPrice(data.other_retentions.rub) || '0'} ₽</div>
                  <div>{data.other_retentions.percent || '0'} %</div>
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  <div>{formatPrice(data.acceptance.rub) || '0'} ₽</div>
                  <div>{data.acceptance.percent || '0'} %</div>
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  <div>{formatPrice(data.compensation_penalties.rub) || '0'} ₽</div>
                  <div>{data.compensation_penalties.percent || '0'} %</div>
                </div>
              </div>
              {/* External Expenses Section */}
              <div
                className={styles.flexContainer}
                style={{ background: 'rgba(83, 41, 255, 0.05)' }}
              >
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.self_purchase_costs) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  <div>{formatPrice(data.expenses) || '0'} ₽</div>
                  <div>{data.expenses_percent || '0'} %</div>
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.external_expenses) || '0'} ₽
                </div>
              </div>
              {/* Tax Section */}
              <div className={styles.flexContainer}>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.sold_by_wb) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.tax_base) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.tax) || '0'} ₽
                </div>
              </div>
              {/* Finance Section */}
              <div
                className={styles.flexContainer}
                style={{ background: 'rgba(83, 41, 255, 0.05)' }}
              >
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.payment) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.profit) || '0'} ₽
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {formatPrice(data.profit_per_one) || '0'} ₽
                </div>
                <div
                  className={styles.defectCompnesaitionCell}
                  style={{ width: '148px' }}
                >
                  {formatPrice(data.marginality) || '0'} %
                </div>
                <div className={styles.defectCompnesaitionCell}>
                  {data.return_on_investment || '0'} %
                </div>
              </div>
            </div>
          )}
          {/* Existing row content */}
        </div>
      </div>
    );
  };

  const renderYearData = () => {
    return Object.entries(tableData).map(([year, yearData]) => (
      <div key={year}>
        <div className={styles.weekCellYear} style={{ display: 'flex' }}>
          <div className={styles.yearToggle} onClick={() => toggleRow(year)}>
            <span>{year}</span>
            <span
              className={`${styles.dropdownArrow} ${
                expandedRows[year] ? styles.dropdownArrowExpanded : ''
              }`}
            >
              <img src={arrowDown} alt='Dropdown Arrow' />
            </span>
          </div>
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
          <div className={`${styles.fontSize14} ${styles.monthsContainer}`}>
            {Object.entries(yearData).map(([date, weekData]) =>
              renderWeekRow(date, weekData.data)
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
