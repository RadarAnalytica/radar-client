import React from 'react';
import { formatPrice } from '../service/utils';

const SmallPlate = ({
  name,
  type,
  percent,
  quantity,
  nochart,
  dataDashBoard,
  pieces,
}) => {
  const rateUp = (
    <svg
      style={{ width: '16px', height: '12px', marginRight: '10px' }}
      width='20'
      height='12'
      viewBox='0 0 20 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z'
        fill='#00B69B'
      />
    </svg>
  );
  const rateDown = (
    <svg
      style={{ width: '16px', height: '12px', marginRight: '10px' }}
      width='20'
      height='12'
      viewBox='0 0 20 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z'
        fill='#F93C65'
      />
    </svg>
  );

  return (
    <div className='small-plate' style={{ height: '100%' }}>
      {dataDashBoard === null || dataDashBoard === undefined ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '100%' }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <div
          className='d-flex flex-column justify-content-between'
          style={{ height: '100%' }}
        >
          <p
            className='p-0 m-0  clue-text small-title'
            style={{ fontSize: '1.65vh' }}
          >
            {name}
          </p>
          <div className='d-flex justify-content-between align-items-end'>
            <p className='p-0 m-0 fw-bold numbers'>
              {dataDashBoard ? formatPrice(dataDashBoard) : 0}
              {type === 'price' ? ' ₽' : ' %'}
            </p>
            {!quantity ? (
              <div>
                {nochart === undefined ? (
                  <div className='d-flex align-items-center justify-content-between'>
                    {percent > 0 ? rateUp : rateDown}
                    <p
                      className='m-0 p-0 tiny-numbers'
                      style={
                        percent > 0
                          ? { color: 'rgba(0, 182, 155, 1)' }
                          : { color: 'rgba(249, 60, 101, 1)' }
                      }
                    >
                      {formatPrice(percent) || 0}%
                    </p>
                  </div>
                ) : (
                  <div className='fw-bold p-0 mb-1'>
                    {pieces && `${pieces} шт`}
                  </div>
                )}
              </div>
            ) : (
              <p className='fw-bold p-0 mb-1 small-numbers'>
                {`${quantity} шт`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallPlate;
