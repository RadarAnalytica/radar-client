import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './FilterElem.module.css';
import { monthNames } from '../../service/reportConfig'
import { switchPLFilter, switchAllPLFilter } from '../../redux/reportPL/plFiltersSlice'
import { switchDashboardFilter, switchAllDashboardFilter } from '../../redux/dashboardReport/dashboardFiltersSlice'
import { switchByMonthFilter, switchAllByMonthFilter } from '../../redux/reportByMonth/byMonthFiltersSlice'
import { switchByGoodsFilter, switchAllByGoodsFilter } from '../../redux/reportByGoods/byGoodsFiltersSlice'
import { switchABCFilter, switchAllABCFilter } from '../../redux/reportABC/abcFiltersSlice'
import { switchPenaltyFilter, switchAllPenaltyFilter } from '../../redux/reportPrnalties/penaltyFiltersSlice'
import { switchChartsFilter, switchAllChartsFilter } from '../../redux/reportCharts/chartsFiltersSlice'

const FilterElem = ({title, pageIdent, filterIdent, items, isLoading, widthData, changeWeekFilter}) => {
  const [isAllSelected, setIsAllSelected] = useState((false));
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(startLoading);
  
  useEffect(() => {
    const current = []
    // const storageItem = localStorage.getItem(pageIdent)
    
    // let currentPageData = JSON.parse(storageItem)
    // currentPageData = currentPageData ? currentPageData : {}
    // let currentFilterData = currentPageData[filterIdent] ? currentPageData[filterIdent] : []
    let counter = 0
    for (let elem of items ? Object.keys(items) : []) {
      
      current.push({
        key: `${filterIdent}${counter}`,
        value: elem,
        isSelected: items[elem]// currentFilterData.includes(elem)
      })
      counter++
    }
    // if (filterIdent === 'year' || filterIdent === 'month') {
    //   changeWeekFilter();
    // }
    setOptions(current)
  }, [items, filterIdent, pageIdent])

  const changeSelectOption = (optionElem) => {
    switch (pageIdent) {
            case 'dashboard':
              dispatch(switchDashboardFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
                return 
            case 'pl':
                dispatch(switchPLFilter(
                      { ident: filterIdent, elem: optionElem.value }
                    ))
                return
            case 'month':
              dispatch(switchByMonthFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
              return
            case 'goods':
              dispatch(switchByGoodsFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
              return
            case 'abc':
              dispatch(switchABCFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
              return
            case 'penalty':
              dispatch(switchPenaltyFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
              return 
            case 'charts':
              dispatch(switchChartsFilter(
                { ident: filterIdent, elem: optionElem.value }
              ))
              return 
            default:
                break;
        }
    // const updatedList = options.map((elem) => (
    //   elem.value === optionElem.value
    //     ? { ...elem, isSelected: !elem.isSelected }
    //     : elem
    // ));
    
    // const storageItem = localStorage.getItem(pageIdent);
    // let currentPageData = JSON.parse(storageItem);
    // currentPageData = currentPageData ? currentPageData : {}
    // let currentFilterData = currentPageData[filterIdent] ? currentPageData[filterIdent] : []
    // if (currentFilterData.includes(optionElem.value)) {
    //   currentFilterData = currentFilterData.filter((el) => el !== optionElem.value);
    // } else {
    //   currentFilterData.push(optionElem.value);
    // }
    // console.log('currentFilterData', currentFilterData);
    
    // currentPageData[filterIdent] = currentFilterData
    // console.log('currentPageData', currentPageData);
    
    // localStorage.setItem(pageIdent, JSON.stringify(currentPageData))
    // if (filterIdent === 'year' || filterIdent === 'month') {
    //   changeWeekFilter();
    // }
    // setOptions(updatedList)
  }

  useEffect(() =>  {
    const selectList = options.map(x => x.isSelected ? 1 : 0)
    const res = (selectList.reduce((acc, num) => acc + num, 0)) === options.length
    setIsAllSelected(res);
    // if (filterIdent === 'year' || filterIdent === 'month') {
    //   changeWeekFilter();
    // }
  }, [options, filterIdent])


  const handleSelectAll = () => {
    // const storageItem = localStorage.getItem(pageIdent);
    // let currentPageData = JSON.parse(storageItem);
    // currentPageData = currentPageData ? currentPageData : {}
    let isAllValue = true
    if (isAllSelected) {
      isAllValue = false
      
      // currentPageData[filterIdent] = []
    } 
    setIsAllSelected(isAllValue)
    switch (pageIdent) {
      case 'dashboard':
        dispatch(switchAllDashboardFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      case 'pl':
        dispatch(switchAllPLFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return
      case 'month':
        dispatch(switchAllByMonthFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      case 'goods':
        dispatch(switchAllByGoodsFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      case 'abc':
        dispatch(switchAllABCFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      case 'penalty':
        dispatch(switchAllPenaltyFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      case 'charts':
        dispatch(switchAllChartsFilter(
          { ident: filterIdent, value: isAllValue }
        ))
        return 
      default:
          break;
  }
    // localStorage.setItem(pageIdent, JSON.stringify(currentPageData))
  }
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