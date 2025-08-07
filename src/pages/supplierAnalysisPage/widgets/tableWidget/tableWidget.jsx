import React, { useState, useRef, useEffect } from 'react'
import styles from './tableWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { ConfigProvider, Table, Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { actions as supplierActions } from '../../../../redux/supplierAnalysis/supplierAnalysisSlice';
import { selectSupplierAnalysisDataByType, selectSupplierCurrentBrand } from '../../../../redux/supplierAnalysis/supplierAnalysisSelectors';


const getRequestObject = (id, selectedRange, paginationConfig, sort, currentBrand, dataType, hasPagination) => {
    if (!id) return undefined
    let datesRange;

    if (!selectedRange) {
        datesRange = {period: 30}
    }
    if (selectedRange.period) {
        datesRange = selectedRange
    } else {
        datesRange = {
            date_from: selectedRange.from,
            date_to: selectedRange.to
        }
    }
    let reqData = {
        supplier_id: parseInt(id),
        ...datesRange,
    }

    if (hasPagination && paginationConfig?.page) {
        reqData = {
            ...reqData,
            page: paginationConfig.page,
            limit: paginationConfig.limit
        }
    }

    if (sort && hasPagination) {
        reqData = {
            ...reqData,
            sorting: sort
        }
    }


    if (dataType === 'byBrandsTableData' && currentBrand) {
        reqData = {
            ...reqData,
            brands: [currentBrand],
        }
    }
    if (dataType === 'byBrandsTableData' && !currentBrand) {
        reqData = {
            ...reqData,
            brands: [],
        }
    }

    return reqData
}


//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
}

const TableWidget = ({
    tableConfig,
    id,
    title,
    downloadButton,
    customHeader,
    dataType,
    dataHandler,
    containerHeight,
    hasPagination = false
}) => {
    const dispatch = useAppDispatch()
    const containerRef = useRef(null)
    const { selectedRange } = useAppSelector(store => store.filters)
    const currentBrand = useAppSelector(selectSupplierCurrentBrand)
    const { data: tableData, isLoading, isError, isSuccess, message, pagination: paginationConfig, sort } = useAppSelector(state => selectSupplierAnalysisDataByType(state, dataType))




    // ------------ table change handler (for pagination && sorting)-----------//
    const tableChangeHandler = (pagination, filters, sorter) => {
        if (sorter) {
            dispatch(supplierActions.setSort({
                dataType: dataType,
                sort: {
                    sort_field: sorter.field,
                    sort_order: sorter.order
                }
            }))
        }

        if (pagination && hasPagination) {
            dispatch(supplierActions.setPagination({
                dataType: dataType,
                pagination: {
                    ...paginationConfig,
                    page: pagination.current,
                }
            }))
        }
    }



    // --------------------- Effects ---------------------//

    // table container width and height calculations
    // useEffect(() => {
    //     const updateHeight = () => {

    //         if (containerRef.current) {
    //             // ref контейнера который занимает всю высоту
    //             const container = containerRef.current;

    //             // расчет высоты шапки и добавление отступов контейнера
    //             const headerHeight = container.querySelector('.ant-table-header')?.offsetHeight || 70;
    //             const paddingsY = 50;
    //             // расчет и сохранение высоты таблицы
    //             const paginationSize = hasPagination && paginationConfig?.page && paginationConfig?.total && paginationConfig?.total > 1 ? 30 : 0
    //             const availableHeight = container.offsetHeight - headerHeight - paddingsY - paginationSize;
    //             setScrollY(availableHeight);
    //             // расчет ширины контейнера
    //             setScrollX(container.offsetWidth - 32);
    //         }
    //     };
    //     updateHeight();

    // }, [tableConfig, paginationConfig, tableData])


    //костыль для начального положения скролла
    useEffect(() => {
        const tBody = document.querySelectorAll('.ant-table-tbody-virtual-holder')
        if (tBody) {
            tBody.forEach(_ => {
                _.scrollTo({ top: 0 })
            })
        }

    }, [tableData, isLoading, tableConfig, paginationConfig])
    //костыль для починки рассинхрона скролла между хэдером таблицы и строками
    useEffect(() => {
        
        const stickyScroll = document.querySelectorAll('.ant-table-sticky-scroll')
        if (stickyScroll) {
            stickyScroll.forEach(_ => {
                _.style.display = 'none'
            })
        }

    }, [tableData, isLoading, tableConfig, paginationConfig])

    //pagination styles
    useEffect(() => {
        const paginationNextButton = document.querySelectorAll('.ant-pagination-jump-next')
        const paginationPrevButton = document.querySelectorAll('.ant-pagination-jump-prev')
        const paginationSingleNextButton = document.querySelectorAll('.ant-pagination-next')
        const paginationSinglePrevButton = document.querySelectorAll('.ant-pagination-prev')
        const jumper = document.querySelectorAll('.ant-pagination-options-quick-jumper')


        if (jumper) {
            jumper.forEach(_ => {
                const input = _?.querySelector('input')

                if (input && _) {
                    input.style.backgroundColor = '#EEEAFF'
                    input.style.padding = '5px'
                    input.style.width = '32px'
                    _.textContent = 'Перейти на'
                    _.appendChild(input)
                    const suffix = document.createElement('span');
                    suffix.textContent = 'стр'
                    _.appendChild(suffix)
                    _.style.color = 'black'
                }
            })

        }

        if (paginationNextButton) {
            paginationNextButton.forEach(_ => _.setAttribute('title', 'Следующие 5 страниц'))
        }
        if (paginationSingleNextButton) {
            paginationSingleNextButton.forEach(_ => _.setAttribute('title', 'Следующая страница'))
        }
        if (paginationSinglePrevButton) {
            paginationSinglePrevButton.forEach(_ => _.setAttribute('title', 'Предыдущая страница'))
        }
        if (paginationPrevButton) {
            paginationPrevButton.forEach(_ => _.setAttribute('title', 'Предыдущие 5 страниц'))
        }
    }, [tableData, paginationConfig])

    //data fetching (all tables except 'products')
    useEffect(() => {
        if (dataType !== 'byBrandsTableData') {
            const requestObject = getRequestObject(id, selectedRange, paginationConfig, sort, currentBrand, dataType, hasPagination)
            requestObject && dispatch(dataHandler({ data: requestObject, hasLoadingStatus: true }))
        }
    }, [id, selectedRange, paginationConfig?.page, sort, dataType])

    //data fetching 'products' table
    useEffect(() => {
        if (dataType == 'byBrandsTableData') {
            const requestObject = getRequestObject(id, selectedRange, paginationConfig, sort, currentBrand, dataType, hasPagination)
            requestObject && dispatch(dataHandler({ data: requestObject, hasLoadingStatus: true }))
        }
    }, [id, selectedRange, paginationConfig?.page, sort, currentBrand, dataType, hasPagination])

    // -------------------------------------------------------//



    // ---------------------- loading layout -----------------//
    if (isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.loaderWrapper} style={{ height: containerHeight }}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }



    // ----------------------- fetching error layout ----------------------//
    if (isError) {
        return (
            <div className={styles.widget}>
                <div className={styles.loaderWrapper}>
                    <div className={styles.errorWrapper__message}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                            <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                        </svg>
                        {message || 'Не удалось загрузить данные'}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF'
                                }
                            }}
                        >
                            <Button
                                size='large'
                                style={{ marginLeft: 24 }}
                                onClick={() => {
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
                                            ...datesRange,
                                            // "sorting": {
                                            //     "sort_field": "frequency",
                                            //     "sort_order": "DESC"
                                            // }
                                        }
                                        dispatch(dataHandler({ data: reqData, hasLoadingStatus: true }))
                                    }
                                }}
                            >
                                Обновить
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        )
    }


    // ------------------------ no data layout -----------------------------//
    if (isSuccess && tableData && tableData.length === 0) {
        return (
            <div className={styles.widget}>
                <div className={styles.loaderWrapper}>
                    <div className={styles.errorWrapper__message}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="5" fill="#F93C65" fillOpacity="0.1" />
                            <path d="M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z" fill="#F93C65" />
                        </svg>
                        {'Данных пока нет'}
                    </div>
                </div>
            </div>
        )
    }




    // ---------------------------main layout ---------------------------------//

    return (
        <div className={styles.widget}>
            <div className={!title && !customHeader && !downloadButton ? `${styles.widget__header} ${styles.widget__header_hidden}` : styles.widget__header}>
                {!customHeader && <p className={styles.widget__title}>{title}</p>}
                {customHeader && customHeader}
                {downloadButton &&
                    <DownloadButton />
                }
            </div>

            <div className={styles.widget__tableWrapper} ref={containerRef}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                            colorText: '#5329FF',
                            //lineWidth: 0,
                        },
                        components: {
                            Table: {
                                headerColor: '#8c8c8c',
                                headerBg: '#f7f6fe',
                                headerBorderRadius: 20,
                                selectionColumnWidth: 32,
                                cellFontSize: 16,
                                borderColor: '#e8e8e8',
                                cellPaddingInline: 16,
                                cellPaddingBlock: 17,
                                bodySortBg: '#f7f6fe',
                                headerSortActiveBg: '#e7e1fe',
                                headerSortHoverBg: '#e7e1fe',
                                rowSelectedBg: '#f7f6fe',
                                rowSelectedHoverBg: '#e7e1fe',
                                colorText: '#1A1A1A',
                                lineHeight: 1.2,
                                fontWeightStrong: 500
                            },
                            Pagination: {
                                itemActiveBg: '#EEEAFF',
                                itemBg: '#F7F7F7',
                                itemColor: '#8C8C8C',
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
                    {tableData &&
                        <Table
                            columns={tableConfig.map(_ => {
                                if (sort && _.dataIndex === sort.sort_field) {
                                    return {
                                        ..._,
                                        sortOrder: sort.sort_order
                                    }
                                } else {
                                    return _
                                }
                            })}
                            dataSource={tableData?.map((_, id) => ({..._, key: id}))}
                            pagination={hasPagination && paginationConfig ? {
                                position: ['bottomLeft'],
                                defaultCurrent: 1,
                                current: paginationConfig?.page,
                                total: paginationConfig?.total * paginationConfig?.limit,
                                pageSize: paginationConfig?.limit,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                hideOnSinglePage: true,
                            } : false}
                            rowSelection={false}
                            showSorterTooltip={false}
                            sticky={{ offsetHeader: -30, offsetScroll: -0}}
                            onChange={tableChangeHandler}
                            preserveScrollPosition={false}
                            scroll={{ x: tableConfig?.reduce((acc, a) => acc += a.width, 0) + 16, y: `calc(${containerHeight} + 16px)`, scrollToFirstRowOnChange: true, }}
                        />
                    }
                </ConfigProvider>
            </div>
        </div>
    )

}

export default TableWidget;



