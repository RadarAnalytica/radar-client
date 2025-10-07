import React from 'react';
import sortArrow from '../../assets/sortarrow.svg';
import SearchButton from '../../assets/searchstock.svg';
import DownloadFile from '../../assets/downloadxlfile.svg';
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import { useState } from 'react';


const CategoryMonitoring = () => {


  const data = [

    {
      productName: 'Шампунь',
      brandName: 'Бренд 2',
      vendorСode: 12345,
      barCode: 52648,
      sku: 12345,
      size: 'XL',
      category: 'Разное',
      saleSum: 55428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2562,
      commissionWB: 5743,
      fines: 2562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25365,
      marginalProfit: 9322,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 25,
      orderQuantity: 25,
      orderSum: 25,
      purchased: 45,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    },
    {
      productName: 'Крем для рук',
      brandName: 'Бренд 1',
      vendorСode: 1235,
      barCode: 62648,
      sku: 12375,
      size: 'XL',
      category: 'Разное',
      saleSum: 25428,
      quantity: 231,
      lessReturns: 77684,
      costGoodsSold: 569,
      returnsSum: 16842,
      returnsQuantity: 32,
      returnsCostSold: 56848,
      costPriceOne: 120,
      costOfProductStockToday: 4562,
      toClient: 1458,
      fromClient: 3244,
      commissionWB: 7896,
      fines: 6658,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25365,
      marginalProfit: 7322,
      averageProfit: 5687,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 452,
      byProfit: 1252,
      basic: 536,
      maxDiscount: 60,
      minDiscountPrice: 23,
      orderQuantity: 12,
      orderSum: 45,
      purchased: 75,
      notPurchased: 12,
      purchasedPrecent: 25,
      completed: 102,
      orderCountDay: 2,
      slaeCountDay: 7,
      dataRadar: 55,
      dataWB: 8
    },
    {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }, {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }, {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }, {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }, {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }, {
      productName: 'Вентилятор',
      brandName: 'Бренд 3',
      vendorСode: 523,
      barCode: 7896,
      sku: 3345,
      size: 'M',
      category: 'Бытовая',
      saleSum: 54428,
      quantity: 231,
      lessReturns: 56842,
      costGoodsSold: 56984,
      returnsSum: 56842,
      returnsQuantity: 25,
      returnsCostSold: 56842,
      costPriceOne: 120,
      costOfProductStockToday: 2562,
      toClient: 5568,
      fromClient: 2862,
      commissionWB: 7743,
      fines: 3562,
      additionalpayment: 4562,
      serviceExpenses: 322,
      toPayoff: 25865,
      marginalProfit: 9342,
      averageProfit: 9322,
      profitabilityOfProductsSold: 9322,
      marginal: 29,
      annualReturnOnInventory: 152,
      lostRevenue: 254,
      byRevenue: 152,
      byProfit: 152,
      basic: 505,
      maxDiscount: 58,
      minDiscountPrice: 15,
      orderQuantity: 27,
      orderSum: 23,
      purchased: 44,
      notPurchased: 46,
      purchasedPrecent: 25,
      completed: 78,
      orderCountDay: 2,
      slaeCountDay: 6,
      dataRadar: 57,
      dataWB: 6
    }
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });


  // Search

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Обновление значения строки поиска
  };

  const handleFilter = () => {
    // Если строка поиска пуста, вернуть все данные
    if (searchQuery.trim() === '') {
      setFilteredData(data); // Возвращаем все данные
      return;
    }

    // Фильтрация данных, если есть запрос
    const filtered = data.filter((item) => {
      return (
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendorСode.toString().includes(searchQuery) ||
        item.barCode.toString().includes(searchQuery)
      );
    });
    setFilteredData(filtered); // Обновить отфильтрованные данные
  };
  // Search


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


  // const data = [
  //   {
  //     category: "Красота / Макияж / Лицо / Глиттер",
  //     values: Array(18).fill(393),
  //     specialValue: 3833,
  //     finalValue: 9000,
  //   },
  //   {
  //     category: "Красота / Макияж / Лицо / Глиттер",
  //     values: Array(18).fill(393),
  //     specialValue: 3833,
  //     finalValue: 9000,
  //   },
  //   {
  //     category: "Красота / Макияж / Лицо / Глиттер",
  //     values: Array(18).fill(393),
  //     specialValue: 3833,
  //     finalValue: 9000,
  //   },
  //   {
  //     category: "Красота / Макияж / Лицо / Глиттер",
  //     values: Array(18).fill(393),
  //     specialValue: 3833,
  //     finalValue: 9000,
  //   },
  //   {
  //     category: "Красота / Макияж / Лицо / Глиттер",
  //     values: Array(18).fill(393),
  //     specialValue: 3833,
  //     finalValue: 9000,
  //   },

  // ];
  return (
    <div className="table-content-category-monitoring">
      <div className='search'>

        <input type='text'
          placeholder='Поиск по категории'
          className='search-input'
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: '20px', marginTop: '20px' }} />

        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <img
            src={SearchButton}
            alt="Search"
            onClick={handleFilter}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <img src={DownloadFile} alt="" />
        </div>
      </div >

      <div className="table-wrapper-category-mon scrollable-table-monitoring-category" >
        <table>
          <thead>
            <tr>
              <th>Категория</th>
              <th>17.12
                <div
                  className='icon-sort-wrap-category-monitoring'
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
                </div>
              </th>
              <th>18.12 <div
                className='icon-sort-wrap-category-monitoring'
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
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("barCode")}
              >
                <img
                  style={{
                    ...getIconStyle("barCode", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("barCode", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("sku")}
              >
                <img
                  style={{
                    ...getIconStyle("sku", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("sku", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("size")}
              >
                <img
                  style={{
                    ...getIconStyle("size", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("size", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
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
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("saleSum")}
              >
                <img
                  style={{
                    ...getIconStyle("saleSum", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("saleSum", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("quantity")}
              >
                <img
                  style={{
                    ...getIconStyle("quantity", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("quantity", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("lessReturns")}
              >
                <img
                  style={{
                    ...getIconStyle("lessReturns", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("lessReturns", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("costGoodsSold")}
              >
                <img
                  style={{
                    ...getIconStyle("costGoodsSold", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("costGoodsSold", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("returnsSum")}
              >
                <img
                  style={{
                    ...getIconStyle("returnsSum", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("returnsSum", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("returnsQuantity")}
              >
                <img
                  style={{
                    ...getIconStyle("returnsQuantity", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("returnsQuantity", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("returnsCostSold")}
              >
                <img
                  style={{
                    ...getIconStyle("returnsCostSold", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("returnsCostSold", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("costPriceOne")}
              >
                <img
                  style={{
                    ...getIconStyle("costPriceOne", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("costPriceOne", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("costOfProductStockToday")}
              >
                <img
                  style={{
                    ...getIconStyle("costOfProductStockToday", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("costOfProductStockToday", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("toClient")}
              >
                <img
                  style={{
                    ...getIconStyle("toClient", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("toClient", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("fromClient")}
              >
                <img
                  style={{
                    ...getIconStyle("fromClient", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("fromClient", "desc"),
                  }}
                />
              </div></th>
              <th>20.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("commissionWB")}
              >
                <img
                  style={{
                    ...getIconStyle("commissionWB", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("commissionWB", "desc"),
                  }}
                />
              </div></th>
              <th>19.12 <div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("fines")}
              >
                <img
                  style={{
                    ...getIconStyle("fines", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("fines", "desc"),
                  }}
                />
              </div></th>
              <th>20.12<div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("additionalpayment")}
              >
                <img
                  style={{
                    ...getIconStyle("additionalpayment", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("additionalpayment", "desc"),
                  }}
                />
              </div></th>
              <th>20.12<div
                className='icon-sort-wrap-category-monitoring'
                style={{ background: "transparent" }}
                onClick={() => sortData("serviceExpenses")}
              >
                <img
                  style={{
                    ...getIconStyle("serviceExpenses", "asc"),
                  }}
                  src={ArrowUp}
                  alt=''
                />
                <img
                  src={ArrowDown}
                  alt=''
                  style={{
                    ...getIconStyle("serviceExpenses", "desc"),
                  }}
                />
              </div></th>
              {/* Добавь остальные заголовки для дат */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="category">{row.productName}</td>
                <td>{row.brandName}</td>
                <td>{row.vendorСode}</td>
                <td>{row.barCode}</td>
                <td>{row.sku}</td>
                <td>{row.size}</td>
                <td>{row.category}</td>
                <td>{row.saleSum} р</td>
                <td>{row.quantity}</td>
                <td>{row.lessReturns}</td>
                <td>{row.costGoodsSold}</td>
                <td>{row.returnsSum}</td>
                <td>{row.returnsQuantity}</td>
                <td>{row.returnsCostSold} р</td>
                <td>{row.costPriceOne}</td>
                <td>{row.costOfProductStockToday} р</td>
                <td>{row.toClient} р</td>
                <td>{row.fromClient} р</td>
                <td>{row.commissionWB} р</td>
                <td>{row.fines} р</td>
                <td>{row.additionalpayment} р</td>
                <td>{row.serviceExpenses} р</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div >
  );
};

export default CategoryMonitoring;
