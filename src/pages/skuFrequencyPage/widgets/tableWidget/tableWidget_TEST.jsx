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



const TableWidget_TEST = ({ tinyRows = false }) => {

    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    const [sortState, setSortState] = useState(initSortState) // стейт сортировки (см initSortState)
    const { requestData, requestStatus, requestObject, formType } = useAppSelector(store => store.requestsMonitoring)
    const [paginationState, setPaginationState] = useState({ limit: 25, page: 1, total_pages: requestData?.length || 1 })
    const navigate = useNavigate()

    //задаем начальную дату
    useEffect(() => {
        if (requestObject && formType === 'complex') {
            dispatch(fetchRequestsMonitoringData(requestObject))
        }
        if (requestObject && formType === 'easy') {
            dispatch(fetchRequestsMonitoringDataEasy(requestObject))
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

    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);
  
      useEffect(() => {
          const updateHeight = () => {
        if (containerRef.current) {
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
        const headerCell = document.querySelectorAll('.table__mainHeader')
        const coloredHeaderCell = document.querySelectorAll('.table__mainHeader_colored')
        const firstCells = document.querySelectorAll('.first__cell')
        if (headerCell && coloredHeaderCell && firstCells) {
            headerCell.forEach(_ => _.style.color = '#1A1A1A')
            coloredHeaderCell.forEach(_ => _.style.color = '#1A1A1A')
            //firstCells.forEach(_ => _.style.border = '1px solid black')
            //headerCell.style.color = '#1A1A1A'
            //coloredHeaderCell.color = '#1A1A1A'
        }
      }, [requestData])
  




    // отслеживаем скролл в контейнере
    const scrollHandler = () => {
        if (containerRef && containerRef.current) {

            // если скроллим вправо
            if (containerRef.current.scrollLeft > 1) {
                setIsXScrolled(true)
            } else {
                setIsXScrolled(false)
            }

            // вычисляем достиг ли скролл конца справа
            const delta = containerRef.current.scrollWidth - (containerRef.current.scrollLeft + containerRef.current.clientWidth);
            if (delta < 16) {
                setIsEndOfXScroll(true)
            } else {
                setIsEndOfXScroll(false)
            }
        }
    }

    // хэндлер сортировки
    const sortButtonClickHandler = (e, value) => {
        const { id } = e.currentTarget;

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === id && sortState.sortedValue === value) {
            setSortState(initSortState)
            dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field: 'rating', sort_order: 'DESC' }, page: 1 }))
            return
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        })
        dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field: value, sort_order: id }, page: 1 }))
    }

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

    return requestData && (
        <div className={styles.container} ref={containerRef} style={{ borderRadius: isEndOfXScroll ? '16px' : '' }}>
            <div className={styles.tableContainer} onScroll={scrollHandler}>
                <ConfigProvider
                    renderEmpty={() => (<div>Нет данных</div>)}
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
                                headerSortActiveBg: '#e7e1fe',
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
                        virtual
                        columns={newTableConfig}
                        dataSource={requestData}
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
                        expandable={{
                            // expandedRowRender: (record) => <p>{record.description}</p>,
                            expandIcon: ExpandIcon,
                            rowExpandable: (record) => !!record.description,
                            expandedRowClassName: styles.expandRow,
                        }}
                        // scroll={{ x: 'max-content' }}
                        scroll={{ x: scrollX, y: scrollY }}
                    ></Table>
                </ConfigProvider>
            </div>
            <ConfigProvider theme={paginationTheme}>
                <Pagination
                    defaultCurrent={1}
                    current={paginationState.page}
                    onChange={paginationHandler}
                    total={paginationState.total_pages}
                    pageSize={paginationState.limit}
                    showSizeChanger={false}
                    showQuickJumper
                    hideOnSinglePage={true}
                //showTotal={(total) => `Всего ${total} товаров`}
                />
            </ConfigProvider>
        </div>
    )
}

function ExpandIcon({ expanded, onExpand, record }) {
	const canExpand = !!record?.children && record?.children?.length > 0;
	// const canExpand = false;
	return canExpand && 
		<ConfigProvider
			theme={{
				token: {
					Button: {
						paddingBlock: 0,
						paddingInline: 0,
						textHoverBg: 'transparent',
						textTextColor: '#8C8C8C',
						colorBgTextActive: 'transprent',
						controlHeight: 25
					}
				}
			}}
		>
			<Button
				className={styles.expandBtn}
				type="text"
				onClick={(e) => {
					onExpand(record, e);
				}}
			>
				<svg className={`${styles.expandIcon} ${expanded ? styles.expandIconExpanded : ''}`} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L7 7L13 1" stroke='currentColor' strokeWidth="2" strokeLinecap="round"/>
				</svg>
			</Button>
		</ConfigProvider>
};

function SortIcon({ sortOrder }) {
	return (
		<svg
			width="24"
			height="16"
			viewBox="0 0 24 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			// style={{ marginLeft: 10, marginRight: 10 }}
			className={styles.sortIcons}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z"
				fill={sortOrder === 'ascend' ? '#5329FF' : 'currentColor'}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.773 13.1893V1.5H18.273V13.1893L21.7656 9.6967C22.0585 9.40381 22.5334 9.40381 22.8263 9.6967C23.1192 9.98959 23.1192 10.4645 22.8263 10.7574L18.0533 15.5303C17.7604 15.8232 17.2855 15.8232 16.9926 15.5303L12.2197 10.7574C11.9268 10.4645 11.9268 9.98959 12.2197 9.6967C12.5126 9.40381 12.9874 9.40381 13.2803 9.6967L16.773 13.1893Z"
				fill={sortOrder === 'descend' ? '#5329FF' : 'currentColor'}
			/>
		</svg>
	);
}

export default TableWidget_TEST;



