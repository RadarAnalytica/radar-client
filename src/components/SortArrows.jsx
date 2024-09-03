import React from 'react'
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowDown from '../assets/ArrowDown.svg';

const SortArrows = ({ columnKey, sortConfig }) => {
    return (
      <span style={{ marginLeft: '3px' }}>
        <img
          src={ArrowUp}
          alt="Up"
          style={{
            width: '15px',
            height: '15px',
            opacity: sortConfig.key === columnKey && sortConfig.direction === 'asc' ? 1 : 0.3,
            transform: sortConfig.key === columnKey ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease'
          }}
        />
        <img
          src={ArrowDown}
          alt="Down"
          style={{
            width: '15px',
            height: '15px',
            opacity: sortConfig.key === columnKey && sortConfig.direction === 'desc' ? 1 : 0.3,
            transform: sortConfig.key === columnKey ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </span>
    );
  };
  
  export default SortArrows;