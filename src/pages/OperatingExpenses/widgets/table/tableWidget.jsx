import { ConfigProvider, Table, Button, Progress, Flex } from 'antd';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from '../../shared/Icons';
import moment from 'moment';
import styles from './tableWidget.module.css';
import { formatPrice } from '@/service/utils';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useTableColumnResize } from '@/service/hooks';

const customCellExpenseRender = (
    value,
    record,
    index,
    dataIndex,
    setExpenseModal,
    setDeleteExpenseId,
    copyExpense,
    data,
    authToken,
    setAlertState
) => {

    if (dataIndex === 'is_periodic' && record.key !== 'summary') {
        return (
            <div className={record.is_periodic ? styles.periodicBadge_periodic : styles.periodicBadge_static} title={record.is_periodic ? 'Плановый' : 'Разовый'}>
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
            <div className={`${styles.customCell} text-break`} title={value}>
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
    if (dataIndex === 'shops') {
        return (<>{value?.length > 0 ? value[0]?.name : '-'}</>)
    }
    if (dataIndex === 'vendor_codes' || dataIndex === 'brand_names') {
        return (<>{value?.length > 0 ? value[0] : '-'}</>)
    }
    if (dataIndex === 'action' && record.key === 'summary') {
        return null;
    }
    if (dataIndex === 'action' && record.key !== 'summary') {
        return (<Flex justify="start" gap={20}>
            <ConfigProvider renderEmpty={() => <div>Нет данных</div>}>
                <Button
                    type="text"
                    icon={EditIcon}
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        // Для шаблонов используем данные из списка
                        if (isTemplate) {
                            const templateData = data?.find((item) => item.id === record.id);
                            if (templateData) {
                                // Определяем, является ли шаблон плановым
                                const isPeriodic = templateData.is_periodic !== undefined 
                                    ? templateData.is_periodic 
                                    : (templateData.period_type || templateData.frequency ? true : false);
                                
                                setExpenseModal({
                                    mode: 'edit',
                                    isOpen: true,
                                    data: {
                                        id: templateData.id,
                                        is_periodic: isPeriodic,
                                        end_date: templateData.finished_at?.split('T')[0] || templateData.end_date,
                                        frequency: templateData.period_type || templateData.frequency,
                                        week: templateData.period_type === 'week' ? templateData.period_values : (templateData.frequency === 'week' ? templateData.week : null),
                                        month: templateData.period_type === 'month' ? templateData.period_values?.toString() : (templateData.frequency === 'month' ? templateData.month : null),
                                        shops: templateData.shops,
                                        vendor_codes: templateData.vendor_codes,
                                        brand_names: templateData.brand_names,
                                        value: templateData.value,
                                        description: templateData.description,
                                        expense_categories: templateData.expense_categories,
                                        date: templateData.date_from || templateData.date,
                                    }
                                });
                            }
                            return;
                        }

                        let response;
                        if (record?.is_periodic) {
                            try {
                                response = await ServiceFunctions.getPeriodicExpenseData(authToken, record.periodic_expense_id);

                                setExpenseModal({
                                    mode: 'edit',
                                    isOpen: true,
                                    data: {
                                        end_date: response.finished_at?.split('T')[0],
                                        frequency: response.period_type,
                                        week: response.period_type === 'week' ? response.period_values : null,
                                        month: response.period_type === 'month' ? response.period_values.toString() : null,
                                        periodic_expense_id: response.id,
                                        is_periodic: true,
                                        shops: response.shops,
                                        vendor_codes: response.vendor_codes,
                                        brand_names: response.brand_names,
                                        value: response.value,
                                        description: response.description,
                                        expense_categories: response.expense_categories,
                                        date: response.date_from,
                                    }
                                });
                                return;
                            } catch (error) {
                                setAlertState({
                                    status: 'error',
                                    isVisible: true,
                                    message: 'Не удалось получить шаблон расхода',
                                });
                            }
                        }
                        setExpenseModal({
                            mode: 'edit',
                            isOpen: true,
                            data: data?.find((item) => item.id === record.id)
                        });
                    }}
                    title='Изменить'
                ></Button>
                <Button
                    type="text"
                    icon={CopyIcon}
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        // Для шаблонов используем данные из списка
                        if (isTemplate) {
                            const templateData = data?.find((item) => item.id === record.id);
                            if (templateData) {
                                const isPeriodic = templateData?.period_type || templateData?.frequency;
                                
                                setExpenseModal({
                                    mode: 'copy',
                                    isOpen: true,
                                    data: {
                                        is_periodic: isPeriodic,
                                        end_date: templateData.finished_at?.split('T')[0] || templateData.end_date,
                                        date: templateData.date_from || templateData.date,
                                        frequency: templateData.period_type || templateData.frequency,
                                        week: templateData.period_type === 'week' ? templateData.period_values : (templateData.frequency === 'week' ? templateData.week : null),
                                        month: templateData.period_type === 'month' ? templateData.period_values : (templateData.frequency === 'month' ? templateData.month : null),
                                        shops: templateData.shops,
                                        vendor_codes: templateData.vendor_codes,
                                        brand_names: templateData.brand_names,
                                        value: templateData.value,
                                        description: templateData.description,
                                        expense_categories: templateData.expense_categories,
                                    }
                                });
                            }
                            return;
                        }

                        if (!record.is_periodic) {
                            copyExpense(record.id);
                            return;
                        }

                        let response;
                        if (record?.is_periodic) {
                            try {
                                response = await ServiceFunctions.getPeriodicExpenseData(authToken, record?.periodic_expense_id);

                                setExpenseModal({
                                    mode: 'copy',
                                    isOpen: true,
                                    data: {
                                        ...response,
                                        end_date: response.finished_at?.split('T')[0],
                                        date: response.date_from,
                                        frequency: response.period_type,
                                        week: response.period_type === 'week' ? response.period_values : null,
                                        month: response.period_type === 'month' ? response.period_values : null,
                                        periodic_expense_id: response.id,
                                        is_periodic: true,
                                    }
                                });
                                return;
                            } catch (error) {
                                setAlertState({
                                    status: 'error',
                                    isVisible: true,
                                    message: 'Не удалось получить шаблон расхода',
                                });
                            }
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
    setExpenseModal,
    setDeleteExpenseId,
    copyExpense,
    tableType,
    setCategoryEdit,
    setModalCreateCategoryOpen,
    setDeleteCategoryId,
    pagination,
    setPagination,
    authToken,
    setAlertState,
    isTemplate = false
}) {
    const tableContainerRef = useRef(null);
    
    // Используем хук для управления изменением размеров колонок
    const { config: tableConfig, onResize: onResizeColumn } = useTableColumnResize(
        columns, 
        tableType ? `operatingExpenses-${tableType}` : 'operatingExpensesTableConfig'
    );

    return (
        <div className={styles.container}>
            <div className={`${styles.tableContainer} scroll-container`} ref={tableContainerRef}>
                {loading && <div className={styles.loading}>
                    <span className='loader'></span>
                </div>}
                <RadarTable
                    config={tableConfig}
                    dataSource={data}
                    resizeable={tableType === 'expense'}
                    onResize={onResizeColumn}
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
                                    setExpenseModal,
                                    setDeleteExpenseId,
                                    copyExpense,
                                    data,
                                    authToken,
                                    setAlertState
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
                    bodyRowClassName={styles.bodyRowSpecial}
                />
            </div>
        </div>
    );
}