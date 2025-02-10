import React, { useState } from "react";
import sortArrow from "../assets/sortarrow.svg";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import "../App.css";


const TableAbcData = ({ dataTable, setDataTable, setViewType, viewType, loading }) => {
  // const [asc, setAsc] = useState(true);
  // const [sortedColumn, setSortedColumn] = useState(""); // Для отслеживания текущего столбца сортировки
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc", // 'asc' or 'desc'
  });

  const sortData = (key) => {
    const { column, direction } = sortConfig;
    const newDirection =
      column === key ? (direction === "asc" ? "desc" : "asc") : "asc";

    const sortedData = [...dataTable].sort((a, b) => {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return newDirection === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return newDirection === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setSortConfig({ column: key, direction: newDirection });
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
  const handleSort = (element, columnName) => {
    sortData(columnName);
  };
  // const toggleRotate = (element) => {
  //   const iconUp = element.querySelector(".icon-sort-up");
  //   const iconDown = element.querySelector(".icon-sort-down");
  //   iconUp.classList.toggle("sort-icon_rotate");
  //   iconDown.classList.toggle("sort-icon_rotate");
  // };

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

  return (
    <div
      className='abcAnalysis dash-container container table-content'
      style={{ maxHeight: "700px" }}
    >
      <div className='filter abc-filter-container  d-flex'>
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
        {dataTable.length === 0 || loading ? (
          <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{ height: "100%", paddingTop: "20%" }}
          >
            <span className='loader'></span>
          </div>
        ) : (
          <div className='table'>
            <div className='table-header'>
              <div
                className='first-child-table-header'
                style={{
                  width: "18.75%",
                  textAlign: "center",
                }}
              >
                Товар
              </div>
              <div style={{ width: "20%", textAlign: "left" }}>
                Артикул поставщика
              </div>
              <div style={{ width: "13.75%", textAlign: "left" }}>Артикул</div>
              <div style={{ width: "13.75%", textAlign: "left" }}>
                {viewType === "proceeds" ? "Выручка" : "Прибыль"}
                <div
                  className='icon-sort-wrap' G
                  style={{ background: "transparent" }}
                  onClick={() => sortData("amount")}
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
                  onClick={() => sortData("amount_percent")}
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
                  onClick={() => sortData("category")}
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
                      width: "18.75%",
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
                      {item.title}
                    </div>
                  </div>
                  <div style={{ width: "20%" }}>{item.supplier_id}</div>
                  <div style={{ width: "13.75%" }}>{item.wb_id}</div>
                  <div style={{ width: "13.75%" }}>
                    {formatNumber(item.amount)}
                  </div>
                  <div style={{ width: "20%" }}>{item.amount_percent}%</div>
                  <div style={{ width: "13.75%" }}>{item.category}</div>
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
