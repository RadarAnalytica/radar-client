import React, { useEffect, useState } from 'react';

const CustomSelect = ({ options, callback, label, defaultValue }) => {
  const [state, setState] = useState(defaultValue || options[0]);
  useEffect(() => {
    if (options) {
      setState(defaultValue);
    }
  }, [options]);

  const [shown, setShown] = useState(false);

  return (
    <div className='select-field mb-2'>
      <label htmlFor=''>{label}</label>
      <label
        name=''
        id=''
        className='form-control mt-2'
        onClick={() => setShown(!shown)}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
          <svg
            viewBox='0 0 28 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2 2L14 14L26 2'
              stroke='#1A1A1A'
              strokeWidth='4'
              strokeLinecap='round'
            />
          </svg>
          </div>
          <p
            className='mb-0'
            style={{
              border: '1px solid rgb(232, 232, 232)!important',
              cursor: 'pointer',
              paddingRight: '1.5vw',
            }}
          >
            {state}
          </p>
          <div
            style={{
              position: 'absolute',
              top: '4.1vh',
              zIndex: 99999,
              backgroundColor: 'white',
              width: '106%',
              marginLeft: '-3%',
              borderRadius: '4px',
              boxShadow: '0 3px 12px silver',
            }}
          >
            {shown
              ? options &&
                options.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => callback(item)}
                    style={{ padding: '0 .75rem' }}
                  >
                    <p
                      className='mb-0 select-element'
                      style={{
                        cursor: 'pointer',
                        padding: '.375rem 0',
                        borderBottom: '1px solid rgb(232, 232, 232)',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </label>
    </div>
  );
};

export default CustomSelect;
