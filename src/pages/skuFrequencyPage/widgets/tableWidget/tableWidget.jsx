import React, { useRef, useEffect } from 'react'
import styles from './tableWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { fetchRequestsMonitoringData, fetchRequestsMonitoringDataEasy } from '../../../../redux/requestsMonitoring/requestsMonitoringActions';
import { actions as reqsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import { Table as RadarTable } from 'radar-ui';
import 'radar-ui/dist/style.css';


const TableWidget = ({ tableConfig, setTableConfig }) => {
    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const { requestData, requestStatus, requestObject, formType, pagination } = useAppSelector(store => store.requestsMonitoring)

    //задаем начальную дату
    useEffect(() => {
        if (requestObject && formType === 'complex') {
            dispatch(fetchRequestsMonitoringData({ requestObject, requestData }))
        }
        if (requestObject && formType === 'easy') {
            dispatch(fetchRequestsMonitoringDataEasy({ requestObject, requestData }))
        }
        if (containerRef?.current) {
            //console.log('scrollTo', { top: 0, behavior: 'smooth' })
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [requestObject])




    if (requestStatus.isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    if (requestStatus.isError) {
        return (
            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                onClose={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                onCancel={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                message={requestStatus.message}
            />
        )
    }





    const onResizeGroup = (columnKey, width) => {
        //console.log('Column resized:', columnKey, width);

        // Обновляем конфигурацию колонок с группированной структурой
        const updateColumnWidth = (columns) => {
            return columns.map(col => {
                // Если это группа с children
                if (col.children && col.children.length > 0) {
                    const updatedChildren = updateColumnWidth(col.children);

                    // Всегда пересчитываем ширину группы на основе суммы ширин дочерних колонок
                    const totalWidth = updatedChildren.reduce((sum, child) => sum + (child.width || child.minWidth || 200), 0);
                    return { ...col, width: totalWidth, minWidth: totalWidth, children: updatedChildren };
                }

                // Если это листовая колонка
                if (col.key === columnKey) {
                    return { ...col, width: width, minWidth: width };
                }

                return col;
            });
        };

        // Обновляем состояние
        setTableConfig(prevConfig => {
            const updatedConfig = updateColumnWidth(prevConfig)
            const normalizedTableConfig = updatedConfig.map(item => ({
                ...item,
                render: undefined,
                children: item.children.map(child => ({
                    ...child,
                    render: undefined
                }))
            }))
            localStorage.setItem('MonitoringTableConfig', JSON.stringify(normalizedTableConfig))
            return updatedConfig
        });
    };

    return requestData && tableConfig && (
        <div className={styles.widget}>
            <div
                className={styles.container}
                ref={containerRef}
            >
                <RadarTable
                    dataSource={requestData}
                    config={tableConfig}
                    resizeable
                    draggableColumns
                    onResize={onResizeGroup}
                    stickyHeader
                    preset="radar-table-simple"
                    onSort={(sort_field, sort_order) => {
                        //console.log('sorting', { sort_field, sort_order }) 
                        dispatch(reqsMonitoringActions.updatePagination({ page: 1 }))
                        dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field, sort_order } }))
                    }}
                    onColumnReorder={(newConfig) => {
                        const normalizedTableConfig = newConfig.map(item => ({
                            ...item,
                            render: undefined,
                            children: item.children.map(child => ({
                                ...child,
                                render: undefined
                            }))
                        }))
                        localStorage.setItem('MonitoringTableConfig', JSON.stringify(normalizedTableConfig))
                        setTableConfig((prev) => newConfig)
                    }}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.limit,
                        total: pagination.total_pages,
                        onChange: (page, pageSize) => {
                            //console.log('pagination', { page, pageSize }) 
                            dispatch(reqsMonitoringActions.updatePagination({ page }))
                        },
                        showQuickJumper: true,
                    }}
                    paginationContainerStyle={{
                        bottom: 0
                    }}
                />
            </div>
        </div>
    )
}



export default TableWidget;



