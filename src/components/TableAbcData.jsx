import React, { useState } from "react";
import sortArrow from "../assets/sortarrow.svg";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";

const TableAbcData = ({ dataTable, setDataTable }) => {
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

  return (
    <div class=' dash-container scrollable-table table-content '>
      <table className='table'>
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
            <img onClick={() => sortData("wb_id")} src={sortArrow} alt='' />
          </th>
          <th>
            Артикул
            <img
              onClick={() => sortData("supplier_id'")}
              src={sortArrow}
              alt=''
            />
          </th>
          <th>
            Выручка
            <img onClick={() => sortData("amount")} src={sortArrow} alt='' />
          </th>
          <th>
            Дата выручки
            <img
              onClick={() => sortData("amount_percent")}
              src={sortArrow}
              alt=''
            />
          </th>
          <th>
            Категория
            <img onClick={() => sortData("category")} src={sortArrow} alt='' />
          </th>
          <th>
            Общая категория
            <img
              onClick={() => sortData("category_total")}
              src={sortArrow}
              alt=''
            />
          </th>
        </tr>

        {dataTable.map((item, i) => (
          <tr>
            <td style={{ color: "#5329FF" }}>{item.title}</td>
            <td>{item.wb_id}</td>
            <td>{item.supplier_id}</td>
            <td>{item.amount}</td>
            <td>{item.amount_percent}</td>
            <td>{item.category}</td>
            <td>{item.category_total}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TableAbcData;
