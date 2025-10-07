import React from 'react';

const StockAnalysisGlitterFilter = ({setDays}) => {
  return (
    <div className="filter pt-0 d-flex">
    <div className="row">
    <div className='filter-item col' style={{ position: 'relative' }}>
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='period'
          >
            Период:
          </label>
          <div style={{ position: 'relative' }}>
            <select
              style={{
                width: '100%',
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                appearance: 'none',
                cursor: 'pointer',
              }}
              className='form-control'
              id='period'
              defaultValue={'30'}
            //   value={periodValue}
              onChange={(e) => {
                setDays(e.target.value);
              }}
            >
              <option value='7'>7 дней</option>
              <option value='14'>14 дней</option>
              <option value='30'>30 дней</option>
              <option value='90'>90 дней</option>
            </select>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.5vh',
                height: '1.5vh',
                pointerEvents: 'none',
              }}
              viewBox='0 0 28 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L14 14L26 2'
                stroke='rgba(140, 140, 140, 1)'
                strokeWidth='4'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
    </div>
</div>
  );
};

export default StockAnalysisGlitterFilter;
