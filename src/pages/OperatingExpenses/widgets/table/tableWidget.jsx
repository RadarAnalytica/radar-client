import { ConfigProvider, Table, Button, Progress, Flex } from 'antd';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Table as RadarTable } from 'radar-ui';
import { EditIcon, CopyIcon, DeleteIcon, InfoIcon } from '../../shared/Icons';
import moment from 'moment';
import styles from './tableWidget.module.css';
import { formatPrice } from '../../../../service/utils';

const customCellExpenseRender = (
    value,
    record,
    index,
    dataIndex,
    setExpenseEdit,
    setModalCreateExpenseOpen,
    setDeleteExpenseId,
    copyExpense,
    data
) => {
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
                    onClick={() => {
                        setExpenseEdit((data.find((item) => item.id === record.id)));
                        setModalCreateExpenseOpen(true)
                    }}
                    title='Изменить'
                ></Button>
                <Button
                    type="text"
                    icon={CopyIcon}
                    onClick={() => copyExpense(record.id)}
                    title='Копировать'
                ></Button>
                <Button
                    type="text"
                    icon={DeleteIcon}
                    onClick={() => setDeleteExpenseId(record.id)}
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
    setDeleteCategoryId
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

                    pagination={false}
                    paginationContainerStyle={{ display: 'none' }}

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
                                    data
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