import React, { useState, useRef, useEffect } from 'react'
import styles from './tableWidget_TEST.module.css'
import { formatPrice } from '../../../../service/utils';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Link } from 'react-router-dom';
import { formatRateValue, sortTableDataFunc } from '../../shared';
import { fetchRequestsMonitoringData, fetchRequestsMonitoringDataEasy } from '../../../../redux/requestsMonitoring/requestsMonitoringActions';
import { actions as reqsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import { ConfigProvider, Pagination, Table } from 'antd'
import { useNavigate } from 'react-router-dom';
import { newTableConfig } from '../../shared/configs/tableConfig';

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





const TableWidget_TEST = ({ tableConfig, setTableConfig }) => {

    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    //const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    //const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    //const [sortState, setSortState] = useState(null) // стейт сортировки (см initSortState)
    // const [tableConfig, setTableConfig] = useState(newTableConfig)
    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const { requestData, requestStatus, requestObject, formType, tableConfig: tableSettings, pagination } = useAppSelector(store => store.requestsMonitoring)
    const [paginationState, setPaginationState] = useState({ limit: 25, page: 1, total_pages: requestData?.length || 1 })
    const navigate = useNavigate()

    const updateTableConfig = (settings) => {
        let newConfig = tableConfig;
        newConfig = newConfig.map(col => ({
            ...col,
            children: col.children.map(child => {
                const curr = settings.find(i => i.dataIndex === child.dataIndex);
                return {
                    ...child,
                    hidden: !curr.isActive
                };
            })
        }))
        newConfig = newConfig.map(_ => ({
            ..._,
            hidden: _.children.every(c => c.hidden)
        }))
        setTableConfig(newConfig)
    };
    const updateTableConfigTest = (config, settings) => {
        let newConfig = config;
        newConfig = newConfig.map(col => ({
            ...col,
            children: col.children.map(child => {
                const curr = settings.find(i => i.dataIndex === child.dataIndex);
                return {
                    ...child,
                    hidden: !curr.isActive
                };
            })
        }))
        newConfig = newConfig.map(_ => ({
            ..._,
            hidden: _.children.every(c => c.hidden)
        }))

        return newConfig
    };

    //задаем начальную дату
    //задаем начальную дату
    useEffect(() => {
        if (requestObject && formType === 'complex') {
            dispatch(fetchRequestsMonitoringData({ requestObject, requestData }))
        }
        if (requestObject && formType === 'easy') {
            dispatch(fetchRequestsMonitoringDataEasy({ requestObject, requestData }))
        }
    }, [requestObject])





    useEffect(() => {
        if (requestData) {
            const jumper = document.querySelector('.ant-pagination-options-quick-jumper')
            const input = jumper?.querySelector('input')
            if (jumper && input) {

                input.style.backgroundColor = '#EEEAFF'
                input.style.padding = '5px'
                input.style.width = '32px'
                jumper.textContent = 'Перейти на'
                jumper.appendChild(input)
                const suffix = document.createElement('span');
                suffix.textContent = 'стр'
                jumper.appendChild(suffix)
                jumper.style.color = 'black'
            }
        }
    }, [requestData])



    useEffect(() => {
        const updateHeight = () => {
            if (containerRef?.current) {
                // ref контейнера который занимает всю высоту
                const container = containerRef.current;

                // расчет высоты шапки и добавление отступов контейнера
                const headerHeight = container.querySelector('.ant-table-header')?.offsetHeight || 70;
                const paddings = 32;
                // расчет и сохранение высоты таблицы
                const availableHeight = container.offsetHeight - headerHeight - paddings;
                setScrollY(availableHeight);
                // расчет ширины контейнера
                setScrollX(container.offsetWidth - 32);
            }
        };

        updateHeight();

    }, [newTableConfig, requestData])

    useEffect(() => {

        const tableBody = document.querySelector('.ant-table-tbody')
        const headerCell = document.querySelectorAll('.table__mainHeader')
        const coloredHeaderCell = document.querySelectorAll('.table__mainHeader_colored')

        if (headerCell && coloredHeaderCell) {
            headerCell?.forEach(_ => _.style.color = '#1A1A1A')
            coloredHeaderCell?.forEach(_ => _.style.color = '#1A1A1A')
        }
        if (tableBody) {
            tableBody.style.maxHeight = '80vh'
        }


    }, [requestData, tableSettings, tableConfig, pagination])

    useEffect(() => {
        updateTableConfig(tableSettings)
    }, [tableSettings])

    useEffect(() => {
        updateTableConfig(tableSettings)
    }, [])


    useEffect(() => {
        const paginationNextButton = document.querySelector('.ant-pagination-jump-next')
        const paginationPrevButton = document.querySelector('.ant-pagination-jump-prev')
        const paginationSingleNextButton = document.querySelector('.ant-pagination-next')
        const paginationSinglePrevButton = document.querySelector('.ant-pagination-prev')
        if (paginationNextButton) {
            paginationNextButton.setAttribute('title', 'Следующие 5 страниц')
        }
        if (paginationSingleNextButton) {
            paginationSingleNextButton.setAttribute('title', 'Следующая страница')
        }
        if (paginationSinglePrevButton) {
            paginationSinglePrevButton.setAttribute('title', 'Предыдущая страница')
        }
        if (paginationPrevButton) {
            paginationPrevButton.setAttribute('title', 'Предыдущие 5 страниц')
        }
    }, [pagination])

    const paginationHandler = (page) => {
        dispatch(reqsMonitoringActions.updateRequestObject({ page: page }))
       
    }

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

    const sortFunc = (config) => {
        if (requestObject?.sorting) {
            const { sort_field, sort_order } = requestObject.sorting

            let sortedConfig = config.map(_ => {
                return {
                    ..._,
                    children: _.children?.map((i) => { return { ...i, sortOrder: sort_field === i.dataIndex ? sort_order : null, columnKey: i.dataIndex, } }),
                }

            })
            return sortedConfig
        } else {
            let sortedConfig = config.map(_ => {
                return {
                    ..._,
                    children: _.children?.map((i) => { return { ...i, sortOrder: null, columnKey: i.dataIndex, } }),
                }

            })
            return updateTableConfigTest(sortedConfig, tableSettings)
        }

    }

    const handleChange = (pagination, filters, sorterObj) => {
        if (!sorterObj.order) {
            dispatch(reqsMonitoringActions.updateRequestObject({ sorting: undefined }))
            return
        }
        const obj = {
            sort_field: sorterObj.field,
            sort_order: sorterObj.order,
        }
        dispatch(reqsMonitoringActions.updateRequestObject({ sorting: obj, page: 1, limit: 25 }))
    };

    return requestData && newTableConfig && (
        <div
            className={styles.container}
            ref={containerRef}
        //style={{ borderRadius: isEndOfXScroll ? '16px' : '' }}
        >
            <div className={styles.tableContainer}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    // renderEmpty={() => (<></>)}
                    theme={{
                        components: {
                            Table: {
                                headerColor: '#8c8c8c',
                                //headerColor: 'black',
                                //headerBg: '#f7f6fe',
                                headerBg: 'white',
                                headerBorderRadius: 20,
                                selectionColumnWidth: 32,
                                cellFontSize: 16,
                                //borderColor: '#e8e8e8',
                                borderColor: 'white',
                                cellPaddingInline: 16,
                                //cellPaddingInline: 0,
                                cellPaddingBlock: 17,
                                //cellPaddingBlock: 0,
                                //bodySortBg: '#f7f6fe',
                                bodySortBg: '#f7f6fe',
                                headerSortActiveBg: 'white',
                                //headerSortHoverBg: '#e7e1fe',
                                headerSortHoverBg: 'white',
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
                        },
                    }}
                >
                    <Table
                        key={JSON.stringify(pagination)}
                        virtual
                        dataSource={requestData}
                        columns={sortFunc(tableConfig)}
                        //dataSource={requestData.filter((_,id) => id <= 5)}
                        pagination={false}
                        // tableLayout="fixed"
                        rowSelection={false}
                        showSorterTooltip={false}
                        sticky={true}
                        bordered
                        rowClassName={(record) => {
                            //return record.key === 'summary' ? styles.summaryRow : '';
                            return styles.row
                        }}
                        // scroll={{ x: 'max-content' }}
                        scroll={{ x: scrollX, y: scrollY }}
                        onChange={handleChange}
                    ></Table>
                </ConfigProvider>
                <div style={{
                    margin: '20px 0'
                }}>
                    <ConfigProvider theme={paginationTheme}>
                        <Pagination
                            defaultCurrent={1}
                            current={pagination.page}
                            onChange={paginationHandler}
                            total={pagination.total_pages}
                            pageSize={pagination.limit}
                            showSizeChanger={false}
                            showQuickJumper
                        //hideOnSinglePage={true}
                        //showTotal={(total) => `Всего ${total} товаров`}
                        />
                    </ConfigProvider>
                </div>
            </div>

        </div>
    )
}



export default TableWidget_TEST;



