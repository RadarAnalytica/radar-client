import React, { useState } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import styles from './LogisticsTable.module.css';

const LogisticsTable = () => {
  const [expandedRows, setExpandedRows] = useState(new Set(['']));

  const data = [
    {
      id: 'Возврат (к продавцу)',
      srid: '33404238099123.0.0',
      article: '123456789',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      size: '42',
      total: '100 000 ₽',
      children: [
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
      ],
    },
    {
      id: 'Возврат (от продавца при отмене)',
      srid: '33404238099123.0.0',
      article: '123456789',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      size: '42',
      total: '100 000 ₽',
      children: [
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
      ],
    },
    {
      id: 'Возврат брака (к продавцу)',
      srid: '33404238099123.0.0',
      article: '123456789',
      product: 'Куртка демисезонная с капюшоном осень 2024',
      size: '42',
      total: '100 000 ₽',
      children: [
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
        {
          id: '',
          isChild: true,
          srid: '33404238099123.0.0',
          article: '123456789',
          product: 'Куртка демисезонная с капюшоном осень 2024',
          size: '42',
          total: '100 000 ₽',
        },
      ],
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
          <div className={`${styles.cellId} ${styles.article}`}>
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
          <div
            className={`${styles.cell_id} ${styles.cellArticle}`}
            style={{ borderBottom: 'none' }}
          >
            Виды логистики, штрафов и доплат
          </div>
          <div className={`${styles.cell_srid} ${styles.cellGoods}`}>Srid</div>
          <div className={`${styles.cell_article} ${styles.cellGoods}`}>
            Артикул
          </div>
          <div className={`${styles.cell_goods} ${styles.cellGoods}`}>
            Товар
          </div>
          <div className={`${styles.cell_size} ${styles.cellGoods}`}>
            Размер
          </div>
          <div className={`${styles.cell_total} ${styles.cellGoods}`}>Итог</div>
        </div>
      </div>

      {/* Data Rows */}
      {data.map((item) => renderRow(item))}
    </div>
  );
};

export default LogisticsTable;
