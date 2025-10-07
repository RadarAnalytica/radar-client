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

import { Tooltip } from "antd";
import ModalDeleteConfirm from "../components/sharedComponents/ModalDeleteConfirm";

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState({});
  const [selectedDate, setSelectedDate] = useState({
  });
  const [deleteId, setDeleteId] = useState();


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
      formattedRows.sort((a, b) => +new Date(a.date) - +new Date(b.date));
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

      if (!row.isNew || row.id > 0) {
        payload.id = row.id; // Добавляем ID, если строка уже существует
      }

      const response = await ServiceFunctions.postExternalExpensesUpdate(authToken, payload);
      console.log('response', response);

      if (response && response.id) { // Проверяем успешность операции
        console.log('Response in sendRowData:', response);
        row.id = response.id;
        console.log('Операция выполнена успешно:', response);
        // dispatch(fetchExternalExpenses(authToken)); // Обновляем данные
      } else {
        console.error('Ошибка на сервере:', response);
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
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
    setHasChanges({ ...hasChanges, [rowId]: true });
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

  const handleSave = async (row) => {
    if (hasChanges[row.id]) {
      try {
        await sendRowData(row); // Отправляем данные на сервер

        // После успешного сохранения обновляем локальное состояние
        setHasChanges((prevChanges) => ({
          ...prevChanges,
          [row.id]: false,
        }));
        rows.sort((a, b) => +new Date(a.date) - +new Date(b.date));
        setRows(rows);
      } catch (error) {
        console.error('Ошибка при сохранении строки:', error);
      }
    }
  };
  const addRow = async () => {
    // Сначала сохраняем все строки с несохраненными данными
    const unsavedRows = rows.filter((row) => hasChanges[row.id]);

    if (rows.length > 0) {
      try {
        // Сохраняем все несохраненные строки одновременно
        // const savePromises = unsavedRows.map((row) => sendRowData(row));
        // await Promise.all(savePromises);

        // После сохранения добавляем новую строку
        const newRow = {
          id: -rows.length,
          isNew: true,
          date: new Date(),
          article: '',
          expenses: [0, 0, 0, 0, 0],
        };

        // Добавляем новую строку
        setRows((prevRows) => [...prevRows, newRow]);

        // Сбросим отслеживание изменений после добавления строки
        // setHasChanges({});
        setHasChanges({ ...hasChanges, [newRow.id]: true });

        // Сразу отправляем данные о новой строке на сервер
        // await sendRowData(newRow);
      } catch (error) {
        console.error('Ошибка при сохранении строк:', error);
      }
    } else {
      // Если нет несохраненных данных, сразу добавляем новую строку
      const newRow = {
        id: -rows.length,
        isNew: true,
        date: new Date(),
        article: '',
        expenses: [0, 0, 0, 0, 0],
      };

      setHasChanges({ ...hasChanges, [newRow.id]: true });
      setRows((prevRows) => [...prevRows, newRow]);
      // Сразу отправляем данные о новой строке
      // await sendRowData(newRow);
    }
  };

  const handleDeleteRow = async (id) => {
    console.log('Delete row:', id);
    if (id < 0) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setHasChanges((prevChanges) => {
        const updatedChanges = { ...prevChanges };
        delete updatedChanges[id];
        return updatedChanges;
      });
      setDeleteId();
      return;
    }
    try {
      // Сохраняем строки с несохраненными данными перед удалением
      const unsavedRows = rows.filter((row) => hasChanges[row.id]);
      if (unsavedRows.length > 0) {
        const savePromises = unsavedRows.map((row) => sendRowData(row));
        await Promise.all(savePromises);
      }

      // Удаляем строку с сервера
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
        // Обновляем локальное состояние только после успешного удаления
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        // Сбрасываем изменения для удаленной строки
        setHasChanges((prevChanges) => {
          const updatedChanges = { ...prevChanges };
          delete updatedChanges[id];
          return updatedChanges;
        });

        console.log(`Row with ID ${id} successfully deleted.`);
      } else {
        console.error('Ошибка удаления строки на сервере');
      }
    } catch (error) {
      console.error('Ошибка при удалении строки:', error);
    } finally {
      setDeleteId();
    }
  };

  return (
    <>
      {!loading ? (
        <div className={styles.table}>
          {/* Header */}
          <div className={styles.table__row}>
            <div className={`${styles.table__item} ${styles.table__item_wide}`}>Дата</div>
            <div className={styles.table__item}>Артикул{'\n'}поставщика</div>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={styles.table__item}
              >{`Расход №${num}`}</div>
            ))}
            <div className={`${styles.table__item} ${styles.table__item_actions}`}></div>
          </div>

          {/* Body */}
          {rows.map((row) => (
            <div className={styles.table__row} key={row.id}>
              <div className={`${styles.table__item} ${styles.table__item_wide}`}>
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
              <div className={styles.table__item}>
                <input
                  type='text'
                  value={row.article}
                  className={styles.input}
                  onChange={(e) =>
                    handleArticleChange(row.id, e.target.value)
                  }
                />
              </div>
              {row.expenses.map((expense, index) => (
                <div className={styles.table__item} key={index}>
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
              <div className={`${styles.table__item} ${styles.table__item_actions}`}>
                <Tooltip title="Сохранить">
                  <span
                    className={`${styles.saveIcon} ${hasChanges[row.id] ? styles.saveIconActive : ''
                      }`}
                    onClick={() => handleSave(row)}
                  >
                    <img src={saveIcon} alt='Save Row' />
                  </span>
                </Tooltip>
                <Tooltip title="Удалить">
                  <span
                    className={styles.deleteIcon}
                    // onClick={() => handleDeleteRow(row.id)}
                    onClick={() => setDeleteId(row.id)}
                  >
                    <img src={trashIcon} alt='Delete Row' />
                  </span>
                </Tooltip>
              </div>
            </div>))}


          {/* add Rows */}
          <div className={styles.rowContainer}>

            <button onClick={addRow} className={styles.addButton}>
              <img src={crossGrey} alt='Добавить строку'
              // onClick={createRow}
              />
            </button>
          </div>
        </div>
      ) : (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '200px' }}
        >
          <span className='loader'></span>
        </div>
      )}
      {/* {!loading && deleteId && <Modal open={deleteId} onCancel={() => setDeleteId()} onOk={() => handleDeleteSubmit()}>Удалить</Modal>} */}
      {!loading && deleteId && <ModalDeleteConfirm onCancel={() => setDeleteId()} onOk={() => handleDeleteRow(deleteId)} title='Удалить?' />}
    </>
  );
};

export default ExpenseTracker;
