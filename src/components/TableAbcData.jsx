import React, { useState } from "react";
import sortArrow from "../assets/sortarrow.svg";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";

const TableAbcData = ({ dataTable, setDataTable, setViewType, viewType }) => {
  const [asc, setAsc] = useState(true);

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
    return setDataTable(sortedData);
  };

  const toggleRotate = (element) => {
    const iconUp = element.querySelector(".icon-sort-up");
    const iconDown = element.querySelector(".icon-sort-down");
    iconUp.classList.toggle("sort-icon_rotate");
    iconDown.classList.toggle("sort-icon_rotate");
  };

  const handleSort = (element, columnName) => {
    toggleRotate(element);
    sortData(columnName);
  };

  const handleViewType = (viewType) => {
    setViewType(viewType);
  };

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div
      className='abcAnalysis dash-container table-content scrollable-table'
      style={{ maxHeight: "700px" }}
    >
      <div
        className='filter abc-filter-container  dash-container d-flex'
        style={{ margin: "5px 8px" }}
      >
        <div className='filter-btn-p'>Выбрать вид: </div>
        <div
          className={`filter-btn ${viewType === "revenue" ? "active" : ""}`}
          onClick={() => handleViewType("revenue")}
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
      <div className='scrollable-table-wrapper scrollable-table'>
        <table className='table' style={{ margin: "0 20px" }}>
          <tr style={{ fontSize: "24px", fontWeight: "700" }}></tr>
          <tr className='table-header'>
            <th
              style={{
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              Товар
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("title");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Артикул поставщика
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("wb_id");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Артикул
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("supplier_id");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Выручка
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("amount");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Доля выручки
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("amount_percent");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Категория
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("category");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
            <th>
              Общая категория
              <div
                className='icon-sort-wrap'
                onClick={(e) => {
                  toggleRotate(e.currentTarget);
                  sortData("category_total");
                }}
                style={{ background: "transparent" }}
              >
                <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
                <img
                  className='icon-sort icon-sort-down'
                  src={ArrowDown}
                  alt=''
                />
              </div>
            </th>
          </tr>

          <tbody>
            {dataTable.map((item, i) => (
              <tr key={i}>
                <td style={{ color: "#5329FF" }}>
                  <img
                    src={item.photo}
                    alt='User'
                    style={{
                      marginRight: "8px",
                      width: "30px",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                  {item.title}
                </td>
                <td>{item.wb_id}</td>
                <td>{item.supplier_id}</td>
                <td>{formatNumber(item.amount)}</td>
                <td>{item.amount_percent}%</td>
                <td>{item.category}</td>
                <td>{item.category_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAbcData;
