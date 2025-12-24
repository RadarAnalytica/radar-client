import React from 'react';
import { Radio, ConfigProvider } from 'antd';

const RadioGroup = ({ options, name, defaultValue, onChange }) => {
  return (
    <div className='map-radio mb-3'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#5329FF'
          }
        }}
      >
        <Radio.Group
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <Radio key={option.value} value={option.value} style={{ fontSize: '14px' }}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

export default RadioGroup;
