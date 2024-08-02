import React from 'react';
import '../../pages/styles.css';

const CalculateResults = ({ result }) => {
  return (
    <div className='calc-results'>
      <h5 className='fw-bold'>Результаты</h5>
      <div className='d-flex justify-content-between'>
        <span>Прибыль маржинальная</span>
        <span className='fw-bold'>{result.marginalProfit.toFixed(1)} руб</span>
      </div>
      <div className='d-flex justify-content-between'>
        <span>Маржинальность</span>
        <span className='fw-bold'>{result.grossProfitMargin.toFixed(1)} %</span>
      </div>
      <div className='d-flex justify-content-between'>
        <span>Чистая прибыль</span>
        <span className='fw-bold'>{result.netProfit.toFixed(1)} руб</span>
      </div>
      <div className='d-flex justify-content-between'>
        <span>Рентабельность</span>
        <span className='fw-bold'>{result.profitability.toFixed(1)} %</span>
      </div>
      <p className='mb-1'>Для достижения цели нужно продать:</p>
      <div>
        <span className='me-2 fw-bold'>
          {result.targetAmount.toFixed(0)} шт
        </span>
        <span className='clue-text'>
          {Math.ceil(result.targetAmount / 30)} шт в день
        </span>
      </div>
    </div>
  );
};

export default CalculateResults;
