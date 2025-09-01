import React, { useState, useRef, useEffect } from 'react'
import styles from './tableWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { fetchRequestsMonitoringData, fetchRequestsMonitoringDataEasy } from '../../../../redux/requestsMonitoring/requestsMonitoringActions';
import { actions as reqsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import { ConfigProvider, Table } from 'antd'
import { radarTableConfig } from '../../shared/configs/tableConfig';
import { Table as RadarTable } from 'radar-ui';
import 'radar-ui/dist/style.css'; 

//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
}

const paginationTheme = {
    token: {
        colorText: '#5329FF',
        lineWidth: 0,
        colorPrimary: '#5329FF'
    },
    components: {
        Pagination: {
            itemActiveBg: '#EEEAFF',
            itemBg: '#F7F7F7',
            itemColor: '#8C8C8C',
        }
    }
}





const TableWidget = ({ tableConfig, setTableConfig }) => {
    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const { requestData, requestStatus, requestObject, formType, pagination } = useAppSelector(store => store.requestsMonitoring)



    const updateTableConfig = (config, settings) => {
        if (!settings || !config) {
            return radarTableConfig
        }
        let newConfig = config;
        newConfig = newConfig.map(col => ({
            ...col,
            children: col.children.map(child => {
                const curr = settings.find(i => i.dataIndex === child.dataIndex);
                return {
                    ...child,
                    hidden: !curr?.isActive
                };
            })
        }))
        newConfig = newConfig.map(_ => ({
            ..._,
            hidden: _?.children?.every(c => c?.hidden)
        }))

        return newConfig
    };

    //задаем начальную дату
    useEffect(() => {
        if (requestObject && formType === 'complex') {
            dispatch(fetchRequestsMonitoringData({ requestObject, requestData }))
        }
        if (requestObject && formType === 'easy') {
            dispatch(fetchRequestsMonitoringDataEasy({ requestObject, requestData }))
        }
        if (containerRef?.current) {
            console.log('scrollTo', { top: 0, behavior: 'smooth' })
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
        console.log('Column resized:', columnKey, width);
    
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
    
        // Обновляем состояние config2
        setTableConfig(prevConfig => updateColumnWidth(prevConfig));
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
                        console.log('sorting', { sort_field, sort_order }) 
                        dispatch(reqsMonitoringActions.updatePagination({ page: 1 }))
                        dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field, sort_order } }))
                    }}
                    onColumnReorder={(newConfig) => {
                      console.log('onColumnReorder grouped', { newConfig })
                      setTableConfig(newConfig)
                    }}
                    pagination={{
                      current: pagination.page,
                      pageSize: pagination.limit,
                      total: pagination.total_pages,
                      onChange: (page, pageSize) => { 
                        console.log('pagination', { page, pageSize }) 
                        dispatch(reqsMonitoringActions.updatePagination({ page }))
                      },
                      showQuickJumper: true,
                    }}
                />
            </div>
            <div
                className={styles.container}
                ref={containerRef}
            >
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    // renderEmpty={() => (<></>)}
                    theme={{
                        token: {
                            colorText: '#5329FF',
                            lineWidth: 0,
                            colorPrimary: '#5329FF'
                        },
                        components: {
                            Table: {
                                headerColor: '#8c8c8c',
                                headerBg: 'white',
                                headerBorderRadius: 20,
                                selectionColumnWidth: 32,
                                cellFontSize: 16,
                                borderColor: '#f0f0f0',
                                cellPaddingInline: 16,
                                //cellPaddingInline: 0,
                                cellPaddingBlock: 17,
                                //cellPaddingBlock: 0,
                                //bodySortBg: '#f7f6fe',
                                bodySortBg: '#f7f6fe',
                                headerSortActiveBg: 'white',
                                headerSortHoverBg: 'white !important',
                                rowSelectedBg: '#f7f6fe',
                                rowSelectedHoverBg: '#e7e1fe',
                                colorText: '#1A1A1A',
                                lineHeight: 1.2,
                                fontWeightStrong: 500
                            },
                            Checkbox: {
                                colorBorder: '#ccc',
                                colorPrimary: '#5329ff',
                                colorPrimaryBorder: '#5329ff',
                                colorPrimaryHover: '#5329ff',
                            },
                            Pagination: {
                                itemActiveBg: '#EEEAFF',
                                itemBg: '#F7F7F7',
                                itemColor: '#8C8C8C',
                            }
                        },
                    }}
                >
                    {/* <Table
                        rowKey={(record) => {return `${record.query}-${record.avg_daily_revenue}`}}
                        key={JSON.stringify(pagination)}
                        dataSource={requestData}
                        columns={sortFunc(tableConfig)}
                        pagination={{
                            position: ['bottomLeft'],
                            defaultCurrent: 1,
                            current: pagination.page,
                            onChange: paginationHandler,
                            total: pagination.total_pages,
                            pageSize: pagination.limit,
                            showSizeChanger: false,
                            showQuickJumper: true,
                        }}
                        rowSelection={false}
                        showSorterTooltip={false}
                        sticky={true}
                        bordered
                        onChange={handleChange}
                        scroll={{ x: tableConfig?.reduce((acc, group) => acc + (group.children?.reduce((groupAcc, column) => groupAcc + (column.width || 0), 0) || 0), 0) + 16, y: `calc(90vh + 16px)`, scrollToFirstRowOnChange: true, }}
                    /> */}
                </ConfigProvider>
            </div>
        </div>
    )
}



export default TableWidget;



