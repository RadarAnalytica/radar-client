import React, { useState, useRef, useEffect } from 'react'
import styles from './tableWidget.module.css'
import DownloadButton from '../../../../components/DownloadButton';
import { ConfigProvider, Table } from 'antd';


//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
}

const TableWidget = ({
    tableConfig,
    tableData,
    title,
    downloadButton,
    customHeader
}) => {

    const containerRef = useRef(null);
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

    }, [tableConfig, tableData])


    // if (dataStatus.isLoading) {
    //     return (
    //         <div className={styles.widget}>
    //             <div className={styles.widget__loaderWrapper}>
    //                 <span className='loader'></span>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
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
                        columns={tableConfig}
                        //dataSource={data}
                        pagination={false}
                        // tableLayout="fixed"
                        rowSelection={false}
                        showSorterTooltip={false}
                        sticky={true}
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
        </div>
    )

}


const CopyButton = ({ url }) => {

    const [isCopied, setIsCopied] = useState(false)

    const copyHandler = () => {
        navigator.clipboard.writeText(url).catch(err => console.log('Error'))
        setIsCopied(true)
    }

    useEffect(() => {
        let timeout;
        if (isCopied) {
            timeout = setTimeout(() => setIsCopied(false), 3000)
        }

        return () => { timeout && clearTimeout(timeout) }
    }, [isCopied])

    return (
        <button className={styles.table__actionButton} onClick={copyHandler} title='Скопировать'>
            {!isCopied &&
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px' }}>
                    <path d="M14.8301 3.16626C13.5609 1.89705 11.5031 1.89705 10.2339 3.16626L8.8197 4.58047C8.5268 4.87337 8.05193 4.87337 7.75904 4.58047C7.46614 4.28758 7.46614 3.81271 7.75904 3.51981L9.17325 2.1056C11.0282 0.250608 14.0358 0.250608 15.8908 2.1056C17.7458 3.96059 17.7458 6.96812 15.8908 8.82311L14.4766 10.2373C14.1837 10.5302 13.7088 10.5302 13.4159 10.2373C13.123 9.94443 13.123 9.46956 13.4159 9.17667L14.8301 7.76245C16.0993 6.49325 16.0993 4.43546 14.8301 3.16626Z" fill="#363538" />
                    <path d="M4.57705 7.76246C4.86995 8.05535 4.86995 8.53022 4.57705 8.82312L3.16284 10.2373C1.89364 11.5065 1.89364 13.5643 3.16284 14.8335C4.43204 16.1027 6.48983 16.1027 7.75903 14.8335L9.17325 13.4193C9.46614 13.1264 9.94102 13.1264 10.2339 13.4193C10.5268 13.7122 10.5268 14.1871 10.2339 14.48L8.81969 15.8942C6.9647 17.7492 3.95717 17.7492 2.10218 15.8942C0.24719 14.0392 0.24719 11.0317 2.10218 9.17667L3.51639 7.76246C3.80929 7.46956 4.28416 7.46956 4.57705 7.76246Z" fill="#363538" />
                    <path d="M6.34479 10.5909C6.0519 10.8838 6.0519 11.3587 6.34479 11.6515C6.63769 11.9444 7.11256 11.9444 7.40545 11.6515L11.6481 7.40891C11.941 7.11601 11.941 6.64114 11.6481 6.34825C11.3552 6.05535 10.8803 6.05535 10.5874 6.34825L6.34479 10.5909Z" fill="#363538" />
                </svg>
            }
            {isCopied &&
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.87189 1.1936L3.19356 6.87193L1.30078 4.97916" stroke="#363538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            }
        </button>
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
                    <path d="M1 1L7 7L13 1" stroke='currentColor' stroke-width="2" stroke-linecap="round" />
                </svg>
            </Button>
        </ConfigProvider>
};

export default TableWidget;



