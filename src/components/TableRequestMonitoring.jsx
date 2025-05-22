// import { useState } from 'react'
import { useState, useEffect } from 'react';
import ArrowUp from "../assets/ArrowDown.svg";
import ArrowDown from "../assets/ArrowUp.svg";
import pageIcon from "../assets/page-icon.svg"
import GreenArrow from '../assets/greenarrow.svg';
import RedArrow from '../assets/redarrow.svg';
import styles from './TableRequestMonitoring.module.css';

const TableRequestMonitoring = ({ dataTable, monitorData, setPage, sort, setSort }) => {
    const [filteredData, setFilteredData] = useState(dataTable);
    const [filteredDayLenght, setFilteredDayLenght] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const totalPages = monitorData.pages;
    const page = monitorData.page;


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
        if (key === "asc") {
            setSort("desc")
        }
        if (key === "desc") {
            setSort("asc")
        }
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
        // Проверка текущего столбца и направления сортировки
        if (sort !== direction) {
            return {
                filter: "brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)", // Цвет #5329ff
            };
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

    function formatQuantity(quantity) {
        if (quantity === null || quantity === undefined) {
            return ''; // Обработка случая, если quantity null или undefined
        }
        return quantity < 10 ? quantity.toString() : quantity.toString().slice(-2); // Возвращаем последние две цифры или само число
    };

    return (
        <div className="table-wrapper-req-monitoring">
            <div className={styles.tableWrapperHeadder}>
                <div className="infoOfTable">
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
                <div className={styles.infoAboutDigits}>
                    <div className={styles.quantityWrapperInfo}>
                        <div className="req-mon-td-quantity">1</div>
                        <div style={{ marginLeft: "5px" }}>–</div>
                        <div style={{ marginLeft: "10px" }}>страница выдачи</div>
                    </div>
                    <div className={styles.quantityWrapperInfo}>
                        <div style={{ marginRight: "10px" }}>10</div>
                        <div style={{ marginLeft: "5px" }}>–</div>
                        <div style={{ marginLeft: "10px" }}>позиция товара</div>
                    </div>
                    <div className={styles.quantityWrapperInfo}>
                        <div
                            className='mb-0 ol-2 text-end d-flex justify-content-around align-items-start'
                            style={{
                                fontSize: '1.85vh',
                                marginRight: '10px',
                            }}
                        >

                            <img
                                src={GreenArrow}
                                alt=''
                                style={{ width: '1.5vw' }}
                            />
                        </div>
                        <div style={{ marginLeft: "5px" }}>–</div>
                        <div style={{ marginLeft: "10px" }}>динамика позиции</div>
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
                                            <div>Кол-во запросов <br />за период {" "}</div>
                                            <div
                                                className='icon-sort-wrap'
                                                style={{ background: "transparent", marginLeft: "5px", alignItems: "center", justifyContent: "center" }}
                                                onClick={() => sortData(sort)}
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
                                                        {item?.details[colIndex]?.quantity && item?.details[colIndex]?.quantity !== 0
                                                            ? (<div className="req-mon-td-quantity">{Math.floor(item.details[colIndex].quantity / 100) + 1}</div>)
                                                            : <div className='req-mon-td-quantity-empty'></div>}
                                                        <div>{formatQuantity(item?.details[colIndex]?.quantity)}</div>
                                                        <div
                                                            className='mb-0 ol-2 text-end d-flex justify-content-around align-items-start'
                                                            style={{
                                                                fontSize: '1.85vh',
                                                                marginLeft: '8px',
                                                            }}
                                                        >
                                                            {/*console.log(filteredData)*/}
                                                            <span className='pb-1'>
                                                                {item?.details[colIndex]?.compare_flag && (
                                                                    <img
                                                                        src={item?.details[colIndex]?.compare_flag ? GreenArrow : RedArrow}
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
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.tableLeftMargin}></div>
            </div>
        </div >
    )
}
export default TableRequestMonitoring