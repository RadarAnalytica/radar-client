import React, { useState } from 'react';
import crossAdd from '../pages/images/cross-add.png';
import styles from './ExpenseTracker.module.css';

const ExpenseTracker = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => String(currentYear - i));
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const [rows, setRows] = useState([]);

  console.log('rows', rows);

  const handleYearChange = (rowId, selectedYear) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, year: selectedYear } : row
      )
    );
  };

  const handleMonthChange = (rowId, selectedMonth) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, month: selectedMonth } : row
      )
    );
  };

  const handleArticleChange = (rowId, value) => {
    setRows(
      rows.map((row) => (row.id === rowId ? { ...row, article: value } : row))
    );
  };

  const handleExpenseChange = (rowId, expenseIndex, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const newExpenses = [...row.expenses];
          newExpenses[expenseIndex] = value === '' ? 0 : Number(value);
          return { ...row, expenses: newExpenses };
        }
        return row;
      })
    );
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        year: '',
        month: '',
        article: '',
        expenses: [0, 0, 0, 0, 0],
      },
    ]);
  };

  const handleSubmit = () => {
    const dataToSend = rows.map((row) => ({
      id: row.id,
      year: row.year,
      month: row.month,
      article: row.article,
      expenses: row.expenses,
    }));
    console.log('Data ready to send:', dataToSend);
    // add your API call to send data to backend
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.yearCell}>Год</div>
          <div className={styles.monthCell}>Месяц</div>
          <div className={styles.articleCell}>Артикул поставщика</div>
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={styles.expenseCell}
            >{`Расход №${num}`}</div>
          ))}
          {/* <div className={styles.totalCell}>Итого Общих</div>
          <div className={styles.totalCell}>Поартикульных</div>
          <div className={styles.totalCell}>Расходов</div> */}
        </div>

        {/* Data Rows */}
        {rows.map((row) => (
          <div key={row.id} className={styles.dataRow}>
            <div className={styles.yearCell}>
              <select
                value={row.year}
                onChange={(e) => handleYearChange(row.id, e.target.value)}
                className={styles.select}
                placeholder=''
              >
                <option
                  value=''
                  className={`${styles.textInSelect} ${
                    row.year === 'Выбрать' ? styles.selected : ''
                  }`}
                >
                  Выбрать
                </option>
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className={`${styles.textInSelect} ${
                      row.year === year ? styles.selected : ''
                    }`}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.monthCell}>
              <select
                value={row.month}
                onChange={(e) => handleMonthChange(row.id, e.target.value)}
                className={styles.select}
              >
                <option value=''>Выбрать</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.articleCell}>
              <input
                type='text'
                value={row.article}
                className={styles.input}
                onChange={(e) => handleArticleChange(row.id, e.target.value)}
              />
            </div>

            {row.expenses.map((expense, index) => (
              <div key={index} className={styles.expenseCell}>
                <div className={styles.inputWrapper}>
                  <input
                    type='text'
                    value={expense || ''}
                    onChange={(e) =>
                      handleExpenseChange(row.id, index, e.target.value)
                    }
                    className={`${styles.input} ${
                      expense ? styles.active : ''
                    }`}
                    placeholder=''
                  />
                  <span
                    className={`${styles.rubSign} ${
                      expense ? styles.active : ''
                    }`}
                  >
                    ₽
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={addRow} className={styles.addButton} >
        <img src={crossAdd} alt='Добавить строку' />
      </button>
    </div>
  );
};

export default ExpenseTracker;
