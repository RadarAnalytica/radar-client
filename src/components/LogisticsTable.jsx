import React, { useState, useEffect } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import styles from './LogisticsTable.module.css';

const LogisticsTable = ({data, loading}) => {
  const [showLoading, setShowLoading] = useState(loading);
  const MINIMUM_LOADING_TIME = 500; // 500ms minimum loading time
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    let timeoutId;
    
    if (loading) {
      setShowLoading(true);
    } else {
      timeoutId = setTimeout(() => {
        setShowLoading(false);
      }, MINIMUM_LOADING_TIME);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  const formatTableData = (penaltiesData) => {
    return Object.entries(penaltiesData || {}).map(([actionType, items]) => ({
      id: actionType,
      srid: '',
      article: '',
      product: '',
      size: '',
      total: Array.isArray(items)
        ? items.reduce((sum, item) => sum + item.penalty_total, 0) + ' ₽'
        : '0 ₽',
      children: Array.isArray(items)
        ? items.map((item) => ({
            id: '',
            isChild: true,
            srid: item.srid,
            article: item.wb_id,
            product: item.title,
            size: item.size,
            total: item.penalty_total + ' ₽',
          }))
        : [],
    }));
  };

  const tableData = formatTableData(data);

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
          <div
            className={`${styles.cellId} ${styles.article} ${
              item.isChild ? styles.noBorder : ''
            }`}
          >
            <span onClick={() => toggleRow(item.id)}>{item.id}</span>
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
          <div
            className={`${styles.cell_srid} ${
              item.isChild ? styles.noBorder : styles.borderBottom
            }`}
            title={item.srid}
          >
            <span className={styles.truncatedText}>
              {item.srid}
            </span>
          </div>
          <div
            className={`${styles.cell_article} ${
              item.isChild ? styles.noBorder : styles.borderBottom
            }`}
            title={item.article}
          >
            <span className={styles.truncatedText}>{item.article}</span>
          </div>
          <div
            className={`${styles.cell_goods} ${
              item.isChild ? styles.noBorder : styles.borderBottom
            }`}
          >
            <div>{item.product}</div>
          </div>
          <div
            className={`${styles.cell_size} ${
              item.isChild ? styles.noBorder : styles.borderBottom
            }`}
          >
            {item.size}
          </div>
          <div
            className={`${styles.cell_total} ${
              item.isChild ? styles.noBorder : styles.borderBottom
            }`}
          >
            {item.total}
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
      {showLoading ? (
        <div className={styles.row}>
          <div
            className={styles.loadingMessage}
            style={{
              display: 'flex',
              height: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <span className='loader'></span>
          </div>
        </div>
      ) : !tableData ||
        tableData.length === 0 ||
        tableData[0].id === 'Ошибка' ? (
        <div className={styles.row}>
          <div
            className={styles.emptyMessage}
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '20px',
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '24px',
            }}
          >
            Штрафы отсутствуют
          </div>
        </div>
      ) : (
        tableData.map((item) => renderRow(item))
      )}
    </div>
  );
};

export default LogisticsTable;
