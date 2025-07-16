import React, { useEffect, useState } from "react";
// import sortArrow from "../assets/sortarrow.svg";
import {Tooltip} from 'antd';
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import "../App.css";
import styles from './TableAbcData.module.css'

const TableAbcData = ({ dataTable, setDataTable, setViewType, viewType, loading }) => {
  // const [asc, setAsc] = useState(true);
  // const [sortedColumn, setSortedColumn] = useState(""); // Для отслеживания текущего столбца сортировки
  const [sortConfig, setSortConfig] = useState({
    column: 'amount',
    direction: "desc", // 'asc' or 'desc'
  });

  const sortData = (config) => {
    const { column, direction } = config;
    let sortedData = []
    if (column === 'category') {
      sortedData = [...dataTable].sort((a, b) => {
        if (typeof b[column] === "number" && typeof a[column] === "number") {
          return direction === "asc" ? b[column] - a[column] : a[column] - b[column];
        } else {
          return direction === "asc"
            ? b[column].localeCompare(a[column])
            : a[column].localeCompare(b[column]);
        }
      });
    } else {
      sortedData = [...dataTable].sort((a, b) => {
        if (typeof a[column] === "number" && typeof b[column] === "number") {
          return direction === "asc" ? a[column] - b[column] : b[column] - a[column];
        } else {
          return direction === "asc"
            ? a[column].localeCompare(b[column])
            : b[column].localeCompare(a[column]);
        }
      });
    }
    setDataTable(sortedData);
  };
  const getIconStyle = (key, direction) => {
    const { column, direction: sortDirection } = sortConfig;

    if (column === key) {
      if (sortDirection === direction) {
        return {
          filter:
            "brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)", // Color #5329ff
        };
      }
    }
    return { filter: "none" };
  };

  const handleViewType = (viewType) => {
    setViewType(viewType);
    // window.location.reload();
  };

  function formatNumber(num) {
    return num
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  useEffect(() => {
    sortData(sortConfig)
  }, [sortConfig])

  return (
    <div
      className='abcAnalysis dash-container table-content'
      style={{
        // maxHeight: "700px", 
        marginTop: "25px"
      }}
    >
      <div className='filter abc-filter-container dash-container d-flex'>
        <div className='filter-btn-p'>Выбрать вид: </div>
        <div
          className={`filter-btn ${viewType === "proceeds" ? "active" : ""}`}
          onClick={() => handleViewType("proceeds")}
        >
          По выручке
        </div>
        <div
          className={`filter-btn ${viewType === "profit" ? "active" : ""}`}
          onClick={() => handleViewType("profit")}
        >
          По прибыли
        </div>
      </div>

      <div>
        {dataTable.length === 0 && !loading && (
          <div className='table'>
             <div className='table-body scrollable-table'>
                <div className='table-body-row'>
                  <div className={styles.empty}>Ничего не найдено</div>
                </div>
             </div>
          </div>
        )}
        {loading && (
          <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ height: "100%", paddingTop: "10%", paddingBottom: '10%' }}
          >
            <span className='loader'></span>
          </div>
        )}
        {dataTable.length > 0 && !loading && (
          <div className='table'>
            <div className='table-header'>
              <div
                className='first-child-table-header'
                style={{
                  width: "20%",
                  textAlign: "center",
                }}
              >
                Товар
              </div>
              <div style={{ width: "10%", textAlign: "left" }}>
                Размер
              </div>
              <div style={{ width: "20%", textAlign: "left" }}>
                Артикул поставщика
              </div>
              <div style={{ width: "13.75%", textAlign: "left" }}>Артикул</div>
              <div style={{ width: "13.75%", textAlign: "left" }}>
                {viewType === "proceeds" ? "Выручка" : "Прибыль"}
                <div
                  className='icon-sort-wrap'
                  style={{ background: "transparent" }}
                  onClick={() => setSortConfig({column: "amount", direction: sortConfig.column === "amount" ? (sortConfig.direction === "asc" ? "desc" : "asc") : "asc"})}
                >
                  <img
                    style={{
                      ...getIconStyle("amount", "asc"),
                    }}
                    src={ArrowUp}
                    alt=''
                  />
                  <img
                    src={ArrowDown}
                    alt=''
                    style={{
                      ...getIconStyle("amount", "desc"),
                    }}
                  />
                </div>
              </div>
              <div style={{ width: "20%", textAlign: "left" }}>
                Доля {viewType === "proceeds" ? "выручки" : "прибыли"}
                <div
                  className='icon-sort-wrap'
                  style={{ background: "transparent" }}
                  onClick={() => setSortConfig({column: "amount_percent", direction: sortConfig.column === "amount_percent" ? (sortConfig.direction === "asc" ? "desc" : "asc") : "asc"})}
                >
                  <img
                    style={{
                      ...getIconStyle("amount_percent", "asc"),
                    }}
                    src={ArrowUp}
                    alt=''
                  />
                  <img
                    src={ArrowDown}
                    alt=''
                    style={{
                      ...getIconStyle("amount_percent", "desc"),
                    }}
                  />
                </div>
              </div>
              <div
                className='last-child-table-header'
                style={{ width: "13.75%", textAlign: "left" }}
              >
                Категория
                <div
                  className='icon-sort-wrap'
                  style={{ background: "transparent" }}
                  onClick={() => setSortConfig({column: "category", direction: sortConfig.column === "category" ? (sortConfig.direction === "asc" ? "desc" : "asc") : "asc"})}
                >
                  <img
                    style={{
                      ...getIconStyle("category", "asc"),
                    }}
                    src={ArrowUp}
                    alt=''
                  />
                  <img
                    src={ArrowDown}
                    alt=''
                    style={{
                      ...getIconStyle("category", "desc"),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='table-body scrollable-table'>
              {dataTable.map((item, i) => (
                <div className='table-body-row' key={i}>
                  <div
                    className='table-row-image'
                    style={{
                      color: "#5329FF",
                      width: "20%",
                      display: "flex", // Use flexbox for layout
                      alignItems: "center", // Center align items vertically
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "40px",
                        borderRadius: "5px",
                        backgroundColor: "#D3D3D3",
                        marginRight: "8px",
                        flexGrow: 0,
                        flexShrink: 0
                      }}
                    >
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt='User'
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.style.backgroundColor = "#D3D3D3";
                            e.target.alt = "";
                            e.target.src =
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=";
                          }}
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        flex: "1",
                        wordWrap: "break-word",
                        marginRight: item.photo ? "8px" : "16px",
                      }}
                    >
                      <Tooltip title={item.title}>{item.title}</Tooltip>
                    </div>
                  </div>
                  <div style={{ width: "10%", wordWrap: "break-word" }}><Tooltip title={item.tech_size}>{item.tech_size}</Tooltip></div>
                  <div style={{ width: "20%" }}>{item.supplier_id}</div>
                  <div style={{ width: "13.75%" }}>{item.wb_id}</div>
                  <div style={{ width: "13.75%" }}>
                    {formatNumber(item.amount)}
                  </div>
                  <div style={{ width: "20%" }}>{item.amount_percent}%</div>
                  <div className={styles.category}>
                    <span
                      className={
                        item.category === 'A' ? `${styles.category__icon} ${styles.category__icon_green}` :
                          item.category === 'B' ? `${styles.category__icon} ${styles.category__icon_yellow}` :
                            item.category === 'C' ? `${styles.category__icon} ${styles.category__icon_red}` : styles.category__icon
                      }
                    >
                      {item.category}
                    </span>
                  </div>
                  {/* <div style={{ width: "10%" }}>{item.category_total}</div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableAbcData;
