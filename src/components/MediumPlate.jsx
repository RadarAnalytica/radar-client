import React from 'react';
import { formatPrice } from '../service/utils';
import GreenArrow from '../assets/greenarrow.svg';
import RedArrow from '../assets/redarrow.svg';

const MediumPlate = ({
  name,
  value,
  quantity,
  percent,
  percent2,
  text,
  text2,
  dataDashBoard,
  days,
}) => {
  const green = require('../assets/greenarrow.png');
  const red = require('../assets/redarrow.png');
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

  const getIcon = (name) => {
    switch (name) {
      case 'Заказы':
        return (
          <svg
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              width: '3.25vw',
            }}
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              opacity='0.21'
              width='60'
              height='60'
              rx='10'
              fill='#FEC53D'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15 24.3165L27.9005 31.7646C28.0394 31.8448 28.1851 31.9027 28.3333 31.9395V46.3847L15.9201 39.0385C15.3498 38.701 15 38.0876 15 37.4249V24.3165ZM45 24.1185V37.4249C45 38.0876 44.6502 38.701 44.0799 39.0385L31.6667 46.3847V31.8129C31.6969 31.7978 31.7269 31.7817 31.7566 31.7646L45 24.1185Z'
              fill='#FEC53D'
            />
            <path
              opacity='0.499209'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.4053 20.7014C15.5628 20.5024 15.7617 20.3343 15.9936 20.2108L29.1186 13.2201C29.6696 12.9266 30.3305 12.9266 30.8815 13.2201L44.0065 20.2108C44.1852 20.306 44.3444 20.4277 44.4801 20.5697L30.0899 28.8778C29.9953 28.9325 29.9081 28.995 29.8286 29.064C29.7491 28.995 29.6618 28.9325 29.5672 28.8778L15.4053 20.7014Z'
              fill='#FEC53D'
            />
          </svg>
        );
      case 'Продажи':
        return (
          <svg
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              width: '3.25vw',
            }}
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              opacity='0.21'
              width='60'
              height='60'
              rx='10'
              fill='#4AD991'
            />
            <path
              d='M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z'
              fill='#4AD991'
            />
            <path
              opacity='0.5'
              d='M24.9131 34.175C24.3255 34.8018 23.3411 34.8335 22.7143 34.246C22.0876 33.6584 22.0558 32.674 22.6434 32.0472L28.4767 25.825C29.045 25.2189 29.9893 25.1663 30.6213 25.7056L35.2253 29.6344L41.224 22.0361C41.7563 21.3618 42.7345 21.2467 43.4088 21.7791C44.0831 22.3114 44.1982 23.2896 43.6658 23.9639L36.6658 32.8306C36.1191 33.5231 35.1063 33.6227 34.4351 33.05L29.7311 29.0358L24.9131 34.175Z'
              fill='#4AD991'
            />
          </svg>
        );
      case 'Возвраты':
        return (
          <svg
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              width: '3.25vw',
            }}
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              opacity='0.21'
              width='60'
              height='60'
              rx='10'
              fill='#FF9066'
            />
            <path
              opacity='0.901274'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M22.7214 15.1789C22.4573 14.8642 21.9474 14.9846 21.852 15.3843L20.2186 22.2324C20.1409 22.5581 20.3989 22.8666 20.7332 22.8477L27.778 22.4484C28.1889 22.4252 28.3972 21.9431 28.1327 21.6278L26.3314 19.4811C27.4963 19.083 28.7316 18.8751 30 18.8751C36.2592 18.8751 41.3333 23.9492 41.3333 30.2084C41.3333 36.4676 36.2592 41.5417 30 41.5417C23.7408 41.5417 18.6667 36.4676 18.6667 30.2084C18.6667 29.1576 18.809 28.1285 19.0864 27.1394L16.5188 26.4192C16.1808 27.6243 16 28.8953 16 30.2084C16 37.9404 22.268 44.2084 30 44.2084C37.732 44.2084 44 37.9404 44 30.2084C44 22.4764 37.732 16.2084 30 16.2084C28.055 16.2084 26.2027 16.605 24.5195 17.3218L22.7214 15.1789Z'
              fill='#FF9066'
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className='medium-plate col'>
      {dataDashBoard === null || dataDashBoard === undefined ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: '100%' }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <div
          className='d-flex align-items-start justify-content-between'
          style={{ position: 'relative' }}
        >
          <div className='w-100'>
            <div className='mb-1'>
              <p
                className='p-0 m-0 mb-1 clue-text'
                style={{ fontSize: '1.75vh' }}
              >
                {name}
              </p>
              <p className='p-0 m-0 mb-1 fw-bold numbers'>
                {formatPrice(dataDashBoard) || '0,00'} ₽
              </p>
              <div className='d-flex align-items-center gap-2'>
                <div className='d-flex align-items-center'>
                  {percent > 0 ? rateUp : rateDown}
                  {/* <img src={percent > 0 ? green : red} alt="" style={{ width: '20px', height: '12px', marginRight: '10px' }} /> */}
                  <p
                    className='m-0 p-0 tiny-numbers'
                    style={
                      percent > 0
                        ? { color: 'rgba(0, 182, 155, 1)' }
                        : { color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {formatPrice(percent)}%
                  </p>
                </div>
                {text && (
                  <p
                    className='m-0 p-0 clue-text'
                    style={{ fontSize: '1.75vh', fontWeight: 600 }}
                  >
                    {'В день ~ ' + formatPrice(text) + ' ₽'}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className='p-0 m-0 mb-1 fw-bold numbers'>{quantity} шт.</p>
              <div className='d-flex align-items-center gap-2'>
                <div className='d-flex align-items-center'>
                  {percent2 > 0 ? rateUp : rateDown}
                  {/* <img src={percent2 > 0 ? green : red} alt="" style={{ width: '20px', height: '12px', marginRight: '10px' }} /> */}
                  <p
                    className='m-0 p-0 tiny-numbers'
                    style={
                      percent2 > 0
                        ? { color: 'rgba(0, 182, 155, 1)' }
                        : { color: 'rgba(249, 60, 101, 1)' }
                    }
                  >
                    {formatPrice(percent2)}%
                  </p>
                </div>
                {(text2 && (
                  <p
                    className='m-0 p-0 clue-text'
                    style={{ fontSize: '1.75vh', fontWeight: 600 }}
                  >
                    {'В день ~ ' + formatPrice(text2) + ' шт'}
                  </p>
                )) || <p className='m-0 p-0'>&nbsp;</p>}
              </div>
            </div>
          </div>
          {getIcon(name)}
        </div>
      )}
    </div>
  );
};

export default MediumPlate;
