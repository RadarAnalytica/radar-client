import React from 'react'
import sortArrow from '../../assets/sortarrow.svg'
import SearchButton from '../../assets/searchstock.svg'
import DownloadFile from '../../assets/downloadxlfile.svg'
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import { useState } from 'react'
const RequestMonitoring = () => {
  const [requestMonitoringData, setRequestMonitoringData] = useState([])
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
    setRequestMonitoringData(sortedData);
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
  const dataTable = [

    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    },
    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
    }
  ]
  return (
    <div class="request-table table-content">
      <div className='search'>
        <input type='text' placeholder='Поиск по категории' className='search-input' style={{ marginLeft: '20px', marginTop: '20px' }} />
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <img src={SearchButton} alt="" />
        </div>
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <img src={DownloadFile} alt="" />
        </div>
      </div>
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Запрос</th>
              <th style={{ width: "40%" }}>Частота WB запросов в месяц {" "}<div
                className='icon-sort-wrap'
                style={{ background: "transparent" }}
                onClick={() => sortData("category_monitoring")}
              >
                <img
                  style={{
                    ...getIconStyle("category_monitoring", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("category_monitoring", "desc"),
                  }}
                />
              </div></th>
              <th style={{ width: "30%" }}>Средняя позиция карточки{" "}<div
                className='icon-sort-wrap'
                style={{ background: "transparent" }}
                onClick={() => sortData("category_monitoring")}
              >
                <img
                  style={{
                    ...getIconStyle("category_monitoring", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("category_monitoring", "desc"),
                  }}
                />
              </div></th>
            </tr>
          </thead>
        </table>
        <div className="scrollableBody">
          <table className="table">
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index} >
                  <td style={{ width: "32%" }}>{item.productName}</td>
                  <td style={{ width: "40%" }}>{item.brandName}</td>
                  <td style={{ width: "30%" }}>{item.vendorСode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <table className='table table-glit-request'>
        <tr className='table-header' style={{ position: 'sticky', top: '0' }}>
          <th style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
            Запрос
            <img src={sortArrow} alt="" />
          </th>
          <th>
            Частота WB запросов в месяц
            <img src={sortArrow} alt="" />
          </th>
          <th>
            Средняя позиция карточки
            <img src={sortArrow} alt="" />
          </th>
        </tr>

        {dataTable.map((item, i) => (
          <tr>
            <td style={{ color: '#5329FF' }}>{item.productName}</td>
            <td>{item.brandName}</td>
            <td>{item.vendorСode}</td>


          </tr>
        ))}
      </table> */}

    </div>
  )
}

export default RequestMonitoring