import { useEffect, useState } from 'react';
import styles from './FilterElem.module.css';

const FilterElem = ({title, pageIdent, filterIdent, items, isLoading}) => {
  const [isAllSelected, setIsAllSelected] = useState((false));
  const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(startLoading);
  
  useEffect(() => {
    const current = []
    const storageItem = localStorage.getItem(pageIdent)
    let currentPageData = JSON.parse(storageItem)
    currentPageData = currentPageData ? currentPageData : {}
    let currentFilterData = currentPageData[filterIdent] ? currentPageData[filterIdent] : []

    for (let elem of items) {
      current.push({
        key: `${filterIdent}${items.indexOf(elem)}`,
        value: elem,
        isSelected: currentFilterData.includes(elem)
      })
    }
    setOptions(current)
  }, [items, filterIdent, pageIdent])

  const changeSelectOption = (optionElem) => {
    const updatedList = options.map((elem) => (
      elem.value === optionElem.value
        ? { ...elem, isSelected: !elem.isSelected }
        : elem
    ));
    console.log('pageIdent', pageIdent);
    
    const storageItem = localStorage.getItem(pageIdent)
    let currentPageData = JSON.parse(storageItem)
    currentPageData = currentPageData ? currentPageData : {}
    let currentFilterData = currentPageData[filterIdent] ? currentPageData[filterIdent] : []
    if (currentFilterData.includes(optionElem.value)) {
      currentFilterData = currentFilterData.filter((el) => el !== optionElem.value);
    } else {
      currentFilterData.push(optionElem.value)
    }
    console.log('currentFilterData', currentFilterData);
    
    currentPageData[filterIdent] = currentFilterData
    console.log('currentPageData', currentPageData);
    
    localStorage.setItem(pageIdent, JSON.stringify(currentPageData))
    setOptions(updatedList)
  }

  useEffect(() =>  {
    const selectList = options.map(x => x.isSelected ? 1 : 0)
    const res = (selectList.reduce((acc, num) => acc + num, 0)) === options.length
    setIsAllSelected(res)
  }, [options])


  const handleSelectAll = () => {
    if (isAllSelected) {
      setIsAllSelected(false)
      setOptions((list) => {
        return list.map((elem) => ({...elem, isSelected: false}))
      })
    } else {
      setIsAllSelected(true)
      setOptions((list) => {
        return list.map((elem) => ({...elem, isSelected: true}))
      })
    }
  }


  return (
      <div
        className={styles.filterGroup}
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
                <span>
                  {option.value}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
  );
};

export default FilterElem