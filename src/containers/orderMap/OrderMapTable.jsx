import React from 'react';

const TableRow = ({head = false, title, count, amount, percent}) => {
  return (
    <div
      className={`d-flex justify-content-start pt-2 pb-2 font-s ${head && 'clue-text'}`}
      style={{ borderBottom: '1px solid var(--outline-color)' }}
    >
      <div className='col-4 ps-1 pe-2 text-truncate' title={title}>{title}</div>
      <div className='col pe-2 text-center'>{count}&nbsp;шт</div>
      <div className='col col-4 pe-2 text-center'>{amount}&nbsp;₽</div>
      <div className={`col pe-1 text-end ${!head && 'fw-bold'}`}>{percent}&nbsp;%</div>
    </div>
  )
}

const OrderMapTable = ({ title, data, totalAmount, totalCount }) => {
  const withName = [...data].slice(5);
  // const otherRegion = withName.slice(-5)
  const withoutName = data.filter((item) => !item.districtName);

  const refreshed = withName.concat(withoutName);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  return (
    <div className='order-map-table'>
      <h5 className='fw-bold font-xl'>
        {title}
      </h5>

      <TableRow head={true} title={'Регион'} count={'Штуки'} amount={'Рубли'} percent={'Доля'} />

      {withName &&
        (withName.length > 5
          ? withName.map((item, key) => (
            <TableRow key={key} title={item.districtName || 'Регион не определен'} count={item.count} amount={item.amount} percent={item.percent.toFixed(1)} />
          ))
          : withName.map((item, key) => (
            <TableRow key={key} title={item.districtName} count={item.count.toFixed(0)} amount={formatNumber(item.amount.toFixed(2))} percent={item.percent.toFixed(1)} />
          )))}
    </div>
  );
};

export default OrderMapTable;
