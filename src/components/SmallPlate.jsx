import React from 'react';
import { formatPrice } from '../service/utils';
import TooltipInfo from './TooltipInfo';

const SmallPlate = ({
  name,
  type,
  percent,
  quantity,
  nochart,
  dataDashBoard,
  pieces,
  allProps,
  loading,
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

  const getTooltipContent = (allProps) => {
    const fineTypes = {
      self_buy: 'Самовыкупы',
      incorrect_attachments: 'Подмена товара',
      goods_labeling: 'Маркировка товара',
      characteristics_change: 'Смена характеристик',
      acceptance: 'Платная приемка',
    };

    const activeLines = Object.entries(fineTypes)
      .filter(([key]) => allProps[key] !== 0)
      .map(([key, label]) => `${label}: ${formatPrice(allProps[key])}<br/>`)
      .join('');

    return (
      activeLines ||
      'В выбранном периоде штрафов и расходов на платную приемку нет'
    );
  };

  return (
    <div className='small-plate' style={{ height: '100%' }}>
      {dataDashBoard === null || dataDashBoard === undefined || loading ? (
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
          <div
            className='p-0 m-0  clue-text small-title'
            style={{ fontSize: '1.65vh' }}
          >
            {name}

            {name === 'Комиссия WB' && (
              <TooltipInfo text='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries' />
            )}
            {name === 'Расходы на логистику' && (
              <TooltipInfo text='Суммарные расходы на логистику, определяются расчетным способом от количества заказов' />
            )}
            {name === 'Хранение' && (
              <TooltipInfo text='Расходы на хранение товаров на складах WB' />
            )}
            {name === 'Упущенные продажи' && (
              <TooltipInfo text='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе' />
            )}
            {name === 'Штрафы WB' && (
              <TooltipInfo
                text={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getTooltipContent(allProps),
                    }}
                  />
                }
              />
            )}
          </div>

          <div
            className={
              dataDashBoard > 1000000
                ? 'd-flex flex-column align-items-start'
                : 'd-flex justify-content-between align-items-end'
            }
          >
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
