import { ConfigProvider, Table, Button, Progress, Flex } from 'antd';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from '../../shared/Icons';
import moment from 'moment';
import styles from './tableWidget.module.css';
import { formatPrice, getWordDeclension } from '@/service/utils';
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
    setAlertState,
    isTemplate = false,
) => {

    if (dataIndex === 'is_periodic' && record.key !== 'summary') {
        return (
            <div 
                className={record?.is_template ? styles.periodicBadge_template : record.is_periodic ? styles.periodicBadge_periodic : styles.periodicBadge_static} 
                title={record?.is_template ? 'Шаблон' : record?.is_periodic ? 'Плановый' : 'Разовый'}
            >
                {record?.is_template ? 'Шаблон' : record?.is_periodic ? 'Плановый' : 'Разовый'}
            </div>
        );
    }
    if (dataIndex === 'date') {
        if (record.key === 'summary') {
            return <div className={`${styles.customCell} ${styles.customCell_summaryPadding}`}>{value}</div>;
        }
        return <div className={styles.customCell}>{moment(value).format('DD.MM.YYYY')}</div>;
    }
    if (dataIndex === 'date_from' || dataIndex === 'finished_at') {
        return <div className={styles.customCell}>{value ? moment(value).format('DD.MM.YYYY') : '-'}</div>;
    }
    if (dataIndex === 'description' || dataIndex === 'expense_categories' || dataIndex === 'vendor_code' || dataIndex === 'brand_name') {
        return (
            <div className={`${styles.customCell} text-break`} title={value}>
                {value || '-'}
            </div>
        );
    }
    if (dataIndex === 'value') {
        return (
            <div className={styles.customCell}>
                {formatPrice(value, '')}
            </div>
        );
    }
    if (['shops', 'vendor_codes', 'brand_names'].includes(dataIndex) && value) {
        value = Array.from(new Set(value));
        if (value?.length > 1) {
            const word = dataIndex === 'shops' ? 'магазин' : dataIndex === 'vendor_codes' ? 'артикул' : 'бренд';
            return <div className={styles.distributorCell}>{value.length} {getWordDeclension(word, value.length)}</div>;
        }
        let v = (value && value[0]) || '-';
        if (dataIndex === 'shops') {
            v = v?.name || v?.shop_name || (v && v.toString()) || '-';
        }
        return <div className={styles.distributorCell} title={v}>{v}</div>;
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

                        let response;
                        if (record?.is_periodic || record?.is_template) {
                            try {
                                response = await ServiceFunctions.getOperatingExpensesTemplateGet(authToken, isTemplate ? record.id : record.periodic_expense_id);

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
                                        date_from: response.date_from,
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

                        if (!record.is_periodic && !record.is_template) {
                            copyExpense(record.id, false);
                            return;
                        }

                        try {
                            const response = await ServiceFunctions.getOperatingExpensesTemplateGet(authToken, isTemplate ? record.id : record.periodic_expense_id);
                            setExpenseModal({
                                mode: 'copy',
                                isOpen: true,
                                data: {
                                    ...response,
                                    end_date: response.finished_at?.split('T')[0],
                                    date_from: response.date_from,
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
        </Flex>);
    }
};

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
                        setModalCreateCategoryOpen(true);
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
        </Flex>);
    }
};

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
                    style={{width: tableType === 'category' ? '100%' : 'max-content'}}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.limit,
                        total: pagination.total,
                        onChange: (page, pageSize) => {
                            setPagination({
                                ...pagination,
                                page: page,
                            });
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
                                    setAlertState,
                                    isTemplate
                                );
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
                                );
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