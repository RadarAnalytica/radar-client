import { useState, useEffect, useContext, useCallback } from 'react';
import FilterElem from './FilterElem';
import styles from './FilterGroup.module.css';
import AuthContext from '../../service/AuthContext';
import { getFilterData } from '../../service/ReportService'
import { reportFilters } from '../../service/reportConfig'
import DownloadButton from '../DownloadButton';
import { URL } from '../../service/config'
import { useSelector, useDispatch } from 'react-redux';
import { setDownloadLoading } from '../../redux/download/downloadSlice';

const NewFilterGroup = ({pageIdent, getData}) => {
    const { authToken } = useContext(AuthContext);
    const dispatch = useDispatch();
    const isDownloading = useSelector((state) => state.downloadReducer?.isDownloading);
    const [isLoading, setIsLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [filters, setFilters] = useState(reportFilters[pageIdent]);
    const [weekOriginFilter, setWeekOriginFilter] = useState([]);

    useEffect(() => {
        const storageItem = localStorage.getItem(pageIdent)
        if (!storageItem) {
            const storageData = {}
            for (let item of reportFilters[pageIdent]) {
                storageData[item.filterIdent] = []
            }
            console.log(storageData);
            
            localStorage.setItem(pageIdent, JSON.stringify(storageData))
        }
    }, [pageIdent])
    
    useEffect(() => {
        const filterData = async () => {
            const result = await getFilterData(pageIdent, authToken)
            setFilters((list) => {
                return list.map((el) => (
                    { ...el, items: result[el.filterIdent] }
                ))
            });
            if (result.week) {
                setWeekOriginFilter(result.week)
            }
            setIsLoading(false);
        }
        
        filterData()
        
      }, [setIsLoading, pageIdent, authToken, setFilters, setWeekOriginFilter])
    
    useEffect(() => {
        getData()
    }, [getData])

    const changeWeekFilters = useCallback(() => {
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
        
        setFilters((list) => {
            return list.map((el) => (
                el.filterIdent === 'week' ? {...el, items: Array.from(new Set(currentWeekFilter)) } : el
            ))
        })
    }, [weekOriginFilter, pageIdent])

    const handleDownload = async () => {
        dispatch(setDownloadLoading(true));
        fetch(
          `${URL}/api/report/download`,
          {
            method: 'POST',
            headers: {
              authorization: 'JWT ' + authToken,
              'Content-Type': 'application/json',
            },
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
          .catch((e) => console.error(e))
          .finally(() => dispatch(setDownloadLoading(false)));
      };

      const getFiltersByLocalStorage = () => {
        // Dashboard
        const resultFilters = {}
        const dashboardStorage = localStorage.getItem('dashboard')
        let currentPageData = JSON.parse(dashboardStorage)
        const dashboardPageData = currentPageData ? currentPageData : {}  
        
        resultFilters['dashboard'] = {
            warehouse_name_filter: dashboardPageData.wh ? dashboardPageData.wh : [],
            brand_name_filter: dashboardPageData.brand ? dashboardPageData.brand : [],
            groups_filter: dashboardPageData.group ? dashboardPageData.group : [],
            date_sale_filter: {
                years: dashboardPageData.year ? dashboardPageData.year : [],
                months: dashboardPageData.month ? dashboardPageData.month : [],
                weekdays: dashboardPageData.week ? dashboardPageData.week : [],
            },
        };
        

        // P&L
        const plStorage = localStorage.getItem('pl')
        currentPageData = JSON.parse(plStorage)
        const plPageData = currentPageData ? currentPageData : {}  

        const brandFilter = plPageData.brand.join(',');
        const groupFilter = plPageData.group.join(',');
        resultFilters['pl'] = {
            'brand_filter': brandFilter,
            'group_filter': groupFilter
        }

        // Report By Month
        const monthStorage = localStorage.getItem('month')
        currentPageData = JSON.parse(monthStorage)
        const monthPageData = currentPageData ? currentPageData : {}  

        resultFilters['month'] = {
            vendor_code_filter: monthPageData.vendorCode || [],
            size_name_filter: monthPageData.size || [],
            brand_name_filter: monthPageData.brand || [],
            country_filter: monthPageData.country || [],
            wb_id_filter: monthPageData.wbId || [],
            title_filter: monthPageData.product || [],
            subject_name_filter: monthPageData.subject || [],
            srid_filter: monthPageData.srid || [],
            groups_filter: monthPageData.group || [],
            date_sale_filter: {
                years: monthPageData.year || [],
                months: monthPageData.month || [],
                weekdays: monthPageData.week || [],
            },
        }

        // Report By Goods
        const goodsStorage = localStorage.getItem('goods')
        currentPageData = JSON.parse(goodsStorage)
        const goodsPageData = currentPageData ? currentPageData : {}  

        resultFilters['goods'] = {
            vendor_code_filter: goodsPageData.vendorCode || [],
            size_name_filter: goodsPageData.size || [],
            brand_name_filter: goodsPageData.brand || [],
            country_filter: goodsPageData.country || [],
            wb_id_filter: goodsPageData.wbId || [],
            title_filter: goodsPageData.product || [],
            subject_name_filter: goodsPageData.subject || [],
            srid_filter: goodsPageData.srid || [],
            groups_filter: goodsPageData.group || [],
            date_sale_filter: {
                years: goodsPageData.year || [],
                months: goodsPageData.month || [],
                weekdays: goodsPageData.week || [],
            },
        }

        // ABC
        const abcStorage = localStorage.getItem('abc')
        currentPageData = JSON.parse(abcStorage)
        const abcPageData = currentPageData ? currentPageData : {}  
        resultFilters['abc'] = {
            article_filter_list: abcPageData.wbId || [],
            brand_filter_list: abcPageData.brand || [],
            group_filter_list: abcPageData.group || [],
            month_filter_list: abcPageData.month || [],
            product_filter_list: abcPageData.product || [],
            year_filter_list: abcPageData.year || [],
            week_filter_list: abcPageData.week || [],
          }

        // Penalty
        const penaltyStorage = localStorage.getItem('penalty')
        currentPageData = JSON.parse(penaltyStorage)
        const penaltyPageData = currentPageData ? currentPageData : {}  

        resultFilters['penalty'] = {
            size_name_filter: penaltyPageData.size,
            wb_id_filter: penaltyPageData.wbId,
            srid_filter: penaltyPageData.srid,
            title_filter: penaltyPageData.product,
            action_type_filter: penaltyPageData.types,
            date_sale_filter: {
                years: penaltyPageData.year,
                months: penaltyPageData.month,
                weekdays: penaltyPageData.week,
            }
        };
        
        // Charts
        const chartsStorage = localStorage.getItem('charts')
        currentPageData = JSON.parse(chartsStorage)
        const chartsPageData = currentPageData ? currentPageData : {}  

        resultFilters['charts'] = {
            brand_name_filter: chartsPageData.brand,
            wb_id_filter: chartsPageData.wbId,
            groups_filter: chartsPageData.group,
            date_sale_filter: {
                years: chartsPageData.year,
                months: chartsPageData.month,
                weekdays: chartsPageData.week,
            }
        }
        
        return resultFilters
    }


    return (
        
        <div className={styles.filterContainer}>
            <div className="dash-container p-3 pb-2 pt-3 d-flex">
                <button
                    className={styles.collapseButton}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {!isCollapsed ? 'Свернуть фильтры' : 'Развернуть фильтры'}
                </button>
                <DownloadButton handleDownload={handleDownload} isLoading={isDownloading} />
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