import React from 'react';

const StatusInfo = ({ title, fill, width }) => {
  return (
    <div className='d-flex token-status'>
      <svg
        width={width}
        height='40'
        fill='#00B69B'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width={width} height='40' rx='8' fill={fill} fillOpacity='0.15' />
        <circle cx='15' cy='18' r='5' fill={fill} />
        <text
          x='30'
          y='25'
          fontFamily='Arial'
          fontSize='18'
          fontWeight='400'
          fill='black'
        >
          {title}
        </text>
      </svg>
    </div>
  );
};

export default StatusInfo;
