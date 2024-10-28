// FinancialTable.jsx
import React, { useState, useCallback, useEffect } from 'react';
import styles from './TablePL.module.css';

const TablePL = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Format number with spaces as thousand separators and add ₽ symbol
  const formatCurrency = (num) => {
    if (!num && num !== 0) return '';
    return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
  };

  const newDataTable = [
    {
      date: '15.07.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '22.07.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '29.07.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '05.08.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '12.08.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '19.08.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '26.08.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '02.09.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { valu: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
    {
      date: '09.09.2024',
      profit: { value: '34000' },
      averageBill: { value: '4000' },
      spp: { percentage: '20%' },
      soldOut: { percentage: '40%' },
      costPrice: { value: '18000', percentage: '30%' },
      keppWb: { value: '23000', percentage: '50%' },
      commission: { value: '10000', percentage: '20%' },
      equiring: { value: '5000', percentage: '10%' },
      logistic: { value: '1000', percentage: '0.1%' },
      storage: { value: '1000', percentage: '5%' },
      anotherSum: { value: '3000', percentage: '5%' },
      payForEnter: { value: '3000', percentage: '5%' },
      payRC: { value: '30000' },
      tax: { value: '4000' },
      allTotalOut: { value: '30000' },
      totalOut: { percentage: '30%' },
      netProfit: { value: '-30000' },
      marginalProfit: { percentage: '-25%' },
      roi: { percentage: '-40%' },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = document.querySelector(`.${styles.customTable}`);
      console.log(tableContainer);
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
          {newDataTable.length === 0 && (
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
          )}
          {newDataTable.length > 0 && (
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
                      marginLeft: '17px',
                      padding: '6px 0 6px 4px',
                      fontWeight: '700',
                      color: 'rgba(26, 26, 26, 1)',
                    }}
                  >
                    Выручка
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px' }}
                  >
                    Средний чек
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px' }}
                  >
                    СПП
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px' }}
                  >
                    Выкуп
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px', minHeight: '58px' }}
                  >
                    Себестоимость
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                    style={{ marginLeft: '17px' }}
                  >
                    Налог
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px' }}
                  >
                    Всего внешних расходов
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{ marginLeft: '17px' }}
                  >
                    Внешние расходы
                  </div>
                  <div
                    className={styles.tableRow}
                    style={{
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
                      marginLeft: '17px',
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
              <div className='scrollable-columns'>
                {newDataTable.map((item) => {
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
                        {formatCurrency(item.profit.value)}
                      </div>
                      <div className={styles.tableRow}>
                        {formatCurrency(item.averageBill.value)}
                      </div>
                      <div className={styles.tableRow}>
                        {item.spp.percentage}
                      </div>
                      <div className={styles.tableRow}>
                        {item.soldOut.percentage}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.costPrice.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.costPrice.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.keppWb.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.keppWb.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.commission.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.commission.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.equiring.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.equiring.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.logistic.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.logistic.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.storage.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.storage.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.anotherSum.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.anotherSum.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ minHeight: '58px' }}
                      >
                        <span className={styles.twoElements}>
                          <span className={styles.valueElement}>
                            {formatCurrency(item.payForEnter.value)}
                          </span>
                          <span className={styles.percentageElement}>
                            {item.payForEnter.percentage}
                          </span>
                        </span>
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatCurrency(item.payRC.value)}
                      </div>
                      <div className={styles.tableRow}>
                        {formatCurrency(item.tax.value)}
                      </div>
                      <div className={styles.tableRow}>
                        {formatCurrency(item.allTotalOut.value)}
                      </div>
                      <div className={styles.tableRow}>
                        {item.totalOut.percentage}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {formatCurrency(item.netProfit.value)}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {item.marginalProfit.percentage}
                      </div>
                      <div
                        className={styles.tableRow}
                        style={{ background: 'rgba(83, 41, 255, 0.05)' }}
                      >
                        {item.roi.percentage}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.tableLeftMargin}></div>
    </div>
  );
};

export default TablePL;
