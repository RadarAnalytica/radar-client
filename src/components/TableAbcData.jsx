import React, { useState } from "react";
import sortArrow from "../assets/sortarrow.svg";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";

const TableAbcData = ({ dataTable, setDataTable, setViewType, viewType }) => {
  const [asc, setAsc] = useState(true);
  const [sortedColumn, setSortedColumn] = useState(""); // Для отслеживания текущего столбца сортировки

  const sortData = (key) => {
    const sortedData = [...dataTable].sort((a, b) => {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return asc ? a[key] - b[key] : b[key] - a[key];
      } else {
        return asc
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setAsc(!asc);
    setSortedColumn(key);
    return setDataTable(sortedData);
  };
  const getIconStyle = (key, direction) => {
    if (sortedColumn === key) {
      if ((asc && direction === "up") || (!asc && direction === "down")) {
        return {
          filter:
            "brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)",
        }; // Цвет #5329ff
      }
    }
    return { filter: "none" };
  };
  // const toggleRotate = (element) => {
  //   const iconUp = element.querySelector(".icon-sort-up");
  //   const iconDown = element.querySelector(".icon-sort-down");
  //   iconUp.classList.toggle("sort-icon_rotate");
  //   iconDown.classList.toggle("sort-icon_rotate");
  // };
  const handleSort = (element, columnName) => {
    sortData(columnName);
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

  return (
    <div
      className='abcAnalysis dash-container table-content'
      style={{ maxHeight: "700px" }}
    >
      <div
        className='filter abc-filter-container p-3 pb-4 pt-0 dash-container d-flex'
        style={{ margin: "5px 8px" }}
      >
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
        <div className='table'>
          <div className='table-header'>
            <div
              className='first-child-table-header'
              style={{
                width: "25%",
                textAlign: "center",
              }}
            >
              Товар
              <div
                className='icon-sort-wrap'
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
                />
              </div>
            </div>
            <div style={{ width: "20%", textAlign: "left" }}>
              Артикул поставщика
              <div
                className='icon-sort-wrap'
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
                />
              </div>
            </div>
            <div style={{ width: "13.75%", textAlign: "left" }}>
              Артикул
              <div
                className='icon-sort-wrap'
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
                />
              </div>
            </div>
            <div style={{ width: "13.75%", textAlign: "left" }}>
              {viewType === "proceeds" ? "Выручка" : "Прибыль"}
              <div
                className='icon-sort-wrap'
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
                />
              </div>
            </div>
            <div style={{ width: "13.75%", textAlign: "left" }}>
              Доля {viewType === "proceeds" ? "выручки" : "прибыли"}
              <div
                className='icon-sort-wrap'
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
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
                onClick={(e) => handleSort(e.currentTarget, "title")}
                style={{ background: "transparent" }}
              >
                <img
                  className='icon-sort icon-sort-up'
                  src={ArrowUp}
                  alt=''
                  style={getIconStyle("title", "up")} // Применяем стиль
                />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                  style={getIconStyle("title", "down")} // Применяем стиль
                />
              </div>
            </div>
          </div>
          <div className='table-body scrollable-table'>
            {dataTable.map((item, i) => (
              <div className='table-body-row' key={i}>
                <div
                  style={{
                    color: "#5329FF",
                    width: "25%",
                  }}
                >
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt='User'
                      style={{
                        marginRight: "8px",
                        width: "30px",
                        height: "40px",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.style.backgroundColor = "#D3D3D3";
                        e.target.alt = "";
                        e.target.src =
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        color: "#5329FF",

                        marginRight: "8px",
                        width: "30px",
                        height: "40px",
                        borderRadius: "5px",
                        backgroundColor: "#D3D3D3",
                      }}
                    />
                  )}
                  {item.title}
                </div>
                <div style={{ width: "20%" }}>{item.wb_id}</div>
                <div style={{ width: "13.75%" }}>{item.supplier_id}</div>
                <div style={{ width: "13.75%" }}>
                  {formatNumber(item.amount)}
                </div>
                <div style={{ width: "13.75%" }}>{item.amount_percent}%</div>
                <div style={{ width: "13.75%" }}>{item.category}</div>
                {/* <div style={{ width: "10%" }}>{item.category_total}</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAbcData;
