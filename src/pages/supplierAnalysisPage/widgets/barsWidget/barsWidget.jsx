import { useEffect } from 'react';
import styles from './barsWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Bar } from '../../features';


const BarsWidget = ({ quantity = 4, dataHandler, dataType }) => {
    const dispatch = useAppDispatch()
    const widgetData = useAppSelector(store => store.supplierAnalysis[dataType])
    const { isSidebarHidden } = useAppSelector(store => store.utils)

    // mock
    let arr = new Array(quantity)
    for (let i = 0; i < quantity; i++) {
        arr[i] = quantity
    }
    arr.forEach(_ => {
        _ = quantity
    })

    useEffect(() => {
        if (!widgetData.data) {
            dispatch(dataHandler())
        }
    }, [widgetData.data])

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
            {arr.map((_, id) => {

                return (
                    <Bar
                        key={id}
                        rating={id === arr.length - 1}
                        titleColor={id === 0 ? '#5329FF' : ''}
                    />
                )
            })}
        </div>
    )
}

export default BarsWidget;