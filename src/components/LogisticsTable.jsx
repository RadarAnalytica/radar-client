import React, { useState } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import styles from './LogisticsTable.module.css';

const LogisticsTable = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set(['345678909']));

  const data = [
    {
      id: 'Возврат (к продавцу)',
      srid: '123456789',
      article: '123456789',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      size: '42',
      total: '100 000 ₽',
      children: [
        {
          id: '345678909',
          isChild: true,
          srid: '123456789',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '345678909',
          isChild: true,
          srid: '123456789',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '345678909',
          isChild: true,
          srid: '123456789',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        }
      ]
    },
    {
      id: 'Возврат (к продавцу)',
      srid: '123456789',
      article: '123456789',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      size: '42',
      total: '100 000 ₽',
      children: [
        {
          id: '345678909',
          isChild: true,
          srid: '123456789',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '345678909',
          isChild: true,
          srid: '123456789',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        }
      ]
    }
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderRow = (item, level = 0) => {
    const isExpanded = expandedRows.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <div className={`${styles.row} ${item.isChild ? styles.childRow : ''}`}>
          <div className={`${styles.cell_id} ${styles.article}`}>
            <span>{item.id}</span>
            {hasChildren ? (
              <button
                onClick={() => toggleRow(item.id)}
                className={styles.toggleButton}
              >
                {isExpanded ? (
                  <div className={`${styles.icon} ${styles.dropdownArrow}`}>
                    <img src={arrowDown} alt='downArrow' />
                  </div>
                ) : (
                  <div
                    className={`${styles.icon} ${styles.dropdownArrow} ${styles.dropdownArrowExpanded}`}
                  >
                    <img src={arrowDown} alt='upArrow' />
                  </div>
                )}
              </button>
            ) : (
              <div className={styles.indent} />
            )}
          </div>
          <div className={styles.cell_srid}>{item.srid}</div>
          {/* <div className={styles.salesSection}> */}
            <div className={styles.cell_article}>
              <div>{item.article}</div>
              {/* <div className={styles.subtext}>{item.purchases.quantity}</div> */}
            </div>
            <div className={styles.cell_goods}>
              <div>{item.product}</div>
              {/* <div className={styles.subtext}>{item.returns.quantity}</div> */}
            </div>
            <div className={styles.cell_size}>{item.size}</div>
            <div className={styles.cell_total}>{item.total}</div>
          {/* </div> */}
          {/* <div className={styles.costSection}>
            <div className={styles.cell_cost}>
              <div>{item.cost.total}</div>
              <div className={styles.subtext}>{item.cost.percentage}</div>
            </div>
            <div className={styles.cell_costPerUnit}>{item.cost.perUnit}</div>
          </div>
          <div className={styles.logisticSection}>
            <div className={styles.logisticSubheader}>
              <div>{item.logisticQnty}</div>
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.logisticCommission?.comission}</div>
              <div className={styles.subtext}>
                {item.logisticCommission?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.logisticCommission?.percentage}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.logisticOfDeliever?.ofDeliver}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.logisticOfReturn?.ofReturn}
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.logisticOfTotal?.ofTotal}</div>
              <div className={styles.subtext}>
                {item.logisticOfTotal?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.logisitcPerUnit?.perUnit}
            </div>
          </div>
          <div className={styles.damgeSection}>
            <div className={styles.cell_costPerUnit}>
              {item.defectCompensation?.compensation}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.defectQnty?.quantity}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.defectCompensationDamage?.compensationDamage}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.defectCompensationDamageQnty?.damage}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.defectFines?.fines}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.defectFinesMore?.finesMore}
            </div>
          </div>
          <div className={styles.deductionSection}>
            <div className={styles.cell_costPerUnit}>
              <div>{item.anotherKeeper?.anotherKeeper}</div>
              <div className={styles.subtext}>
                {item.anotherKeeper?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.anotherKeeperOtherDeduction?.deduction}</div>
              <div className={styles.subtext}>
                {item.anotherKeeperOtherDeduction?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.anotherKeeperPaidAcceptance?.paidAcceptance}</div>
              <div className={styles.subtext}>
                {item.anotherKeeperPaidAcceptance?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.anotherKeeperWbDeduction?.wbDeduction}</div>
              <div className={styles.subtext}>
                {item.anotherKeeperWbDeduction?.percentage}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '0 0 0 12px',
              background: 'rgba(83, 41, 255, 0.05)',
            }}
          >
            <div className={styles.cell_costPerUnit}>
              {item.externalExpensesSelfBuy?.selfBuy}
            </div>
            <div className={styles.cell_costPerUnit}>
              <div>{item.externalExpenses?.externalExpenses}</div>
              <div className={styles.subtext}>
                {item.externalExpenses?.percentage}
              </div>
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.externalExpensesAll?.externalExpensesAll}
            </div>
          </div>
          <div style={{ display: 'flex', padding: '0 0 0 12px' }}>
            <div className={styles.cell_costPerUnit}>
              {item.taxSppWb?.taxSppWb}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.taxTotal?.taxTotal}
            </div>
            <div className={styles.cell_costPerUnit}>{item.taxTax?.taxTax}</div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '0 0 0 12px',
              background: 'rgba(83, 41, 255, 0.05)',
            }}
          >
            <div className={styles.cell_costPerUnit}>
              {item.financePay?.financePay}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.financeTotal?.financeTotal}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.financeTotalPerUnit?.financePerUnit}
            </div>
            <div style={{ width: '148px' }}>
              {item.financeMarginProfit?.marginProfit}
            </div>
            <div className={styles.cell_costPerUnit}>
              {item.financeRoi?.roi}
            </div>
          </div> */}
        </div>
        {isExpanded &&
          item.children &&
          item.children.map((child) => renderRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className={styles.container}>
    {/* Header */}
    <div className={styles.header}>
    <div className={styles.topRow}>
    <div className={`${styles.cell_id} ${styles.cellArticle}`}>
    Виды логистики, штрафов и доплат
          </div>
          <div className={`${styles.cell_srid} ${styles.cellGoods}`}>
          Srid
          </div>
          <div className={`${styles.cell_article} ${styles.cellGoods}`}>
          Артикул
          </div>
          <div className={`${styles.cell_goods} ${styles.cellGoods}`}>
          Товар
          </div>
          <div className={`${styles.cell_size} ${styles.cellGoods}`}>
          Размер
          </div>
          <div className={`${styles.cell_total} ${styles.cellGoods}`}>
          Итог
          </div>
          {/* <div className={styles.salesHeader}>
            <div className={styles.salesSubheader}>
              <div className={styles.cell_purchases}>Выкупы</div>
              <div className={styles.cell_returns}>Возвраты</div>
              <div className={styles.cell_sales}>Продажи</div>
              <div className={styles.cell_revenue}>Выручка</div>
              <div className={styles.cell_avgPrice}>Ср. цена продажи</div>
              <div className={styles.cell_spp}>СПП</div>
              <div className={styles.cell_buyout}>Выкуп</div>
            </div>
          </div> */}
    </div>
    </div>

    {/* Data Rows */}
    {data.map((item) => renderRow(item))}
    </div>
    // <div className={styles.tableContainer}>
    //   <div className={styles.tableHeader}>
    //     <div className={styles.headerCell}>Виды логистики, штрафов и доплат</div>
    //     <div className={styles.headerCell}>Srid</div>
    //     <div className={styles.headerCell}>Артикул</div>
    //     <div className={styles.headerCell}>Товар</div>
    //     <div className={styles.headerCell}>Размер</div>
    //     <div className={styles.headerCell}>Итог</div>
    //   </div>
    //   <div className={styles.tableBody}>
    //     <div className={styles.dropdownContainer}>
    //       <div className={styles.dropdownHeader} onClick={() => setIsExpanded(!isExpanded)}>
    //         <span>{kindsOfLogistics[0]}</span>
    //         <span className={`${styles.arrow} ${isExpanded ? styles.up : styles.down}`}>▼</span>
    //       </div>
    //       {isExpanded && (
    //         <div className={styles.dropdownContent}>
    //           {kindsOfLogistics.map((kind, idx) => (
    //             <div key={idx} className={styles.dropdownItem}>
    //               {kind}
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //     {data.map((row, index) => (
    //       <div key={index} className={styles.tableRow}>
    //         <div className={styles.cell}></div>
    //         <div className={styles.cell}>{row.srid}</div>
    //         <div className={styles.cell}>{row.article}</div>
    //         <div className={styles.cell}>{row.product}</div>
    //         <div className={styles.cell}>{row.size}</div>
    //         <div className={styles.cell}>{row.total}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default LogisticsTable;
