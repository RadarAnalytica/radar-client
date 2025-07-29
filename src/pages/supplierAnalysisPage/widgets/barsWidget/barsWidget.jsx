import { useEffect } from 'react';
import styles from './barsWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Bar } from '../../features';


/**
 * 
  "brands": 0,
  "goods": 0,
  "avg_daily_revenue": 0,
  "rating": 5

 */


const BarsWidget = ({ quantity = 4, dataHandler, dataType, id }) => {
    const dispatch = useAppDispatch()
    const widgetData = useAppSelector(store => store.supplierAnalysis[dataType])
    const { isSidebarHidden } = useAppSelector(store => store.utils)
    const { selectedRange } = useAppSelector(store => store.filters)


    useEffect(() => {
        if (selectedRange && id) {
            let datesRange;

            if (selectedRange.period) {
                datesRange = selectedRange
            } else {
                datesRange = {
                    date_from: selectedRange.from,
                    date_to: selectedRange.to
                }
            }
            const reqData = {
                "supplier_id": parseInt(id),
                "page": 1,
                "limit": 25,
                ...datesRange
                // "sorting": {
                //     "sort_field": "frequency",
                //     "sort_order": "DESC"
                // }
            }
            dispatch(dataHandler(reqData))
        }
    }, [id, selectedRange])

    if (widgetData.isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <span className='loader'></span>
            </div>
        )
    }
    if (widgetData.isError) {
        return (
            <div className={styles.errorWrapper}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                    <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                </svg>
                {widgetData.message || 'Не удалось загрузить данные'}
            </div>
        )
    }

    return (
        <div className={isSidebarHidden ? styles.widget : `${styles.widget} ${styles.widget_2cols}`}>
            {widgetData && Object.keys(widgetData).map((_, id) => {
                return (
                    <Bar
                        key={id}
                        rating={widgetData[_]}
                        titleColor={id === 0 ? '#5329FF' : ''}
                    />
                )
            })}
        </div>
    )
}

export default BarsWidget;


