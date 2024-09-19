import React from 'react'
import sortArrow from '../../assets/sortarrow.svg'
import SearchButton from '../../assets/searchstock.svg'
import DownloadFile from '../../assets/downloadxlfile.svg'
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import { useState } from 'react'
const RequestMonitoring = () => {
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
      vendorСode: 822343,
    },
    {
      productName: 'Крем',
      brandName: 'Аренд 3',
      vendorСode: 325353,
    }
  ]

  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(dataTable);

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


  // Search

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Обновление значения строки поиска
  };

  const handleFilter = () => {
    // Если строка поиска пуста, вернуть все данные
    if (searchTerm.trim() === '') {
      setFilteredData(dataTable); // Возвращаем все данные
      return;
    }

    // Фильтрация данных, если есть запрос
    const filtered = dataTable.filter((item) => {
      return (
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vendorСode.toString().includes(searchTerm)
      );
    });
    setFilteredData(filtered); // Обновить отфильтрованные данные
  };

  return (
    <div class="request-table table-content">
      <div className='search'>
        <input type='text'
          placeholder='Поиск по категории'
          value={searchTerm}
          onChange={handleSearch}
          className='search-input'
          style={{ marginLeft: '20px', marginTop: '20px' }} />
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <img src={SearchButton} alt="Search"
            onClick={handleFilter} style={{ cursor: 'pointer' }} />
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
                onClick={() => sortData("brandName")}
              >
                <img
                  style={{
                    ...getIconStyle("brandName", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("brandName", "desc"),
                  }}
                />
              </div></th>
              <th style={{ width: "30%" }}>Средняя позиция карточки{" "}<div
                className='icon-sort-wrap'
                style={{ background: "transparent" }}
                onClick={() => sortData("vendorСode")}
              >
                <img
                  style={{
                    ...getIconStyle("vendorСode", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("vendorСode", "desc"),
                  }}
                />
              </div></th>
            </tr>
          </thead>
        </table>
        <div className="scrollableBody">
          <table className="table">
            <tbody>
              {filteredData.map((item, index) => (
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