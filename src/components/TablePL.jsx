// FinancialTable.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { formatPrice } from '../service/utils';
import styles from './TablePL.module.css';

const TablePL = ({ plData, isLoading }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const transformedData = plData?.map((item) => ({
    date: item.date,
    profit: { value: item.profit },
    averageBill: { value: item.avg_check },
    spp: { percentage: item.spp },
    soldOut: { percentage: item.purchased_percent },
    costPrice: { value: item.self_cost, percentage: item.self_cost_percent },
    keppWb: {
      value: item.wb_retentions,
      percentage: item.wb_retentions_percent,
    },
    commission: { value: item.commission, percentage: item.commission_percent },
    equiring: { value: item.acquiring, percentage: item.acquiring_percent },
    logistic: { value: item.logistic, percentage: item.logistic_percent },
    storage: { value: item.storage, percentage: item.storage_percent },
    anotherSum: {
      value: item.other_retentions,
      percentage: item.other_retentions_percent,
    },
    payForEnter: {
      value: item.paid_acceptance,
      percentage: item.paid_acceptance_percent,
    },
    payRC: { value: item.payment_to_seller },
    tax: { value: item.tax },
    allTotalOut: {
      value: item.external_expenses_amount,
      percentage: item.external_expenses_percent,
    },
    totalOut: { percentage: item.external_expenses_percent },
    netProfit: { value: item.net_profit },
    marginalProfit: { percentage: item.profit_margin },
    roi: { percentage: item.roi },
  }));

  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = document.querySelector(`.${styles.customTable}`);
      if (tableContainer) {
        setIsScrolled(tableContainer.scrollLeft > 0.1);
      }
    };

    const tableContainer = document.querySelector(`.${styles.customTable}`);
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableLeftMargin}></div>
      <div className={styles.customTable}>
        <div className={styles.tableContainer}>
          {/* {transformedData?.length === 0 && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'white',
              }}
            >
              <span className='loader'></span>
            </div>
          )} */}
          {/* {transformedData?.length > 0 && ( */}
          <div className={styles.columnsWrapper}>
            {/* Fixed columns */}
            <div
              className={`fixed-columns ${
                isScrolled ? 'fixed-columns-shadow' : ''
              }`}
            >
              <div className={styles.columnWidthFirst}>
                <div className={styles.tableOverHeader}></div>
                <div className={styles.tableHeader}>Значение</div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    padding: '6px 0 6px 17px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Выручка
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  Средний чек
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  СПП
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  Выкуп
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px', minHeight: '58px' }}
                >
                  Себестоимость
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Все удержания WB
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Комиссия
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Эквайринг
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Логистика
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Хранение
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Прочие удержания
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    minHeight: '58px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                  }}
                >
                  Платная приемка
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                    background: 'rgba(83, 41, 255, 0.05)',
                    borderRadius: '4px',
                  }}
                >
                  Оплата на Р/С
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  Налог
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  Всего внешних расходов
                </div>
                <div
                  className={styles.tableRow}
                  style={{ paddingLeft: '17px' }}
                >
                  Внешние расходы
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                    background: 'rgba(83, 41, 255, 0.05)',
                    borderRadius: '4px',
                  }}
                >
                  Чистая прибыль
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                    background: 'rgba(83, 41, 255, 0.05)',
                    borderRadius: '4px',
                  }}
                >
                  Маржинальность прибыли
                </div>
                <div
                  className={styles.tableRow}
                  style={{
                    paddingLeft: '17px',
                    fontWeight: '700',
                    color: 'rgba(26, 26, 26, 1)',
                    background: 'rgba(83, 41, 255, 0.05)',
                    borderRadius: '4px',
                  }}
                >
                  ROI
                </div>
              </div>
            </div>
            {/* Scrollable columns */}
            {!isLoading ? (
              <div className='scrollable-columns'>
                {transformedData?.map((item) => {
                  return (
                    <div className={styles.columnWidth}>
                      <div className={styles.tableOverHeader}></div>
                      <div className={styles.tableHeaderScrollable}>
                        {item.date}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{
                          fontWeight: '700',
                          color: 'rgba(26, 26, 26, 1)',
                        }}
                      >
                        {formatPrice(item.profit.value, '₽')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.averageBill.value, '₽')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.spp.percentage, '%')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.soldOut.percentage, '%')}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.costPrice.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.costPrice.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.keppWb.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.keppWb.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.commission.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.commission.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.equiring.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.equiring.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.logistic.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.logistic.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.storage.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.storage.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.anotherSum.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.anotherSum.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatPrice(item.payForEnter.value, '₽')}
                          </span>
                          <span className={styles.percentageElement}>
                            {formatPrice(item.payForEnter.percentage, '%')}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatPrice(item.payRC.value, '₽')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.tax.value, '₽')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.allTotalOut.value, '₽')}
                      </div>
                      <div className={styles.tableRow}>
                        {formatPrice(item.allTotalOut.percentage, '%')}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatPrice(item.netProfit.value, '₽')}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatPrice(item.marginalProfit.percentage, '%')}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatPrice(item.roi.percentage, '%')}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  width: '400px',
                  overflow: 'auto',
                  position: 'relative',
                  willChange: 'transform',
                  marginTop: '21px',
                }}
              >
                <span className='loader'></span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tableLeftMargin}></div>
    </div>
  );
};

export default TablePL;
