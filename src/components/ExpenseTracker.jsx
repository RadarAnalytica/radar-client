import React, { useState, useEffect, useContext } from 'react';
import trashIcon from '../pages/images/trash-icon.svg';
import crossGrey from '../assets/cross-grey.svg';
import saveIcon from '../assets/save.svg';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../service/AuthContext';
import { fetchExternalExpenses } from '../redux/externalExpenses/externalExpensesActions';
import { ServiceFunctions } from '../service/serviceFunctions';
import styles from './ExpenseTracker.module.css';
import { URL } from '../service/config';
import CustomDayPicker from './CustomDayPicker';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState({});
  const [selectedDate, setSelectedDate] = useState({
  });


  const { data, loading } = useSelector((state) => state.externalExpensesSlice);
  const { authToken } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: currentYear - 2020 }, (_, i) =>
  //   String(2021 + i)
  // );
  // const months = [
  //   'Январь',
  //   'Февраль',
  //   'Март',
  //   'Апрель',
  //   'Май',
  //   'Июнь',
  //   'Июль',
  //   'Август',
  //   'Сентябрь',
  //   'Октябрь',
  //   'Ноябрь',
  //   'Декабрь',
  // ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchExternalExpenses(authToken));
  }, [dispatch, authToken]);

  useEffect(() => {
    if (data) {
      const formattedRows = data.map((item) => ({

        id: item.id,
        date: new Date(item.date),
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
    try {

      const formattedDate = row.date
        ? `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
        : null;

      const payload = {
        date: formattedDate,
        vendor_code: row.article,
        expense_1: Number(row.expenses[0]),
        expense_2: Number(row.expenses[1]),
        expense_3: Number(row.expenses[2]),
        expense_4: Number(row.expenses[3]),
        expense_5: Number(row.expenses[4]),
      };

      if (!row.isNew) {
        payload.id = row.id;
      }

      const response = row.isNew
        ? await ServiceFunctions.postExternalExpensesUpdate(authToken, payload)
        : await ServiceFunctions.postExternalExpensesUpdate(authToken, payload);

      console.log('Operation successful:', response);

      dispatch(fetchExternalExpenses(authToken));
    } catch (error) {
      console.error('Error sending row data:', error);
    }
  };

  const createRow = async () => {
    // const currentYear = new Date().getFullYear();
    // const currentMonth = new Date().getMonth() + 1;
    const selectedRowDate = selectedDate.from || new Date();
    const payload = {
      // year: currentYear,
      // month: currentMonth,
      date: selectedRowDate.toISOString().split('T')[0],
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
    setHasChanges({ ...hasChanges, [rowId]: true });
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, year: selectedYear } : row
      )
    );
  };

  const handleMonthChange = (rowId, selectedMonth) => {
    setHasChanges({ ...hasChanges, [rowId]: true });
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, month: selectedMonth } : row
      )
    );
  };

  const handleDateChange = (rowId, selectedDate) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, date: selectedDate } : row
      )
    );
    // console.log('Selected Date:', selectedDate); 
  };

  const handleArticleChange = (rowId, value) => {
    setHasChanges({ ...hasChanges, [rowId]: true });
    setRows(
      rows.map((row) => (row.id === rowId ? { ...row, article: value } : row))
    );
  };

  const handleExpenseChange = (rowId, expenseIndex, value) => {
    setHasChanges({ ...hasChanges, [rowId]: true });
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const newExpenses = [...row.expenses];
          newExpenses[expenseIndex] = value === '' ? '' : Number(value);
          return { ...row, expenses: newExpenses };
        }
        return row;
      })
    );
  };

  const handleSave = (row) => {
    if (hasChanges[row.id]) {
      sendRowData(row);
      setHasChanges({ ...hasChanges, [row.id]: false });
    }
  };
  const addRow = async () => {
    // Сначала сохраняем все строки с несохраненными данными
    const unsavedRows = rows.filter((row) => hasChanges[row.id]);

    if (unsavedRows.length > 0) {
      try {
        // Сохраняем все несохраненные строки одновременно
        const savePromises = unsavedRows.map((row) => sendRowData(row));
        await Promise.all(savePromises);

        // После сохранения добавляем новую строку
        const newRow = {
          id: rows.length + 1,
          isNew: true,
          date: new Date(),
          article: '',
          expenses: [0, 0, 0, 0, 0],
        };

        // Добавляем новую строку 
        setRows((prevRows) => [...prevRows, newRow]);

        // Сбросим отслеживание изменений после добавления строки
        setHasChanges({});

        // Сразу отправляем данные о новой строке на сервер
        await sendRowData(newRow);
      } catch (error) {
        console.error('Ошибка при сохранении строк:', error);
      }
    } else {
      // Если нет несохраненных данных, сразу добавляем новую строку
      const newRow = {
        id: rows.length + 1,
        isNew: true,
        date: new Date(),
        article: '',
        expenses: [0, 0, 0, 0, 0],
      };

      setRows((prevRows) => [...prevRows, newRow]);

      // Сразу отправляем данные о новой строке
      await sendRowData(newRow);
    }
  };



  const handleDeleteRow = async (id) => {
    try {
      const unsavedRows = rows.filter((row) => hasChanges[row.id]);

      for (const row of unsavedRows) {
        await sendRowData(row);
      }

      const response = await fetch(
        `${URL}/api/report/external-expenses/delete?id_=${id}`,
        {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            Authorization: authToken,
          },
        }
      );

      if (response.ok) {

        setRows((prevRows) => {
          const updatedRows = prevRows.filter((row) => row.id !== id);
          return updatedRows;
        });

        dispatch(fetchExternalExpenses(authToken));
      } else {
        console.error('Failed to delete row on server');
      }
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <div className={styles.table}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.yearCell}>Дата</div>
            {/* <div className={styles.monthCell}>Месяц</div> */}
            <div className={styles.articleCell}>
              <span className={styles.articleText}>
                Артикул{'\n'}поставщика
              </span>
            </div>
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
              {/* <div className={styles.yearCell}>
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
              </div> */}

              <div className={styles.yearCell}>
                <div className={styles.inputWrapper}>
                  <CustomDayPicker
                    selectedDate={{ from: row.date || new Date() }}
                    setSelectedDate={(range) => {
                      console.log('Selected range:', range);
                      if (range?.from) {
                        handleDateChange(row.id, new Date(range.from));
                      }
                    }}
                  />
                </div>
              </div>

              {/* <div className={styles.monthCell}>
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
              </div> */}

              <div className={styles.articleCell}>
                <div className={styles.inputWrapper}>
                  <input
                    type='text'
                    value={row.article}
                    className={styles.input}
                    onChange={(e) =>
                      handleArticleChange(row.id, e.target.value)
                    }
                  />
                </div>
              </div>

              {row.expenses.map((expense, index) => (
                <div key={index} className={styles.expenseCell}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='number'
                      value={expense === undefined ? '-' : expense || ''}
                      onChange={(e) =>
                        handleExpenseChange(row.id, index, e.target.value)
                      }
                      className={`${styles.input} ${expense ? styles.active : ''
                        }`}
                      placeholder='0'
                    />
                    <span
                      className={`${styles.rubSign} ${expense ? styles.active : ''
                        }`}
                    >
                      ₽
                    </span>
                  </div>
                </div>
              ))}
              <span
                className={`${styles.saveIcon} ${hasChanges[row.id] ? styles.saveIconActive : ''
                  }`}
                onClick={() => handleSave(row)}
              >
                <img src={saveIcon} alt='Save Row' />
              </span>
              <span
                className={styles.deleteIcon}
                onClick={() => handleDeleteRow(row.id)}
              >
                <img src={trashIcon} alt='Delete Row' />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '200px' }}
        >
          <span className='loader'></span>
        </div>
      )}
      <button onClick={addRow} className={styles.addButton}>
        <img src={crossGrey} alt='Добавить строку'
        // onClick={createRow}
        />
      </button>
    </div>
  );
};

export default ExpenseTracker;
