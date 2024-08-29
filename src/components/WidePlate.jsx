import React from 'react';
import { formatPrice } from '../service/utils';

const WidePlate = ({
  title,
  titles,
  income,
  products,
  data,
  dataDashBoard,
}) => {

  const sales = data
    ? Object.values(data)?.filter((array) => array?.totalSales)
    : [];
  const salesPerc = data
    ? Object.values(data)?.map((array) => array?.salesPercentage)
    : [];
  const amount = data
    ? Object.values(data)?.map((array) => array?.totalAmount)
    : [];
  const amountPerc = data
    ? Object.values(data)?.map((array) => array?.quantityPercentage)
    : [];

  return (
    <div className='wide-plate w-100'>
      {!dataDashBoard ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '100%' }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <>
          <p className='fw-bold mb-2 numbers'>{title}</p>
          <div className='d-flex mb-2'>
            <span className='col-2 fw-bold'>&nbsp;</span>
            {titles &&
              titles.map((t, i) => (
                <div className={'col medium-numbers'} key={i}>
                  <span className='mr-2'>{t}</span>
                  <span></span>
                </div>
              ))}
          </div>
          <div
            className='d-flex mb-2'
            style={{ borderTop: '1px solid silver', paddingTop: '8px' }}
          >
            <span className='col-2 medium-numbers' style={{ fontWeight: 600 }}>
              Выручка
            </span>
            {
              <>
                <div className={'col '}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.amountA + ' ₽'}
                  </span>
                  {dataDashBoard !== undefined && (
                    <span
                      className='tiny-numbers'
                      style={
                        dataDashBoard?.amountPercentA >= 45
                          ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                          : dataDashBoard?.amountPercentA > 25 &&
                            dataDashBoard?.amountPercentA < 45
                          ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                          : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                      }
                    >
                      {dataDashBoard?.amountPercentA
                        ? formatPrice(dataDashBoard?.amountPercentA) + ' %'
                        : 0}
                    </span>
                  )}
                </div>
                <div className={'col '}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.amountB + ' ₽'}
                  </span>
                  <span
                    className='tiny-numbers'
                    style={
                      dataDashBoard?.amountPercentB >= 45
                        ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                        : dataDashBoard?.amountPercentB > 25 &&
                          dataDashBoard?.amountPercentB < 45
                        ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                        : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {dataDashBoard?.amountPercentB
                      ? formatPrice(dataDashBoard?.amountPercentB) + ' %'
                      : 0}
                  </span>
                </div>
                <div className={'col '}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.amountC + ' ₽'}
                  </span>
                  <span
                    className='tiny-numbers'
                    style={
                      dataDashBoard?.amountPercentC >= 45
                        ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                        : dataDashBoard?.amountPercentC > 25 &&
                          dataDashBoard?.amountPercentC < 45
                        ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                        : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {dataDashBoard?.amountPercentC
                      ? formatPrice(dataDashBoard?.amountPercentC) + ' %'
                      : 0}
                  </span>
                </div>
              </>
            }
          </div>
          <div
            className='d-flex mb-2'
            style={{ borderTop: '1px solid silver', paddingTop: '8px' }}
          >
            <span className='col-2 medium-numbers' style={{ fontWeight: 600 }}>
              Товар
            </span>
            {
              <>
                <div className={'col'}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.countA + ' шт'}
                  </span>
                  <span
                    className='tiny-numbers'
                    style={
                      dataDashBoard?.countPercentA >= 45
                        ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                        : dataDashBoard?.countPercentA > 25 &&
                          dataDashBoard?.countPercentA < 45
                        ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                        : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {dataDashBoard?.countPercentA
                      ? formatPrice(dataDashBoard?.countPercentA) + ' %'
                      : 0}
                  </span>
                </div>
                <div className={'col'}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.countB + ' шт'}
                  </span>
                  <span
                    className='tiny-numbers'
                    style={
                      dataDashBoard?.countPercentB >= 45
                        ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                        : dataDashBoard?.countPercentB > 25 &&
                          dataDashBoard?.countPercentB < 45
                        ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                        : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {dataDashBoard?.countPercentB
                      ? formatPrice(dataDashBoard?.countPercentB) + ' %'
                      : 0}
                  </span>
                </div>
                <div className={'col'}>
                  <span className='me-2 medium-numbers'>
                    {dataDashBoard?.countC + ' шт'}
                  </span>
                  <span
                    className='tiny-numbers'
                    style={
                      dataDashBoard?.countPercentC >= 45
                        ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' }
                        : dataDashBoard?.countPercentC > 25 &&
                          dataDashBoard?.countPercentC < 45
                        ? { fontSize: '12px', color: 'rgba(240, 173, 0, 1)' }
                        : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {dataDashBoard?.countPercentC
                      ? formatPrice(dataDashBoard?.countPercentC) + ' %'
                      : 0}
                  </span>
                </div>
              </>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default WidePlate;
