import React, { useState } from "react";

const TooltipInfo = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='tooltip-container'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className='info-icon'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='0.75'
            y='0.75'
            width='18.5'
            height='18.5'
            rx='9.25'
            stroke='black'
            stroke-opacity='0.1'
            stroke-width='1.5'
          />
          <path
            d='M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z'
            fill='#1A1A1A'
            fill-opacity='0.5'
          />
        </svg>
      </div>
      {isVisible && <div className='tooltip-content'>{text}</div>}
    </div>
  );
};

export default TooltipInfo;
