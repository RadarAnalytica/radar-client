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

const TableRequestMonitoring = ({ dataTable, monitoringData, setPage, page }) => {
    // const [sortConfig, setSortConfig] = useState({ column: null, direction: null });
    const [filteredData, setFilteredData] = useState(dataTable);
    const [filteredDayLenght, setFilteredDayLenght] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isScrolled, setIsScrolled] = useState(false);
    const totalPages = monitoringData.pages;


    // Function to go to the previous page
    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Function to go to the next page
    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
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

    useEffect(() => {
        const handleScroll = () => {
            const tableContainer = document.querySelector(`.${styles.customTable}`);
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

    useEffect(() => {
        setFilteredDayLenght(filteredData.length > 0 ? filteredData[0]['details'].length : 0)
    }, [filteredData])

    const calculateCompareFlags = (data) => {
        let countTrueFlags = 0;

        data.forEach(item => {
            item.details.forEach(detail => {
                if (detail.compare_flag === true) {
                    countTrueFlags++;
                }
            });
        });

        return countTrueFlags;
    };
    function formatDate(dateString) {
        const dateParts = dateString.split('-'); // Разделяем строку по '-'
        const day = dateParts[2]; // Получаем день
        const month = dateParts[1]; // Получаем месяц
        return `${day}.${month}`; // Возвращаем отформатированную дату
    }
    const totalTrueFlags = calculateCompareFlags(filteredData);

    return (
        <div class="table-wrapper-req-monitoring">
            <div class="infoOfTable">
                {/* tooltip */}
                {/* <div class="attention-icon">
                    <div class="exclamation-circle">!</div>
                </div> */}
                <div class="page-info">
                    <div className="pagination">
                        {page > 1 && (
                            <button className="arrow left-arrow" onClick={goToPreviousPage}>
                                &lang;
                            </button>
                        )}


                        <div className="page">
                            <img src={pageIcon} alt="Page Icon" style={{ marginRight: "5px" }} />
                            <span>{page}<span style={{ fontWeight: "400" }}> стр. из {totalPages}</span></span>
                        </div>

                        {page < totalPages && (
                            <button className="arrow right-arrow" onClick={goToNextPage}>
                                &rang;
                            </button>
                        )}
                    </div>
                    {/* <div style={{ marginLeft: "15px" }} class="rank">
                        <img src={rankIcon} />
                        <span style={{ marginLeft: "5px" }}>{totalTrueFlags} место</span>
                        <img
                            src={GreenArrow}
                            alt=''
                            style={{ width: '1.25vw', marginLeft: "5px" }}
                        />
                    </div> */}
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
                                                {row.request_string}
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
                                                style={{ background: "transparent", marginLeft: "5px", alignItems: "center", justifyContent: "center" }}
                                                onClick={() => sortData("request_quantity")}
                                            >
                                                <img
                                                    style={{
                                                        ...getIconStyle("request_quantity", "asc"),
                                                    }}
                                                    src={ArrowUp}
                                                    alt=''
                                                />
                                                <img
                                                    src={ArrowDown}
                                                    alt=''
                                                    style={{
                                                        ...getIconStyle("request_quantity", "desc"),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {filteredData.map((row, index) => (
                                            <div key={index} className={styles.tableRow} style={{ justifyContent: "flex-start", paddingLeft: "20px" }}>
                                                {row.request_quantity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='scrollable-columns'>
                                    {/* Extract dates from the first element */}
                                    {filteredData[0].details.map((detail, colIndex) => (
                                        <div key={colIndex} className={styles.columnWidthN}>
                                            {/* Render column header (date) */}
                                            <div className={styles.tableOverHeader}></div>
                                            <div className={styles.tableHeaderScrollable}>
                                                {formatDate(detail.date)}
                                            </div>

                                            {/* Render table data for each row based on the column (date) */}
                                            {filteredData.map((item, rowIndex) => (
                                                <div key={rowIndex} className={styles.tableRow}>
                                                    <div className="req-mon-td-wrapper">
                                                        {Math.floor(item.details[colIndex].quantity / 100) !== 0
                                                            ? (<div className="req-mon-td-quantity"> {Math.floor(item.details[colIndex].quantity / 100)}</div>)
                                                            : ""}

                                                        <div>{item.details[colIndex].quantity}</div>
                                                        <div
                                                            className='mb-0 ol-2 text-end d-flex justify-content-around align-items-start'
                                                            style={{
                                                                fontSize: '1.85vh',
                                                                marginLeft: '8px',
                                                            }}
                                                        >
                                                            {console.log(filteredData)}
                                                            <span className='pb-1'>
                                                                {item.details[colIndex].compare_flag !== null && (
                                                                    <img
                                                                        src={item.details[colIndex].compare_flag ? GreenArrow : RedArrow}
                                                                        alt=''
                                                                        style={{ width: '1.25vw' }}
                                                                    />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* <div className='scrollable-columns'>
                                    {console.log(filteredData)}
                                   
                                    {filteredData[0].details.map((_, rowIndex) => (
                                        <div key={rowIndex} className={styles.row}>
                                            {filteredData.map((item, colIndex) => (
                                                <div key={colIndex} className={styles.columnWidthN}>
                                                    <>
                                                        {colIndex === 0 && (
                                                            <>
                                                                <div className={styles.tableOverHeader}></div>
                                                                <div className={styles.tableHeaderScrollable}>
                                                                    {item.details[rowIndex]?.date}
                                                                </div>
                                                            </>
                                                        )}

                                                        <>
                                                            <div className={styles.tableRow}>
                                                                <div className="req-mon-td-wrapper">
                                                                    <div className="req-mon-td-quantity">1{"  "}</div>
                                                                    <div>{filteredData[colIndex].details[rowIndex].quantity}</div>
                                                                    <div
                                                                        className='mb-0 ol-2 text-end d-flex justify-content-around align-items-start'
                                                                        style={{
                                                                            fontSize: '1.85vh',
                                                                            marginLeft: '8px',
                                                                        }}
                                                                    >
                                                                        <span className='pb-1'>
                                                                            <img
                                                                                src={(filteredData[colIndex]?.details[rowIndex]?.quantity || 0) > 30 ? GreenArrow : RedArrow}
                                                                                alt=''
                                                                                style={{ width: '1.25vw' }}
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    </>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    <div>
                                        <div className={styles.tableOverHeader}></div>
                                        <div className={styles.tableHeaderScrollablLast}></div>
                                    </div>
                                </div> */}

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