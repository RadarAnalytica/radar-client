import { useEffect, useState, useCallback } from 'react';
import styles from './FilterElem.module.css';
import { monthNames } from '../../service/reportConfig'

const FilterElem = ({title, pageIdent, filterIdent, items, isLoading, widthData, changeWeekFilter}) => {
  const [isAllSelected, setIsAllSelected] = useState((false));
  const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(startLoading);

  const handleSelectAll = useCallback(() => {
    const storageItem = localStorage.getItem(pageIdent);
    let currentPageData = JSON.parse(storageItem);
    currentPageData = currentPageData ? currentPageData : {}
    
    if (isAllSelected) {
      setIsAllSelected(false)
      setOptions((list) => {
        return list.map((elem) => ({...elem, isSelected: false}))
      })
      currentPageData[filterIdent] = []
    } else {
      setIsAllSelected(true)
      setOptions((list) => {
        return list.map((elem) => ({...elem, isSelected: true}))
      })
      currentPageData[filterIdent] = options.map((elem) => elem.value)
    }
    localStorage.setItem(pageIdent, JSON.stringify(currentPageData))
  }, [filterIdent, isAllSelected, options, pageIdent]);

  useEffect(() => {
    const current = []
    const storageItem = localStorage.getItem(pageIdent)
    
    let currentPageData = JSON.parse(storageItem)
    currentPageData = currentPageData ? currentPageData : {}
    
    let currentFilterData = currentPageData[filterIdent]
    
    for (let elem of items) {
      current.push({
        key: `${filterIdent}${items.indexOf(elem)}`,
        value: elem,
        isSelected: currentFilterData ? currentFilterData.includes(elem) : false
      })
    }
    if (filterIdent === 'year' || filterIdent === 'month') {
      changeWeekFilter();
    }
    setOptions(current)
    // handleSelectAll()
  }, [items])

  const changeSelectOption = (optionElem) => {
    const updatedList = options.map((elem) => (
      elem.value === optionElem.value
        ? { ...elem, isSelected: !elem.isSelected }
        : elem
    ));
    console.log('pageIdent', pageIdent);
    
    const storageItem = localStorage.getItem(pageIdent);
    let currentPageData = JSON.parse(storageItem);
    currentPageData = currentPageData ? currentPageData : {}
    let currentFilterData = currentPageData[filterIdent] ? currentPageData[filterIdent] : []
    if (currentFilterData.includes(optionElem.value)) {
      currentFilterData = currentFilterData.filter((el) => el !== optionElem.value);
    } else {
      currentFilterData.push(optionElem.value);
    }
    console.log('currentFilterData', currentFilterData);
    
    currentPageData[filterIdent] = currentFilterData
    console.log('currentPageData', currentPageData);
    
    localStorage.setItem(pageIdent, JSON.stringify(currentPageData))
    if (filterIdent === 'year' || filterIdent === 'month') {
      changeWeekFilter();
    }
    setOptions(updatedList)
  }

  useEffect(() =>  {
    const selectList = options.map(x => x.isSelected ? 1 : 0)
    const res = (selectList.reduce((acc, num) => acc + num, 0)) === options.length
    setIsAllSelected(res);
    if (filterIdent === 'year' || filterIdent === 'month') {
      changeWeekFilter();
    }
  }, [options, changeWeekFilter, filterIdent])

  const handleTitleDisplay = (e) => {
    const span = e.currentTarget;
    if (span.scrollWidth > span.clientWidth) {
      span.parentElement.setAttribute('title', span.textContent);
    } else {
      span.parentElement.removeAttribute('title');
    }
  };


  return (
      <div
        className={styles.filterGroup}
        style={{width: widthData ? widthData : '220px'}}
      >
        <div className={styles.filterHeader}>
          <h3>{title}</h3>
          <button onClick={handleSelectAll} className={styles.clearButton}>
            {isAllSelected ? 'Снять все' : 'Выбрать все'}
          </button>
        </div>
        {isLoading ? (
          <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ height: '100px', marginTop: '40px' }}
          >
            <span className='loader'></span>
          </div>
        ) : (
          <div className={styles.optionsList}>
            {options.map((option) => (
              <label
                key={option.key}
                className={styles.optionLabel}
              >
                <input
                  type='checkbox'
                  checked={option.isSelected}
                  onChange={() => {changeSelectOption(option)}}
                  className={styles.checkbox}
                />
                <span 
                style={{maxWidth: widthData ? '600px' : '180px'}}
                ref={(el) => el && handleTitleDisplay({ currentTarget: el })}
                >
                  {filterIdent === 'month' ? monthNames[option.value] : option.value}
                  
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
  );
};

export default FilterElem