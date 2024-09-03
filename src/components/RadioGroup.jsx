import React from 'react';

const RadioGroup = ({ options, name, defaultValue, onChange }) => {
  return (
    <div className='map-radio mb-3'>
      {options.map((option) => (
        <div key={option.value} className='radio-item'>
          <input
            type='radio'
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            style={{ cursor: 'pointer' }}
            onChange={() => onChange(option.value)}
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