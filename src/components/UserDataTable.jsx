import { useState, useCallback, useEffect } from 'react';
import styles from './UserDataTable.module.css';
import SortArrows from './SortArrows';
import { useNavigate } from 'react-router-dom';

const UserDataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [dataTable, setDataTable] = useState([]);
  const navigate = useNavigate();

  const handleEmailClick = (email) => {
    navigate(`/user/${encodeURIComponent(email)}`);
  };

  const sortData = useCallback(
    (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      const sortedData = [...dataTable].sort((a, b) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
          return direction === 'asc'
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
      });
      setSortConfig({ key, direction });
      setDataTable(sortedData);
    },
    [dataTable, sortConfig]
  );

  useEffect(() => {
    const mappedData = data.map((item, index) => ({
      id: index + 1,
      email: item.email,
      isShopActive: Math.random() < 0.5,
      shopsConnected: Math.floor(Math.random() * 5) + 1,
      supportMessges: item.unreadCount,
    }));
    setDataTable(mappedData);
  }, [data]);

  return (
    <div className={styles['tableContainer']}>
      <div className={`${styles['tableRow']} ${styles['tableHeader']}`}>
        <span
          className={`${styles['tableCell']} ${styles['tableHeaderCell']}`}
          onClick={() => sortData('email')}
        >
          Email
          {/* <span className={styles.arrows}> {renderSortArrows('email')}</span> */}
        </span>
        <span
          className={`${styles['tableCell']} ${styles['tableHeaderCell']}`}
          onClick={() => sortData('name')}
        >
          Имя
          {/* <span className={styles.arrows}>{renderSortArrows('name')}</span> */}
        </span>
        <span
          className={`${styles['tableCell']} ${styles['tableHeaderCell']}`}
          onClick={() => sortData('activeShop')}
        >
          Активный магазин
          {/* <span className={styles.arrows}>
            {renderSortArrows('activeShop')}
          </span> */}
        </span>
        <span
          className={`${styles['tableCell']} ${styles['tableHeaderCell']}`}
          onClick={() => sortData('shopsQuantity')}
        >
          Кол-во магазинов
          {/* <span className={styles.arrows}>
            {renderSortArrows('shopsQuantity')}
          </span> */}
        </span>
        <span
          className={`${styles['tableCell']} ${styles['tableHeaderCell']}`}
          onClick={() => sortData('messagesQuantity')}
        >
          Сообщения поддержки
          {/* <span className={styles.arrows}>
            {renderSortArrows('messagesQuantity')}
          </span> */}
        </span>
      </div>
      {dataTable.map((item, i) => (
        <div key={item.id} className={styles.tableRowItems}>
          <span className={styles.tableCellItems} onClick={() => handleEmailClick(item.email)} style={{ cursor: 'pointer' }}>{item.email}</span>
          <span className={styles.tableCellItems}>{item[i]}</span>
          <span className={styles.tableCellItems}>
            {item.isShopActive ? 'ДА' : 'НЕТ'}
          </span>
          <span className={styles.tableCellItems}>{item.shopsConnected}</span>
          <span className={styles.tableCellItems}>
            {item.supportMessges > 0 ? item.supportMessges : 0}
          </span>
        </div>
      ))}
    </div>
  );
};
export default UserDataTable;
