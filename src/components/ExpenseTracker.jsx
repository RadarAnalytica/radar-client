import React, { useState, useEffect, useContext } from 'react';
import crossAdd from '../pages/images/cross-add.png';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../service/AuthContext';
import { fetchExternalExpenses } from '../redux/externalExpenses/externalExpensesActions';
import { ServiceFunctions } from '../service/serviceFunctions';
import styles from './ExpenseTracker.module.css';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.externalExpensesSlice);
  const { authToken } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) =>
    String(2010 + i)
  );
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

  useEffect(() => {
    dispatch(fetchExternalExpenses(authToken));
  }, [dispatch, authToken]);

  // Effect to set the initial rows when data is received
  useEffect(() => {
    if (data) {
      const formattedRows = data.map((item) => ({
        id: item.id,
        year: String(item.year),
        month: months[item.month - 1], // Convert numeric month to name
        article: item.vendor_code,
        expenses: [
          Number(item.expense_1 || 0),
          Number(item.expense_2 || 0),
          Number(item.expense_3 || 0),
          Number(item.expense_4 || 0),
          Number(item.expense_5 || 0),
        ],
      }));
      setRows(formattedRows);
    }
  }, [data]);

  const sendRowData = async (row) => {
    const monthNumber = months.indexOf(row.month) + 1;
    if (!row.month) {
      return;
    }
    const payload = {
      year: parseInt(row.year),
      month: monthNumber,
      vendor_code: row.article,
      expense_1: row.expenses[0],
      expense_2: row.expenses[1],
      expense_3: row.expenses[2],
      expense_4: row.expenses[3],
      expense_5: row.expenses[4],
    };

    // Only include id if it's from backend (not a newly created row)
    if (row.id <= rows.length) {
      payload.id = row.id;

      const response = await ServiceFunctions.postExternalExpensesUpdate(
        authToken,
        payload
      );
      console.log('Update successful:', response);
      // Refresh data
      dispatch(fetchExternalExpenses(authToken));
    }
  };

  const createRow = async () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const payload = {
      year: currentYear,
      month: currentMonth,
      vendor_code: '',
      expense_1: 0,
      expense_2: 0,
      expense_3: 0,
      expense_4: 0,
      expense_5: 0,
    };

    await ServiceFunctions.postExternalExpensesUpdate(authToken, payload);
    dispatch(fetchExternalExpenses(authToken));
  };

  const handleYearChange = (rowId, selectedYear) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, year: selectedYear } : row
      )
    );
    const updatedRow = rows.find((row) => row.id === rowId);
    if (updatedRow) {
      sendRowData({ ...updatedRow, year: selectedYear });
    }
  };

  const handleMonthChange = (rowId, selectedMonth) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, month: selectedMonth } : row
      )
    );
    const updatedRow = rows.find((row) => row.id === rowId);
    if (updatedRow) {
      sendRowData({ ...updatedRow, month: selectedMonth });
    }
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
                value={row.year || ''}
                onChange={(e) => handleYearChange(row.id, e.target.value)}
                className={styles.select}
              >
                <option value=''>Выбрать</option>
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
                onBlur={() => sendRowData(row)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                    sendRowData(row);
                  }
                }}
              />
            </div>

            {row.expenses.map((expense, index) => (
              <div key={index} className={styles.expenseCell}>
                <div className={styles.inputWrapper}>
                  <input
                    type='text'
                    value={expense}
                    onChange={(e) =>
                      handleExpenseChange(row.id, index, e.target.value)
                    }
                    onBlur={() => sendRowData(row)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.target.blur();
                        sendRowData(row);
                      }
                    }}
                    className={`${styles.input} ${
                      expense ? styles.active : ''
                    }`}
                    placeholder='0'
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
      <button onClick={addRow} className={styles.addButton}>
        <img src={crossAdd} alt='Добавить строку' onClick={createRow} />
      </button>
    </div>
  );
};

export default ExpenseTracker;
