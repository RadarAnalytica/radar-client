import React, { useState } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import styles from './TableByGoods.module.css';

const TableByGoods = () => {
  const [expandedRows, setExpandedRows] = useState(new Set(['345678909']));

  const data = [
    {
      id: '345678909',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      purchases: {
        amount: '500 000 ₽',
        quantity: '50 шт',
      },
      returns: {
        amount: '10 000 ₽',
        quantity: '2 шт',
      },
      sales: '50 шт',
      revenue: '100 000 ₽',
      avgPrice: '5 000 ₽',
      spp: '20 %',
      buyout: '40 %',
      cost: {
        total: '50 000 ₽',
        percentage: '20 %',
        perUnit: '1 000 ₽',
      },
      logisticQnty: '100 шт',
      logisticCommission: {
        comission: '50 000 ₽',
        percentage: '20 %',
        total: '50 000 ₽',
        totalPercentage: '20 %',
      },
      logisticEquiring: {
        equiring: '50 000 ₽',
        percentage: '0,1 %',
        total: '50 000 ₽',
        totalPercentage: '0,1 %',
      },
      logisticOfDeliever: { ofDeliver: '15 000 ₽', total: '15 000 ₽' },
      logisticOfReturn: { ofReturn: '5 000 ₽', total: '5 000 ₽' },
      logisticOfTotal: {
        ofTotal: '21 000 ₽',
        percentage: '9 %',
        totalPercentage: '9 %',
        total: '21 000 ₽',
      },
      logisitcPerUnit: { perUnit: '4 000 ₽', total: '4 000 ₽' },
      defectCompensation: { compensation: '1 000 ₽', total: '1 000 ₽' },
      defectQnty: { quantity: '10 шт', total: '10 000 ₽' },
      defectCompensationDamage: {
        compensationDamage: '1 000 ₽',
        total: '1 000 ₽',
      },
      defectCompensationDamageQnty: { damage: '10 шт', total: '10 000 ₽' },
      defectFines: { fines: '1 000 ₽', total: '1 000 ₽' },
      defectFinesMore: { finesMore: '1 000 ₽', total: '1 000 ₽' },
      anotherKeeper: {
        anotherKeeper: '1 000 ₽',
        percentage: '0,2 %',
        total: '1 000 ₽',
        totalPercentage: '0,2 %',
      },
      anotherKeeperOtherDeduction: {
        deduction: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      anotherKeeperPaidAcceptance: {
        paidAcceptance: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      anotherKeeperWbDeduction: {
        wbDeduction: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      externalExpensesSelfBuy: { selfBuy: '10 000 ₽', total: '10 000 ₽' },
      externalExpenses: {
        externalExpenses: '0 ₽',
        percentage: '0,1 %',
        total: '0 ₽',
      },
      externalExpensesAll: {
        externalExpensesAll: '25 000 ₽',
        total: '25 000 ₽',
      },
      taxSppWb: { taxSppWb: '0 ₽', total: '0 ₽' },
      taxTotal: { taxTotal: '200 000 ₽', total: '200 000 ₽' },
      taxTax: { taxTax: '10 000 ₽', total: '10 000 ₽' },
      financePay: { financePay: '10 000 ₽', total: '10 000 ₽' },
      financeTotal: { financeTotal: '200 000 ₽', total: '200 000 ₽' },
      financeTotalPerUnit: { financePerUnit: '1 000 ₽', total: '1 000 ₽' },
      financeMarginProfit: { marginProfit: '30 %', total: '30 %' },
      financeRoi: { roi: '80 %', total: '80 %' },
      children: [
        {
          id: '345678909-1',
          isChild: true,
          product: 'Куртка демисезонная с капюшоном осень 2024',
          purchases: {
            amount: '500 000 ₽',
            quantity: '50 шт',
          },
          returns: {
            amount: '10 000 ₽',
            quantity: '2 шт',
          },
          sales: '50 шт',
          revenue: '100 000 ₽',
          avgPrice: '5 000 ₽',
          spp: '20 %',
          buyout: '40 %',
          cost: {
            total: '50 000 ₽',
            percentage: '20 %',
            perUnit: '1 000 ₽',
          },
          logisticQnty: '100 шт',
          logisticCommission: {
            comission: '50 000 ₽',
            percentage: '20 %',
            total: '50 000 ₽',
            totalPercentage: '20 %',
          },
          logisticEquiring: {
            equiring: '50 000 ₽',
            percentage: '0,1 %',
            total: '50 000 ₽',
            totalPercentage: '0,1 %',
          },
          logisticOfDeliever: { ofDeliver: '15 000 ₽', total: '15 000 ₽' },
          logisticOfReturn: { ofReturn: '5 000 ₽', total: '5 000 ₽' },
          logisticOfTotal: {
            ofTotal: '21 000 ₽',
            percentage: '9 %',
            totalPercentage: '9 %',
            total: '21 000 ₽',
          },
          logisitcPerUnit: { perUnit: '4 000 ₽', total: '4 000 ₽' },
          defectCompensation: { compensation: '1 000 ₽', total: '1 000 ₽' },
          defectQnty: { quantity: '10 шт', total: '10 000 ₽' },
          defectCompensationDamage: {
            compensationDamage: '1 000 ₽',
            total: '1 000 ₽',
          },
          defectCompensationDamageQnty: { damage: '10 шт', total: '10 000 ₽' },
          defectFines: { fines: '1 000 ₽', total: '1 000 ₽' },
          defectFinesMore: { finesMore: '1 000 ₽', total: '1 000 ₽' },
          anotherKeeper: {
            anotherKeeper: '1 000 ₽',
            percentage: '0,2 %',
            total: '1 000 ₽',
            totalPercentage: '0,2 %',
          },
          anotherKeeperOtherDeduction: {
            deduction: '10 000 ₽',
            percentage: '5 %',
            total: '10 000 ₽',
            totalPercentage: '5 %',
          },
          anotherKeeperPaidAcceptance: {
            paidAcceptance: '10 000 ₽',
            percentage: '5 %',
            total: '10 000 ₽',
            totalPercentage: '5 %',
          },
          anotherKeeperWbDeduction: {
            wbDeduction: '10 000 ₽',
            percentage: '5 %',
            total: '10 000 ₽',
            totalPercentage: '5 %',
          },
          externalExpensesSelfBuy: { selfBuy: '10 000 ₽', total: '10 000 ₽' },
          externalExpenses: {
            externalExpenses: '0 ₽',
            percentage: '0,1 %',
            total: '0 ₽',
          },
          externalExpensesAll: {
            externalExpensesAll: '25 000 ₽',
            total: '25 000 ₽',
          },
          taxSppWb: { taxSppWb: '0 ₽', total: '0 ₽' },
          taxTotal: { taxTotal: '200 000 ₽', total: '200 000 ₽' },
          taxTax: { taxTax: '10 000 ₽', total: '10 000 ₽' },
          financePay: { financePay: '10 000 ₽', total: '10 000 ₽' },
          financeTotal: { financeTotal: '200 000 ₽', total: '200 000 ₽' },
          financeTotalPerUnit: { financePerUnit: '1 000 ₽', total: '1 000 ₽' },
          financeMarginProfit: { marginProfit: '30 %', total: '30 %' },
          financeRoi: { roi: '80 %', total: '80 %' },
        },
      ],
    },
    {
      id: '3456789456',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      purchases: {
        amount: '500 000 ₽',
        quantity: '50 шт',
      },
      returns: {
        amount: '10 000 ₽',
        quantity: '2 шт',
      },
      sales: '50 шт',
      revenue: '100 000 ₽',
      avgPrice: '5 000 ₽',
      spp: '20 %',
      buyout: '40 %',
      cost: {
        total: '50 000 ₽',
        percentage: '20 %',
        perUnit: '1 000 ₽',
      },
      logisticQnty: '100 шт',
      logisticCommission: {
        comission: '50 000 ₽',
        percentage: '20 %',
        total: '50 000 ₽',
        totalPercentage: '20 %',
      },
      logisticEquiring: {
        equiring: '50 000 ₽',
        percentage: '0,1 %',
        total: '50 000 ₽',
        totalPercentage: '0,1 %',
      },
      logisticOfDeliever: { ofDeliver: '15 000 ₽', total: '15 000 ₽' },
      logisticOfReturn: { ofReturn: '5 000 ₽', total: '5 000 ₽' },
      logisticOfTotal: {
        ofTotal: '21 000 ₽',
        percentage: '9 %',
        totalPercentage: '9 %',
        total: '21 000 ₽',
      },
      logisitcPerUnit: { perUnit: '4 000 ₽', total: '4 000 ₽' },
      defectCompensation: { compensation: '1 000 ₽', total: '1 000 ₽' },
      defectQnty: { quantity: '10 шт', total: '10 000 ₽' },
      defectCompensationDamage: {
        compensationDamage: '1 000 ₽',
        total: '1 000 ₽',
      },
      defectCompensationDamageQnty: { damage: '10 шт', total: '10 000 ₽' },
      defectFines: { fines: '1 000 ₽', total: '1 000 ₽' },
      defectFinesMore: { finesMore: '1 000 ₽', total: '1 000 ₽' },
      anotherKeeper: {
        anotherKeeper: '1 000 ₽',
        percentage: '0,2 %',
        total: '1 000 ₽',
        totalPercentage: '0,2 %',
      },
      anotherKeeperOtherDeduction: {
        deduction: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      anotherKeeperPaidAcceptance: {
        paidAcceptance: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      anotherKeeperWbDeduction: {
        wbDeduction: '10 000 ₽',
        percentage: '5 %',
        total: '10 000 ₽',
        totalPercentage: '5 %',
      },
      externalExpensesSelfBuy: { selfBuy: '10 000 ₽', total: '10 000 ₽' },
      externalExpenses: {
        externalExpenses: '0 ₽',
        percentage: '0,1 %',
        total: '0 ₽',
      },
      externalExpensesAll: {
        externalExpensesAll: '25 000 ₽',
        total: '25 000 ₽',
      },
      taxSppWb: { taxSppWb: '0 ₽', total: '0 ₽' },
      taxTotal: { taxTotal: '200 000 ₽', total: '200 000 ₽' },
      taxTax: { taxTax: '10 000 ₽', total: '10 000 ₽' },
      financePay: { financePay: '10 000 ₽', total: '10 000 ₽' },
      financeTotal: { financeTotal: '200 000 ₽', total: '200 000 ₽' },
      financeTotalPerUnit: { financePerUnit: '1 000 ₽', total: '1 000 ₽' },
      financeMarginProfit: { marginProfit: '30 %', total: '30 %' },
      financeRoi: { roi: '80 %', total: '80 %' },
    },
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
          <div className={styles.cell_product}>{item.product}</div>
          <div className={styles.salesSection}>
            <div className={styles.cell_purchases}>
              <div>{item.purchases.amount}</div>
              <div className={styles.subtext}>{item.purchases.quantity}</div>
            </div>
            <div className={styles.cell_returns}>
              <div>{item.returns.amount}</div>
              <div className={styles.subtext}>{item.returns.quantity}</div>
            </div>
            <div className={styles.cell_sales}>{item.sales}</div>
            <div className={styles.cell_revenue}>{item.revenue}</div>
            <div className={styles.cell_avgPrice}>{item.avgPrice}</div>
            <div className={styles.cell_spp}>{item.spp}</div>
            <div className={styles.cell_buyout}>{item.buyout}</div>
          </div>
          <div className={styles.costSection}>
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
              boxShadow: '0 1px 0 rgba(232, 232, 232, 1)'
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
              boxShadow: '0 1px 0 rgba(232, 232, 232, 1)'
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
          </div>
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
            Артикул
          </div>
          <div className={`${styles.cell_product} ${styles.cellGoods}`}>
            Товар
          </div>
          <div className={styles.salesHeader}>
            <div className={styles.salesTitle}>Продажи</div>
            <div className={styles.salesSubheader}>
              <div className={styles.cell_purchases}>Выкупы</div>
              <div className={styles.cell_returns}>Возвраты</div>
              <div className={styles.cell_sales}>Продажи</div>
              <div className={styles.cell_revenue}>Выручка</div>
              <div className={styles.cell_avgPrice}>Ср. цена продажи</div>
              <div className={styles.cell_spp}>СПП</div>
              <div className={styles.cell_buyout}>Выкуп</div>
            </div>
          </div>
          <div className={styles.costHeader}>
            <div className={styles.costTitle}>Себестоимость</div>
            <div className={styles.costSubheader}>
              <div className={styles.cell_cost}>Себестоимость</div>
              <div className={styles.cell_costPerUnit}>
                Себестоимость
                <br /> на единицу
              </div>
            </div>
          </div>
          <div className={styles.logosticHeader}>
            <div className={styles.costTitle}>Комиссия и логистика</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>Кол-во доставок</div>
              <div className={styles.logisticSubheader}>Комиссия</div>
              <div className={styles.logisticSubheader}>Эквайринг</div>
              <div className={styles.logisticSubheader}>Логистика доставок</div>
              <div className={styles.logisticSubheader}>
                Логистика возвратов
              </div>
              <div className={styles.logisticSubheader}>Логистика итого</div>
              <div className={styles.logisticSubheader}>
                Логистика на единицу
              </div>
            </div>
          </div>
          <div className={styles.compensationHeader}>
            <div className={styles.costTitle}>Компенсации и штрафы/доплаты</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>Компенсации брака</div>
              <div className={styles.logisticSubheader}>Кол-во брака</div>
              <div className={styles.logisticSubheader}>Компенсации ущерба</div>
              <div className={styles.logisticSubheader}>
                Кол-во
                <br /> ущерба
              </div>
              <div className={styles.logisticSubheader}>Штрафы</div>
              <div className={styles.logisticSubheader}>Доплаты</div>
            </div>
          </div>
          <div className={styles.anotherKeeper}>
            <div className={styles.costTitle}>Другие удержания</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>Хранение</div>
              <div className={styles.logisticSubheader}>Прочие удержания</div>
              <div className={styles.logisticSubheader}>Платная приёмка</div>
              <div className={styles.logisticSubheader}>Все удержания WB</div>
            </div>
          </div>
          <div className={styles.externalExpensesSection}>
            <div className={styles.costTitle}>Внешние расходы</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>
                Затраты на самовыкупы
              </div>
              <div className={styles.logisticSubheader}>Внешние расходы</div>
              <div className={styles.logisticSubheader}>
                Всего внешних расходов
              </div>
            </div>
          </div>
          <div className={styles.taxSection}>
            <div className={styles.costTitle}>Налог</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>
                СПП + WB реализовал{' '}
              </div>
              <div className={styles.logisticSubheader}>
                Налоговая
                <br /> база
              </div>
              <div className={styles.logisticSubheader}>Налог</div>
            </div>
          </div>
          <div className={styles.financeSection}>
            <div className={styles.costTitle}>Финансы</div>
            <div className={styles.costSubheader}>
              <div className={styles.logisticSubheader}>Оплата на Р/С</div>
              <div className={styles.logisticSubheader}>
                Чистая
                <br /> прибыль
              </div>
              <div className={styles.logisticSubheader}>
                Чистая
                <br /> прибыль на ед.
              </div>
              <div
                className={styles.logisticSubheader}
                style={{ width: '148px' }}
              >
                Маржинальность
                <br /> по прибыли
              </div>
              <div className={styles.logisticSubheader}>ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Rows */}
      {data.map((item) => renderRow(item))}

      {/* Total Row */}
      <div className={styles.totalRow}>
        <div className={styles.cell_id}></div>
        <div className={`${styles.cell_product} ${styles.total}`}>
          Общий итог
        </div>
        <div className={styles.salesSection} style={{ fontWeight: '700' }}>
          <div className={styles.cell_purchases}>
            <div>500 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              50 шт
            </div>
          </div>
          <div className={styles.cell_returns}>
            <div>10 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              2 шт
            </div>
          </div>
          <div className={styles.cell_sales}>50 шт</div>
          <div className={styles.cell_revenue}>100 000 ₽</div>
          <div className={styles.cell_avgPrice}>5 000 ₽</div>
          <div className={styles.cell_spp}>20 %</div>
          <div className={styles.cell_buyout}>40 %</div>
        </div>
        <div
          className={styles.logisticSection}
          style={{
            background: 'rgba(83, 41, 255, 0.05)',
            padding: '0 12px 0 12px',
          }}
        >
          <div className={styles.cell_cost}>
            <div></div>
            <div className={styles.subtext}></div>
          </div>
          <div className={styles.cell_costPerUnit} />
        </div>
        <div className={styles.logosticHeader} style={{ display: 'flex' }}>
          <div className={styles.cell_cost}>
            <div style={{ fontWeight: '700' }}>100шт</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>50 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              20 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              0,1 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>15 000 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>2 000 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>20 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              9 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>200 ₽</div>
          </div>
        </div>
        <div
          className={styles.compensationHeader}
          style={{ padding: '0 0 0 12px', display: 'flex' }}
        >
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>100 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 шт</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>100 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 шт</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>200 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>100 ₽</div>
          </div>
        </div>
        <div
          className={styles.anotherKeeper}
          style={{ padding: '0 0 0 12px', display: 'flex' }}
        >
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              0,1 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              0,1 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>1 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              0,1 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>8 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              10 %
            </div>
          </div>
        </div>
        <div
          className={styles.externalExpensesSection}
          style={{ padding: '0 0 0 12px', display: 'flex' }}
        >
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>0 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>25 000 ₽</div>
            <div className={styles.subtext} style={{ fontWeight: '700' }}>
              10 %
            </div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>25 000 ₽</div>
          </div>
        </div>
        <div
          className={styles.taxSection}
          style={{ padding: '0 0 0 12px', display: 'flex' }}
        >
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>0 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>200 000 ₽</div>
          </div>
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>10 000 ₽</div>
          </div>
        </div>
        <div
          className={styles.financeSection}
          style={{ padding: '0 0 0 12px', display: 'flex', width: '100%' }}
        >
          <div className={styles.cell_cost} style={{ fontWeight: '700' }}>
            <div>200 000 ₽</div>
          </div>
          <div className={styles.cell_costPerUnit} />
          <div className={styles.cell_costPerUnit} />
          <div className={styles.cell_costPerUnit} />
          <div className={styles.cell_costPerUnit} />
        </div>
      </div>
    </div>
  );
};

export default TableByGoods;
