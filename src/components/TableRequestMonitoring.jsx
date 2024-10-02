// import { useState } from 'react'
import React, { useState, useCallback, useEffect } from 'react';
import SortArrows from './SortArrows';
import ArrowUp from "../assets/ArrowDown.svg";
import ArrowDown from "../assets/ArrowUp.svg";
import pageIcon from "../assets/page-icon.svg"
import rankIcon from "../assets/rank-icon.svg"
import attentionIcon from "../assets/attention.svg"
import GreenArrow from '../assets/greenarrow.svg';
import RedArrow from '../assets/redarrow.svg';
import { fetchStockAnalysisData } from '../redux/stockAnalysis/stockAnalysisDataActions';
import styles from './TableRequestMonitoring.module.css';

const TableRequestMonitoring = ({ dataTable }) => {
    // const [sortConfig, setSortConfig] = useState({ column: null, direction: null });
    const [filteredData, setFilteredData] = useState(dataTable);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isScrolled, setIsScrolled] = useState(false);


    const renderTableCell = (value) => {
        return (
            <div className="req-mon-td-wrapper">
                <div className="req-mon-td-quantity">1{"  "}</div>
                <div>{value}</div>
                <div
                    className='mb-0 ol-2 text-end d-flex justify-content-around align-items-start'
                    style={{
                        fontSize: '1.85vh',
                        marginLeft: '8px',
                    }}
                >
                    <span className='pb-1'>
                        <img
                            src={value > 30 ? GreenArrow : RedArrow}
                            alt=''
                            style={{ width: '1.25vw' }}
                        />
                    </span>
                </div>
            </div>
        );
    };

    const sortData = (key) => {
        let direction = 'asc';

        if (sortConfig.column === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...filteredData].sort((a, b) => {
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                return direction === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            } else {
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            }
        });

        setSortConfig({ column: key, direction });
        setFilteredData(sortedData);
    };
    const renderSortArrows = (columnKey) => {
        return <SortArrows columnKey={columnKey} sortConfig={sortConfig} />;
    };

    useEffect(() => {
        const handleScroll = () => {
            const tableContainer = document.querySelector(`.${styles.customTable}`);
            console.log(tableContainer);
            if (tableContainer) {
                setIsScrolled(tableContainer.scrollLeft > 0.1);
            }
        };

        const tableContainer = document.querySelector(`.${styles.customTable}`);
        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);
    const getIconStyle = (key, direction) => {
        const { column, direction: sortDirection } = sortConfig;

        if (column === key) {
            if (sortDirection === direction) {
                return {
                    filter: "brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)", // Color #5329ff
                };
            }
        }
        return { filter: "none" };
    };

    return (
        <div class="table-wrapper-req-monitoring">
            <div class="infoOfTable">
                <div class="attention-icon">
                    <div class="exclamation-circle">!</div>
                </div>
                <div class="page-info">
                    <div class="page">
                        <img src={pageIcon} />
                        <span>1 страница</span>
                    </div>
                    <div class="rank">
                        <img src={rankIcon} />
                        <span>44 место</span>
                        <img
                            // src={value > 30 ? GreenArrow : RedArrow}
                            src={GreenArrow}
                            alt=''
                            style={{ width: '1.25vw' }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.tableWrapper}>
                <div className={styles.tableLeftMargin}></div>
                <div className={styles.customTable}>
                    <div className={styles.tableContainer}>
                        {filteredData.length === 0 && (
                            <div
                                className='d-flex flex-column align-items-center justify-content-center'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    background: 'white',
                                }}
                            >
                                <span className='loader'></span>
                            </div>
                        )}
                        {filteredData.length > 0 && (
                            <div className={styles.columnsWrapper}>
                                {/* Fixed columns */}
                                <div
                                    className={`fixed-columns ${isScrolled ? 'fixed-columns-shadow' : ''
                                        }`}
                                >
                                    <div className={styles.columnWidth}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div className={styles.tableHeader}>
                                            Запрос
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div
                                                key={index}
                                                style={{ color: "#5329FF", justifyContent: "flex-start" }}
                                                className={styles.tableRow}
                                            >
                                                {row.query}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Scrollable columns */}
                                <div className='scrollable-columns' style={{ marginRight: "0px" }}>
                                    <div className={styles.columnWidth}><div className={styles.tableOverHeader}></div>
                                        <div
                                            className={styles.tableHeaderScrollable}
                                            style={{ minWidth: "200px", display: 'flex', alignItems: "left" }}
                                        >
                                            <div>Кол-во запросов <br />в месяц {" "}</div>
                                            <div
                                                className='icon-sort-wrap'
                                                style={{ background: "transparent", marginLeft: "10px" }}
                                                onClick={() => sortData("monthlyRequests")}
                                            >
                                                <img
                                                    style={{
                                                        ...getIconStyle("monthlyRequests", "asc"),
                                                    }}
                                                    src={ArrowUp}
                                                    alt=''
                                                />
                                                <img
                                                    src={ArrowDown}
                                                    alt=''
                                                    style={{
                                                        ...getIconStyle("monthlyRequests", "desc"),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow} style={{ justifyContent: "flex-start", paddingLeft: "20px" }}>
                                                {row.monthlyRequests}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='scrollable-columns'>
                                    <div className={styles.columnWidthN}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div
                                            className={styles.tableHeaderScrollable}
                                        >
                                            1.01
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow}>
                                                {renderTableCell(row.firstCol)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.columnWidthN}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div className={styles.tableHeaderScrollable}>
                                            1.01
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow}>
                                                {renderTableCell(row.secondCol)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.columnWidthN}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div
                                            className={styles.tableHeaderScrollable}
                                        >
                                            1.01
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow}>
                                                {renderTableCell(row.thirdCol)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.columnWidthN}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div
                                            className={styles.tableHeaderScrollable}
                                        >
                                            1.01
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow}>
                                                {renderTableCell(row.thirdCol)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.columnWidthN}>
                                        <div className={styles.tableOverHeader}></div>
                                        <div
                                            className={styles.tableHeaderScrollable}
                                        >
                                            1.02
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow}>
                                                {renderTableCell(row.thirdCol)}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <div className={styles.tableOverHeader}></div>
                                        <div className={styles.tableHeaderScrollablLast}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.tableLeftMargin}></div>
            </div>



            {/* <div className='table-wrapper-category-mon req-mon-table scrollable-table-monitoring-category'>
                <div>
                    <div className='req-mon-table-header'>
                        <div className='req-mon-table-header-tr'>
                            <div className='req-mon-table-header-th-first'>Запрос</div>
                            <div className='req-mon-table-header-th' style={{ minWidth: "200px", display: 'flex', alignItems: "left", justifyContent: 'space-between' }}>
                                <div>Кол-во запросов <br />в месяц {" "}</div>
                                <div
                                    className='icon-sort-wrap'
                                    style={{ background: "transparent", marginLeft: "10px" }}
                                    onClick={() => sortData("monthlyRequests")}
                                >
                                    <img
                                        style={{
                                            ...getIconStyle("monthlyRequests", "asc"),
                                        }}
                                        src={ArrowUp}
                                        alt=''
                                    />
                                    <img
                                        src={ArrowDown}
                                        alt=''
                                        style={{
                                            ...getIconStyle("monthlyRequests", "desc"),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th'>1.01</div>
                            <div className='req-mon-table-header-th-last'>1.01</div>

                        </div>
                    </div>
                    <div>
                        <div className='req-mon-table-body'>
                            {filteredData.map((item, index) => (
                                <div className="req-mon-table-body-tr" key={index} >
                                    <div className="category req-mon-table-body-td-first">{item.query}</div>
                                    <div className='req-mon-table-body-td' style={{ minWidth: "200px" }}>{item.monthlyRequests}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.firstCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.secondCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.thirdCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.fifthCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.thirdCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.fifthCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.secondCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.thirdCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.fifthCol)}</div>
                                    <div className='req-mon-table-body-td'>{renderTableCell(item.thirdCol)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    )
}
export default TableRequestMonitoring