import React from 'react';
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowDown from '../assets/ArrowDown.svg';

const SortArrows = ({ columnKey, sortConfig }) => {
  return (
    <span style={{ marginLeft: '3px', cursor: 'pointer' }}>
      <img
        src={ArrowUp}
        alt='Up'
        style={{
          width: '15px',
          height: '15px',
          filter:
            sortConfig.key === columnKey && sortConfig.direction === 'asc'
              ? 'brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)'
              : 'none',
          transition: 'transform 0.3s ease',
        }}
      />
      <img
        src={ArrowDown}
        alt='Down'
        style={{
          width: '15px',
          height: '15px',
          filter:
            sortConfig.key === columnKey && sortConfig.direction === 'desc'
              ? 'brightness(0) saturate(100%) invert(29%) sepia(81%) saturate(6689%) hue-rotate(243deg) brightness(96%) contrast(101%)'
              : 'none',
          transition: 'transform 0.3s ease',
        }}
      />
    </span>
  );
};

export default SortArrows;
