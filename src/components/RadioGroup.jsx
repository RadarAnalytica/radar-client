import React from 'react';

const RadioGroup = ({ options, name, defaultValue, onChange }) => {
  return (
    <div className='map-radio mb-3 mobile-map-radio'>
      {options.map((option) => (
        <div key={option.value} className='radio-item' style={{ cursor: 'pointer' }}>
          <input
            type='radio'
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            onChange={() => onChange(option.value)}
            style={{ cursor: 'pointer' }}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            style={{ cursor: 'pointer', fontSize: '2vh' }}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;