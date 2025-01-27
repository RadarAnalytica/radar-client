import { useState, useEffect, useContext, useCallback } from 'react';
import FilterElem from './FilterElem';
import styles from './FilterGroup.module.css';
import AuthContext from '../../service/AuthContext';
// import { getFilterData } from '../../service/ReportService'
import { reportFilters } from '../../service/reportConfig'
import DownloadButton from '../DownloadButton';
import { URL } from '../../service/config'

const NewFilterGroup = ({pageIdent, filtersData, isLoading, getData}) => {
    const { authToken } = useContext(AuthContext);
    // const [isLoading, setIsLoading] = useState(true);
    // const { plFilters } = useSelector((state) => state?.plFiltersSlice);
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [filters, setFilters] = useState(reportFilters[pageIdent])
    const [weekOriginFilter, setWeekOriginFilter] = useState([])

    // useEffect(() => {
    //     const storageItem = localStorage.getItem(pageIdent)
    //     if (!storageItem) {
    //         const storageData = {}
    //         for (let item of reportFilters[pageIdent]) {
    //             storageData[item.filterIdent] = []
    //         }
    //         console.log(storageData);
            
    //         localStorage.setItem(pageIdent, JSON.stringify(storageData))
    //     }
    // }, [pageIdent])
    
    useEffect(() => {
        
        const filterData = async () => {
            // const result = await getFilters(authToken)
            setFilters((list) => {
                return list.map((el) => (
                    { ...el, items: filtersData[el.filterIdent] }
                ))
            });
            // if (filtersData.week) {
            //     setWeekOriginFilter(filtersData.week)
            // }
            // setIsLoading(false);
        }
        
        filterData()
        
      }, [pageIdent, authToken, setFilters, setWeekOriginFilter, filtersData])
    
    useEffect(() => {
        getData()
    }, [getData])

    const changeWeekFilters = useCallback(() => {
        return
        const storageItem = localStorage.getItem(pageIdent)
        let currentPageData = JSON.parse(storageItem)
        currentPageData = currentPageData ? currentPageData : {}
        const yearSelectList = currentPageData.year ? currentPageData.year : []
        const monthSelectList = currentPageData.month ? currentPageData.month : []

        let currentWeekFilter = []
        if (yearSelectList.length > 0) {
            for (let _year of yearSelectList) {
                currentWeekFilter = currentWeekFilter.concat(weekOriginFilter.filter(el => el.includes(`${_year}-`)))
            }
        } else {
            currentWeekFilter = [...weekOriginFilter]
        }
        const yearFilteredList = Array.from(new Set(currentWeekFilter))
        currentWeekFilter = []

        if (monthSelectList.length > 0) {
            for (let _month of monthSelectList) {
                currentWeekFilter = currentWeekFilter.concat(yearFilteredList.filter(el => el.includes(`-${_month}-`)))
            }
        } else {
            currentWeekFilter = [...yearFilteredList]
        }
        
        // setFilters((list) => {
        //     return list.map((el) => (
        //         el.filterIdent === 'week' ? {...el, items: Array.from(new Set(currentWeekFilter)) } : el
        //     ))
        // })
    }, [weekOriginFilter, pageIdent])

    const handleDownload = async () => {
        // const filters = getFiltersByLocalStorage()
        fetch(
          `${URL}/api/report/download`,
          {
            method: 'POST',
            headers: {
              authorization: 'JWT ' + authToken,
            },
            // body: JSON.stringify(filters)
          }
        )
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Финансовый отчет.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((e) => console.error(e));
      };

    // const getFiltersByLocalStorage = () => {
    //     const resultFilters = {}
    //     const dashboardStorage = localStorage.getItem('dashboard')
    //     let currentPageData = JSON.parse(dashboardStorage)
    //     const dashboardPageData = currentPageData ? currentPageData : {}  
        
    //     resultFilters['dashboard'] = {
    //         warehouse_name_filter: dashboardPageData.wh ? dashboardPageData.wh : [],
    //         brand_name_filter: dashboardPageData.brand ? dashboardPageData.brand : [],
    //         groups_filter: dashboardPageData.group ? dashboardPageData.group : [],
    //         date_sale_filter: {
    //             years: dashboardPageData.year ? dashboardPageData.year : [],
    //             months: dashboardPageData.month ? dashboardPageData.month : [],
    //             weekdays: dashboardPageData.week ? dashboardPageData.week : [],
    //         },
    //     };

    //     return resultFilters
    // }

    return (
        
        <div className={styles.filterContainer}>
            <div className="dash-container p-3 pb-2 pt-3 d-flex">
                <button
                    className={styles.collapseButton}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
                </button>
                <DownloadButton handleDownload={handleDownload}/>
            </div>
            
            {!isCollapsed && (
                <>
                  <div className={styles.filterGrid}>
                    {filters.map((elem) => {
                        return (
                            <FilterElem
                                key={elem.filterIdent}
                                title={elem.title}
                                pageIdent={pageIdent}
                                filterIdent={elem.filterIdent}
                                items={elem.items}
                                isLoading={isLoading}
                                widthData={elem.width}
                                changeWeekFilter={changeWeekFilters}    
                            />
                        );
                    })}
                  </div>
                  <div className='container dash-container'>
                        <div>
                            <button
                                className={styles.applyButton}
                                onClick={() => getData()}
                            >
                                Применить фильтры
                            </button>
                        </div>
                  </div>
                </>
            )}
        </div>
    )
};

export default NewFilterGroup;