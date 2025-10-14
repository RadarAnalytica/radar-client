import { ConfigProvider, Table, Button, Progress, Flex } from 'antd';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from '../../shared/Icons';
import moment from 'moment';
import styles from './tableWidget.module.css';
import { formatPrice } from '../../../../service/utils';
import { ServiceFunctions } from '../../../../service/serviceFunctions';

const customCellExpenseRender = (
    value,
    record,
    index,
    dataIndex,
    setExpenseEdit,
    setModalCreateExpenseOpen,
    setDeleteExpenseId,
    copyExpense,
    data,
    setModalEditExpenseOpen,
    authToken,
    setModalCopyExpenseOpen,
    setExpenseCopy
) => {
    if (dataIndex === 'is_periodic' && record.key !== 'summary' && record.is_periodic) {
        return (
            <div className={record.is_periodic ? styles.periodicBadge_periodic : styles.periodicBadge_static} title={record.is_periodic ? 'Периодический' : 'Разовый'}>
                {record.is_periodic ? 'Плановый' : 'Разовый'}
            </div>
        )
    }
    if (dataIndex === 'date' && record.key === 'summary') {
        return (
            <div className={`${styles.customCell} ${styles.customCell_summaryPadding}`}>
                {value}
            </div>
        )
    }
    if (dataIndex === 'date' && record.key !== 'summary') {
        return (
            <div className={styles.customCell}>
                {moment(value).format('DD.MM.YYYY')}
            </div>
        )
    }
    if (dataIndex === 'description' || dataIndex === 'expense_categories' || dataIndex === 'vendor_code' || dataIndex === 'brand_name') {
        return (
            <div className={styles.customCell}>
                {value || '-'}
            </div>
        )
    }
    if (dataIndex === 'value') {
        return (
            <div className={styles.customCell}>
                {formatPrice(value, '')}
            </div>
        )
    }
    if (dataIndex === 'shop') {
        return (<>{value?.name || '-'}</>)
    }
    if (dataIndex === 'action' && record.key === 'summary') {
        return null;
    }
    if (dataIndex === 'action' && record.key !== 'summary') {
        return (<Flex justify="start" gap={20}>
            <ConfigProvider>
                <Button
                    type="text"
                    icon={EditIcon}
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        let response;
                        if (record.is_periodic) {
                            response = await ServiceFunctions.getPeriodicExpenseTemplate(authToken, record.periodic_expense_id);
                            const currItem = (data?.find((item) => item.id === record.id))

                            setExpenseEdit({
                                ...currItem,
                                end_date: response.finished_at?.split('T')[0],
                                frequency: response.period_type,
                                week: response.period_type === 'week' ? response.period_values : null,
                                month: response.period_type === 'month' ? response.period_values : null,
                                periodic_expense_id: response.id,
                            })
                            setModalEditExpenseOpen(true);
                            return
                        }
                        setExpenseEdit((data?.find((item) => item.id === record.id)));
                        setModalEditExpenseOpen(true);
                    }}
                    title='Изменить'
                ></Button>
                <Button
                    type="text"
                    icon={CopyIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        if (!record.is_periodic) {
                            copyExpense(record.id);
                            return
                        }

                        let response;
                        if (record.is_periodic) {
                            response = await ServiceFunctions.getPeriodicExpenseTemplate(authToken, record.periodic_expense_id);

                            setExpenseCopy({
                                ...response,
                                end_date: response.finished_at?.split('T')[0],
                                date: response.date_from,
                                frequency: response.period_type,
                                week: response.period_type === 'week' ? response.period_values : null,
                                month: response.period_type === 'month' ? response.period_values : null,
                                periodic_expense_id: response.id,
                            })
                            setModalCopyExpenseOpen(true);
                            return
                        }
                    }}
                    title='Копировать'
                ></Button>
                <Button
                    type="text"
                    icon={DeleteIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setDeleteExpenseId(record.id);
                    }}
                    title='Удалить'
                ></Button>
            </ConfigProvider>
        </Flex>)
    }


}

const customCellCategoryRender = (
    value,
    record,
    index,
    dataIndex,
    setCategoryEdit,
    setModalCreateCategoryOpen,
    setDeleteCategoryId,
    data
) => {
    if (dataIndex === 'action') {
        return (<Flex justify="start" gap={20}>
            <ConfigProvider>
                <Button
                    type="text"
                    icon={EditIcon}
                    onClick={() => {
                        setCategoryEdit((data.find((article) => article.id === record.id)));
                        setModalCreateCategoryOpen(true)
                    }}
                    title='Изменить'
                ></Button>
                <Button
                    type="text"
                    icon={DeleteIcon}
                    onClick={() => setDeleteCategoryId(record.id)}
                    title='Удалить'
                ></Button>
            </ConfigProvider>
        </Flex>)
    }
}

export default function TableWidget({
    loading,
    columns,
    data,
    setExpenseEdit,
    setModalCreateExpenseOpen,
    setDeleteExpenseId,
    copyExpense,
    highlightedExpenseId,
    tableType,
    setCategoryEdit,
    setModalCreateCategoryOpen,
    setDeleteCategoryId,
    pagination,
    setPagination,
    setModalEditExpenseOpen,
    authToken,
    setModalCopyExpenseOpen,
    setExpenseCopy
}) {
    const tableContainerRef = useRef(null);

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer} ref={tableContainerRef}>
                {loading && <div className={styles.loading}>
                    <span className='loader'></span>
                </div>}
                <RadarTable
                    config={columns}
                    dataSource={data}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.limit,
                        total: pagination.total,
                        onChange: (page, pageSize) => {
                            setPagination({
                                ...pagination,
                                page: page,
                            })
                        },
                        showQuickJumper: true,
                        hideOnSinglePage: true,
                    }}
                    stickyHeader={true}
                    scrollContainerRef={tableContainerRef}
                    preset="radar-table-default"
                    customCellRender={{
                        idx: tableType === 'expense' ? [] : ['action'],
                        renderer: (value, record, index, dataIndex) => {
                            if (tableType === 'expense') {
                                return customCellExpenseRender(
                                    value,
                                    record,
                                    index,
                                    dataIndex,
                                    setExpenseEdit,
                                    setModalCreateExpenseOpen,
                                    setDeleteExpenseId,
                                    copyExpense,
                                    data,
                                    setModalEditExpenseOpen,
                                    authToken,
                                    setModalCopyExpenseOpen,
                                    setExpenseCopy
                                )
                            }
                            if (tableType === 'category') {
                                return customCellCategoryRender(
                                    value,
                                    record,
                                    index,
                                    dataIndex,
                                    setCategoryEdit,
                                    setModalCreateCategoryOpen,
                                    setDeleteCategoryId,
                                    data
                                )
                            }
                        }
                    }}
                    headerCellWrapperStyle={{
                        lineHeight: '122%',
                    }}
                    bodyRowClassName={(record) => {
                        const baseClass = styles.bodyRowSpecial;
                        const isHighlighted = highlightedExpenseId && record.id === highlightedExpenseId;
                        const highlightClass = isHighlighted ? styles.highlightedRow : '';

                        if (isHighlighted) {
                            console.log('Highlighting row:', record.id, 'with class:', styles.highlightedRow);
                        }

                        return `${baseClass} ${highlightClass}`.trim();
                    }}
                />
            </div>
        </div>
    );
}